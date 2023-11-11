import { z } from "zod";
import { PositionWhereInputObjectSchema } from "./objects/PositionWhereInput.schema";

export const PositionDeleteManySchema = z.object({
  where: PositionWhereInputObjectSchema.optional(),
});
