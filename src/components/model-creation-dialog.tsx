import React, { useEffect, useState } from "react";
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
import { Controller } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { modelCreationSchema } from "@/lib/dto/modelCreationSchema";
import { RegistryProp } from "@/lib/dto/registryProp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAutoMLModel } from "@/lib/api/models";
import { getOwnFiles } from "@/lib/api/files";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ModelCreationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  horizonId: string;
}

export default function ModelCreationDialog({
  isOpen,
  setIsOpen,
  isLoading,
  setIsLoading,
  horizonId,
}: ModelCreationDialogProps) {
  const [registryData, setRegistryData] = useState<RegistryProp[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof modelCreationSchema>>({
    resolver: zodResolver(modelCreationSchema),
    defaultValues: {
      horizon_id: parseInt(horizonId),
    },
  });

  const createModel = async (data: z.infer<typeof modelCreationSchema>) => {
    setIsLoading(true);
    try {
      const response = await createAutoMLModel(data);
      if (response.status === 201) {
        const { id } = response.data;
        toast({
          title: "Амжилттай!",
        });
        router.push(`/horizon/${horizonId}/${id}`);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Модель үүсгэхэд алдаа гарлаа!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRegistryData = async () => {
    try {
      const response = await getOwnFiles();
      if (response.status === 200) {
        setRegistryData(response.data);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Уучлаарай, доголдол үүслээ!",
      });
    }
  };

  useEffect(() => {
    getRegistryData();
  }, []);

  const onSubmit = form.handleSubmit(
    (data) => {
      console.log("Form data:", data);
      createModel(data);
    },
    (errors) => {
      console.log("Form errors:", errors);
    }
  );

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
            <form onSubmit={onSubmit} className="grid gap-4">
              <ScrollArea className={`w-full ${isOpen ? "h-96" : "h-60"}`}>
                <div className="grid gap-4 p-3">
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
                    <FormField
                      control={form.control}
                      name="pipeline_type"
                      render={({ field }) => (
                        <Controller
                          control={form.control}
                          name="pipeline_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="grid gap-2">
                                  <div className="flex items-center">
                                    <Label htmlFor="pipeline_type">
                                      Хөгжүүлэлтийн төрөл
                                    </Label>
                                  </div>
                                  <Select
                                    value={
                                      field.value
                                        ? field.value.toString()
                                        : "auto"
                                    }
                                    onValueChange={(value) =>
                                      field.onChange(value)
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Автомат" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem key={1} value="auto">
                                          Автомат
                                        </SelectItem>
                                        <SelectItem
                                          key={2}
                                          value="classification"
                                        >
                                          Ангилал
                                        </SelectItem>
                                        <SelectItem key={3} value="regression">
                                          Регресс
                                        </SelectItem>
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
                    <FormField
                      control={form.control}
                      name="time_budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid gap-2">
                              <Label htmlFor="time_budget">
                                Хугацааны төсөв
                              </Label>
                              <Select
                                value={
                                  field.value ? field.value.toString() : "181"
                                }
                                onValueChange={(value) =>
                                  field.onChange(Number(value))
                                }
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Автомат" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem key={1} value="61">
                                      Хурдан
                                    </SelectItem>
                                    <SelectItem key={2} value="181">
                                      Ердийн
                                    </SelectItem>
                                    <SelectItem key={3} value="602">
                                      Нарийвчлалтай
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="test_size_threshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid gap-2 py-2">
                              <Label htmlFor="test_size_threshold">
                                Туршилтын босго{" "}
                                {field.value ? field.value * 100 : 20}%
                              </Label>
                              <Slider
                                defaultValue={
                                  field.value ? [field.value * 100] : [20]
                                }
                                max={90}
                                min={10}
                                step={1}
                                onValueChange={(value) =>
                                  field.onChange(
                                    Number((value[0] * 0.01).toFixed(2))
                                  )
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid gap-2">
                              <Label htmlFor="description">Тайлбар</Label>
                              <Textarea
                                placeholder="Энд тайлбар бичнэ үү."
                                className="resize-none"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                </div>
              </ScrollArea>
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
