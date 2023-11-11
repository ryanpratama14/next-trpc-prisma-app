import { z } from "zod";
import { UserCreateWithoutPositionInputObjectSchema } from "./UserCreateWithoutPositionInput.schema";
import { UserUncheckedCreateWithoutPositionInputObjectSchema } from "./UserUncheckedCreateWithoutPositionInput.schema";
import { UserCreateOrConnectWithoutPositionInputObjectSchema } from "./UserCreateOrConnectWithoutPositionInput.schema";
import { UserCreateManyPositionInputEnvelopeObjectSchema } from "./UserCreateManyPositionInputEnvelope.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserCreateNestedManyWithoutPositionInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutPositionInputObjectSchema),
        z.lazy(() => UserCreateWithoutPositionInputObjectSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutPositionInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutPositionInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutPositionInputObjectSchema),
        z.lazy(() => UserCreateOrConnectWithoutPositionInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UserCreateManyPositionInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserCreateNestedManyWithoutPositionInputObjectSchema = Schema;
