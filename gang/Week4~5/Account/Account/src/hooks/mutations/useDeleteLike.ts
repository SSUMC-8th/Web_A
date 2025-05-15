import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/likes";
import { queryClient } from "../../App";
import { QueryKeys } from "../../constants/key";
import { Likes, LpId, ResponseLpDetailDto } from "../../types/lptype";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    //onMutate: API 요청 이전에 호출된다
    //UI에 바로 변경을 보여주기 위해 캐시 업데이트
    //1. 이 게시글에 관련된 쿼리를 취소(캐시된 데이터를 새로 불러오는 요청이 취소된다)
    onMutate: async (lpId: LpId) => {
      await queryClient.cancelQueries({
        queryKey: [QueryKeys.lps, lpId],
      });

      //2.현재 게시글에 데이터를 캐시해서 가져와야함.
      const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([
        QueryKeys.lps,
        lpId,
      ]);
      //게시글 데이터를 복사해서 나중에 롤백할 때 사용
      const newLpPost = { ...previousLpPost };

      //게시글의 좋아요 목록에서 내가 누른 좋아요를 찾는다.
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QueryKeys.myInfo,
      ]);

      const userId = Number(me?.data.id);

      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId
        ) ?? -1;
      //likedIndex로 좋아요 누른 인덱스를 받아서 splice로 삭제해줌, 만일 좋아요를 누른 lp가 아니면 -1을 받아 새로운 인덱스 push
      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      //업데이트된 게시글 데이터를 캐시에 저장
      //결과적으로 UI가 바로 업데이트 된다.
      queryClient.setQueryData([QueryKeys.lps, lpId], newLpPost);
      console.log(likedIndex);
      return { previousLpPost, newLpPost };
    },

    onError: (error, newLp, context) => {
      console.log(error, newLp);
      queryClient.setQueryData([
        QueryKeys.lps,
        newLp],
        context?.previousLpPost?.data.id,
      );
    },
//onSettled는 요청이 끝난 후후 성공/실패 상관없이 실행
    onSettled:async(variables)=>{
      await queryClient.invalidateQueries({
        queryKey:[QueryKeys.lps,variables],
      })

    }
  });
}

export default useDeleteLike;
