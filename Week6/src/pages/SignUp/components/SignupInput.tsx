import clsx from 'clsx';
import { useState } from 'react';
import { IMAGE_PATH } from '../../../constants/images';

interface SignupInputProps {
    field: {
        name: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
        ref: React.Ref<HTMLInputElement>;
    };
    type: string;
    text: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    error?: {
        message?: string;
    };
}

function SignupInput({
    field,
    type,
    text,
    onKeyDown,
    error,
}: SignupInputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = (): void => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <div className="relative">
                <input
                    {...field}
                    type={
                        type !== 'password'
                            ? type
                            : showPassword
                              ? 'text'
                              : 'password'
                    }
                    placeholder={text}
                    onKeyDown={onKeyDown}
                    className={clsx(
                        `w-full px-2 py-1 text-black border-2 rounded-md`,
                        error && 'border-red-500 bg-red-200',
                    )}
                />
                {type === 'password' && (
                    <img
                        src={
                            showPassword
                                ? IMAGE_PATH.EYE
                                : IMAGE_PATH.CLOSED_EYE
                        }
                        alt="eye"
                        onClick={togglePasswordVisibility}
                        className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-2 h-3/4"
                    />
                )}
            </div>
            {error && (
                <div className="text-sm text-red-500">{error.message}</div>
            )}
        </>
    );
}

export default SignupInput;
