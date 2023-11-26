"use client";

import { api } from "@/app/_trpc/client";
import { Fragment, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { formatDate, createUrl, getNewDate } from "@/lib/utils";
import { UserKeys } from "@/server/schema/schema";
import { PAGINATION_LIMIT } from "@/server/helper";
import { userSorting } from "@/lib/constants";
import { UserCreateInput, UserListInput } from "@/server/api/routes/user";

export default function UserClient() {
  const router = useRouter();
  const utils = api.useUtils();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const getSorting = () => {
    const sort = newParams.getAll("sort") || [];
    return sort.length ? userSorting.filter((item) => sort.includes(item.slug)) : [];
  };

  const filter: UserListInput = {
    pagination: {
      page: Number(newParams.get("page")) || 1,
      limit: Number(newParams.get("limit")) || PAGINATION_LIMIT,
    },
    params: {
      name: newParams.get("q") || undefined,
      graduatedDate: newParams.get("graduatedDate") || undefined,
      positionId: newParams.get("positionId") || undefined,
    },
    sorting: getSorting(),
  };

  const { page } = filter.pagination;

  const { data, isLoading } = api.user.list.useQuery(filter);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [error, setError] = useState<string[] | undefined>([]);

  const { data: user, isLoading: isLoadingUser } = api.user.detail.useQuery({
    id: "656331dd246b331386624ab0",
  });

  const { data: positions } = api.position.list.useQuery();

  const [userById, setUserById] = useState<UserCreateInput>({
    name: "",
    email: "",
    positionId: null,
    graduatedDate: formatDate(getNewDate()),
  });

  const [userId, setUserId] = useState<string>("");

  const { mutate: updateUser } = api.user.update.useMutation({
    onSuccess: (res) => {
      alert(JSON.stringify(res));
      setIsEdit(false);
      utils.user.invalidate();
    },
    onError: (error) => {
      setError(error?.data?.zodError?.fieldErrors?.body);
    },
  });

  const { mutate: deleteUser } = api.user.delete.useMutation({
    onSuccess: ({ message }) => {
      alert(message);
      utils.user.invalidate();
    },
  });

  const handleChange =
    (name: typeof UserKeys) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      setUserById({ ...userById, [name]: e.target.value });
    };

  if (data?.isInvalidPage) {
    newParams.delete("page");
    redirect(createUrl("/", newParams));
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
          key={filter.params?.name}
          name="search"
          autoComplete="off"
          defaultValue={filter.params?.name}
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
                <section key={user.id} className="text-white bg-red-600 p-6 rounded-md flex flex-col gap-1">
                  <p>Name: {user?.name}</p>
                  <p>Position: {user?.position?.name}</p>
                  <p>Email: {user?.email}</p>
                  <p>Graduated: {formatDate(user?.graduatedDate)}</p>
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
                    disabled={!data.hasPrevPage}
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
                    disabled={!data.hasNextPage}
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
        {isLoadingUser ? (
          <p>Loading user...</p>
        ) : (
          <section className="text-white bg-red-600 p-6 rounded-md flex flex-col gap-1">
            {isEdit ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateUser({
                    id: userId,
                    body: userById,
                  });
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
                  onChange={handleChange("graduatedDate")}
                  value={userById.graduatedDate}
                  type="date"
                  className="text-black"
                />
                <select onChange={handleChange("positionId")} value={userById.positionId || undefined}>
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
                        graduatedDate: formatDate(user.graduatedDate),
                      });
                    }
                  }}
                >
                  Edit User
                </button>
                <p>Name: {user?.name}</p>
                <p>Position: {user?.position?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Graduated: {user?.graduatedDate && formatDate(user.graduatedDate)}</p>
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
