import { useEffect, useState } from "react";
import { getMyInfo } from "../api/Get/users";
import { ResponseMyInfoDto } from "../types/auth";

const Mypage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>();

  useEffect(() => {
    const getData = async () => {
      const reponse = await getMyInfo();

      console.log(reponse);

      setData(reponse);
    };

    getData();
  }, []);

  return (
    <div className="bg-black h-full flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <img
          className="w-100 h-100 rounded-full object-cover mb-4"
          src="http://localhost:8000/uploads/1743869104638-346327669.png"
        />
      </div>
      <div className="text-blue-500 text-5xl">{data?.data.name}</div>
    </div>
  );
};

export default Mypage;
