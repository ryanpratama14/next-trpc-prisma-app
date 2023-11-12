import { trpcServer } from "./_trpc/serverClient";
import { formatDateLong } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { defaultSort, sortBy } from "@/lib/constants";
import { Fragment } from "react";
import { PAGINATION_LIMIT } from "@/server/helper";

type TProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: TProps) {
  const {
    page = searchParams.page ?? "1",
    limit = searchParams.limit ?? PAGINATION_LIMIT.toString(),
    sort = searchParams.sort ?? defaultSort.slug,
    q: search,
  } = searchParams as { [key: string]: string };

  const sorterer = sortBy.find((item) => item.slug === sort) || defaultSort;

  const data = await trpcServer.user.list({
    pagination: {
      page: Number(page),
      limit: Number(limit),
    },
    sorting: sorterer ? [{ [sorterer.sortKey as string]: sorterer.value }] : [],
    params: {
      name: search,
    },
  });

  return (
    <Fragment>
      <article className="flex flex-col items-center justify-center w-[50%]">
        {data.data.map((user) => {
          return (
            <section
              key={user.id}
              className="text-white bg-red-600 p-6 rounded-md flex flex-col gap-1"
            >
              <p>Name: {user.name}</p>
              <p>Position: {user.position?.name}</p>
              <p>Email: {user.email}</p>
              <p>Date: {formatDateLong(user.updatedAt)}</p>
              <p>id: {user.id}</p>
            </section>
          );
        })}
        <Pagination
          sort={sort as string}
          page={page as string}
          search={search}
          totalPages={data.totalPages}
          hasNextPage={data.hasNextPage}
          hasPrevPage={data.hasPrevPage}
          isInvalidPage={data.isInvalidPage}
        />
      </article>
    </Fragment>
  );
}
