import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { UserLoginInfo, validateLogin } from "../utils/validate";
import GoogleButton from "../components/GoogleButton";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login, accessToken } = useAuth();
  const { values, errors, touched, getInputProps } = useForm<UserLoginInfo>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  useEffect(()=>{
    if(accessToken){
      navigate("/mypage");
    }
  },[navigate, accessToken]);

  const handleSubmit = async () => {
    console.log(values);
    try {
      await login(values);
      navigate("/mypage");
    } catch (error) {
      alert(error?.message);
    }
  };

  const isDisabled: boolean =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center justify-center font-bold text-3xl">
          <button
            type="button"
            onClick={() => navigate("/")}
            className=" absolute left-0 text-white rounded-md  transition-cursor-pointer"
          >
            {"<"}
          </button>
          <h1 className="text-white  text-center "> 로그인</h1>
        </div>
        <div className="flex flex-col items-center font-medium">
          <GoogleButton />
          <div className="flex items-center w-full my-6">
            <div className="flex-grow border-t border-white"></div>
            <span className="mx-4 px-3 text-white">OR</span>
            <div className="flex-grow border-t border-white"></div>
          </div>{" "}
          <input
            {...getInputProps("email")}
            className={`w-2xs p-3 mb-3 text-white border border-white rounded-md  placeholder-gray-400 bg-black focus:ring-2 focus:ring-blue-500
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
            type={"email"}
            placeholder={"이메일"}
          />
          {errors?.email && touched?.email && (
            <div className=" text-red-500 text-sm mb-3">{errors.email}</div>
          )}
          <input
            {...getInputProps("password")}
            type={"password"}
            placeholder="비밀번호"
            className={`w-2xs p-3 mb-3 text-white border border-white rounded-md  placeholder-gray-400 bg-black focus:ring-2 focus:ring-blue-500
          ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm mb-3">{errors.password}</div>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-2xs p-2 mb-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
