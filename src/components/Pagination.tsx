"use client";

import { sortBy } from "@/lib/constants";
import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";

export default function Pagination({
  totalPages,
  totalCurrentData,
  page,
  search,
  sort,
}: {
  totalCurrentData: number;
  totalPages: number;
  page: string;
  search: string;
  sort: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  if (!totalCurrentData) {
    newParams.delete("page");
    router.push(createUrl("/", newParams));
  }

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const val = e.target as HTMLFormElement;
          const search = val.search as HTMLInputElement;
          if (search.value) {
            newParams.set("q", search.value);
          } else {
            newParams.delete("q");
          }
          newParams.delete("page");
          router.push(createUrl("/", newParams));
        }}
      >
        <input
          key={search}
          name="search"
          autoComplete="off"
          defaultValue={search}
          className="px-6 py-2 rounded-md border-2 border-gray-300 focus:outline-none"
          placeholder="Search user by name"
        />
      </form>
      <section className="flex gap-2">
        <button
          onClick={() => {
            const prevPage = (Number(page) - 1).toString();
            if (Number(prevPage) === 1) {
              newParams.delete("page");
            } else newParams.set("page", prevPage);
            router.push(createUrl("/", newParams));
          }}
          disabled={Number(page) === 1}
          type="button"
        >
          Prev Page
        </button>
        <button
          onClick={() => {
            const nextPage = (Number(page) + 1).toString();
            newParams.set("page", nextPage);
            router.push(createUrl("/", newParams));
          }}
          disabled={Number(page) === totalPages}
          type="button"
        >
          Next Page
        </button>
      </section>
      <p>
        Page {page} / {totalPages}
      </p>
      <section className="flex flex-col">
        <select
          value={sort}
          onChange={(e) => {
            newParams.set("sort", e.target.value);
            router.push(createUrl("/", newParams));
          }}
        >
          {sortBy.map((opt) => {
            return (
              <option key={opt.slug} value={opt.slug}>
                {opt.title}
              </option>
            );
          })}
        </select>
      </section>
    </Fragment>
  );
}