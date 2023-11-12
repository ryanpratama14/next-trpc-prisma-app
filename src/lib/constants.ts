import { UserKeys } from "@/server/schema/schema";

export type SortFilterItem = {
  title: string;
  slug: string;
  sortKey: typeof UserKeys;
  value: "asc" | "desc";
};

export const sortBy: SortFilterItem[] = [
  { title: "User", slug: "user-desc", sortKey: "name", value: "desc" },
  { title: "Latest update", slug: "updatedAt-desc", sortKey: "followers", value: "desc" },
];
