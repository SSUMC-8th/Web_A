import { ImageUploadProps } from "../types/image";

interface CommonImageUploaderProps extends ImageUploadProps {
  defaultImage: string;
  altText: string;
  id: string;
}


const CommonImageUploader = ({ previewUrl, onImage, defaultImage, altText, id }: CommonImageUploaderProps) => {
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
          className="w-40 h-40 rounded-full object-cover mb-4"
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

export default CommonImageUploader;
