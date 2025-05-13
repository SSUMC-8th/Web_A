import { Comment } from "../types/comment";
interface CommentProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentProps) {
  // console.log(comment);

  return (
    <>
      <div className="flex bg-gray-700 gap-2 items-center mb-2 px-3">
        <div>
          <img
            src={
              comment.author.avatar ? comment.author.avatar : "/profileimg.png"
            }
            alt="아바타"
            className="size-8 rounded-2xl"
          />
        </div>
        <div>
          <p>{comment.author.name}</p>
          <p>{comment.content}</p>
        </div>
      </div>
    </>
  );
}
