import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postRegister } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import schema from "../schema/schema";
import RegiBlank from "../components/RegiBlank";
import { useState } from "react";

export type FormFields = z.infer<typeof schema>;
const Registration = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordCheckValue = watch("passwordCheck");
  const nameValue = watch("name"); // 이메일 실시간

  const isStepValid = () => {
    if (step === 0) return emailValue && !errors.email;
    if (step === 1) return passwordValue && !errors.password;
    if (step === 2) return passwordCheckValue && !errors.passwordCheck;
    if (step === 3) return nameValue && !errors.name;
    return false;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    const response = await postRegister(rest);
    console.log(response);
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center justify-center font-bold text-3xl my-3">
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className=" absolute left-0 text-white rounded-md  transition-cursor-pointer"
          >
            {"<"}
          </button>
          <h1 className="text-white  text-center ">회원가입</h1>
        </div>
        <div className="flex items-center w-full ">
          <div className="flex-grow border-t border-white"></div>
          <span className="mx-4 px-3 text-white">OR</span>
          <div className="flex-grow border-t border-white"></div>
        </div>
        <div className="text-white text-sm"></div>
        {step == 0 && (
          <RegiBlank
            register={register}
            errors={errors}
            blankName="email"
            blankPlaceholder="이메일"
          />
        )}
        {step == 1 && (
          <div className="flex flex-col">
            <div className="`w-2xs p-3 mb-2 border rounded-lg bg-gray-500 text-black">
              {emailValue}
            </div>
            <RegiBlank
              register={register}
              errors={errors}
              blankName="password"
              blankPlaceholder="비밀번호"
            />
            <RegiBlank
              register={register}
              errors={errors}
              blankName="passwordCheck"
              blankPlaceholder="비밀번호 확인"
            />
          </div>
        )}
        {step >= 2 && (
          <div>
            <RegiBlank
              register={register}
              errors={errors}
              blankName="name"
              blankPlaceholder="이름"
            />
          </div>
        )}
        {step >= 0 && step < 2 && (
          <button
            type="button"
            onClick={handleNext}
            disabled={!isStepValid()}
            className="w-full bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          >
            다음
          </button>
        )}
        {step == 2 && (
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          >
            SignUp
          </button>
        )}
      </div>
    </div>
  );
};

export default Registration;
