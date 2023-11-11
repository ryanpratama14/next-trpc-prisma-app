import { z } from "zod";
import { UserCreateNestedManyWithoutPositionInputObjectSchema } from "./UserCreateNestedManyWithoutPositionInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionCreateInput> = z
  .object({
    name: z.string(),
    registeredAt: z.coerce.date().optional(),
    User: z.lazy(() => UserCreateNestedManyWithoutPositionInputObjectSchema).optional(),
  })
  .strict();

export const PositionCreateInputObjectSchema = Schema;
