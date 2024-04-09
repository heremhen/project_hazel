"use client";

import { ChevronLeft, PlusCircle, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHorizon } from "@/lib/api/horizon";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import CardComponent from "@/components/model-card";

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

export default function HorizonDetails({
  params,
}: {
  params: { horizon_id: number };
}) {
  const [horizonData, setHorizonData] = useState<HorizonProp>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFetchingComplete, setFetchingComplete] =
    React.useState<boolean>(false);
  const router = useRouter();

  const getHorizonData = async () => {
    await getHorizon(params.horizon_id)
      .then((response) => {
        if (response.status === 200) {
          setHorizonData(response.data);
        }
      })
      .then(() => {
        setFetchingComplete(true);
      })
      .catch((err) => {
        // console.log(err);
        setFetchingComplete(true);
        toast({
          variant: "destructive",
          title: "Уучлаарай, доголдол үүслээ!",
        });
      });
  };

  useEffect(() => {
    getHorizonData();
  }, []);

  if (!isFetchingComplete) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
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
