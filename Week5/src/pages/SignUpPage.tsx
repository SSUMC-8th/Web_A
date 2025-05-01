import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignUp } from "../api/auth";
import { useState } from "react";
import StepEmail from "../components/SignUp/StepEmail";
import StepPassword from "../components/SignUp/StepPassword";
import StepProfile from "../components/SignUp/StepProfile";
import { uploadAvatar } from "../api/upload";
import LoginTitle from "../components/Titles/LoginTitle";
import GoogleLoginButton from "../components/Buttons/GoogleLoginButton";
import Divider from "../components/Divider";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../router/routePaths";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export type FormFields = z.infer<typeof schema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState<File | null>(null);
  const methods = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;
    let avatarUrl = "";
    if (avatar) {
      try {
        avatarUrl = await uploadAvatar(avatar); // 이미지 업로드 → URL 받기
      } catch (e) {
        console.error("이미지 업로드 실패", e);
        return;
      }
    }

    const requestBody = {
      ...rest,
      avatar: avatarUrl, // 문자열 URL로 포함
    };

    const response = await postSignUp(requestBody);

    console.log("회원가입 성공:", response);

    navigate(`${RoutePaths.LOGIN}`);
  };

  // trigger -> 유효성 검사
  const handleNext = async (fieldsToValidate: (keyof FormFields)[]) => {
    const valid = await methods.trigger(fieldsToValidate);
    if (valid) {
      setStep((prev) => prev + 1);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = RoutePaths.GOOGLE_LOGIN;
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="flex flex-col items-center justify-center h-full gap-4 bg-black">
          <div className="flex flex-col gap-3">
            <LoginTitle text="회원가입" />
            {step === 1 && (
              <>
                <GoogleLoginButton onClick={handleGoogleLogin} />
                <Divider />
                <StepEmail onNext={() => handleNext(["email"])} />
              </>
            )}
            {step === 2 && (
              <StepPassword
                onNext={() => handleNext(["password", "passwordCheck"])}
              />
            )}
            {step === 3 && (
              <StepProfile
                isSubmitting={methods.formState.isSubmitting}
                onSubmit={methods.handleSubmit(onSubmit)}
                onAvatarChange={setAvatar}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default SignUpPage;
