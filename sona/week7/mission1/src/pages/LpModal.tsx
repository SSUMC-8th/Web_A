import { useMutation } from "@tanstack/react-query";
import InputField from "../components/InputField";
import { TagItem } from "./TagItem";
import axiosInstance from "../apis/axios";
import { LpBodyPost, LpPost } from "../types/lpPost";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

interface LpModalProps {
  onClose: () => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  tagInputValue: string;
  setTagInputValue: (v: string) => void;
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
  setTagInputValue,
  tagInputValue,
  tags,
  setTags,
}: LpModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInput = useRef<File | null>(null);

  //추가 btn
  const AddTag = () => {
    const tagNode = tagInputValue.trim();
    if (tagNode) {
      setTags([...tags, tagNode]);
    }
    setTagInputValue("");
  };

  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const addLp = useMutation({
    mutationFn: async () => {
      const formValues = getValues();
      const postBody: LpBodyPost = {
        title: formValues.lpName,
        content: formValues.lpContent,
        thumbnail: "", // 먼저 빈 값으로 초기화
        tags: tags,
        published: true, // 임시로 true 처리
      };

      //   console.log("postB:", postBody);
      // 1. 이미지 업로드
      if (fileInput.current) {
        const imageFormData = new FormData();
        imageFormData.append("file", fileInput.current);
        // console.log(imageFormData);

        const fileRes = await axiosInstance.post<UploadResponse>(
          `/v1/uploads`,
          imageFormData
        ); // 경로 확인 필요
        console.log("f데잍", fileRes.data);

        const uploadedImagePath = fileRes?.data?.data?.imageUrl;

        if (!uploadedImagePath) {
          throw new Error("이미지 업로드에 실패했습니다.");
        }

        postBody.thumbnail = uploadedImagePath;
      }

      // 2. LP 등록 요청
      return axiosInstance.post<LpPost>(`/v1/lps`, postBody);
    },
    onSuccess: () => alert("추가가 완료 되었습니다."),
    onError: (err) => console.error(err),
  });

  //이미지 바꾸기
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      fileInput.current = file;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-5 " onClick={onClose} />
      <div className=" flex items-center justify-center mx-auto top-30 bg-gray-600 fixed  center w-full max-w-md z-10 rounded-2xl flex-wrap">
        <div className="px-5 w-full ">
          <button className="font-bold mt-5 cursor-pointer" onClick={onClose}>
            X
          </button>

          {/* lp누르면 이미지 삽입 */}
          <form action="#" onSubmit={handleSubmit(() => addLp.mutate())}>
            <label
              htmlFor="image-upload"
              className="block cursor-pointer relative"
            >
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                {...register("file")}
                onChange={imageChange}
                className="hidden"
              />
              <img
                src={preview ?? "/lpImg.png"}
                alt="LP 이미지"
                className="size-50 mx-auto my-10"
              />
            </label>
            <InputField
              placeholder="LP Name"
              className=""
              register={register("lpName", {
                required: "Lp이름은 필수입력입니다",
              })}
            />
            <InputField
              placeholder="LP Content"
              className=""
              register={register("lpContent", {
                required: "lp내용은 필수입력입니다.",
                minLength: {
                  value: 2,
                  message: "2글자 이상 입력해주세요.",
                },
              })}
            />
            <div className="flex items-center justify-center  gap-2 mb-9">
              <InputField
                placeholder="LP Tag"
                className="mb-0"
                onChange={(e) => setTagInputValue(e.target.value)}
                value={tagInputValue}
              />
              <button
                className="bg-gray-400 px-3 py-1.5 rounded-sm"
                onClick={AddTag}
                type="button"
              >
                Add
              </button>
            </div>
            {/* 태그출력 */}
            <div className="flex gap-2 flex-wrap w-full shrink-0">
              {tags.map((item, i) => (
                <TagItem
                  key={i}
                  tag={item}
                  onRemove={() => setTags(tags.filter((t) => t !== item))}
                />
              ))}
            </div>
            <button
              className="w-full bg-gray-400 py-2 rounded-sm mb-10"
              type="submit"
            >
              Add LP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
