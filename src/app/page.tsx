// import UserServer from "@/app/_components/UserServer";
import UserClient from "@/app/_components/UserClient";
import AddUser from "@/app/_components/AddUser";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <AddUser />
      {/* <UserServer /> */}
      <UserClient />
    </Fragment>
  );
}
