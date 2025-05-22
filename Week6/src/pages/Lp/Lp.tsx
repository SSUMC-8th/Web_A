import ErrorMessage from '#/components/ErrorMessage';
import LoadingSpinner from '#/components/LoadingSpinner';

import LpContent from './components/LpContent';
import LpHeader from './components/LpHeader';
import LpImage from './components/LpImage';
import LpLikeButton from './components/LpLikeButton';
import Comments from './components/comments';
import useLpDelete from './hooks/useLpDelete';
import useLpDetail from './hooks/useLpDetail';
import useLpEdit from './hooks/useLpEdit';
import useLpLike from './hooks/useLpLike';

function Lp() {
  const { lp, isMyLp, alreadyLiked, isLoading, isError } = useLpDetail();

  //lpItem | undefined 를 lpItem에 할당 불가
  //실행은 되는데 정리할 필요 있음
  const editState = useLpEdit(lp);
  const deleteState = useLpDelete(lp);
  const handleToggleLike = useLpLike(lp, alreadyLiked);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !lp) return <ErrorMessage />;
  return (
    <main className="flex flex-col items-center gap-8 px-4 pb-12">
      <article className="w-full max-w-3xl p-6 bg-white shadow-md rounded-xl">
        <LpHeader
          isMyLp={isMyLp}
          editState={editState}
          deleteState={deleteState}
        />
        <LpImage lp={lp} editState={editState} />

        {!editState.isEditing && (
          <LpLikeButton
            isLiked={alreadyLiked}
            likeCount={lp.likes.length}
            onToggle={handleToggleLike}
          />
        )}

        <LpContent lp={lp} editState={editState} />
      </article>

      <section className="w-full max-w-3xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">댓글</h2>
        <div className="bg-white shadow-md rounded-xl max-h-[32rem] overflow-y-auto">
          <Comments lpId={lp.id} />
        </div>
      </section>
    </main>
  );
}

export default Lp;
