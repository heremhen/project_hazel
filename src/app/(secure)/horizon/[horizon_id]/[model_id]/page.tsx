"use client";

import { ChevronLeft, RefreshCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getModel } from "@/lib/api/models";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/../public/lottie/loading.json";
import { useRouter } from "next/navigation";

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

export default function ModelDetails({
  params,
}: {
  params: { horizon_id: number; model_id: number };
}) {
  const [modelData, setModelData] = useState<State>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingComplete, setFetchingComplete] = useState<boolean>(false);
  const router = useRouter();

  const getModelData = async () => {
    await getModel(params.model_id)
      .then((response) => {
        if (response.status === 200) {
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
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              router.push(`/horizon/${params.horizon_id}`);
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
            <Button
              size="sm"
              onClick={() => {
                router.push(
                  `/horizon/${params.horizon_id}/${params.model_id}/predict`
                );
              }}
            >
              Таамаглах
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Үндсэн мэдээлэл</CardTitle>
                <CardDescription>
                  Өөрчлөгдөх боломжтой талбаруудыг энд багтаав.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Нэршил</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={modelData?.name}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Тайлбар</Label>
                    <Textarea
                      id="description"
                      defaultValue={modelData?.description || ""}
                      className="min-h-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Төлөв</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="gap-3 flex flex-wrap">
                    <Badge variant="outline">{modelData?.pipeline_type}</Badge>
                    <Badge variant="outline">
                      {modelData?.time_budget} секунд
                    </Badge>
                    <Badge variant="outline">
                      {(modelData?.test_size_threshold || 0.2) * 100}% тест
                    </Badge>
                    <Badge variant="outline">
                      {(1 - (modelData?.test_size_threshold || 0.8)) * 100}%
                      сургалт
                    </Badge>

                    <Badge variant="outline">
                      Хувилбар №{modelData?.version}
                    </Badge>
                    <Badge variant="default">
                      аттрибут - {modelData?.target_attribute}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Устгах</CardTitle>
                <CardDescription>
                  Буцаах боломжгүй үйлдэл тул шаардлагагүй тохиолдолд
                  хэрэглэхгүй байхыг зөвлөж байна.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="hover:bg-destructive"
                >
                  Устгах
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchData();
            }}
          >
            <RefreshCcw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => {
              router.push(
                `/horizon/${params.horizon_id}/${params.model_id}/predict`
              );
            }}
          >
            Таамаглах
          </Button>
        </div>
      </div>
    </main>
  );
}
