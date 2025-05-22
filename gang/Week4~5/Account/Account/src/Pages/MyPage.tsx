import { useEffect, useState } from "react";
import { OrderEnum } from "../types/common";
import useGetMyInfo from "../hooks/query/useGetMyInfo";
import InfoBoard from "../components/MyPage/InfoBoard";
import { Check, Settings } from "lucide-react";
import usePatchUsers from "../hooks/mutations/usePatchUsers";
import { useGetMyLpList } from "../hooks/query/useGetMyLpList";
import { useLocation, useNavigate } from "react-router-dom";
import { Lp } from "../types/lptype";
import LpBoard from "../components/LpBoard/LpBoard";
import ArrangeButton from "../components/ArrangeButton";
import { DEFAULT_PROFILE_IMAGE } from "../constants/key";

const MyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderEnum>(OrderEnum.ASC);
  const { data } = useGetMyInfo();
  const { data: lps } = useGetMyLpList({ limit: 20, search: "", order });

  const me = data?.data;
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
  const { mutate:patchUser } = usePatchUsers();
  const handlePatch = () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    try {
      patchUser({
        name,
        bio,
        email,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("프로필 수정 실패", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-black">
      <div className="bg-black h-full w-full shadow-md rounded-xl p-8  ">
        <div className="flex flex-col">
          <div className="space-y-4 text-white flex flex-row justify-center items-center gap-2">
            <div>
              <img
                src={me?.avatar || DEFAULT_PROFILE_IMAGE}
                alt="프로필 사진"
                className="w-32 h-32 rounded-full object-cover "
              />
            </div>
            <div className="flex flex-col gap-2 text-white ">
              <InfoBoard
                isEditing={isEditing}
                name={name}
                bio={bio}
                email={email}
                setName={setName}
                setBio={setBio}
                setEmail={setEmail}
                />{" "}
                  
            </div>
            <div className="flex justify-end">
                {isEditing ? (
                  <button
                    type="button"
                    disabled={!name.trim()}
                    onClick={handlePatch}
                    className={`flex items-center justify-center w-10 h-8 rounded-3xl
                    ${name.trim() ? "bg-green-500" : "bg-gray-500"}  
                    text-white`}
                  >
                    <Check className="w-5 h-5" />
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
          <div className="grid sm:grid-cols-3 md:grid-cols-5 items-center justify-center px-2 gap-2">
            {lps?.data.data.map((lp: Lp) => (
              <div key={lp.id} className="relative">
                <LpBoard
                  lp={lp}
                  onClick={() =>
                    navigate(`/lps/${lp.id}`, {
                      state: { backgroundLocation: location },
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
