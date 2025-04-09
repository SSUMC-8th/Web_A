import axios from "axios";
import { useEffect, useState } from "react";

function useFetch<T>(url: string | undefined, page?: number) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!url) return;

      setIsPending(true);
      setIsError(false);

      try {
        const response = await axios.get(
          `${url}${page ? `?page=${page}` : ""}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setData(response.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url, page]);

  return { data, isPending, isError };
}

export default useFetch;
