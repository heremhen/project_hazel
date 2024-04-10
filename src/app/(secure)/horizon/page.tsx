"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createHorizon, getAllHorizon } from "@/lib/api/horizon";
import { LucideLoader2, Orbit } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface HorizonProps {
  icon: string;
  name: string;
  shared: boolean;
  id: number;
}

export default function Horizon() {
  const [horizons, setHorizons] = useState<HorizonProps[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFetchingComplete, setFetchingComplete] =
    React.useState<boolean>(false);
  const router = useRouter();

  const createNewHorizon = async () => {
    setIsLoading(true);
    const data = {
      icon: "Orbit",
    };
    await createHorizon(data)
      .then((response) => {
        if (response.status === 201) {
          const { icon, name, shared, id } = response.data;
          toast({
            description: "Амжилттай!",
          });
          setIsLoading(false);
          router.push(`/horizon/${id}`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        // console.log(err);
        toast({
          variant: "destructive",
          title: "Алдаа!",
        });
      });
  };

  const getHorizons = async () => {
    await getAllHorizon()
      .then((response) => {
        if (response.status === 200) {
          setHorizons(response.data);
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
    getHorizons();
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
    <div className="grid min-h-[87.3vh] w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Хэтийн хүрээ</h1>
        </div>
        {horizons && horizons.length ? (
          <>
            <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed shadow-sm bg-foreground/5">
              <div className="grid py-6 gap-5">
                <Button
                  disabled={isLoading}
                  variant={"default"}
                  className="transition duration-200 ease-in-out active:scale-95 mb-5 gap-1 w-fit mx-auto"
                  onClick={() => {
                    createNewHorizon();
                  }}
                >
                  {isLoading && (
                    <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <Orbit className="h-4 w-4" />
                  <span>Горизон үүсгэх+</span>
                </Button>
                <BentoGrid className="mx-auto flex flex-wrap gap-5 justify-center">
                  {horizons.map((item, i) => (
                    <Link key={item.id} href={`/horizon/${item.id}`}>
                      <BentoGridItem
                        key={item.id}
                        title={item.name}
                        header={<SkeletonHeader />}
                        className={"w-40"}
                        icon={<Orbit className="h-4 w-4" />}
                      />
                    </Link>
                  ))}
                </BentoGrid>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed shadow-sm bg-foreground/5">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Та хэтийн төлөв үүсгээгүй байна.
              </h3>
              <p className="text-sm text-muted-foreground">
                Хэтийн төлөвтэй болсноор та модельтэй ажиллах боломжтой.
              </p>
              <Button
                disabled={isLoading}
                className="mt-4"
                onClick={() => {
                  createNewHorizon();
                }}
              >
                {isLoading && (
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Горизон үүсгэх
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const SkeletonHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
