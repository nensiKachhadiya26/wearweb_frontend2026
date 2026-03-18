import { Outlet } from "react-router-dom";
import { UserNavbar } from "./UserNavbar";

export const UserHome = () => {
  return (
    <>
      <UserNavbar />
      <div className="p-4 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};