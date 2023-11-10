import { Prisma } from "@prisma/client";
import { z } from "zod";

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
    const updatedObj = { ...obj };
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
  const updatedObj = { ...object };
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

export const generateKeysFromZod = <T extends z.ZodTypeAny, K extends keyof T["_type"]>(
  schema: T,
): Array<K & string> => {
  if (schema === null || schema === undefined) return [];
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional)
    return generateKeysFromZod(schema.unwrap());
  if (schema instanceof z.ZodArray) return generateKeysFromZod(schema.element);
  if (schema instanceof z.ZodObject) {
    const entries = Object.entries(schema.shape);
    return entries.flatMap(([key, value]) => {
      if (value instanceof z.ZodEnum) {
        // Handle ZodEnum separately
        return value.Enum as Array<K & string>;
      }
      const nested =
        value instanceof z.ZodType
          ? generateKeysFromZod(value).map(() => `${key}` as K & string)
          : [];
      return nested.length ? nested : [key as K & string];
    });
  }
  return [];
};
