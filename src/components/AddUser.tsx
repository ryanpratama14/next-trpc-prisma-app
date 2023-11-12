"use client";

import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { UserType } from "@/server/schema/schema";
import { formatDate } from "@/lib/utils";

const initialData: UserType = {
  name: "",
  email: "",
  positionId: undefined,
  registeredAt: formatDate(new Date()),
};

export default function AddUser() {
  const [data, setData] = useState(initialData);
  const { data: positions } = trpc.position.list.useQuery();
  const { data: user } = trpc.user.detailPrivate.useQuery({ id: 12 });

  console.log(user);

  const { mutate } = trpc.user.create.useMutation({
    onSuccess: () => {
      setData(initialData);
      alert("User created");
    },
    onError: (error) => {
      console.log(error.message);
      setData(initialData);
      alert("User already exists");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name !== "positionId" ? value : parseInt(value),
    });
  };

  return (
    <article className="flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(data);
        }}
        className="flex flex-col gap-4 p-6 rounded-md bg-gray-300 w-[40%]"
      >
        <h1>Add User</h1>
        <input
          required
          placeholder="Name"
          value={data.name}
          className="px-4 py-2 rounded-md"
          name="name"
          type="text"
          onChange={handleChange}
        />
        <input
          required
          placeholder="Email"
          value={data.email}
          className="px-4 py-2 rounded-md"
          name="email"
          type="email"
          onChange={handleChange}
        />
        <select onChange={handleChange} name="positionId" value={data.positionId || undefined}>
          {positions?.map((position) => {
            return (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            );
          })}
        </select>
        <button type="submit" className="w-full py-2 bg-green-500 text-white">
          Add
        </button>
      </form>
    </article>
  );
}
