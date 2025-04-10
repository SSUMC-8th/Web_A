import { useNavigate } from "react-router-dom";
import { postLogin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useForm } from "../hooks/useForm";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserLoginInfo, validateLogin } from "../utils/validate";
const Login = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } = useForm<UserLoginInfo>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });
  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postLogin(values);
      setItem(response.data.accessToken);
      console.log(response);
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
        <input
          {...getInputProps("email")}
          className={`w-2xs p-4 mb-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          type={"password"}
          placeholder="비밀번호"
          className={`w-2xs p-4 mb-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500
          ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
