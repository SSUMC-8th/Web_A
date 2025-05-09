import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { useAuth } from "../context/AuthContext";
import { ResponseMyInfoDto } from "../types/auth";
import { QUERY_KEY } from "../constants/key";

export default function useGetProfile() {
  const { accessToken } = useAuth();
  const { data: user } = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: () => axiosInstance.get<ResponseMyInfoDto>(`/v1/users/me`),
    select: (res) => res.data.data,
    enabled: !!accessToken,
  });
  return { user };
}
