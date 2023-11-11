import { z } from "zod";
import { PositionCreateManyInputObjectSchema } from "./objects/PositionCreateManyInput.schema";

export const PositionCreateManySchema = z.object({
  data: z.union([
    PositionCreateManyInputObjectSchema,
    z.array(PositionCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
