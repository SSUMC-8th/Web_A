import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다" }),
    password: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상 이어야 합니다",
      })
      .max(20, { message: "비밀번호는 20자 이상이어야합니다" }),
    name: z.string().min(1, { message: " 이름을 입력해주세요" }),
    passwordCheck: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상 이어야 합니다",
      })
      .max(20, { message: "비밀번호는 20자 이상이어야합니다" }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

//isSubmitting은 로딩처리
export default function SignUp() {
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema), //스키마 위반하면 error
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest);
    console.log(response);
    console.log("응");
  };

  return (
    <>
      <Header />

      <div className="flex border-1 w-full rounded-xl py-1  items-center">
        <img src="/public/ggg-Photoroom.png" alt="" className="w-11" />
        <div className="w-full text-center pr-12 text-sm ">구글 로그인</div>
      </div>
      <div className="flex items-center gap-2 w-full my-4">
        <div className="border-t border-white grow"></div>
        <span className="text-white text-sm">OR</span>
        <div className="border-t border-white grow"></div>
      </div>
      <div className="relative w-full">
        <InputField
          type="email"
          placeholder="이메일을 입력하세요"
          errorMsg={errors.email?.message}
          register={{
            ...register("email", {}),
          }}
        ></InputField>
      </div>
      <div className="relative w-full">
        <InputField
          type="password"
          placeholder="비밀번호를 입력하세요"
          errorMsg={errors.password?.message}
          register={{
            ...register("password", {}),
          }}
        ></InputField>
      </div>
      <div className="relative w-full">
        <InputField
          type="password"
          placeholder="비밀번호 확인"
          errorMsg={errors.passwordCheck?.message}
          register={{
            ...register("passwordCheck", {}),
          }}
        ></InputField>
      </div>

      <div className="relative w-full">
        <InputField
          type="name"
          placeholder="이름을 입력하세요"
          errorMsg={errors.name?.message}
          register={{
            ...register("name", {}),
          }}
        ></InputField>
      </div>

      <button
        disabled={isSubmitting}
        className="text-sm bg-gray-900 w-full rounded-sm h-8"
        type="button"
        onClick={handleSubmit(onSubmit)}
      >
        회원가입
      </button>
    </>
  );
}
