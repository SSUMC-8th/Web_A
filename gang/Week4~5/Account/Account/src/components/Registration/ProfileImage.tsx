import ImageUploader, { CommonImageUploaderProps } from "../ImageUploader";


const ProfileImage = ({
  previewUrl,
  onImage,
  defaultImage,
  altText,
  id,
}: CommonImageUploaderProps) => {
  return (
    <ImageUploader
      previewUrl={previewUrl}
      onImage={onImage}
      defaultImage={defaultImage}
      altText={altText}
      id={id}
    />
  );
};

export default ProfileImage;
