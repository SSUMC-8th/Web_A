import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetProfile from "../hooks/useGetProfile";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const { logout, accessToken } = useAuth();

  const { user } = useGetProfile();
  console.log(user);
  return (
    <>
      <nav className="flex gap-2 justify-between py-3 px-4 border-b border-gray-500">
        <div className="text-amber-500 font-bold text-2xl flex gap-5 ">
          <img
            className="cursor-pointer"
            src="/hambugi.svg"
            alt=""
            onClick={() => setIsOpen(true)}
          />
          <Link to={"/"}>돌려돌려 돌림판</Link>
        </div>
        <div className="flex text-[18px] font-bold gap-2 items-center">
          {accessToken ? (
            <>
              <div>{user.data.name}님 반갑습니다</div>
              <button
                className="hover:text-amber-500 pt-[2px] "
                onClick={logout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <div className="hover:text-amber-500 pt-[2px] ">로그인</div>
              </Link>
              <Link to={"/signup"}>
                <div className="hover:text-amber-500 pt-[2px] ">회원가입</div>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* 사이드바 */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <div
        className={`fixed top-0 left-0 w-2/3 sm:w-1/5 h-screen bg-[#1a1919] z-30 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b ">
          <span className="text-lg font-semibold">메뉴</span>
          <button className="font-bold" onClick={() => setIsOpen(false)}>
            X
          </button>
        </div>
        <ul className="p-4 space-y-3 text-white">
          <li>
            <Link
              className="flex gap-1 items-center"
              to="#"
              // onClick={() => setIsOpen(false)}
            >
              <img src="/search.svg" alt="" className="size-4" />
              검색
            </Link>
          </li>
          <li>
            <Link to={"/my"}>마이페이지</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
