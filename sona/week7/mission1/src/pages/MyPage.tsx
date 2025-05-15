import { useEffect, useState } from "react";
import { getmyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserPatchDto } from "../types/common";
import axiosInstance from "../apis/axios";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>([]);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getmyInfo();
      // console.log(response);header
      setData(response);
    };
    getData();
  }, []);
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  console.log(data);

  const {
    isError,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userEditBtn = useMutation({
    mutationFn: (formData: UserPatchDto) => {
      return axiosInstance.patch(`/v1/users`, formData);
    },
    onSuccess: () => {
      alert("성공하였습니다");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <div className="flex items-center flex-col mt-20 max-w-lg  mx-auto pt-10">
        {/* form */}
        <div className="flex   w-full gap-4 px-6">
          <div className="flex gap-5 flex-grow-1">
            <img
              className="rounded-full size-40 mb-6"
              src={data.data?.avatar ? data.data?.avatar : "/profileImg.png"}
              alt="프로필이미지"
            />
            {isEdit ? (
              <>
                <div className="">
                  <div className="relative">
                    <InputField
                      className="mt-3"
                      errorMsg={errors.name?.message}
                      placeholder="이름을 입력해주세요"
                      register={register("name", {
                        required: "이름은 필수 입력 입니다",
                        minLength: {
                          value: 2,
                          message: "두글자 이상 입력하세요",
                        },
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <InputField
                      placeholder="설명을 입력해주세요"
                      register={register("bio")}
                      className="mb-0"
                    />

                    <button
                      className="bg-gray-600 px-2 py-[7px] rounded-sm shrink-0"
                      onClick={handleSubmit((formData) =>
                        userEditBtn.mutate(formData)
                      )}
                    >
                      수정
                    </button>
                  </div>
                  <p className="text-xl mb-4 my-2">{data.data?.email}</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col">
                <p className="text-4xl mb-4">{data.data?.name}</p>
                <p className="text-xl mb-4">{data.data?.bio || "프론트 짱"}</p>
                <p className="text-xl mb-4">{data.data?.email}</p>
              </div>
            )}
          </div>
          <button
            className="mb-auto pt-5 shrink-0"
            type="button"
            onClick={() => setIsEdit((pre) => !pre)}
          >
            <img src="/pencil.svg" alt="" />
          </button>
        </div>

        {/* tab */}
        <div className="flex gap-3 w-full items-center justify-center mb-4">
          <button className="border-t px-5 py-3">내가 좋아요한 LP</button>
          <button className="border-t px-5 py-3">내가 작성한 LP</button>
        </div>
        <button
          onClick={handleLogout}
          className="w-20 bg-gray-500 mt-5 rounded-xl mb-8"
        >
          로그아웃
        </button>
      </div>
    </>
  );
};

export default MyPage;
