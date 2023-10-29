"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";

const initialData = {
  name: "",
  email: "",
};

export default function AddUser() {
  const [data, setData] = useState(initialData);

  const { mutate } = trpc.createUser.useMutation({
    onSuccess: () => {
      setData(initialData);
      alert("User created");
    },
    onError: (error) => {
      console.log(error);
      setData(initialData);
      alert("User already exists");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
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
          value={data.name}
          className="px-4 py-2 rounded-md"
          name="name"
          type="text"
          onChange={handleChange}
        />
        <input
          required
          value={data.email}
          className="px-4 py-2 rounded-md"
          name="email"
          type="email"
          onChange={handleChange}
        />
        <button type="submit" className="w-full py-2 bg-green-500 text-white">
          Add
        </button>
      </form>
    </article>
  );
}
