import { z } from "zod";
import { PositionOrderByWithRelationInputObjectSchema } from "./objects/PositionOrderByWithRelationInput.schema";
import { PositionWhereInputObjectSchema } from "./objects/PositionWhereInput.schema";
import { PositionWhereUniqueInputObjectSchema } from "./objects/PositionWhereUniqueInput.schema";
import { PositionCountAggregateInputObjectSchema } from "./objects/PositionCountAggregateInput.schema";
import { PositionMinAggregateInputObjectSchema } from "./objects/PositionMinAggregateInput.schema";
import { PositionMaxAggregateInputObjectSchema } from "./objects/PositionMaxAggregateInput.schema";
import { PositionAvgAggregateInputObjectSchema } from "./objects/PositionAvgAggregateInput.schema";
import { PositionSumAggregateInputObjectSchema } from "./objects/PositionSumAggregateInput.schema";

export const PositionAggregateSchema = z.object({
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
  _count: z.union([z.literal(true), PositionCountAggregateInputObjectSchema]).optional(),
  _min: PositionMinAggregateInputObjectSchema.optional(),
  _max: PositionMaxAggregateInputObjectSchema.optional(),
  _avg: PositionAvgAggregateInputObjectSchema.optional(),
  _sum: PositionSumAggregateInputObjectSchema.optional(),
});
