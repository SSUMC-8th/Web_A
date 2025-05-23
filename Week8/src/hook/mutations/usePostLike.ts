import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../api/Post/lp";
import { queryClient } from "../../main";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDetailDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

export function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    onMutate: async (lp) => {
      // 1. 이 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져와야한다.
      const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      // 3. 게시글 데이터를 복사해서 NewLpPost 라는 새로운 객체를 만들고
      // 복사하는 가장 큰 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서다라고 생각하면 된다.

      // const newLpPost = { ...previousLpPost };

      if (!previousLpPost) return {}; // rollback context

      // deep copy 해서 완전 분리
      const newLpPost: ResponseLpDetailDto = {
        ...previousLpPost,
        data: {
          ...previousLpPost.data,
          likes: [...previousLpPost.data.likes],
        },
      };

      // 4. 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야합니다.
      const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.my]);
      const userId = Number(me?.data.id);

      const likedIndex =
        newLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1;

      if (likedIndex >= 0) {
        newLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        newLpPost?.data.likes.push(newLike);
      }

      // 업데이트된 게시글 데이터를 캐시에 저장
      // 이렇게하면 UI가 바로 업데이트 됨, 사용자가 변화를 확인할 수 있다.
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    onError: (error, newLp, context) => {
      console.log(error, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        // 강의에선 context?.previousLpPost?.data.id,
        context?.previousLpPost // 전체 객체로 복원해야하지 않나? 왜 Id만 넘겨주는지 ?
      );
    },

    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
        exact: true,
      });
    },
  });
}

// queryClient.invalidateQueries -> 해당 쿼리를 "무효화(invalidate)"해서 자동으로 다시 불러오게 만드는 함수입니다.
/*
    onSuccess: (data) => {
      // data 안에는 우리가 서버로부터 받은 "응답"이 들어온다.
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true, // default 값 = false -> false 일 때는 QueryKey 앞 부분만 맞아도 새로고침
        // true로 처리시 -> 뒤에 오는 key까지 전부 일치해야지만 새로고침한다.
      });
    },
*/
// 무효화란?
// 특정 쿼리 키(queryKey)에 해당하는 데이터를 "오래됐으니 다시 불러와야 한다"고 표시합니다.
// 그러면 React Query는 해당 키의 쿼리를 자동으로 백그라운드에서 리패치(fetch) 합니다.

// onSuccess: (data, variables, context)
// data 안에는 우리가 서버로부터 받은 "응답"이 들어온다. API 성공 응답데이터
// variables 는 우리가 mutation을 선언할 때 전달해주는 값을 의미한다.
// context는 onMutate 에서 내가 반환한 값.

// onError: (error, variable, context)
// error -> 요청 실패시 발생 한 에러
// variable -> mutate에 전달한 값
// context는 onMutate 에서 내가 반환한 값

// onMutate => 요청 직전에 실행되는 함수
// Optimistic update 구현할 때 유용하다.
// Optimistic update -> 이건 무조건 성공해 ! 라고 생각하고 화면을 먼저 업데이트

// onSettled => 요청(OnSuccess, OnError)이 끝난 후 항상 실행
// 로딩 상태를 초기화할 때 조금 유용하다.
// onSettled: (data, error, variables, context)

// retry : 3
// retryDelay: 0
