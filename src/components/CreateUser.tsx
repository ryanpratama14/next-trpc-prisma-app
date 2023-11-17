"use client";

import { useState } from "react";
import { api } from "@/app/_trpc/client";
import { UserKeys } from "@/server/schema/schema";
import { formatDate, getNewDate } from "@/lib/utils";
import { UserCreateInput } from "@/server/api/routes/user";

const initialData: UserCreateInput = {
  name: "",
  email: "",
  positionId: undefined,
  graduatedDate: formatDate(getNewDate()),
};

export default function CreateUser() {
  const [data, setData] = useState(initialData);
  const { data: positions } = api.position.list.useQuery();
  const utils = api.useUtils();

  const { mutate: createUser } = api.user.create.useMutation({
    onSuccess: () => {
      setData(initialData);
      alert("User created");
      utils.user.invalidate();
    },
    onError: (error) => {
      console.log(error.message);
      setData(initialData);
      alert("User already exists");
    },
  });

  const handleChange =
    (name: typeof UserKeys) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setData({ ...data, [name]: name !== "positionId" ? value : parseInt(value) });
    };

  return (
    <article className="flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser(data);
        }}
        className="flex flex-col gap-4 p-6 rounded-md bg-gray-300 w-[40%]"
      >
        <h1>Add User</h1>
        <input
          required
          placeholder="Name"
          value={data.name}
          className="px-4 py-2 rounded-md"
          type="text"
          onChange={handleChange("name")}
        />
        <input
          required
          placeholder="Email"
          value={data.email}
          className="px-4 py-2 rounded-md"
          type="email"
          onChange={handleChange("email")}
        />
        <input
          required
          value={data.graduatedDate}
          className="px-4 py-2 rounded-md"
          type="date"
          onChange={handleChange("graduatedDate")}
        />
        <select required onChange={handleChange("positionId")} name="positionId" value={data.positionId || undefined}>
          <option>Select Position</option>
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
