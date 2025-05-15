import { useEffect, useState } from "react";
import ArrangeButton from "../components/LpBoard/ArrangeButton";
import { OrderEnum } from "../types/common";
import useGetMyInfo from "../hooks/query/useGetMyInfo";
import InfoBoard from "../components/MyPage/InfoBoard";
import { Check, Settings } from "lucide-react";
import usePatchUsers from "../hooks/mutations/usePatchUsers";

const MyPage = () => {
  const [order, setOrder] = useState<OrderEnum>(OrderEnum.ASC);
  const { data } = useGetMyInfo();
  const me = data?.data;
  const defaultProfileImage =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
  if (me) {
    setName(me.name);
    setBio(me.bio ?? "");
    setEmail(me.email ?? "");
  }
}, [me]);
  const { mutate } = usePatchUsers();
  const handlePatch = () => {
    if (me?.name.trim()) {
      try {
        mutate({
          name,
          bio,
          email,
        });
        setIsEditing(false);
      } catch (error) {
        console.error("프로필 수정 실패", error);
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-full bg-black">
      <div className="bg-gray-800 h-full w-full shadow-md rounded-xl p-8  ">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          My Page
        </h2>

        <div className="flex flex-col">
          <div className="space-y-4 text-white flex flex-row justify-center items-center gap-2">
            <div>
              <img
                src={me?.avatar || defaultProfileImage}
                alt="프로필 사진"
                className="w-32 h-32 rounded-full object-cover "
              />
            </div>
            <div className="flex flex-row gap-2 text-white ">
              <InfoBoard
                isEditing={isEditing}
                name={name}
                bio={bio}
                email={email}
                setName={setName}
                setBio={setBio}
                setEmail={setEmail}
              />{" "}
              {isEditing ? (
                <button
                disabled={!me?.name.trim()} // 이름이 없으면 비활성화
                  onClick={handlePatch}
                  className={`rounded-2xl ${
                    me?.name.trim() ? "bg-green-500" : "bg-black"
                  } text-white`}>
                <Check/>
                </button>
              ) : (
                <Settings
                  onClick={() => setIsEditing(true)}
                  className=" rounded-full bg-transparent text-white"
                />
              )}
            </div>
          </div>
          <div className="w-full flex justify-end px-4 py-2">
            <ArrangeButton order={order} setOrder={setOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
