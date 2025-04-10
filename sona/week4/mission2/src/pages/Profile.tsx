import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

type TProfile = {
  name: string;
};

export default function Profile() {
  //   const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfile>();

  const onSubmit = () => {
    alert("회원가입이 완료되었습니다");
  };
  return (
    <>
      <Header />
      <img src="/profileImg.png" alt="" className="rounded-full my-2" />
      <div className="relative w-full">
        <input
          placeholder="비밀번호를 다시 입력해주세요"
          className="inputField relative"
          {...register("name", {
            required: "이름은 필수입력입니다",
          })}
        />
        {errors.name?.message && (
          <div className="text-red-500 text-[10px] py-1 absolute top-[38px] left-1">
            {errors.name.message}
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
    </>
  );
}
