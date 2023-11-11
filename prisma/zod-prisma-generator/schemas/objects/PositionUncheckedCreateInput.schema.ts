import { z } from "zod";
import { UserUncheckedCreateNestedManyWithoutPositionInputObjectSchema } from "./UserUncheckedCreateNestedManyWithoutPositionInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PositionUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    registeredAt: z.coerce.date().optional(),
    User: z.lazy(() => UserUncheckedCreateNestedManyWithoutPositionInputObjectSchema).optional(),
  })
  .strict();

export const PositionUncheckedCreateInputObjectSchema = Schema;
