import { useFormContext } from "react-hook-form";

type Props = {
  onNext: () => void;
  fieldsToValidate: string[];
};

const SignUpNextButton = ({ onNext, fieldsToValidate }: Props) => {
  const {
    formState: { errors },
    watch,
  } = useFormContext();

  const values = watch();
  const isInvalid = fieldsToValidate.some(
    (field) => !values[field] || !!errors[field]
  );

  return (
    <button
      onClick={onNext}
      disabled={isInvalid}
      className="bg-white text-black py-2 rounded w-[300px] disabled:bg-gray-600"
    >
      다음
    </button>
  );
};

export default SignUpNextButton;
