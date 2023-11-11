import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { PositionCountOrderByAggregateInputObjectSchema } from "./PositionCountOrderByAggregateInput.schema";
import { PositionAvgOrderByAggregateInputObjectSchema } from "./PositionAvgOrderByAggregateInput.schema";
import { PositionMaxOrderByAggregateInputObjectSchema } from "./PositionMaxOrderByAggregateInput.schema";
import { PositionMinOrderByAggregateInputObjectSchema } from "./PositionMinOrderByAggregateInput.schema";
import { PositionSumOrderByAggregateInputObjectSchema } from "./PositionSumOrderByAggregateInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    registeredAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => PositionCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => PositionAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => PositionMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => PositionMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => PositionSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const PositionOrderByWithAggregationInputObjectSchema = Schema;
