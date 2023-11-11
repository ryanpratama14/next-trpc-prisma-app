import { z } from "zod";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";
import { UserUpdateWithoutPositionInputObjectSchema } from "./UserUpdateWithoutPositionInput.schema";
import { UserUncheckedUpdateWithoutPositionInputObjectSchema } from "./UserUncheckedUpdateWithoutPositionInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutPositionInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UserUpdateWithoutPositionInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutPositionInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpdateWithWhereUniqueWithoutPositionInputObjectSchema = Schema;
