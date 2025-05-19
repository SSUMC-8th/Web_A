import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/Buttons/GoogleLoginButton";
import Divider from "../components/Divider";
import LoginForm from "../components/Login/LoginForm";
import LoginTitle from "../components/Titles/LoginTitle";
import { useAuth } from "../context/TokenContext/useAuth";
import useForm from "../hook/useForm";
import { UserSignInformation, validateLogin } from "../utils/validate";
import { useEffect } from "react";
import RoutePaths from "../router/routePaths";

const LoginPage = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSignInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateLogin,
    });

  const handleSubmit = async () => {
    await login(values);
  };

  const handleGoogleLogin = () => {
    window.location.href = RoutePaths.GOOGLE_LOGIN;
  };

  // 오류가 하나라도 있거나, 입력값이 비어 있으면 버튼을 비활성화
  // some -> 하나라도 해당하면 true 를 반환
  // every -> 전부가 해당해야 true 를 반환
  // Object.values = 객체의 "값들만" 배열로 반환
  // 여기선 [email 값, password 값]를 의미할듯
  const isDisabled =
    Object.values(values).some((v) => v === "") ||
    Object.values(errors || {}).some((e) => e !== "");

  // {...getInputProps('email')}
  /*
  value={}
  onChange={}
  onBlur={}
  */

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <LoginTitle text="로그인" />

      <GoogleLoginButton onClick={handleGoogleLogin} />

      <Divider />

      <LoginForm
        getInputProps={getInputProps}
        errors={errors}
        touched={touched}
        isDisabled={isDisabled}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default LoginPage;
