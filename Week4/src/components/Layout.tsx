import { ReactNode } from "react";

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout(): ReactNode {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
