"use client";

import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHorizon } from "@/lib/api/horizon";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import CardComponent from "@/components/model-card";
import ModelCreationDialog from "@/components/model-creation-dialog";
import Lottie from "lottie-react";
import animationData from "@/../public/lottie/loading.json";
import bubble from "@/../public/lottie/gradient_orb.json";
import { SkeletonCard } from "@/components/card-skeleton";

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
  params: { horizon_id: string };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [horizonData, setHorizonData] = useState<HorizonProp>();
  const [isFetchingComplete, setFetchingComplete] = useState<boolean>(false);
  const router = useRouter();

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

  useEffect(() => {
    getHorizonData();
    setFetchingComplete(true);
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

  if (isLoading) {
    return (
      <div className="absolute z-50 flex items-center justify-center min-h-screen w-full bg-background/70">
        <div className="w-1/2 lg:w-1/3">
          <Lottie
            animationData={bubble}
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
            <span className="sr-only">Буцах</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {horizonData?.name}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            {horizonData?.shared ? "Нээлттэй" : "Хаалттай"}
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-destructive"
            >
              Устгах
            </Button>
            <Button size="sm">Хуваалцах</Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <ModelCreationDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            horizonId={params.horizon_id}
          />
          {isFetchingComplete ? (
            horizonData && horizonData.models.length > 0 ? (
              horizonData?.models.map((model, index) => (
                <CardComponent
                  key={model.id}
                  id={model.id}
                  card_bg={model.css_background}
                  title={model.name}
                  type={model.pipeline_type}
                  parent_id={params.horizon_id}
                />
              ))
            ) : (
              <></>
            )
          ) : (
            Array.from({ length: 4 }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          )}
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm" className="hover:bg-destructive">
            Устгах
          </Button>
          <Button size="sm">Хуваалцах</Button>
        </div>
      </div>
    </main>
  );
}
