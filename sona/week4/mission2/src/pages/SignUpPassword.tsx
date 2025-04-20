import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import InputField from "../components/InputField";

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
      <Header />

      <p className="mr-auto mb-2">{email}</p>
      <div className="relative w-full">
        <InputField
          placeholder="비밀번호를 입력해주세요"
          className=""
          type={showPwd ? "text" : "password"}
          errorMsg={errors.password?.message}
          register={register("password", {
            required: "비밀번호는 필수입력 입니다",
            minLength: {
              value: 8,
              message: "8글자 이상 입력해주세요",
            },
          })}
        ></InputField>

        <img
          src={showPwd ? "/public/eye2.svg" : "/eyeHalf2.svg"}
          className="absolute right-3 top-3 size-4 cursor-pointer"
          onClick={() => setShowPwd((pre) => !pre)}
          alt="비밀번호 보기"
        />
      </div>
      <div className="relative w-full">
        <InputField
          errorMsg={errors.passwordConfirm?.message}
          type={showPwdCheck ? "text" : "password"}
          placeholder="비밀번호를 다시 입력해주세요"
          {...register("passwordConfirm", {
            required: "비밀번호입력은 필수입력입니다",
            validate: (value) => {
              return (
                value === watch("password") || "비밀번호가 일치하지 않습니다."
              );
            },
          })}
        ></InputField>
        <img
          src={showPwdCheck ? "/eye2.svg" : "/eyeHalf2.svg"}
          className="absolute right-3 top-3 size-4 cursor-pointer"
          onClick={() => setShowPwdCheck((pre) => !pre)}
          alt="비밀번호 보기"
        />
      </div>

      <button
        className="text-sm bg-gray-900 w-full rounded-sm h-8"
        type="button"
        onClick={handleSubmit(onSubmit)}
      >
        다음
      </button>
    </>
  );
}
