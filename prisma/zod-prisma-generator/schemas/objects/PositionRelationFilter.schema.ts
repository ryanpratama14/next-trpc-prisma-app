import { z } from "zod";
import { PositionWhereInputObjectSchema } from "./PositionWhereInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionRelationFilter> = z
  .object({
    is: z
      .lazy(() => PositionWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => PositionWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const PositionRelationFilterObjectSchema = Schema;
