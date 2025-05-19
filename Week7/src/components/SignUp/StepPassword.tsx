import { useFormContext } from "react-hook-form";
import { StepProps } from "../../types/auth";
import SignUpNextButton from "../Buttons/SignUpNextButton";

const StepPassword = ({ onNext }: StepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <input
        {...register("password")}
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white
          ${errors?.password ? "border-red-500" : "border-gray-300"}`}
        type={"password"}
        placeholder={"비밀번호"}
      />
      {errors.password?.message && (
        <div className="text-red-500 text-sm">
          {String(errors.password.message)}
        </div>
      )}

      <input
        {...register("passwordCheck")}
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white
          ${errors?.passwordCheck ? "border-red-500" : "border-gray-300"}`}
        type={"password"}
        placeholder={"비밀번호 확인"}
      />
      {errors.passwordCheck?.message && (
        <div className="text-red-500 text-sm">
          {String(errors.passwordCheck.message)}
        </div>
      )}
      <SignUpNextButton
        onNext={onNext}
        fieldsToValidate={["password", "passwordCheck"]}
      />
    </>
  );
};

export default StepPassword;
