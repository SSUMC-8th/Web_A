import { useEffect, useState } from "react";
import useAxiosInstance from "./useAxiosInstance";

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  //data type (detail,movie type이 섞임
}

export default function useCustomFetch<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isError, setISError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axios = useAxiosInstance();
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<T>(url);
        setData(data);
      } catch (e) {
        console.log(e);
        setISError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError };
}
