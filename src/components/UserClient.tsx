"use client";

import { trpc } from "@/app/_trpc/client";
import { Fragment, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate, createUrl } from "@/lib/utils";
import { UserKeys, UserType } from "@/server/schema/schema";

export default function UserClient() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const page = searchParams.get("page") ?? "1";
  const search = searchParams.get("q") ?? "";

  const { data, isPending } = trpc.user.list.useQuery({
    pagination: {
      page: parseInt(page),
    },
    params: {
      name: search,
    },
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState<string[] | undefined>([]);

  const { data: user, isPending: isPendingUser } = trpc.user.detail.useQuery({
    id: 16,
  });

  const { data: positions } = trpc.position.list.useQuery();

  const [userById, setUserById] = useState<UserType>({
    name: "",
    email: "",
    positionId: null,
    registeredAt: formatDate(new Date()),
  });

  const [userId, setUserId] = useState<number>(0);

  const { mutate: updateUser } = trpc.user.update.useMutation({
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
      utils.invalidate();
    },
  });

  const handleChange = (name: typeof UserKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserById({ ...userById, [name]: e.target.value });
  };

  if (Number(page) < 1 || (data && !data.data.length)) {
    newParams.delete("page");
    router.push(createUrl("/", newParams));
  }

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
        {isPending ? (
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
                  <p>Position: {user?.position?.name}</p>
                  <p>Email: {user?.email}</p>
                  <p>Date: {formatDate(user?.updatedAt)}</p>
                  <p>id: {user?.id}</p>
                  <button onClick={() => deleteUser({ id: user.id })}>Delete user</button>
                </section>
              );
            })}
            {data ? (
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
                    disabled={Number(page) === 1 || data.totalData === 0}
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
                    disabled={Number(page) >= data.totalPages || data.totalData === 0}
                    type="button"
                  >
                    Next Page
                  </button>
                </section>
                <p>
                  Page {page} / {data.totalPages}
                </p>
              </Fragment>
            ) : null}
          </section>
        )}

        <h1>User ById</h1>
        {isPendingUser ? (
          <p>Loading user...</p>
        ) : (
          <section className="text-white bg-red-600 p-6 rounded-md flex flex-col gap-1">
            {isEdit ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateUser(
                    {
                      id: userId,
                      body: userById,
                    },
                    {
                      onSuccess: () => {
                        utils.invalidate();
                      },
                    },
                  );
                }}
                className="flex flex-col gap-2"
              >
                <input
                  placeholder="Name"
                  onChange={handleChange("name")}
                  value={userById.name}
                  type="text"
                  className="text-black"
                />
                <input
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={userById.email}
                  type="email"
                  className="text-black"
                />
                <input
                  onChange={handleChange("registeredAt")}
                  value={userById.registeredAt}
                  type="date"
                  className="text-black"
                />
                <select
                  onChange={(e) => {
                    setUserById({ ...userById, positionId: parseInt(e.target.value) });
                  }}
                  value={userById.positionId || undefined}
                >
                  {positions?.map((position) => {
                    return (
                      <option key={position.id} value={position.id}>
                        {position.name}
                      </option>
                    );
                  })}
                </select>

                <button className="px-6 py-2 rounded-md bg-blue-600" type="submit">
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
                      setUserId(user.id);
                      setUserById({
                        name: user.name,
                        email: user.email,
                        positionId: user.positionId,
                        registeredAt: formatDate(user.registeredAt),
                      });
                    }
                  }}
                >
                  Edit User
                </button>
                <p>Name: {user?.name}</p>
                <p>Position: {user?.position?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Date: {user?.registeredAt && formatDate(user.registeredAt)}</p>
                <p>id: {user?.id}</p>
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
