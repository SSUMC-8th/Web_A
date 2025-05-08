import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<ResponseMyInfoDto>();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setUserInfo(response);
      console.log(response);
    };
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) getData();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-black shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          My Page
        </h2>
        {userInfo ? (
          <div className="space-y-4 text-white">
            <div>
              <p className="text-sm">이름</p>
              <p className="text-lg font-medium">{userInfo.data.name}</p>
            </div>
            <div>
              <p className="text-sm">이메일</p>
              <p className="text-lg font-medium">{userInfo.data.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">로딩 중...</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
