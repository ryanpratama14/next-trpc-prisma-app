"use client";

import { trpc } from "@/app/_trpc/client";
import React, { Fragment, useEffect, useState } from "react";
import { serverClient } from "../_trpc/serverClient";

export default function TodoClient() {
  const [filter, setFilter] = useState({
    limit: 5,
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState<string[] | undefined>([]);

  const { data, isLoading } = trpc.getUsers.useQuery();
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

  return (
    <article className="flex items-center justify-center flex-col gap-4">
      {/* {mutateUser.error?.data?.zodError ? (
        <pre>
          Error: {JSON.stringify(mutateUser.error.data.zodError, null, 2)}
        </pre>
      ) : null} */}

      <section className="flex flex-col gap-4">
        <h1>Users</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.map((user) => {
            return (
              <section
                key={user.id}
                className="text-white bg-red-600 p-6 rounded-md flex flex-col gap-1"
              >
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
              </section>
            );
          })
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
