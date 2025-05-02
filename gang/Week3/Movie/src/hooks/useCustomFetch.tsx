import { useState, useEffect } from "react"
import axios from  "axios";
interface APIResponse<T>{
    data: T|null;
    isLoading:boolean;
    isError:boolean;
}
function useCustomFetch<T>(url:string): APIResponse<T> {
    const [data ,setData] =  useState<T|null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError]= useState(false);
    
    useEffect(() =>{
        const fetchData=async()=>{
            setIsLoading(true);
            try{
                const {data}= await axios.get<T>(url, {
                    headers:{
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                });
                setData(data);
            }catch{
                setIsError(false);
            }finally{
                setIsLoading(false);
            }
        };
        fetchData();
},[url]);

  return {data, isLoading, isError}; 
}

export default useCustomFetch
