import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { CommentItem } from '../../../types/lp';
import { useDeleteComments } from '../hooks/useDeleteComments';
import { usePatchComments } from '../hooks/usePatchComments';

interface CommentProps {
    lpId: number;
    comment: CommentItem;
}

function Comment({ lpId, comment }: CommentProps) {
    const { myInfo } = useAuth();
    const isMyComment = myInfo?.data.id === comment.author.id;

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const { mutate: deleteComment } = useDeleteComments();
    const { mutate: changeComment } = usePatchComments();

    const handleDeleteComment = () =>
        deleteComment({ lpId, commentId: comment.id });

    const handleSaveEdit = () => {
        if (editedContent.trim() === comment.content) {
            setIsEditing(false);
            return; // 변동 없으면 서버 호출 생략
        }
        changeComment({
            lpId,
            commentId: comment.id,
            content: editedContent.trim(),
        });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedContent(comment.content);
        setIsEditing(false);
    };

    const openEdit = () => {
        setEditedContent(comment.content);
        setIsEditing(true);
    };

    return (
        <div key={comment.id} className="flex items-start gap-3 py-2 border-b">
            <img
                src={comment.author.avatar ?? '/my.png'}
                alt={comment.author.name}
                className="object-cover w-10 h-10 rounded-full shrink-0"
            />

            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                        {comment.author.name}
                    </span>
                    <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                    </span>
                </div>

                {isEditing ? (
                    <div className="mt-1 space-y-1">
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full px-2 py-1 text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                            aria-label="댓글 편집"
                        />
                        <div className="flex gap-2 text-sm">
                            <button
                                onClick={handleSaveEdit}
                                className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-40"
                                disabled={!editedContent.trim()}
                            >
                                저장
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                            {comment.content}
                        </p>

                        {isMyComment && (
                            <div className="flex gap-2 mt-1 text-sm">
                                <button
                                    onClick={openEdit}
                                    className="text-blue-500 hover:underline"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={handleDeleteComment}
                                    className="text-red-500 hover:underline"
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Comment;
