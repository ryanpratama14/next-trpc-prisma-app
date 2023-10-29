// import UserServer from "@/app/_components/UserServer";
import UserClient from "@/app/_components/UserClient";
import AddUser from "@/app/_components/AddUser";

export default function Home() {
  return (
    <div>
      <AddUser />
      {/* <UserServer /> */}
      <UserClient />
    </div>
  );
}
