import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import { getLpList } from "../apis/lp";
import { PageDto } from "../types/common";

// export default function useGetLp({ cursor, search, order, limit }: pageDto) {
//   return useQuery({
//     queryKey: [QUERY_KEY.lps], //querykey상수화
//     queryFn: () => {
//       return axiosInstance.get(`/v1/lps`, {
//         params: { cursor, search: search, order, limit },
//       });
//     },
//     select: (res) => {
//       return res.data.item;
//     },
//   });
// }
// useGetLpList.ts

export default function useGetLpList({
  cursor,
  search,
  order,
  limit,
}: PageDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    select: (res) => {
      return res.data;
    },
    //이 시간 동안, 캐시된 데이터 그대로 사용
    // staleTime: 1000 * 60 * 5,
    // 캐시된 데이터가 사라지기까지의 대기 시간, 예를들어 5*60*1000이면 데이터가 사라지기 까지의 대기시간 단위 (5분)
    // gcTime: 100 * 60 * 10,
    // enabled:
  });
}
