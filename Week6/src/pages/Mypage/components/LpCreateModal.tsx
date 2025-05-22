import React, { useEffect, useRef, useState } from 'react';

import { IMAGE_PATH } from '#/constants/images';
import { useCreateLp } from '#/features/lps/hooks/useCreateLp';

interface LpCreateModalProps {
  setIsOpen: (open: boolean) => void;
}

function LpCreateModal({ setIsOpen }: LpCreateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 상태
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(IMAGE_PATH.LP);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // 모달 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [setIsOpen]);

  // 사진 미리보기
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const { mutate: createLp } = useCreateLp();

  const handleCreateLp = () => {
    createLp({
      file,
      lpData: {
        title,
        content,
        tags,
        published: true,
      },
    });
    setIsOpen(false);
  };

  // 태그
  const handlePushTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput('');
  };
  const removeTag = (idx: number) => setTags(tags.filter((_, i) => i !== idx));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative w-full max-w-sm p-6 bg-white shadow-lg rounded-2xl"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute text-xl text-gray-500 top-3 right-3 hover:text-gray-700"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src={previewUrl}
            alt="LP 미리보기"
            className="object-cover w-32 h-32 rounded-full cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            aria-label="사진"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <input
          type="text"
          placeholder="LP Name"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="LP Content"
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-24 px-4 py-2 mb-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex mb-1">
          <input
            type="text"
            placeholder="LP Tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handlePushTag();
              }
            }}
            className="flex-1 px-4 py-2 text-sm border rounded-l-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePushTag}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-r-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex w-full gap-2 overflow-x-auto">
          {tags.map((tag, idx) => (
            <div
              key={tag}
              className="flex items-center h-8 gap-1 px-2 border rounded-md"
            >
              <p className="text-sm whitespace-nowrap">{tag}</p>
              <button onClick={() => removeTag(idx)}>&times;</button>
            </div>
          ))}
        </div>

        <button
          onClick={handleCreateLp}
          className="w-full py-2 mt-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add LP
        </button>
      </div>
    </div>
  );
}

export default LpCreateModal;
