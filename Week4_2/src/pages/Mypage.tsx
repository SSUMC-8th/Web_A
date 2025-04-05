import { useEffect, useState } from "react";
import { getMyInfo } from "../api/users";
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
    <div className="bg-black">
      <img src="http://localhost:8000/uploads/1743869104638-346327669.png" />
      <div className="text-red-500 text">{data?.data.name}</div>
    </div>
  );
};

export default Mypage;
