
export type CommonImageUploaderProps={
  previewUrl: string;
  onImage: (file: File | null) => void;
  defaultImage: string;
  altText: string;
  id: string;
}

//UI에 이미지 업로드 
const ImageUploader = ({ previewUrl, onImage, defaultImage, altText, id }: CommonImageUploaderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onImage(file);
  };

  return (
    <div>
      <label htmlFor={id} className="cursor-pointer">
        <img
          src={previewUrl || defaultImage}
          alt={altText}
          className="w-80 h-80 rounded-full object-cover mb-4"
        />
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
