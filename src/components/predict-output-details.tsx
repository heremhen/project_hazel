"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OutputsProps } from "@/lib/dto/prediction";

export default function PredictionDetails({ items }: OutputsProps) {
  const [copied, setCopied] = useState(false);

  if (!items) {
    return <></>;
  }

  return (
    <ScrollArea className="h-full w-full bg-background">
      <div className="flex flex-col gap-1 p-6 pb-12">
        {items &&
          items.map((item) => {
            const date = new Date(item.created_at);
            const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
            const formattedTime = date.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });

            return (
              <div key={item.id} className="">
                <div className="flex">
                  <h4>{item.id}.</h4>
                  <div className="ml-auto text-xs text-muted-foreground">
                    {`${formattedDate}, ${formattedTime}`}
                  </div>
                </div>
                {item.results.map((result, index) => (
                  <div key={index} className="w-full">
                    <pre className="flex justify-between w-full mt-2 rounded-md bg-slate-900 p-4">
                      <ul className="w-full">
                        <div className="flex w-full justify-between">
                          <span className="text-white">Оролт: </span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"outline"}
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    JSON.stringify(result.inputs, null, 2)
                                  );
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 5000);
                                }}
                              >
                                {copied ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <ClipboardCopy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              {"Хуулах"}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-white">
                          {JSON.stringify(result.inputs, null, 2)}
                        </p>
                      </ul>
                    </pre>
                    <pre className="flex justify-between w-full mt-2 rounded-md bg-primary/95 text-secondary p-4 pr-10">
                      <span>Гаралт: </span> <p>{result.output}</p>
                    </pre>
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
}
