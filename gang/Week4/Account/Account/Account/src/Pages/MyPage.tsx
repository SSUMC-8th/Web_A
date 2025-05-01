import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<ResponseMyInfoDto>();
  useEffect(() => {
    console.log(localStorage.getItem(LOCAL_STORAGE_KEY.accessToken));
    const getData = async () => {
      const response = await getMyInfo();
      setUserInfo(response);
      console.log(response);
    };
    const token = localStorage.getItem("accessToken");
    if (token) getData();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          My Page
        </h2>
        {userInfo ? (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">이름</p>
              <p className="text-lg font-medium">{userInfo.data.name}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">이메일</p>
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
