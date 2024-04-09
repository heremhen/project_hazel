import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CardData {
  id: number;
  card_bg: string;
  title: string;
  type: string;
  parent_id: number
}

interface CardProps {
  $additionals: string;
}

const Gradient = styled.div<CardProps>`
  ${(props: { $additionals: any }) => props.$additionals}
`;

export default function CardComponent({ id, card_bg, title, type, parent_id }: CardData) {
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  // async function deleteModel() {
  //   try {
  //     await deleteModelPipeline(id, type).then((response) => {
  //       if (response.status === 204) {
  //         setIsDeleted(true);
  //         toast({
  //           description: `${title} model has been deleted!`,
  //         });
  //       }
  //     });
  //   } catch (error) {
  //     console.log("Failed to delete model!");
  //   }
  // }

  return isDeleted ? (
    <></>
  ) : (
    <Dialog>
      <AlertDialog>
        <div className="border p-4 w-40 rounded-lg relative group hover:text-primary transform transition-all duration-200 translate-x-0 bg-secondary hover:bg-secondary/90 focus-within:ring-2 ring-ring">
          <div className="w-full h-32 relative">
            <div
              className="focus:ring-0 focus:outline-none w-full h-full cursor-pointer"
              onClick={() => {
                router.push(`/horizon/${parent_id}/${id}`);
              }}
            >
              <Gradient
                $additionals={card_bg}
                className="hover:scale-95 ease-in-out duration-300 w-full h-full aspect-square rounded-tl-[2rem] md:rounded-tl-[3rem] rounded-md flex items-center justify-center shrink-0"
              />
            </div>
            <div
              role="button"
              className="absolute bottom-1 right-1 p-1 bg-secondary hover:bg-secondary/90 rounded-full shadow cursor-pointer hover:text-foreground"
              aria-label="Open menu"
            >
              <div className="w-4 h-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <svg
                      className="mb-1"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DialogTrigger asChild>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DialogTrigger>
                    <AlertDialogTrigger className="text-red-600 w-full">
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm mt-2 gap-2 justify-between">
            <h2 className="font-sans font-normal text-md break-all truncate">
              {title}
            </h2>
          </div>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit model details</DialogTitle>
            <DialogDescription>
              Make changes to your model here. Click save when you{"'"}re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue={title} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                placeholder="Type your description here."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              model pipeline and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive/90 hover:bg-destructive text-destructive-foreground"
              // onClick={deleteModel}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
