import { trpcServer } from "./_trpc/serverClient";
import { formatDateLong } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { sortBy } from "@/lib/constants";
import { Fragment } from "react";
import { PAGINATION_LIMIT } from "@/server/helper";
import UserClient from "@/components/UserClient";
import CreateUser from "@/components/CreateUser";
import { SortBy } from "@/server/schema/schema";

type TProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: TProps) {
  const pagination = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || PAGINATION_LIMIT,
  };

  const params = {
    name: searchParams.q as string,
    graduatedDate: searchParams.graduatedDate as string,
  };

  const getSorting = () => {
    const sort = searchParams.sort || [];
    return sort.length ? sortBy.filter((item) => sort.includes(item.slug)) : [];
  };

  const data = await trpcServer.user.list({
    pagination,
    sorting: getSorting(),
    params,
  });

  return (
    <Fragment>
      <UserClient />
      <CreateUser />
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
              <p>Graduated: {formatDateLong(user.graduatedDate)}</p>
              <p>id: {user.id}</p>
            </section>
          );
        })}
        <Pagination
          page={pagination.page}
          search={params.name}
          totalPages={data.totalPages}
          hasNextPage={data.hasNextPage}
          hasPrevPage={data.hasPrevPage}
          isInvalidPage={data.isInvalidPage}
        />
      </article>
    </Fragment>
  );
}
