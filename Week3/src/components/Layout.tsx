import { PropsWithChildren, ReactNode } from "react";

import Navbar from "./Navbar";

function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
