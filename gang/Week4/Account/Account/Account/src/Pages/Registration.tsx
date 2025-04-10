import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postRegister } from "../apis/auth";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이여야 합니다." }),
  passwordCheck: z
    .string()
    .min(8, { message: "비밀번호가 일치하지 않습니다." }),
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요" })   
})
.refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;
const Registration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck:"",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<FormFields> = async(data) => {
    const {passwordCheck, ...rest} = data;  
    const response = await postRegister(rest);
    console.log(response);
    navigate("/login");
  }; 
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          className={`w-2xs p-4 mb-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500
            ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors?.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
        <input
          {...register("password")}
          type={"password"}
          placeholder="비밀번호"
          className={`w-2xs p-4 mb-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500
          ${
            errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
        />
        {errors?.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
        <input
          {...register("passwordCheck")}
          type={"password"}
          placeholder="비밀번호 확인"
          className={`w-2xs p-4 mb-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500
          ${
            errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
        />
        {errors?.passwordCheck && (
          <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
        )}
        <input
          {...register("name")}
          type={"text"}
          placeholder="이름"
          className={`w-2xs p-4 mb-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500
          ${
            errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
        />
        {errors?.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Registration;
