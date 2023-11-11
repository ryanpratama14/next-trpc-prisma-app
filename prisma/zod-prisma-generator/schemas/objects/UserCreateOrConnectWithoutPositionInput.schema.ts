import { z } from "zod";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";
import { UserCreateWithoutPositionInputObjectSchema } from "./UserCreateWithoutPositionInput.schema";
import { UserUncheckedCreateWithoutPositionInputObjectSchema } from "./UserUncheckedCreateWithoutPositionInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutPositionInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutPositionInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutPositionInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutPositionInputObjectSchema = Schema;
