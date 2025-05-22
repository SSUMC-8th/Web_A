import { useCallback } from "react";
import { uploadImage } from "../apis/uploads";


//파일 서버에 업로드드
export function useImageUploader<FieldName extends string = string>(
  defaultImage: string,
  setValue: (field: FieldName, value: string) => void,
  fieldName: FieldName
) {
  const handleImageChange = useCallback(
    (file: File | null) => {
      if (!file) {
        setValue(fieldName, defaultImage);
        return;
      }

      uploadImage(file)
        .then((url) => {
          setValue(fieldName, url);
        })
        .catch(() => {
          setValue(fieldName, defaultImage);
        });
    },
    [defaultImage, fieldName, setValue]
  );

  return handleImageChange;
}
