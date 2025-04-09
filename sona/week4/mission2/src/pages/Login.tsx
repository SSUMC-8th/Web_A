import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";

export default function Login() {
  const navigate = useNavigate();

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = () => {
    if (!errors.email && !errors.password) {
      alert("로그인에 성공하였습니다");
      // navigate("/home") or 서버 요청
    } else {
      alert("로그인에 실패하였습니다");
    }
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center justify-center  max-w-[300px]  m-auto px-2">
      <div className="py-4 flex w-full">
        <p className="cursor-point " onClick={() => navigate(-1)}>
          {"<"}
        </p>
        <h1 className="font-bold text-center w-full pr-3">로그인</h1>
      </div>
      <div className="flex border-1 w-full rounded-xl py-1">
        <img src="/public/ggg-Photoroom.png" alt="" className="w-11" />
        <div className="w-full text-center pr-12 text-sm">구글 로그인</div>
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
          className={`inputField ${
            errors.email && touched.email ? "border-red-400" : "border-gray-300"
          }`}
          {...getInputProps("email")}
        />
        {errors.email && touched.email && (
          <div className=" text-red-500 text-[10px] py-1 absolute top-[38px] left-1">
            {errors.email}
          </div>
        )}
      </div>
      <div className="relative w-full">
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className={`inputField ${
            errors.password && touched.password
              ? "border-red-400 "
              : "border-gray-300"
          }`}
          {...getInputProps("password")}
        />
        {errors.password && touched.password && (
          <div className="text-red-500 text-[10px] py-1 absolute top-[38px] left-1">
            {errors.password}
          </div>
        )}
      </div>
      <button
        className="text-sm bg-gray-900 w-full rounded-sm"
        type="button"
        onClick={handleSubmit}
      >
        로그인
      </button>
    </div>
  );
}
