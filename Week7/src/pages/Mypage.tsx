import { useEffect, useState } from "react";
import { useGetMyInfo } from "../hook/queries/User/useGetMyInfo";
import { useAuth } from "../context/TokenContext/useAuth";
import { usePatchMyInfo } from "../hook/mutations/usePatchMyInfo";
import { HiCog, HiCheck } from "react-icons/hi";
import DefalutUser from "../assets/images/defalut_user.jpg";
import { useLpImageUpload } from "../hook/queries/Lp/useLpImageUpload";
import { uploadAvatar } from "../api/Post/upload";

const Mypage = () => {
  const { accessToken } = useAuth();
  const { data } = useGetMyInfo(accessToken);
  const patchMyInfo = usePatchMyInfo();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const {
    file: imageFile,
    previewUrl,
    inputRef,
    triggerFileSelect,
    onFileChange,
  } = useLpImageUpload();

  // 데이터가 로드되면 상태 업데이트
  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || "");
      setBio(data.data.bio || "");
      setAvatar(data.data.avatar || "");
    }
  }, [data]);

  // 이미지 선택 시 서버 업로드 → URL 저장
  useEffect(() => {
    const uploadImage = async () => {
      if (imageFile) {
        try {
          setError("");
          const uploadedUrl = await uploadAvatar(imageFile);
          setAvatar(uploadedUrl);
        } catch (err) {
          console.error("이미지 업로드 실패:", err);
          setError("이미지 업로드에 실패했습니다.");
        }
      }
    };
    uploadImage();
  }, [imageFile]);

  const handleConfirm = async () => {
    try {
      console.log("수정 요청 전송:", { name, bio, avatar });
      setIsEditing(false);
      await patchMyInfo.mutateAsync({ name, bio, avatar });
      console.log("성공");
      setError("");
    } catch (err) {
      console.error("정보 수정 실패:", err);
      setError("정보 수정에 실패했습니다.");
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* 이미지 업로드 */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={onFileChange}
      />
      <div
        onClick={isEditing ? triggerFileSelect : undefined}
        className={`relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-zinc-700 ${
          isEditing ? "cursor-pointer" : ""
        }`}
      >
        <img
          className="w-full h-full object-cover"
          src={
            isEditing
              ? previewUrl || avatar || DefalutUser
              : avatar || DefalutUser
          }
          alt="avatar"
        />
      </div>

      {/* 이름 + 설정 버튼 */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
            className="text-white bg-zinc-800 px-3 py-1 rounded outline-none"
          />
        ) : (
          <h1 className="text-white text-2xl font-bold">{name}</h1>
        )}
        <button
          onClick={isEditing ? handleConfirm : () => setIsEditing(true)}
          className="focus:outline-none"
        >
          {isEditing ? (
            <HiCheck className="text-green-500 w-6 h-6" />
          ) : (
            <HiCog className="text-white w-6 h-6" />
          )}
        </button>
      </div>

      {/* 한줄소개 */}
      <div className="mt-2">
        {isEditing ? (
          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="한줄소개 입력"
            className="text-white bg-zinc-800 px-3 py-1 rounded outline-none"
          />
        ) : (
          <p className="text-zinc-400 text-sm">{bio}</p>
        )}
      </div>

      {/* 이메일 */}
      <p className="text-zinc-500 text-sm mt-2">{data?.data?.email}</p>

      {/* 에러 메시지 */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Mypage;
