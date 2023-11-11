import { z } from "zod";
import { UserCreateWithoutPositionInputObjectSchema } from "./UserCreateWithoutPositionInput.schema";
import { UserUncheckedCreateWithoutPositionInputObjectSchema } from "./UserUncheckedCreateWithoutPositionInput.schema";
import { UserCreateOrConnectWithoutPositionInputObjectSchema } from "./UserCreateOrConnectWithoutPositionInput.schema";
import { UserUpsertWithWhereUniqueWithoutPositionInputObjectSchema } from "./UserUpsertWithWhereUniqueWithoutPositionInput.schema";
import { UserCreateManyPositionInputEnvelopeObjectSchema } from "./UserCreateManyPositionInputEnvelope.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";
import { UserUpdateWithWhereUniqueWithoutPositionInputObjectSchema } from "./UserUpdateWithWhereUniqueWithoutPositionInput.schema";
import { UserUpdateManyWithWhereWithoutPositionInputObjectSchema } from "./UserUpdateManyWithWhereWithoutPositionInput.schema";
import { UserScalarWhereInputObjectSchema } from "./UserScalarWhereInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUpdateManyWithoutPositionNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => UserUpsertWithWhereUniqueWithoutPositionInputObjectSchema),
        z.lazy(() => UserUpsertWithWhereUniqueWithoutPositionInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UserCreateManyPositionInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithWhereUniqueWithoutPositionInputObjectSchema),
        z.lazy(() => UserUpdateWithWhereUniqueWithoutPositionInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserUpdateManyWithWhereWithoutPositionInputObjectSchema),
        z.lazy(() => UserUpdateManyWithWhereWithoutPositionInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => UserScalarWhereInputObjectSchema),
        z.lazy(() => UserScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateManyWithoutPositionNestedInputObjectSchema = Schema;
