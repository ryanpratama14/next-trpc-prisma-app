"use client";

import { trpc } from "@/app/_trpc/client";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

export default function TodoClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = {
    limit: searchParams.get("limit") ?? "1",
    page: searchParams.get("page") ?? "1",
    search: searchParams.get("search") ?? "",
  };

  const debouncedSearch = useDebounce(filter.search, 500);

  const { data, isLoading } = trpc.getUsers.useQuery({
    params: {
      limit: parseInt(filter.limit),
      page: parseInt(filter.page),
      search: debouncedSearch,
    },
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState<string[] | undefined>([]);

  const totalPages = data ? Math.ceil(data.totalData / data.limit) : 0;

  const { data: user, isLoading: isLoadingUser } = trpc.getUserById.useQuery({
    userId: 5,
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

  const mutateUser = trpc.putUserById.useMutation({
    onSuccess: (res) => {
      alert(JSON.stringify(res));
      setIsEdit(false);
    },
    onError: (error) => {
      setError(error?.data?.zodError?.fieldErrors?.body);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserById({ ...userById, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/?search=${debouncedSearch}}`);
    }
  }, [debouncedSearch, router]);

  return (
    <article className="flex items-center justify-center flex-col gap-4 min-h-screen">
      <input
        className="px-6 py-2 rounded-md border-2 border-gray-300 focus:outline-none"
        placeholder="Search user by name"
      />
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
                </section>
              );
            })}
            <section className="flex gap-2">
              <button
                onClick={() =>
                  router.push(
                    `/?page=${Number(filter.page) - 1}&limit=${filter.limit}`
                  )
                }
                disabled={Number(filter.page) === 1 || data?.totalData === 0}
                type="button"
              >
                Prev Page
              </button>
              <button
                onClick={() =>
                  router.push(
                    `/?page=${Number(filter.page) + 1}&limit=${filter.limit}`
                  )
                }
                disabled={
                  Number(filter.page) === totalPages || data?.totalData === 0
                }
                type="button"
              >
                Next Page
              </button>
            </section>
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
                  mutateUser.mutate({
                    userId: userById.id,
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
