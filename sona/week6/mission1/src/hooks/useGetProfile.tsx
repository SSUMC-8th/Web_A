import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { useAuth } from "../context/AuthContext";

export default function useGetProfile() {
  const { accessToken } = useAuth();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => axiosInstance.get(`/v1/users/me`),
    enabled: !!accessToken,
  });
  const user = data?.data;
  return { user };
}
