"use client";

import { trpc } from "@/app/_trpc/client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";

export default function TodoClient() {
  const router = useRouter();
  // const trpcUtils = trpc.useUtils();
  const searchParams = useSearchParams();
  const newParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const page = searchParams.get("page") ?? "1";

  const search = searchParams.get("q") ?? "";

  const { data, isLoading } = trpc.user.list.useQuery({
    params: {
      limit: 1,
      page: parseInt(page),
      search: search,
    },
  });

  console.log(data);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState<string[] | undefined>([]);

  const totalPages = data ? Math.ceil(data.totalData / data.limit) : 0;

  const { data: user, isLoading: isLoadingUser } = trpc.user.detail.useQuery({
    id: 6,
  });

  const [userById, setUserById] = useState<{
    id: number;
    name: string;
    email: string;
  }>({
    id: 0,
    name: "",
    email: "",
  });

  const { mutate } = trpc.user.update.useMutation({
    onSuccess: (res) => {
      alert(JSON.stringify(res));
      setIsEdit(false);
    },
    onError: (error) => {
      setError(error?.data?.zodError?.fieldErrors?.body);
    },
  });

  const { mutate: deleteUser } = trpc.user.delete.useMutation({
    onSuccess: ({ message }) => {
      alert(message);
      // trpcUtils.user.list.invalidate();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserById({ ...userById, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Number(page) < 1 || (data && !data.data.length)) {
      newParams.delete("page");
      router.push(createUrl("/", newParams));
    }
  }, [newParams, router, page, data]);

  return (
    <article className="flex items-center justify-center flex-col gap-4 min-h-screen">
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

      <section className="flex flex-col gap-4">
        <h1>Users</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section className="flex flex-col gap-2">
            {data?.data.map((user) => {
              return (
                <section
                  key={user.id}
                  className="text-white bg-red-600 p-6 rounded-md flex flex-col gap-1"
                >
                  <p>Name: {user?.name}</p>
                  <p>Email: {user?.email}</p>
                  <button onClick={() => deleteUser({ id: user.id })}>
                    Delete user
                  </button>
                </section>
              );
            })}
            <section className="flex gap-2">
              <button
                onClick={() => {
                  const prevPage = (Number(page) - 1).toString();

                  if (Number(prevPage) === 1) {
                    newParams.delete("page");
                  } else newParams.set("page", prevPage);

                  router.push(createUrl("/", newParams));
                }}
                disabled={Number(page) === 1 || data?.totalData === 0}
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
                disabled={Number(page) >= totalPages || data?.totalData === 0}
                type="button"
              >
                Next Page
              </button>
            </section>

            <p>
              Page {page} / {data?.totalPage}
            </p>
          </section>
        )}

        <h1>User ById</h1>
        {isLoadingUser ? (
          <p>Loading user...</p>
        ) : (
          <section className="text-white bg-red-600 p-6 rounded-md flex flex-col gap-1">
            {isEdit ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  mutate({
                    id: userById.id,
                    body: {
                      name: userById.name,
                      email: userById.email,
                    },
                  });
                }}
                className="flex flex-col gap-2"
              >
                <input
                  onChange={handleChange}
                  name="name"
                  value={userById?.name}
                  type="text"
                  className="text-black"
                />
                <input
                  onChange={handleChange}
                  name="email"
                  value={userById?.email}
                  type="email"
                  className="text-black"
                />

                <button
                  className="px-6 py-2 rounded-md bg-blue-600"
                  type="submit"
                >
                  Save
                </button>
              </form>
            ) : (
              <Fragment>
                <button
                  className="px-6 py-2 rounded-md bg-blue-600"
                  onClick={() => {
                    setIsEdit(true);
                    if (user) {
                      setUserById({
                        name: user.name,
                        email: user.email,
                        id: user.id,
                      });
                    }
                  }}
                >
                  Edit User
                </button>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
              </Fragment>
            )}
          </section>
        )}
      </section>
      {error ? (
        <ul className="flex flex-col font-bold text-red-600 list-disc">
          {error.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      ) : null}
    </article>
  );
}
