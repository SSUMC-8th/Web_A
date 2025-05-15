import { ImageUploadProps } from "../../types/image";
import CommonImageUploader from "../CommonImageUploader";

export const defaultProfileImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const ProfileImage = (props: ImageUploadProps) => {
  return (
    <CommonImageUploader
      {...props}
      defaultImage={defaultProfileImage}
      altText="프로필 이미지"
      id="profile-image"
    />
  );
};

export default ProfileImage;
