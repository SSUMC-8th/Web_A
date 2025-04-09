import { ChangeEvent, useEffect, useState } from 'react';

//useFromProps
interface useFormProps<T> {
    initialValue: T;
    validate: (values: T) => Record<keyof T, string>;
}

//initailValue 와 validate함수를 인자로 받아온다. value의 타입을 제네릭 <T>로 받아온다.
//initailValue : input 항목들이 들어있는 객체
//validate : input별 검증함수
function useForm<T>({ initialValue, validate }: useFormProps<T>) {
    const [values, setValues] = useState<T>(initialValue);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values,
            [name]: text,
        });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    const getInputProps = (name: keyof T) => {
        const value = values[name];

        const onChange = (e: ChangeEvent<HTMLInputElement>) =>
            handleChange(name, e.target.value);

        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur };
    };

    useEffect(() => {
        const newErros = validate(values);
        setErrors(newErros);
    }, [validate, values]);

    return { values, errors, touched, getInputProps };
}

export default useForm;
