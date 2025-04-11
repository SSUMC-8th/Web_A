import { useEffect, useState } from "react";
import axiosInstance from "../api/axios-instance";
import { Language } from "../constants/language";

interface ApiResponse<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

function useCustomFetch<T>(
  url: string,
  language: Language = Language.English
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);

      try {
        const { data } = await axiosInstance.get<T>(url, {
          params: { language },
        });
        setData(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url, language]);

  return { data, isPending, isError };
}

export default useCustomFetch;
