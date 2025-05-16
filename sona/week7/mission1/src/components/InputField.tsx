type TInputField = {
  placeholder?: string;
  errorMsg?: string;
  register?: object;
  className?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export default function InputField({
  placeholder = "",
  errorMsg = "",
  register,
  // value,
  // onChange,
  className,
  type,
  ...props
}: TInputField) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`inputField relative ${className}`}
        {...register}
        {...props}
        // value={value}
        // onChange={onChange}
      />
      {errorMsg && (
        <div className="text-red-500 text-[10px] py-1 absolute top-[40px] left-1">
          {errorMsg}
        </div>
      )}
    </>
  );
}
