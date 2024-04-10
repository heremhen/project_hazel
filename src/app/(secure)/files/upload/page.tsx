"use client";

import { Button } from "@/components/ui/button";
import { File as FileIcon, FileUp, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { storeUploadFiles } from "@/lib/api/files";
import { toast } from "@/components/ui/use-toast";

type FileState = {
  [key: string]: {
    file: File;
    isImage: boolean;
    name: string;
    size: string;
  };
};

export default function RegistryUpload() {
  const [files, setFiles] = useState<FileState>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dragging, setDragging] = useState(false);
  const router = useRouter();

  const fileUpload = async () => {
    setIsLoading(true);
    const formData = new FormData();
    Object.values(files).forEach(({ file }) => {
      if (file instanceof File) {
        formData.append("upload_files", file);
      }
    });

    if (!formData.has("upload_files")) {
      toast({
        variant: "destructive",
        title: "Алдаа!",
        description: "No files to upload",
      });
      setIsLoading(false);
      return;
    }

    await storeUploadFiles(formData)
      .then((response) => {
        if (response.status === 201) {
          toast({
            description: "Амжилттай!",
          });
          setIsLoading(false);
          router.back();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        // console.log(err);
        toast({
          variant: "destructive",
          title: "Алдаа!",
          description: `${err}`,
        });
      });
  };

  const addFile = (file: File) => {
    let isImage = false;
    let size = "";
    let name = "";

    isImage = file.type.match("image.*") !== null;
    const objectURL = URL.createObjectURL(file);
    size =
      file.size > 1024
        ? file.size > 1048576
          ? Math.round(file.size / 1048576) + "mb"
          : Math.round(file.size / 1024) + "kb"
        : file.size + "b";
    name = file.name;

    setFiles((prevFiles) => ({
      ...prevFiles,
      [objectURL]: { file, isImage, name, size },
    }));
  };

  const removeFile = (objectURL: string) => {
    setFiles((prevFiles) => {
      const newFiles = { ...prevFiles };
      delete newFiles[objectURL];
      return newFiles;
    });
  };

  const handleFileChange = (e: { target: { files: any } }) => {
    for (const file of e.target.files) {
      addFile(file);
    }
  };

  const handleDrop = (e: {
    preventDefault: () => void;
    dataTransfer: { files: any };
  }) => {
    e.preventDefault();
    for (const file of e.dataTransfer.files) {
      addFile(file);
    }
    setDragging(false);
  };

  const handleDragEnter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    // alert(`Submitted Files:\n${JSON.stringify(files)}`);
    // console.log(files);
    fileUpload();
  };

  const handleCancel = () => {
    setFiles({});
  };

  return (
    <div className="w-full sm:px-8 md:px-16 sm:py-8">
      <main className="container mx-auto max-w-screen-lg h-full">
        <article
          className="relative h-full flex flex-col bg-muted/40 shadow-xl rounded-lg border"
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          <section className="overflow-auto p-8 w-full h-full flex flex-col">
            <header className="border-dashed border-2 rounded-lg border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-primary flex flex-wrap justify-center">
                <span>Файлуудаа хаана ч хамаагүй</span>&nbsp;
                <span>чирж, буулгах эсвэл</span>
              </p>
              <input
                id="hidden-input"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant={"outline"}
                id="button"
                onClick={() => document.getElementById("hidden-input")?.click()}
              >
                Файл байршуулах
              </Button>
            </header>
            <h1 className="pt-8 pb-3 font-semibold sm:text-lg">
              Байршуулахад бэлэн
            </h1>
            <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
              {Object.entries(files).map(
                ([objectURL, { file, isImage, name, size }]) => (
                  <li
                    key={objectURL}
                    className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
                  >
                    <article
                      className={`group w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-secondary cursor-pointer relative shadow-sm ${
                        isImage ? "hasImage" : ""
                      }`}
                    >
                      <Image
                        alt="upload preview"
                        width={32}
                        height={32}
                        className={`img-preview ${
                          isImage ? "" : "hidden"
                        } w-full h-full sticky object-cover rounded-md bg-fixed`}
                        src={objectURL}
                      />
                      <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                        <h1 className="flex-1 group-hover:text-secondary">
                          {name}
                        </h1>
                        <div className="flex">
                          <span className="p-1 text-secondary">
                            <i>
                              <FileIcon className="w-4 h-4" />
                            </i>
                          </span>
                          <p className="p-1 size text-xs text-secondary/70">
                            {size}
                          </p>
                          <Button
                            variant={"ghost"}
                            className="delete ml-auto p-1 text-destructive h-6"
                            onClick={() => removeFile(objectURL)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </section>
                    </article>
                  </li>
                )
              )}
              {Object.keys(files).length === 0 && (
                <li className="h-full w-full text-center flex flex-col items-center justify-center">
                  <FileUp />
                  <span className="text-small text-primary/40">
                    Сонгогдсон файл алга
                  </span>
                </li>
              )}
            </ul>
          </section>
          <footer className="flex justify-end px-8 pb-8 pt-4">
            <Button id="submit" variant={"default"} onClick={handleSubmit}>
              Байршуулах
            </Button>
            <Button
              id="cancel"
              variant={"ghost"}
              className="ml-3 px-3 py-1"
              onClick={() => {
                handleCancel();
                router.back();
              }}
            >
              Цуцлах
            </Button>
          </footer>
        </article>
      </main>
    </div>
  );
}
