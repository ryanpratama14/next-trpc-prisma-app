import { UserKeys } from "@/server/schema/schema";

export type SortFilterItem = {
  title: string;
  slug: string;
  sortKey: typeof UserKeys;
  value: "asc" | "desc";
};

export const sortBy: SortFilterItem[] = [
  { title: "Name", slug: "name-desc", sortKey: "name", value: "desc" },
  { title: "Email", slug: "email-desc", sortKey: "email", value: "desc" },
  { title: "Date Joined", slug: "datejoined-desc", sortKey: "registeredAt", value: "asc" },
];
