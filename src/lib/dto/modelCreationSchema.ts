import { z } from "zod";

export const modelCreationSchema = z.object({
  name: z.string().default("CH4NGE ME").optional(),
  description: z.string().default("").optional(),
  target_attribute: z.string(),
  test_size_threshold: z.number().min(0.1).max(0.9).default(0.2).optional(),
  time_budget: z.number().min(1).optional(),
  pipeline_type: z.string().default("auto").optional(),
  // version: z.number().min(1).default(1),
  // dropped_columns: z.array(z.string()).default([]),
  registry_id: z.number().min(0),
  // inherited_from_id: z.number().min(0).optional(),
  horizon_id: z.number().min(0)
});
