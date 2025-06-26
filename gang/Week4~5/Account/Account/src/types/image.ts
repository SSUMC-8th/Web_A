export type ImageUploadProps = {
  previewUrl: string;
  onImage: (file: File | null) => void;
};
//미리보기 이미지