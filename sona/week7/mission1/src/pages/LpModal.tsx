import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "../components/InputField";
import { TagItem } from "./TagItem";
import axiosInstance from "../apis/axios";
import { LpBodyPost } from "../types/lpPost";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { QUERY_KEY } from "../constants/key";

interface LpModalProps {
  onClose: () => void;
  onSubmitSuccess?: () => void;
  lpId?: number;
  initialData?: {
    lpName: string;
    lpContent: string;
    thumbnail?: string;
    tags: string[];
  };
}

interface UploadResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    imageUrl: string;
  };
}
export default function LpModal({
  onClose,
  onSubmitSuccess,
  lpId,
  initialData,
}: LpModalProps) {
  const isEdit = !!lpId; //수정 mode
  const [tagInputValue, setTagInputValue] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [preview, setPreview] = useState<string | null>(
    initialData?.thumbnail ?? null
  );
  const fileInput = useRef<File | null>(null);

  const AddTag = () => {
    const tagNode = tagInputValue.trim();

    if (tagNode && !tags.includes(tagNode)) {
      setTags([...tags, tagNode]);
    }
    setTagInputValue("");
  };
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      lpName: initialData?.lpName ?? "",
      lpContent: initialData?.lpContent ?? "",
    },
  });

  const mutationFn = async () => {
    const formValues = getValues(); //formData
    const postBody: LpBodyPost = {
      title: formValues.lpName,
      content: formValues.lpContent,
      thumbnail: "",
      tags,
      published: true,
    };

    if (fileInput.current) {
      const imageFormData = new FormData();
      imageFormData.append("file", fileInput.current);
      const fileRes = await axiosInstance.post<UploadResponse>(
        `/v1/uploads`,
        imageFormData
      );
      const uploadedImagePath = fileRes?.data?.data?.imageUrl;
      if (!uploadedImagePath) throw new Error("이미지 업로드 실패");
      postBody.thumbnail = uploadedImagePath;
    } else if (preview) {
      postBody.thumbnail = preview;
    }

    return isEdit
      ? axiosInstance.patch(`/v1/lps/${lpId}`, postBody)
      : axiosInstance.post(`/v1/lps`, postBody);
  };

  //Lp
  const addOrUpdateLp = useMutation({
    mutationFn,
    onSuccess: () => {
      alert(isEdit ? "수정 완료" : "추가 완료");
      onSubmitSuccess?.();
      onClose();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
    onError: (err) => console.error(err),
  });

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); //미리보기
      fileInput.current = file; //업로드파일 저장
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-gray-600 w-full max-w-md rounded-2xl p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-4 text-white font-bold"
            onClick={onClose}
          >
            X
          </button>

          <form onSubmit={handleSubmit(() => addOrUpdateLp.mutate())}>
            <label
              htmlFor="image-upload"
              className="block cursor-pointer relative"
            >
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                {...register("file")}
                onChange={imageChange} //이미지 바뀌면 미리보기
                className="hidden"
              />
              <img
                src={preview ?? "/lpImg.png"}
                alt="LP 이미지"
                className="size-50 mx-auto my-10 rounded-full"
              />
            </label>
            <div className="relative">
              <InputField
                placeholder="LP Name"
                className="mb-8"
                register={register("lpName", {
                  required: "LP 이름은 필수입니다.",
                })}
                errorMsg={errors.lpName?.message}
              />
            </div>
            <div className="relative">
              <InputField
                placeholder="LP Content"
                className="mb-8"
                register={register("lpContent", {
                  required: "LP 내용은 필수입니다.",
                  minLength: {
                    value: 2,
                    message: "2글자 이상 입력해주세요.",
                  },
                })}
                errorMsg={errors.lpContent?.message}
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <InputField
                placeholder="LP Tag"
                className="w-full mb-0"
                value={tagInputValue}
                onChange={(e) => setTagInputValue(e.target.value)}
              />
              <button
                type="button"
                onClick={AddTag}
                className="bg-gray-400 px-3 py-1.5 rounded-sm"
              >
                Add
              </button>
            </div>

            <div className="flex gap-2 flex-wrap mb-4">
              {tags.map((tag, i) => (
                <TagItem
                  key={i}
                  tag={tag}
                  onRemove={() => setTags(tags.filter((t) => t !== tag))}
                />
              ))}
            </div>

            <button type="submit" className="w-full bg-gray-400 py-2 rounded">
              {isEdit ? "Edit LP" : "Add LP"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
