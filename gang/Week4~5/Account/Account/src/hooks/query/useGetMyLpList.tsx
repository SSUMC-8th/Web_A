import { useQuery } from "@tanstack/react-query";
import { getMyLpList } from "../../apis/lp";
import {  QueryKeys } from "../../constants/key";
import { LpParams, OrderEnum } from "../../types/common";



export const useGetMyLpList = ({ cursor=0, order=OrderEnum.DESC, limit=100, search="" }: LpParams) => {
  return useQuery({
    queryKey: [QueryKeys.mylps, order, search, cursor, limit],
    queryFn: () =>
      getMyLpList({ cursor, order, limit, search }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
