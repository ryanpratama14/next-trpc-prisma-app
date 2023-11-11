import { z } from "zod";
import { PositionOrderByWithRelationInputObjectSchema } from "./objects/PositionOrderByWithRelationInput.schema";
import { PositionWhereInputObjectSchema } from "./objects/PositionWhereInput.schema";
import { PositionWhereUniqueInputObjectSchema } from "./objects/PositionWhereUniqueInput.schema";
import { PositionScalarFieldEnumSchema } from "./enums/PositionScalarFieldEnum.schema";

export const PositionFindManySchema = z.object({
  orderBy: z
    .union([
      PositionOrderByWithRelationInputObjectSchema,
      PositionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PositionWhereInputObjectSchema.optional(),
  cursor: PositionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(PositionScalarFieldEnumSchema).optional(),
});
