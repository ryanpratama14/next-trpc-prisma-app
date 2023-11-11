import { z } from "zod";
import { PositionWhereInputObjectSchema } from "./objects/PositionWhereInput.schema";
import { PositionOrderByWithAggregationInputObjectSchema } from "./objects/PositionOrderByWithAggregationInput.schema";
import { PositionScalarWhereWithAggregatesInputObjectSchema } from "./objects/PositionScalarWhereWithAggregatesInput.schema";
import { PositionScalarFieldEnumSchema } from "./enums/PositionScalarFieldEnum.schema";

export const PositionGroupBySchema = z.object({
  where: PositionWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      PositionOrderByWithAggregationInputObjectSchema,
      PositionOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: PositionScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(PositionScalarFieldEnumSchema),
});
