import { Outlet } from "react-router-dom";
import NavBar from "../pages/Navbar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center  max-w-[300px]  m-auto px-2">
        <Outlet />
      </div>
    </>
  );
}
