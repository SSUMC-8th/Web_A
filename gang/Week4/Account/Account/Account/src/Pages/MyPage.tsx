import { useEffect } from "react"
import { getMyInfo } from "../apis/auth"
import { LOCAL_STORAGE_KEY } from "../constants/key";

const MyPage = () => {
    useEffect(()=>{
        console.log(localStorage.getItem(LOCAL_STORAGE_KEY.accessToken));
        const getData = async()=>{
            const response = await getMyInfo()
            console.log(response);
        }
        getData();
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default MyPage
