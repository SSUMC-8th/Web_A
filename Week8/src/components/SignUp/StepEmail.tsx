import SignUpNextButton from "../Buttons/SignUpNextButton";
import { StepProps } from "../../types/auth";
import { useFormContext } from "react-hook-form";

const StepEmail = ({ onNext }: StepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <input
        {...register("email")}
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white
          ${errors?.email ? "border-red-500" : "border-gray-300"}`}
        type={"email"}
        placeholder={"이메일"}
      />
      {errors.email?.message && (
        <div className="text-red-500 text-sm">
          {String(errors.email.message)}
        </div>
      )}

      <SignUpNextButton onNext={onNext} fieldsToValidate={["email"]} />
    </>
  );
};

export default StepEmail;
