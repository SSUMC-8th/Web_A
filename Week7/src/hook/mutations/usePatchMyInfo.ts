import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";
import { patchMyInfo } from "../../api/Patch/user";

export function usePatchMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,
    // onMutate -> API 요청 이전에 호출되는 친구.
    // UI에 바로 변경을 보여주기 위해 Cache djqepdlxm
    onMutate: async (newData) => {
      // 1. 이 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.my],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져와야한다.
      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.my,
      ]);

      // const newLpPost = { ...previousLpPost }; => 강의에서는 한 줄로 해결

      if (!previousMyInfo) return {}; // undefined 방지

      // deep copy 해서 완전 분리
      const newLpPost: ResponseMyInfoDto = {
        ...previousMyInfo,
        data: {
          ...previousMyInfo.data,
          ...newData, // name, bio, avatar 업데이트
        },
      };

      queryClient.setQueryData([QUERY_KEY.my], newLpPost);

      return { previousMyInfo, newLpPost };
    },

    onError: (error, newMy, context) => {
      console.log(error, newMy);
      queryClient.setQueryData(
        [QUERY_KEY.my],

        context?.previousMyInfo
      );
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.my],
      });
    },
  });
}
