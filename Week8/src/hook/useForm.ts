import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T; // { email: '', password: '' }

  // 값이 올바른 지 검증하는 함수
  // keyof ? "email" | "password" 객체 타입의 키들을 유니언 문자열로 뽑아내는 것
  validate: (value: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 사용자가 입력값을 바꿀 때 실행 되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      // computed property 문법
      [name]: text,
    });
  };

  // Blur 처리 함수
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일, 패스워드 인풋 가져오기
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      handleChange(name, event.target.value);
    };

    const onBlur = () => {
      handleBlur(name);
    };

    return { value, onChange, onBlur };
  };

  // values가 변경될 때마다 에러 검증 로직이 실행된다.
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
