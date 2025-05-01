import axios from "axios";
import { useState, useEffect } from "react";

interface APIResponse<T>{
  data: T|null,
  isLoading: boolean,
  isError: boolean,
}

function useCustomFetch<T>(url:string):APIResponse<T>{

    const [data, setData] = useState<T|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(()=>{
    const fetchData = async() => {

        setIsLoading(true);

        try {
            const { data } = await axios.get<T>(
              url,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                },
              }
            );
            setData(data);
            setIsError(false);
          } catch {
            setIsError(true);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
    }
    ,    [url]);

    return {data, isError, isLoading}
    
    
}

export default useCustomFetch;