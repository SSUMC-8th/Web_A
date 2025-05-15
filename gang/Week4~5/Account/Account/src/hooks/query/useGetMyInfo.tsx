import {  useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../constants/key'
import { getMyInfo } from '../../apis/user'

function useGetMyInfo() {
  return useQuery({
    queryKey: [QueryKeys.myInfo],
    queryFn: getMyInfo,
  })
}
export default useGetMyInfo;
