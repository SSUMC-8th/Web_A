import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { lpFormFields } from "./LpModal";

interface LpTagInputProps {
  setValue: UseFormSetValue<lpFormFields>;
}

const LpTagInput = ({setValue}: LpTagInputProps) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setTagInput("");
      setValue("tags", newTags);
    }
  };

  const handleRemoveTag = (idx: number) => {
    const newTags = tags.filter((_, i) => i !== idx);
    setTags(newTags);
    setValue("tags", newTags);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4 w-full">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Lp Tag"
          className="border border-gray-800 rounded-md p-2 w-full"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-gray-300 text-white rounded-md px-2 hover:bg-gray-400"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="flex items-center bg-gray-700 px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              className="ml-1 text-red-400"
              onClick={() => handleRemoveTag(idx)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LpTagInput;
