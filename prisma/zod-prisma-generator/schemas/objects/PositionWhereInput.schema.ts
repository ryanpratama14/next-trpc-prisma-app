import { z } from "zod";
import { IntFilterObjectSchema } from "./IntFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { UserListRelationFilterObjectSchema } from "./UserListRelationFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PositionWhereInputObjectSchema),
        z.lazy(() => PositionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PositionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PositionWhereInputObjectSchema),
        z.lazy(() => PositionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    registeredAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    User: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const PositionWhereInputObjectSchema = Schema;
