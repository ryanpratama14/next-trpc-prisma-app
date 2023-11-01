"use client";
import React from "react";
import { UserList } from "@/server/api/routes/user";

type TProps = {
  data?: UserList;
};

export default function Props({ data }: TProps) {
  return (
    <div>
      {data?.data?.map((item) => (
        <></>
      ))}
    </div>
  );
}
