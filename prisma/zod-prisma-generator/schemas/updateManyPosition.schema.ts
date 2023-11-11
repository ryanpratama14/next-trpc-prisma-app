import { z } from "zod";
import { PositionUpdateManyMutationInputObjectSchema } from "./objects/PositionUpdateManyMutationInput.schema";
import { PositionWhereInputObjectSchema } from "./objects/PositionWhereInput.schema";

export const PositionUpdateManySchema = z.object({
  data: PositionUpdateManyMutationInputObjectSchema,
  where: PositionWhereInputObjectSchema.optional(),
});
