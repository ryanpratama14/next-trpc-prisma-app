import { formatDateLong } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { userSorting } from "@/lib/constants";
import { Fragment } from "react";
import { PAGINATION_LIMIT } from "@/server/helper";
import UserClient from "@/components/UserClient";
import CreateUser from "@/components/CreateUser";
import { UserListInput } from "@/server/api/routes/user";
import { api } from "@/app/_trpc/serverClient";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
  const getSorting = () => {
    const sort = searchParams.sort || [];
    return sort.length ? userSorting.filter((item) => sort.includes(item.slug)) : [];
  };

  const filter: UserListInput = {
    pagination: {
      page: Number(searchParams.page) || 1,
      limit: Number(searchParams.limit) || PAGINATION_LIMIT,
    },
    params: {
      name: searchParams.q as string,
      graduatedDate: searchParams.graduatedDate as string,
    },
    sorting: getSorting(),
  };

  const data = await api.user.list(filter);

  return (
    <Fragment>
      <UserClient />
      <CreateUser />
      <article className="flex flex-col items-center justify-center w-[50%]">
        {data.data.map((user) => {
          return (
            <section key={user.id} className="text-white bg-red-600 p-6 rounded-md flex flex-col gap-1">
              <p>Name: {user.name}</p>
              <p>Position: {user.position?.name}</p>
              <p>Email: {user.email}</p>
              <p>Graduated: {formatDateLong(user.graduatedDate)}</p>
              <p>id: {user.id}</p>
            </section>
          );
        })}
        <Pagination
          page={filter.pagination.page}
          search={filter.params?.name}
          totalPages={data.totalPages}
          hasNextPage={data.hasNextPage}
          hasPrevPage={data.hasPrevPage}
          isInvalidPage={data.isInvalidPage}
        />
      </article>
    </Fragment>
  );
}
