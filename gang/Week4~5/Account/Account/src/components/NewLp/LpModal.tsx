import { SubmitHandler, useForm } from "react-hook-form";
import { useImageUploader } from "../../hooks/useImageUploader";
import defaultLpImage from "../../assets/defaultLp.png";
import LpImage from "./LpImage";
import { LpSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import LpInput from "./LpInput";
import LpTagInput from "./LpTagInput";
import usePostCreateLp from "../../hooks/mutations/usePostCreateLp";

export type lpFormFields = z.infer<typeof LpSchema>;
const LpModal = () => {
  const { mutate } = usePostCreateLp();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm<lpFormFields>({
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      thumbnail: defaultLpImage,
      published: false,
    },
    resolver: zodResolver(LpSchema),
    mode: "onBlur",
  });

  const { handleImageChange } = useImageUploader(
    defaultLpImage,
    setValue,
    "thumbnail"
  );
  const thumbnailValue = watch("thumbnail");
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1); // 배경 클릭 시 닫기
    }
  };

  const onSubmit: SubmitHandler<lpFormFields> = (data) => {
    mutate(data, {
      onSuccess: () => {
        console.log(data);
        navigate(-1);
      },
      onError: (error) => {
        console.error("LP 생성 실패", error);
      },
    });
  };

  return (
    <div
      className="flex flex-col  z-50 bg-black/80 items-center justify-center "
      onClick={handleOverlayClick}
    >
      <div className="flex flex-col w-full max-w-md inset-40 bg-gray-900 text-white rounded-lg items-center justify-center z-50">
        <div className="flex w-full justify-end items-end px-3">
          <button className="text-white" onClick={() => navigate(-1)}>
            x
          </button>
        </div>
        <div className="w-40 h-40 rounded-full overflow-hidden m-4">
          <LpImage previewUrl={thumbnailValue} onImage={handleImageChange} />
        </div>

        <div className="p-6 w-full shadow-lg text-center  ">
          <LpInput register={register} field="title" placeholder="Lp Title" />
          <LpInput
            register={register}
            field="content"
            placeholder="Lp Content"
          />
          <LpTagInput setValue={setValue} />
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="mt-4 w-full bg-gray-300 text-white rounded-md px-4 py-2 hover:bg-gray-400"
          >
            Add LP
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpModal;
