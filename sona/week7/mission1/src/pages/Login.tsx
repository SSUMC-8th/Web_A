import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      await login(values);
      navigate("/my");
    } catch (e) {
      navigate("/");
      console.log(e);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <>
      <Header />
      <button
        className="flex border-1 w-full rounded-xl py-1  items-center cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <img src="/public/ggg-Photoroom.png" alt="" className="w-11" />
        <div className="w-full text-center pr-12 text-sm ">구글 로그인</div>
      </button>
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
        className="text-sm bg-gray-900 w-full rounded-sm h-8"
        type="button"
        onClick={handleSubmit}
      >
        로그인
      </button>
    </>
  );
}
