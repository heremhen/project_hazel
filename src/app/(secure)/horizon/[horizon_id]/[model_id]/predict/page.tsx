"use client";

import { ChevronLeft, RefreshCcw } from "lucide-react";

import { FormSchema } from "@/lib/dto/formSchema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { getAllPrediction, prediction } from "@/lib/api/predict";
import { Outputs } from "@/components/predict-output";
import PredictionDetails from "@/components/predict-output-details";
import { PredictionInputs } from "@/components/prediction-inputs";
import { Output } from "@/lib/dto/prediction";

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

let MutableFormSchema = FormSchema;

export default function Prediction({
  params,
}: {
  params: { horizon_id: number; model_id: number };
}) {
  const [modelData, setModelData] = useState<State>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingComplete, setFetchingComplete] = useState<boolean>(false);
  const router = useRouter();
  const [output, setOutput] = useState<Output[]>([]);
  const [selectedOutput, setSelectedOutput] = useState<number | null>(null);

  const updateFormSchema = (fieldData: FieldData[]) => {
    MutableFormSchema = z.object({});

    fieldData.forEach((field) => {
      const fieldSchema = z.union([z.string(), z.number()]);
      MutableFormSchema = MutableFormSchema.extend({
        [field.name]: fieldSchema,
      });
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

  const form = useForm<z.infer<typeof MutableFormSchema>>({
    resolver: zodResolver(MutableFormSchema),
  });

  async function makePrediction(Data: z.infer<typeof MutableFormSchema>) {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await prediction(
        params.horizon_id,
        params.model_id,
        "json",
        { data: [Data] }
      );
      const { result } = response.data;
      if (result && result.length > 0) {
        // const result = data[0].output;
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

  const getPredOutput = async () => {
    await getAllPrediction(`${params.model_id}`)
      .then((response) => {
        console.log(response.data);
        setOutput(response.data);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Уучлаарай, доголдол үүслээ!",
        });
      });
  };

  const fetchData = async () => {
    await getModelData();
    await getPredOutput();
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
            disabled={isLoading}
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
              disabled={isLoading}
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
            {modelData && (
              <PredictionInputs
                modelData={modelData}
                form={form}
                isLoading={isLoading}
                makePrediction={makePrediction}
              />
            )}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center">
                  <PredictionDetails
                    items={
                      selectedOutput !== null
                        ? output.filter((item) => item.id === selectedOutput)
                        : []
                    }
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center">
                  <Outputs
                    items={output}
                    selected={selectedOutput}
                    onSelect={setSelectedOutput}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
