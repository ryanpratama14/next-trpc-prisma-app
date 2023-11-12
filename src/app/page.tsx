import { trpcServer } from "./_trpc/serverClient";
import { formatDateLong } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { sortBy } from "@/lib/constants";
import { Fragment } from "react";

type TProps = {
  searchParams?: { [key: string]: string | undefined };
};

export default async function Home({ searchParams }: TProps) {
  const {
    page = searchParams?.page ?? "1",
    q: search,
    sort,
  } = searchParams as { [key: string]: string };

  const sorterer = sortBy.find((item) => item.slug === sort);

  const data = await trpcServer.user.list({
    pagination: {
      page: Number(page),
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
          sort={sort}
          totalCurrentData={data.totalCurrentData}
          search={search}
          page={page}
          totalPages={data.totalPages}
        />
      </article>
    </Fragment>
  );
}
