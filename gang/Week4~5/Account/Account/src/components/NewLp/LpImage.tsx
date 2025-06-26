import { ImageUploadProps } from "../../types/image";
import defaultLpImage from "../../assets/defaultLp.png";
import CommonImageUploader from "../CommonImageUploader";

//Lp 이미지 컴포넌트
const LpImage = (props: ImageUploadProps) => {
  return (
    <CommonImageUploader
      {...props}
      defaultImage={defaultLpImage}
      altText="LP 이미지"
      id="lp-image"
    />
  );
};

export default LpImage;
