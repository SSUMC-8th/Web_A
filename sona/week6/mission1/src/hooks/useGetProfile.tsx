import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";

export default function useGetProfile() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => axiosInstance.get(`/v1/users/me`),
  });
  const user = data?.data;
  return { user };
}
