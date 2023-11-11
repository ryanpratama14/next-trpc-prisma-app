import { trpcServer } from "./_trpc/serverClient";
import { formatDateLong } from "@/lib/utils";
import Pagination from "./_components/Pagination";

type TProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function Home({ searchParams }: TProps) {
  const page = searchParams.page ?? "1";
  const search = searchParams.q ?? "";

  const data = await trpcServer.user.list({
    pagination: {
      page: parseInt(page),
    },
    sorting: [],
    params: {
      name: search,
    },
  });

  return (
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
        totalCurrentData={data.totalCurrentData}
        search={search}
        page={page}
        totalPages={data.totalPages}
      />
    </article>
  );
}
