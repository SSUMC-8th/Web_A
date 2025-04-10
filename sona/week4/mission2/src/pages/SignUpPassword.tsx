import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

type TSignUpPassword = {
  password: string;
  passwordConfirm: string;
};

export function SignUpPassword() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<TSignUpPassword>();

  const [showPwd, setShowPwd] = useState(false);
  const [showPwdCheck, setShowPwdCheck] = useState(false);
  const location = useLocation();

  const email = location.state?.email;

  const onSubmit = () => {
    navigate("/profile");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center  max-w-[300px]  m-auto px-2">
        <div className="py-4 flex w-full">
          <p className="cursor-point " onClick={() => navigate(-1)}>
            {"<"}
          </p>
          <h1 className="font-bold text-center w-full pr-3">회원가입</h1>
        </div>

        <p className="mr-auto mb-2">{email}</p>

        <div className="relative w-full">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            className="inputField relative"
            {...register("password", {
              required: "비밀번호는 필수입력입니다",
              minLength: {
                value: 8,
                message: "8글자 이상 입력해주세요",
              },
            })}
          />
          <img
            src={showPwd ? "/public/eye2.svg" : "/eyeHalf2.svg"}
            className="absolute right-3 top-3 size-4 cursor-pointer"
            onClick={() => setShowPwd((pre) => !pre)}
            alt="비밀번호 보기"
          />
          {errors.password?.message && (
            <div className="text-red-500 text-[10px] py-1 absolute top-[38px] left-1">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="relative w-full">
          <input
            type={showPwdCheck ? "text" : "password"}
            placeholder="비밀번호를 다시 입력해주세요"
            className="inputField relative"
            {...register("passwordConfirm", {
              required: "비밀번호입력은 필수입력입니다",
              validate: (value) => {
                return (
                  value === watch("password") || "비밀번호가 일치하지 않습니다."
                );
              },
            })}
          />
          <img
            src={showPwdCheck ? "/eye2.svg" : "/eyeHalf2.svg"}
            className="absolute right-3 top-3 size-4 cursor-pointer"
            onClick={() => setShowPwdCheck((pre) => !pre)}
            alt="비밀번호 보기"
          />
          {errors.passwordConfirm?.message && (
            <div className="text-red-500 text-[10px] py-1 absolute top-[38px] left-1">
              {errors.passwordConfirm.message}
            </div>
          )}
        </div>

        <button
          className="text-sm bg-gray-900 w-full rounded-sm h-8"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          다음
        </button>
      </div>
    </>
  );
}
