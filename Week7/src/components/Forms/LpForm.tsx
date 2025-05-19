// src/components/Forms/LpForm.tsx
import { FormEvent, useState } from "react";
import LpImage from "../../assets/images/lp.png";
import { useLpImageUpload } from "../../hook/queries/Lp/useLpImageUpload";

type LpFormProps = {
  onSubmit: (data: {
    title: string;
    content: string;
    tags: string[];
    imageFile: File | null;
  }) => void;
};

export default function LpForm({ onSubmit }: LpFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const {
    file: imageFile,
    previewUrl,
    inputRef,
    triggerFileSelect,
    onFileChange,
  } = useLpImageUpload();

  const handleAddTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t]);
    }
    setTagInput("");
  };

  const handleDeleteTag = (tag: string) => {
    setTags((prev) => prev.filter((item) => item !== tag));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tags, imageFile });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 앨범 썸네일 */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={onFileChange}
      />
      <div
        onClick={triggerFileSelect}
        className="w-full aspect-square max-w-xs mx-auto rounded-xl overflow-hidden cursor-pointer"
      >
        <img
          src={previewUrl || LpImage}
          alt="LP 썸네일"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* LP Name */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="LP Name"
        className="w-full px-4 py-2 bg-zinc-700 placeholder-zinc-400 rounded-lg focus:outline-none text-white"
      />

      {/* LP Content */}
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="LP Content"
        className="w-full px-4 py-2 bg-zinc-700 placeholder-zinc-400 rounded-lg focus:outline-none text-white"
      />

      {/* Tag 입력 + Add 버튼 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="LP Tag"
          className="flex-1 px-4 py-2 bg-zinc-700 placeholder-zinc-400 rounded-lg focus:outline-none text-white"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 bg-zinc-600 hover:bg-zinc-500 rounded-lg text-white"
        >
          Add
        </button>
      </div>

      {/* 현재 태그 목록 */}
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="px-3 py-1 bg-zinc-700 text-xs rounded-full text-white"
          >
            {`# ${t}`}
            <button
              type="button"
              onClick={() => handleDeleteTag(t)}
              className="ml-2 text-lg leading-none hover:text-red-400"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* 최종 제출 버튼 */}
      <button
        type="submit"
        className="w-full py-3 bg-zinc-600 hover:bg-zinc-500 rounded-lg text-white font-medium"
      >
        Add LP
      </button>
    </form>
  );
}
