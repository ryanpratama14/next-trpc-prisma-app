import { z } from "zod";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";
import { UserUpdateWithoutPositionInputObjectSchema } from "./UserUpdateWithoutPositionInput.schema";
import { UserUncheckedUpdateWithoutPositionInputObjectSchema } from "./UserUncheckedUpdateWithoutPositionInput.schema";
import { UserCreateWithoutPositionInputObjectSchema } from "./UserCreateWithoutPositionInput.schema";
import { UserUncheckedCreateWithoutPositionInputObjectSchema } from "./UserUncheckedCreateWithoutPositionInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutPositionInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => UserUpdateWithoutPositionInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutPositionInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutPositionInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutPositionInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithWhereUniqueWithoutPositionInputObjectSchema = Schema;
