import { z } from "zod";
import { IntFilterObjectSchema } from "./IntFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { BoolFilterObjectSchema } from "./BoolFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { IntNullableFilterObjectSchema } from "./IntNullableFilter.schema";
import { PositionRelationFilterObjectSchema } from "./PositionRelationFilter.schema";
import { PositionWhereInputObjectSchema } from "./PositionWhereInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    followers: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
    registeredAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    positionId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    position: z
      .union([
        z.lazy(() => PositionRelationFilterObjectSchema),
        z.lazy(() => PositionWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const UserWhereInputObjectSchema = Schema;
