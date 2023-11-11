import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { UserOrderByRelationAggregateInputObjectSchema } from "./UserOrderByRelationAggregateInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    registeredAt: z.lazy(() => SortOrderSchema).optional(),
    User: z.lazy(() => UserOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const PositionOrderByWithRelationInputObjectSchema = Schema;
