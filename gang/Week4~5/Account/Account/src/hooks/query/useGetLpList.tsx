import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import {  QueryKeys } from "../../constants/key";
import { LpParams, OrderEnum } from "../../types/common";



export const useGetLpList = ({ cursor=0, order=OrderEnum.DESC, limit=100, search="" }: LpParams) => {
  return useQuery({
    queryKey: [QueryKeys.lps, order, search, cursor, limit],
    queryFn: () =>
      getLpList({ cursor, order, limit, search }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
