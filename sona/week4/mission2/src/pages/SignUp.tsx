import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type TSignUpForm = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUp() {
  //   const [step, setStep] = useState("email");

  //   const nextStep = () => {
  //     const emailValue = getValues("email");
  //     const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailValue || !emailRegx.test(emailValue)) return;

  //     setStep("password");
  //   };

  //   const [step, setStep] = useState("email");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TSignUpForm>();

  const onSubmit = () => {
    const emailValue = getValues("email");
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue || emailRegx.test(emailValue))
      // setStep("password");
      navigate("/signUpPassword", {
        state: {
          email: emailValue,
        },
      });
  };

  return (
    <div className="flex flex-col items-center justify-center  max-w-[300px]  m-auto px-2">
      <div className="py-4 flex w-full">
        <p className="cursor-point " onClick={() => navigate(-1)}>
          {"<"}
        </p>
        <h1 className="font-bold text-center w-full pr-3">회원가입</h1>
      </div>

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
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          className="inputField relative"
          {...register("email", {
            required: "이메일은 필수입력입니다",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "유효한 값을 입력해주세요",
            },
          })}
        />
        {errors.email?.message && (
          <div className="text-red-500 text-[10px] py-1 absolute top-[38px] left-1">
            {errors.email.message}
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
  );
}
