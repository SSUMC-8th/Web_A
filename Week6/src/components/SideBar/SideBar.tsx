import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import RoutePaths from "../../router/routePaths";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫힘 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarEl = sidebarRef.current;
      const target = event.target as Node;
      if (
        sidebarEl &&
        !sidebarEl.contains(target) &&
        !document.getElementById("sidebar-toggle-btn")?.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* ✅ 오버레이 - 작은 화면일 때만 */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* ✅ 사이드바 본체 */}
      <div
        ref={sidebarRef}
        className={`
          bg-black text-white w-60 fixed  top-16 bottom-0 left-0 z-40
          transform transform-gpu  backface-hidden duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:block
        `}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        <div className="flex flex-col justify-between h-full p-4 overflow-y-auto">
          <div className="flex flex-col gap-4 pt-5 flex-1 overflow-auto">
            <NavLink to={RoutePaths.SEARCH}>🔍 찾기</NavLink>
            <NavLink to={RoutePaths.MYPAGE}>👤 마이페이지</NavLink>
          </div>
          <div className="pt-4 border-t border-gray-800">
            <button className="text-sm text-gray-400 w-full text-left">
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
