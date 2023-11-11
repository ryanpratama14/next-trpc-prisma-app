import { z } from "zod";
import { PositionUpdateInputObjectSchema } from "./objects/PositionUpdateInput.schema";
import { PositionUncheckedUpdateInputObjectSchema } from "./objects/PositionUncheckedUpdateInput.schema";
import { PositionWhereUniqueInputObjectSchema } from "./objects/PositionWhereUniqueInput.schema";

export const PositionUpdateOneSchema = z.object({
  data: z.union([PositionUpdateInputObjectSchema, PositionUncheckedUpdateInputObjectSchema]),
  where: PositionWhereUniqueInputObjectSchema,
});
