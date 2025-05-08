import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { useParams } from "react-router-dom";

export default function CardDetail() {
  const { id } = useParams();
  //   console.log(id);
  const { data } = useQuery({
    queryKey: ["LpDetail"],
    queryFn: () => axiosInstance.get(`v1/lps/${id}`),
    select: (res) => res.data.data,
  });

  console.log(data);
  return (
    <>
      <div>
        <div>이름</div>
        <p>날짜</p>
      </div>
    </>
  );
}
