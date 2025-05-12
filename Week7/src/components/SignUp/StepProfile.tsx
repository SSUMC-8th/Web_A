import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import ImageUpload from "../ImageUpLoader";

type CompleteStepProps = {
  onSubmit: () => void;
  isSubmitting: boolean;
  onAvatarChange: (file: File | null) => void;
};

const StepProfile = ({
  isSubmitting,
  onSubmit,
  onAvatarChange,
}: CompleteStepProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  // "name" 필드의 값을 감시합니다.
  const nameValue = watch("name");
  const isNameInvalid = !nameValue || !!errors.name;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    onAvatarChange(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }
  };

  useEffect(() => {
    if (imageFile) {
      const url = previewUrl;
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [imageFile, previewUrl]);

  return (
    <div className="flex flex-col items-center gap-4">
      <ImageUpload previewUrl={previewUrl} onImageChange={handleImageChange} />
      <input
        {...register("name")}
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white
          ${errors?.name ? "border-red-500" : "border-gray-300"}`}
        type={"text"}
        placeholder={"이름"}
      />
      {errors.name?.message && (
        <div className="text-red-500 text-sm">
          {String(errors.name.message)}
        </div>
      )}
      <button
        className={`w-full text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer ${
          isSubmitting || isNameInvalid
            ? "bg-gray-300 cursor-default"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={isSubmitting || isNameInvalid}
        onClick={onSubmit}
      >
        회원가입 완료
      </button>
    </div>
  );
};

export default StepProfile;
