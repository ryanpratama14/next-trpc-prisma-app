import { Prisma } from "@prisma/client";
import { z } from "zod";
import { TRPCError, type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/index";
import { TPagination } from "@/server/schema/schema";

export const PAGINATION_LIMIT = 5;

export const MESSAGES_LIST = {
  NOT_FOUND: "Data not found",
  ALREADY_EXISTS: "Data already exists",
  DELETED: "Data has been deleted",
  UNAUTHORIZED: "You are not authorized to access",
};

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export const prismaExclude = <T extends Entity, K extends Keys<T>>(type: T, omit: K[]) => {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
};

export const removeFieldsFromArray = <T extends Record<string, any>, K extends keyof T>(
  objects: Array<T>,
  fieldsToRemove: K[],
): Array<Omit<T, K>> => {
  return objects.map((obj) => {
    const updatedObj = structuredClone(obj);
    for (const field of fieldsToRemove) {
      delete updatedObj[field];
    }
    return updatedObj;
  });
};

export const removeFieldsFromObject = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  fieldsToRemove: K[],
): Omit<T, K> => {
  const updatedObj = structuredClone(object);
  for (const field of fieldsToRemove) {
    delete updatedObj[field];
  }
  return updatedObj;
};

export const mergeZodSchema = <T extends Entity>(
  entity: T,
): z.ZodObject<Record<Keys<T>, z.ZodString>, "strip"> => {
  const entityFields: Keys<T>[] = Object.keys(
    (Prisma as any)[`${entity}ScalarFieldEnum`],
  ) as Keys<T>[];

  const schema = entityFields.reduce((schema, field) => {
    return schema.merge(
      z.object({
        [field]: z.string().optional(),
      }),
    );
  }, z.object({}));

  return schema as z.ZodObject<Record<Keys<T>, z.ZodString>, "strip">;
};

export const getZodKeys = (schema: z.ZodType): string[] => {
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
    return getZodKeys(schema.unwrap());
  }
  if (schema instanceof z.ZodArray) {
    return getZodKeys(schema.element);
  }
  if (schema instanceof z.ZodObject) {
    const entries = Object.entries<z.ZodType>(schema.shape);
    return entries.flatMap(([key, value]) => {
      const nested = getZodKeys(value).map((subKey) => `${key}.${subKey}`);
      return nested.length ? nested : key;
    });
  }
  return [];
};

export const getZodEnum = <K extends string>(
  obj: Record<K, unknown>,
): z.ZodOptional<z.ZodEnum<[K, ...K[]]>> => {
  const [firstKey, ...otherKeys] = Object.keys(obj) as K[];
  return z.enum([firstKey!, ...otherKeys]).optional();
};

export const getEnum = <K extends string>(obj: Record<K, unknown>): [K, ...K[]] => {
  const [firstKey, ...otherKeys] = Object.keys(obj) as K[];
  return [firstKey!, ...otherKeys];
};

export const getEnumKeys = <K extends string>(obj: Record<K, unknown>): K => {
  const keys = Object.keys(obj) as K[];
  return keys[0];
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const getUrl = () => {
  return getBaseUrl() + "/api/trpc";
};

export const getPagination = ({ limit = PAGINATION_LIMIT, page }: TPagination) => {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
};

export const getPaginationData = (
  totalData: number,
  totalCurrentData: number,
  limit: number = PAGINATION_LIMIT,
) => {
  return {
    totalCurrentData,
    totalData,
    totalPages: Math.ceil(totalData / limit),
  };
};

export const throwNotFoundError = (data: unknown) => {
  if (!data) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: MESSAGES_LIST["NOT_FOUND"],
    });
  }
};

export const throwDataExistsError = (data: unknown) => {
  if (data) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: MESSAGES_LIST["ALREADY_EXISTS"],
    });
  }
};

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
