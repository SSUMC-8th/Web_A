import { ChangeEvent, useEffect, useState } from 'react';
interface useFormProps<T> {
    initialValue: T;
    validate: (values: T) => Record<keyof T, string>;
}

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
