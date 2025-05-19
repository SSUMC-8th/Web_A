type ImageUploadProps = {
  previewUrl: string;
  onImageChange: (file: File | null) => void;
};

const ImageUpload = ({ previewUrl, onImageChange }: ImageUploadProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onImageChange(file);
  };

  return (
    <div>
      <label htmlFor="profile-image" className="cursor-pointer">
        <img
          src={
            previewUrl ||
            "https://i.pinimg.com/736x/d0/a9/28/d0a928800a63f30c9de32934b4db78c4.jpg"
          }
          alt="프로필 이미지"
          className="w-40 h-40 rounded-full object-cover mb-4"
        />
      </label>
      <input
        id="profile-image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
