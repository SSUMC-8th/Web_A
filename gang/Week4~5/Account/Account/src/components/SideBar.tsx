import { Link } from "react-router-dom";

interface ISideBar {
  isOpen: boolean;
  onClose: () => void;
}
export default function Sidebar({ isOpen, onClose }: ISideBar) {
  return (
    <div
      className={`
        bg-black text-white w-full h-full px-4 py-4
        transition-all duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        flex flex-col justify-between
      `}
    >
      {/* 상단 메뉴 */}
      <div className="flex flex-col gap-4">
        <Link to="/search" onClick={onClose}>
          🔍 찾기
        </Link>
        <Link to="/mypage" onClick={onClose}>
          👤 마이페이지
        </Link>
      </div>

      {/* 하단 버튼 */}
      <div className="pt-4 border-t border-gray-600">
        <button className="text-white">탈퇴하기</button>
      </div>
    </div>
  );
}
