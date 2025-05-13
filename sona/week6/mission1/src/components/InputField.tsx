type TInputField = {
  placeholder?: string;
  errorMsg?: string;
  register?: object;
  className?: string;
  type?: string;
};

export default function InputField({
  placeholder = "",
  errorMsg = "",
  register,
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
      />
      {errorMsg && (
        <div className="text-red-500 text-[10px] py-1 absolute top-[38px] left-1">
          {errorMsg}
        </div>
      )}
    </>
  );
}
