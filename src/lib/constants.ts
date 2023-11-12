import { UserKeys } from "@/server/schema/schema";

export type SortFilterItem = {
  title: string;
  slug: string;
  sortKey: typeof UserKeys;
  value: "asc" | "desc";
};

export const defaultSort: SortFilterItem = {
  title: "Latest update",
  slug: "updatedAt-desc",
  sortKey: "updatedAt",
  value: "desc",
};

export const sortBy: SortFilterItem[] = [
  { title: "Name", slug: "name-desc", sortKey: "name", value: "desc" },
  defaultSort,
];
