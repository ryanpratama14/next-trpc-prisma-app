import { Prisma } from "@prisma/client";
import { z } from "zod";

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export const prismaExclude = <T extends Entity, K extends Keys<T>>(
  type: T,
  omit: K[]
) => {
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

export const removeFieldsFromArray = <
  T extends Record<string, any>,
  K extends keyof T
>(
  objects: Array<T>,
  fieldsToRemove: K[]
): Array<Omit<T, K>> => {
  return objects.map((obj) => {
    const updatedObj = { ...obj };
    for (const field of fieldsToRemove) {
      delete updatedObj[field];
    }
    return updatedObj;
  });
};

export const removeFieldsFromObject = <
  T extends Record<string, any>,
  K extends keyof T
>(
  object: T,
  fieldsToRemove: K[]
): Omit<T, K> => {
  const updatedObj = { ...object };
  for (const field of fieldsToRemove) {
    delete updatedObj[field];
  }
  return updatedObj;
};

export const mergeZodSchema = <T extends Entity>(
  entity: T
): z.ZodObject<Record<Keys<T>, z.ZodString>, "strip"> => {
  const entityFields: Keys<T>[] = Object.keys(
    (Prisma as any)[`${entity}ScalarFieldEnum`]
  ) as Keys<T>[];

  const schema = entityFields.reduce((schema, field) => {
    return schema.merge(
      z.object({
        [field]: z.string().optional(),
      })
    );
  }, z.object({}));

  return schema as z.ZodObject<Record<Keys<T>, z.ZodString>, "strip">;
};
