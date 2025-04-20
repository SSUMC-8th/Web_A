import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { postSignin } from "../apis/auth";
import Header from "../components/Header";
import useLocalStorage from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      navigate("/my");
    } catch (error) {
      alert(error?.message);
    }
    console.log(response);
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
