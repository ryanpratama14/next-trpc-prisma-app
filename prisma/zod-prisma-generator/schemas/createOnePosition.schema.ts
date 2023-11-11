import { z } from "zod";
import { PositionCreateInputObjectSchema } from "./objects/PositionCreateInput.schema";
import { PositionUncheckedCreateInputObjectSchema } from "./objects/PositionUncheckedCreateInput.schema";

export const PositionCreateOneSchema = z.object({
  data: z.union([PositionCreateInputObjectSchema, PositionUncheckedCreateInputObjectSchema]),
});
