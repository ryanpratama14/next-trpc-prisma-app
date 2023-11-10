"use client";

import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useMemo } from "react";

export default function Pagination({
  totalData,
  totalPages,
  page,
}: {
  totalData: number;
  totalPages: number;
  page: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  return (
    <Fragment>
      <section className="flex gap-2">
        <button
          onClick={() => {
            const prevPage = (Number(page) - 1).toString();

            if (Number(prevPage) === 1) {
              newParams.delete("page");
            } else newParams.set("page", prevPage);

            router.push(createUrl("/", newParams));
          }}
          disabled={Number(page) === 1 || totalData === 0}
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
          disabled={Number(page) >= totalPages || totalData === 0}
          type="button"
        >
          Next Page
        </button>
      </section>
      <p>
        Page {page} / {totalPages}
      </p>
    </Fragment>
  );
}
