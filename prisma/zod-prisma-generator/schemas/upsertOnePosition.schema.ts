import { z } from "zod";
import { PositionWhereUniqueInputObjectSchema } from "./objects/PositionWhereUniqueInput.schema";
import { PositionCreateInputObjectSchema } from "./objects/PositionCreateInput.schema";
import { PositionUncheckedCreateInputObjectSchema } from "./objects/PositionUncheckedCreateInput.schema";
import { PositionUpdateInputObjectSchema } from "./objects/PositionUpdateInput.schema";
import { PositionUncheckedUpdateInputObjectSchema } from "./objects/PositionUncheckedUpdateInput.schema";

export const PositionUpsertSchema = z.object({
  where: PositionWhereUniqueInputObjectSchema,
  create: z.union([PositionCreateInputObjectSchema, PositionUncheckedCreateInputObjectSchema]),
  update: z.union([PositionUpdateInputObjectSchema, PositionUncheckedUpdateInputObjectSchema]),
});
