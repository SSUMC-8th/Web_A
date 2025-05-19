import FieldErrorMessage from "../FieldErrorMessage";

type Props<T> = {
  getInputProps: (name: keyof T) => {
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: () => void;
  };
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isDisabled: boolean;
  onSubmit: () => void;
};

const LoginForm = <T extends { email: string; password: string }>({
  getInputProps,
  errors,
  touched,
  isDisabled,
  onSubmit,
}: Props<T>) => {
  return (
    <div className="flex flex-col gap-4">
      <input
        {...getInputProps("email")}
        className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white
          ${
            errors.email && touched.email ? "border-red-500" : "border-gray-300"
          }`}
        type="email"
        placeholder="이메일을 입력해주세요"
      />
      {touched.email && <FieldErrorMessage message={errors.email} />}

      <input
        {...getInputProps("password")}
        className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm text-white
          ${
            errors.password && touched.password
              ? "border-red-500"
              : "border-gray-300"
          }`}
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
      {touched.password && <FieldErrorMessage message={errors.password} />}

      <button
        className="w-full bg-cyan-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        type="button"
        disabled={isDisabled}
        onClick={onSubmit}
      >
        로그인
      </button>
    </div>
  );
};

export default LoginForm;
