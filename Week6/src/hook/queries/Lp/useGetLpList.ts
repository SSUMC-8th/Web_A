import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../../types/common";
import { getLpList } from "../../../api/Get/lp";

export function useGetLpList({ cursor, search, limit, order }: PaginationDto) {
  return useQuery({
    queryKey: ["lps", search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        limit,
        order,
      }),
    // 데이터가 신선하다고 간주하는 시간.
    // 이 시간 동안은 캐시된 데이터를 그대로 사용한다. 컴포넌트가 마운트 되거나 창에 포커스 들어오는 경우도 재요청X
    // 5분동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다.
    staleTime: 5 * 60 * 1000, // 5분
    // 사용되지 않은 (비활성 상태)인 쿼리 데이터가 캐시에 남아있는 시간
    // staleTime이 지나고 데이터가 신선하지 않더라도, 일정 시간동안 메모리에 보관.
    // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거한다. => ( Garbage Collection )
    // 예 ) 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청 시 새 데이터를 받아오게 합니다.
    gcTime: 100 * 60 * 10, // 10분

    // 조건에 따라 쿼리를 실행 여부 제어
    // enabled: Boolean(search),

    // 1분마다 refetch
    // refetchInterval: 100 * 60,

    // retry: 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정합니다.
    // 기본값은 3회 정도,
    // retry: 3, => 3회 재시도 // 근데 app.tsx에서 defaultOptions에 retry: 3으로 설정했으므로 생략 가능

    // iniitialData : 쿼리 실행 전 미리 제공할 초기 데이터를 설정합니다.
    // 컴포너트가랜더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있게 해주는 애다.

    // 파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임(Flicking)을 줄여줍니다.
    // ex) 페이지네이션 시 페이지 전환 사이에 이전 데이터를 보여주어 사용자 경험을 향상시킨다.
    // placeholderData: keepPreviousData, // 이전 데이터를 유지합니다. 페이지네이션을 사용할 때 유용합니다.

    select: (data) => data.data.data, // 쿼리 응답에서 필요한 데이터만 선택합니다.
  });
}
