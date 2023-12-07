import { formatDateLong } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { userSorting } from "@/lib/constants";
import { Fragment } from "react";
import { PAGINATION_LIMIT } from "@/server/helper";
import UserClient from "@/components/UserClient";
import CreateUser from "@/components/CreateUser";
import { UserListInput } from "@/server/api/routes/user";
import { api } from "@/app/_trpc/serverClient";
import { revalidatePath } from "next/cache";
import { useFormStatus } from "react-dom";

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

  const addPosition = async (formData: FormData) => {
    "use server";
    const name = formData.get("positionName") as string;
    await api.position.create({ name });
    revalidatePath("/");
  };

  const positions = await api.position.list();

  return (
    <Fragment>
      {/* <UserClient />
      <CreateUser /> */}
      <article className="flex flex-col justify-center items-center w-full">
        {/* POSITIONS LIST */}
        {positions.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}

        {/* ADD POSITION */}
        <h1 className="mt-12">Add Position</h1>
        <form className="flex flex-col gap-2" action={addPosition}>
          <input
            placeholder="Goalkeeper..."
            className="border-2 border-gray-500 px-4 py-2 rounded-md w-full"
            name="positionName"
            type="text"
            required
          />
          <button className="p-2 transition-all bg-green-600 hover:bg-green-700 text-white rounded-md" type="submit">
            Add
          </button>
        </form>
      </article>
      <article className="flex flex-col items-center justify-center w-full">
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
