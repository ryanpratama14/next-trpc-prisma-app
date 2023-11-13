"use client";

import { sortBy } from "@/lib/constants";
import { cn, createSearchParams, createUrl } from "@/lib/utils";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";

export default function Pagination({
  totalPages,
  page,
  search,
  hasPrevPage,
  hasNextPage,
  isInvalidPage,
}: {
  totalPages: number;
  page: string;
  search: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  isInvalidPage: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  if (isInvalidPage) {
    newParams.delete("page");
    redirect(createUrl("/", newParams));
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
          disabled={!hasPrevPage}
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
          disabled={!hasNextPage}
          type="button"
        >
          Next Page
        </button>
      </section>
      <p>
        Page {page} / {totalPages}
      </p>
      <section className="flex flex-col">
        {sortBy.map((item) => {
          const sort = searchParams.getAll("sort");
          const active = sort.includes(item.slug);

          return (
            <button
              onClick={() => {
                let newSort;
                if (active) {
                  newSort = sort.filter((slug) => slug !== item.slug);
                } else {
                  newSort = [...sort, item.slug];
                }
                newParams.delete("sort");
                router.push(createUrl("/", createSearchParams({ sort: newSort }, newParams)));
              }}
              className={cn("transition-all", {
                "text-red-500": active,
              })}
              key={item.slug}
            >
              {item.title}
            </button>
          );
        })}
      </section>
    </Fragment>
  );
}
