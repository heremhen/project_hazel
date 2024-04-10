"use client";

import {
  ChevronLeft,
  ChevronsUpDown,
  LucideLoader2,
  PackagePlus,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHorizon } from "@/lib/api/horizon";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import CardComponent from "@/components/model-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createAutoMLModel } from "@/lib/api/models";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOwnFiles } from "@/lib/api/files";
import Lottie from "lottie-react";
import animationData from "@/../public/lottie/loading.json";

interface ModelsEssentials {
  id: number;
  name: string;
  description?: string;
  pipeline_type: string;
  status: string;
  version: number;
  css_background: string;
  horizon_id: number;
  created_at: Date;
  updated_at: Date;
}

interface HorizonProp {
  icon: string;
  name: string;
  shared: boolean;
  id: number;
  models: ModelsEssentials[];
}

interface RegistryProp {
  filename: string;
  uuid: string;
  extension: string;
  type: string;
  url: string;
  id: number;
}

export default function HorizonDetails({
  params,
}: {
  params: { horizon_id: number };
}) {
  const [horizonData, setHorizonData] = useState<HorizonProp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingComplete, setFetchingComplete] = useState<boolean>(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [registryData, setRegistryData] = useState<RegistryProp[]>();
  const modelCreationSchema = z.object({
    name: z.string().default("CH4NGE ME").optional(),
    description: z.string().default("").optional(),
    target_attribute: z.string(),
    test_size_threshold: z.number().min(0).max(1).default(0.2).optional(),
    time_budget: z.number().min(1).optional(),
    pipeline_type: z.string().default("auto").optional(),
    // version: z.number().min(1).default(1),
    // dropped_columns: z.array(z.string()).default([]),
    registry_id: z.number().min(0),
    // inherited_from_id: z.number().min(0).optional(),
    horizon_id: z.number().min(0).default(Number(params.horizon_id)),
  });

  const form = useForm<z.infer<typeof modelCreationSchema>>({
    resolver: zodResolver(modelCreationSchema),
  });

  const createModel = async (data: z.infer<typeof modelCreationSchema>) => {
    await createAutoMLModel(data)
      .then((response) => {
        if (response.status === 201) {
          const { id } = response.data;
          toast({
            title: "Амжилттай!",
          });
          router.push(`/horizon/${params.horizon_id}/${id}`);
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Модель үүсгэхэд алдаа гарлаа!",
        });
      });
  };

  const getHorizonData = async () => {
    await getHorizon(params.horizon_id)
      .then((response) => {
        if (response.status === 200) {
          setHorizonData(response.data);
        }
      })
      .catch((err) => {
        // console.log(err);
        toast({
          variant: "destructive",
          title: "Уучлаарай, доголдол үүслээ!",
        });
      });
  };

  const getRegistryData = async () => {
    await getOwnFiles()
      .then((response) => {
        if (response.status === 200) {
          const sortedRegistryData = response.data.sort(
            (a: { id: number }, b: { id: number }) => b.id - a.id
          );
          setRegistryData(sortedRegistryData);
        }
      })
      .catch((err) => {
        // console.log(err);
        toast({
          variant: "destructive",
          title: "Уучлаарай, доголдол үүслээ!",
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getHorizonData();
      await getRegistryData();
      setFetchingComplete(true);
    };

    fetchData();
  }, []);

  if (!isFetchingComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10/12 sm:w-1/2 lg:w-1/4">
          <Lottie
            animationData={animationData}
            className="flex justify-center items-center"
            loop={true}
          />
        </div>
      </div>
    );
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 min-h-screen">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4 w-full">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              router.push("/horizon");
            }}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {horizonData?.name}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            {horizonData?.shared ? "Нээлттэй" : "Хаалттай"}
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Устгах
            </Button>
            <Button size="sm">Хуваалцах</Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <Dialog>
            <div className="border p-4 w-40 rounded-lg relative group hover:text-primary transform transition-all duration-200 translate-x-0 bg-secondary hover:bg-secondary/90 focus-within:ring-2 ring-ring">
              <div className="w-full h-32 relative">
                <DialogTrigger asChild>
                  <div
                    className="focus:ring-0 focus:outline-none w-full h-full cursor-pointer"
                    onClick={() => {}}
                  >
                    <div className="bg-foreground/75 hover:scale-95 ease-in-out duration-300 w-full h-full aspect-square rounded-tl-[2rem] md:rounded-tl-[3rem] rounded-md flex items-center justify-center shrink-0">
                      <PackagePlus className="w-12 h-12 text-secondary" />
                    </div>
                  </div>
                </DialogTrigger>
              </div>
              <div className="flex items-center text-sm mt-2 gap-2 justify-between">
                <h2 className="font-sans font-normal text-md break-all truncate">
                  Модель үүсгэх+
                </h2>
              </div>
            </div>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Модель үүсгэх</DialogTitle>
                <DialogDescription>
                  Шаардлагатай хэсгүүдийг бөглөсний дараа үргэлжлүүлэх товчин
                  дээр дарна уу.
                </DialogDescription>
              </DialogHeader>
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-[350px] space-y-2 mx-auto"
              >
                <div className="flex items-center justify-between space-x-4 px-4">
                  <h4 className="text-sm font-semibold">
                    Автомат тохиргоог өөрчлөх
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(
                      (data) => {
                        console.log("Form data:", data);
                        createModel(data);
                      },
                      (errors) => {
                        console.log("Form errors:", errors);
                      }
                    )}
                    className="grid gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid gap-2">
                              <Label htmlFor="name">Моделийн нэр</Label>
                              <Input
                                type="text"
                                placeholder="CH4NGE ME"
                                {...field}
                                value={field.value || ""}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="target_attribute"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid gap-2">
                              <Label htmlFor="target_attribute">
                                Зорилтот аттрибут
                                <span className="text-destructive">*</span>{" "}
                                {"("}багана{")"}
                              </Label>
                              <Input
                                type="text"
                                placeholder="price"
                                {...field}
                                value={field.value || ""}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registry_id"
                      render={({ field }) => (
                        <Controller
                          control={form.control}
                          name="registry_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="grid gap-2">
                                  <div className="flex items-center">
                                    <Label htmlFor="registry_id">
                                      Өгөгдөл
                                      <span className="text-destructive">
                                        *
                                      </span>{" "}
                                      {"("}.csv{")"}
                                    </Label>
                                    <Link
                                      href="/files/upload"
                                      className="ml-auto inline-block text-sm underline"
                                    >
                                      Өгөгдөл байршуулах?
                                    </Link>
                                  </div>
                                  <Select
                                    value={
                                      field.value ? field.value.toString() : ""
                                    }
                                    onValueChange={(value) =>
                                      field.onChange(Number(value))
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Өгөгдөл сонгоно уу" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Өгөгдөл</SelectLabel>
                                        {registryData?.map((item) => (
                                          <SelectItem
                                            key={item.id}
                                            value={item.id.toString()}
                                          >
                                            {item.id}. {item.filename}
                                            {" ("}
                                            {item.extension}
                                            {") "}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    />
                    <CollapsibleContent className="space-y-2">
                      <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/colors
                      </div>
                      <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @stitches/react
                      </div>
                    </CollapsibleContent>
                    <DialogFooter>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading && (
                          <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Үргэлжлүүлэх
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </Collapsible>
            </DialogContent>
          </Dialog>
          {horizonData?.models.map((model, index) => (
            <CardComponent
              key={model.id}
              id={model.id}
              card_bg={model.css_background}
              title={model.name}
              type={model.pipeline_type}
              parent_id={params.horizon_id}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </main>
  );
}
