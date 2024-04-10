"use client";

import { ChevronLeft, LucideLoader2, RefreshCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getModel } from "@/lib/api/models";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/../public/lottie/loading.json";
import { useRouter } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { prediction } from "@/lib/api/predict";

interface PredictionInputField {
  most_frequent_value: string;
  data_type: string;
  fields: string[] | null;
}

interface PredictionInputFields {
  [key: string]: PredictionInputField;
}

interface State {
  name: string;
  description: string | null;
  target_attribute: string;
  test_size_threshold: number;
  time_budget: number;
  pipeline_type: string;
  version: number;
  dropped_columns: any[];
  registry_id: number;
  inherited_from_id: number | null;
  horizon_id: number;
  id: number;
  status: string;
  disabled: boolean;
  created_at: string;
  updated_at: string;
  css_background: string;
  prediction_input_fields: PredictionInputFields;
}

interface FieldData {
  name: string;
  data_type: string;
}

let FormSchema = z.object({});

export default function Prediction({
  params,
}: {
  params: { horizon_id: number; model_id: number };
}) {
  const [modelData, setModelData] = useState<State>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingComplete, setFetchingComplete] = useState<boolean>(false);
  const router = useRouter();
  const [output, setOutput] = useState("");

  const updateFormSchema = (fieldData: FieldData[]) => {
    FormSchema = z.object({});

    fieldData.forEach((field) => {
      const fieldSchema = z.union([z.string(), z.number()]);
      FormSchema = FormSchema.extend({ [field.name]: fieldSchema });
    });
  };

  const getModelData = async () => {
    await getModel(params.model_id)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          if (data && data.prediction_input_fields) {
            const fetchedData: FieldData[] = Object.entries(
              data.prediction_input_fields
            ).map(([fieldName, fieldInfo]: [string, unknown]) => ({
              name: fieldName,
              data_type: fieldInfo as string,
            }));

            updateFormSchema(fetchedData);
          }
          setModelData(response.data);
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function makePrediction(Data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    let data;
    try {
      const response = await prediction(
        params.horizon_id,
        params.model_id,
        "json",
        { data: [Data] }
      );
      data = response.data.results;
      if (data && data.length > 0) {
        const result = data[0].output;
        setOutput(result);
      }
      toast({
        description: "Success!",
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Prediction failed unexpectedly!",
      });
      setIsLoading(false);
    }
  }
  const fetchData = async () => {
    await getModelData();
    setFetchingComplete(true);
  };

  useEffect(() => {
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
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4 w-full">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              router.push(`/horizon/${params.horizon_id}/${params.model_id}`);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Буцах</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {modelData?.name}
          </h1>
          <Badge
            variant="outline"
            className={`ml-auto sm:ml-0 text-secondary ${
              modelData?.status === "SUCCESS"
                ? "bg-green-500"
                : modelData?.status === "FAILED"
                ? "bg-destructive"
                : "bg-blue-500"
            }`}
          >
            {modelData?.status}
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchData();
              }}
            >
              <RefreshCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <ScrollArea className="flex h-[80vh] items-center justify-center bg-background/95 shadow-lg border border-border rounded-md">
              <ul className="p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(makePrediction)}
                    className="w-auto space-y-2"
                  >
                    {modelData &&
                      Object.entries(modelData.prediction_input_fields).map(
                        ([fieldName, fieldInfo]) => (
                          <li key={fieldName} className="w-full">
                            {fieldInfo.data_type === "object" ? (
                              <FormField
                                control={form.control}
                                name={fieldName as never}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{fieldName}</FormLabel>
                                    <FormControl>
                                      <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <SelectTrigger>
                                          <SelectValue
                                            placeholder={`Утга сонгоно уу. (Ж: ${
                                              modelData &&
                                              modelData.prediction_input_fields[
                                                fieldName
                                              ].most_frequent_value
                                            })`}
                                          />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            {fieldInfo.fields?.map((option) => (
                                              <SelectItem
                                                key={option}
                                                value={option}
                                              >
                                                {option}
                                              </SelectItem>
                                            ))}
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ) : (
                              <FormField
                                control={form.control}
                                name={fieldName as never}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{fieldName}</FormLabel>
                                    <FormControl>
                                      <Input
                                        disabled={isLoading}
                                        type="number"
                                        placeholder={
                                          modelData &&
                                          modelData.prediction_input_fields[
                                            fieldName
                                          ].most_frequent_value
                                        }
                                        {...field}
                                        value={field.value || ""}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </li>
                        )
                      )}
                    <div className="pt-5">
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Таамаглах
                      </Button>
                      {output && (
                        <>
                          <pre className="flex justify-between w-full mt-2 rounded-md bg-slate-950 p-4">
                            <span>Үр дүн:</span> <p>{output}</p>
                          </pre>
                        </>
                      )}
                    </div>
                  </form>
                </Form>
              </ul>
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Two</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Three</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
