import { CommentDetail } from "../types/commenttype";


interface ILpComment{
    comment:CommentDetail;
}


export default function LpComment({comment}:ILpComment) {
    const avatar = comment.author?.avatar ?? "/default-avatar.png";
    const bio = comment.author?.bio ?? "";
    const name = comment.author?.name ?? "익명";
    const content = comment.content ?? "내용";
  return (
    <div>
        <img
        src={`${avatar}`}
        alt={`${bio}`}
        />
    <h2>{name}</h2>
    <p> {content}</p>  
    </div>
  )
}

