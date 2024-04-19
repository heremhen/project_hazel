import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PackagePlus, ChevronsUpDown, LucideLoader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { modelCreationSchema } from "@/lib/dto/modelCreationSchema";
import { RegistryProp } from "@/lib/dto/registryProp";

interface ModelCreationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  createModel: (data: z.infer<typeof modelCreationSchema>) => Promise<void>;
  modelCreationSchema: z.ZodType<any, any>;
  form: UseFormReturn<z.infer<typeof modelCreationSchema>>;
  registryData: RegistryProp[] | undefined;
}

export default function ModelCreationDialog({
  isOpen,
  setIsOpen,
  isLoading,
  createModel,
  modelCreationSchema,
  form,
  registryData,
}: ModelCreationDialogProps) {
  return (
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
            Шаардлагатай хэсгүүдийг бөглөсний дараа үргэлжлүүлэх товчин дээр
            дарна уу.
          </DialogDescription>
        </DialogHeader>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-[350px] space-y-2 mx-auto"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">Автомат тохиргоог өөрчлөх</h4>
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
                          <span className="text-destructive">*</span> {"("}
                          багана{")"}
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
                                <span className="text-destructive">*</span>{" "}
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
                              value={field.value ? field.value.toString() : ""}
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
                <Button type="submit" disabled={isLoading} className="w-full">
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
  );
}
