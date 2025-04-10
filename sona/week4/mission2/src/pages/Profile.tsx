import { useForm } from "react-hook-form";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

type TProfile = {
  name: string;
};

export default function Profile() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfile>();

  const onSubmit = () => {
    alert("회원가입이 완료되었습니다");
    navigate("/");
  };
  return (
    <>
      <Header />
      <img src="/profileImg.png" alt="" className="rounded-full mt-2 mb-6" />
      <div className="relative w-full">
        <InputField
          placeholder="이름을 입력해주세요"
          register={{
            ...register("name", {
              required: "이름은 필수입력입니다",
            }),
          }}
          errorMsg={errors.name?.message}
        ></InputField>
      </div>
      <button
        className="text-sm bg-gray-900 w-full rounded-sm h-8"
        type="button"
        onClick={handleSubmit(onSubmit)}
      >
        다음
      </button>
    </>
  );
}
