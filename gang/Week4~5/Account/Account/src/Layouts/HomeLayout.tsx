import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import { useEffect, useState } from "react";
import LpAddButton from "../components/NewLp/LpAddButton";

function HomeLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSideBarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 창 사이즈 줄면 사이드 바 사라짐
  return (
    <div className="h-dvh flex flex-col ">
      <header>
        <NavBar onMenuClick={() => setIsSideBarOpen(!isSideBarOpen)} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`fixed z-20 transition-all duration-300 ${
            isSideBarOpen ? "left-0" : "-left-60"
          } top-18 w-60 h-[calc(100vh-4rem)] bg-gray-900`}
        >
          <Sidebar
            isOpen={isSideBarOpen}
            onClose={() => setIsSideBarOpen(false)}
          />
        </aside>

        <main
          className={`transition-all duration-300 ${
            isSideBarOpen ? "ml-60" : "ml-0"
          } bg-black flex-1 overflow-y-auto`}
        >
          <Outlet />
        </main>
          <LpAddButton />
      </div>
      <footer className="bg-black text-white"></footer>
    </div>
  );
}

export default HomeLayout;
