import { useState, useRef, useEffect } from 'react';
import { postImagePrivate } from '../../../apis/image';
import { patchLpDto } from '../../../types/lp';

interface Props {
    lp: any; // 실제 타입으로 교체
    onClose: () => void;
    onSave: (payload: patchLpDto) => void;
}

function LpEditModal({ lp, onClose, onSave }: Props) {
    const [title, setTitle] = useState(lp.title);
    const [content, setContent] = useState(lp.content);
    const [tags, setTags] = useState<string[]>(lp.tags ?? []);
    const [preview, setPreview] = useState(lp.thumbnail);
    const [file, setFile] = useState<File | null>(null);

    /* ESC 닫기 */
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    /* 저장 */
    const handleSubmit = async () => {
        let thumbnailUrl = lp.thumbnail;
        if (file) {
            const res = await postImagePrivate(file);
            thumbnailUrl = res.data.imageUrl;
        }
        onSave({
            lpId: lp.id,
            title,
            content,
            thumbnail: thumbnailUrl,
            tags,
            published: lp.published,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div ref={ref} className="w-full max-w-lg p-6 bg-white rounded-xl">
                <h3 className="mb-4 text-xl font-semibold">LP 수정</h3>

                {/* 썸네일 업로드 */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">
                        썸네일
                    </label>
                    <input
                        aria-label="파일"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            setFile(f);
                            setPreview(URL.createObjectURL(f));
                        }}
                    />
                    <img
                        src={preview}
                        alt="preview"
                        className="object-cover h-40 mt-2 rounded-lg"
                    />
                </div>

                {/* 제목 */}
                <input
                    aria-label="제목"
                    className="w-full px-3 py-2 mb-4 border rounded-md"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* 내용 */}
                <textarea
                    aria-label="내용"
                    className="w-full h-40 px-3 py-2 mb-4 border rounded-md resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* 태그 (쉼표 구분) */}
                <input
                    className="w-full px-3 py-2 mb-6 border rounded-md"
                    placeholder="tag1, tag2, ..."
                    value={tags.join(', ')}
                    onChange={(e) =>
                        setTags(
                            e.target.value
                                .split(',')
                                .map((t) => t.trim())
                                .filter(Boolean),
                        )
                    }
                />

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-100"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                        onClick={handleSubmit}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LpEditModal;
