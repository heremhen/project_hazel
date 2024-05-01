"use client";

import { BrainCog, LucideLoader2 } from "lucide-react";

import { FormSchema } from "@/lib/dto/formSchema";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { z } from "zod";

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

interface Props {
  modelData: State;
  form: any;
  isLoading: boolean;
  makePrediction: (data: z.infer<typeof FormSchema>) => Promise<void>;
}

export function PredictionInputs({
  modelData,
  form,
  isLoading,
  makePrediction,
}: Props) {
  return (
    <ScrollArea className="flex h-[80vh] items-center justify-center bg-background/95">
      <ul className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(makePrediction)}
            className="w-auto space-y-3"
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
                                      <SelectItem key={option} value={option}>
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
                                  modelData.prediction_input_fields[fieldName]
                                    .most_frequent_value
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
            {modelData.status !== "PENDING" &&
              modelData.status !== "DISABLED" &&
              modelData.status !== "FAILED" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <BrainCog className="w-4 h-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">{"Таамаглах"}</TooltipContent>
                </Tooltip>
              )}
          </form>
        </Form>
      </ul>
    </ScrollArea>
  );
}
