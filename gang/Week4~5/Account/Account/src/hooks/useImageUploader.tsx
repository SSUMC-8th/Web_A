import { useCallback } from "react";
import { uploadImage } from "../apis/uploads";


//useForm에서 사진이 필요한 필드만 받음
export function useImageUploader<
  FieldName extends string = string
>(
  defaultImage: string,
  setValue: (field: FieldName, value: string) => void,
  fieldName: FieldName
) {
  const handleImageChange = useCallback((file: File | null) => {
    if (file) {
      uploadImage(file)
        .then((url) => {
          setValue(fieldName, url);
        })
        .catch(() => {
          setValue(fieldName, defaultImage);
        });
    } else {
      setValue(fieldName, defaultImage);
    }
  }, [setValue, defaultImage, fieldName]);

  return { handleImageChange };
}
