import { useEffect, useState } from "react";
import { getmyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>([]);
  useEffect(() => {
    const getData = async () => {
      const response = await getmyInfo();
      // console.log(response);header
      setData(response);
    };
    getData();
  }, []);
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  // console.log(data);
  return (
    <>
      <div className="flex items-center flex-col">
        <div className="py-4 text-xl bold">{data.data?.name}님 환영합니다</div>
        <img
          className="rounded-2xl"
          src={data.data?.avatar ? data.data?.avatar : "/profileImg.png"}
          alt="프로필이미지"
        />
        <button
          onClick={handleLogout}
          className="w-20 bg-gray-500 mt-5 rounded-xl"
        >
          로그아웃
        </button>
      </div>
    </>
  );
};

export default MyPage;
