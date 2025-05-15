import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { postSignup } from '../../apis/auth';
import SignupInput from './components/SignupInput';
import { signupSchema } from '../../schemas/signup.schema';

type FormFields = z.infer<typeof signupSchema>;

function SignupPage() {
    const [step, setStep] = useState<number>(1);

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        trigger,
        control,
    } = useForm<FormFields>({
        defaultValues: {
            email: '',
            password: '',
            passwordCheck: '',
            name: '',
        },
        resolver: zodResolver(signupSchema),
    });

    const { email, password, passwordCheck, name } = watch();

    const isStep1Valid = email && !errors.email;
    const isStep2Valid =
        password && passwordCheck && !errors.password && !errors.passwordCheck;
    const isStep3Valid = name && !errors.name;
    // const handleNext = async (fieldsToValidate: (keyof FormFields)[]) => {
    //     const valid = await methods.trigger(fieldsToValidate);
    //     if (valid) {
    //         setStep((prev) => prev + 1);
    //     }
    // };

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const { passwordCheck, ...rest } = data;
        const response = await postSignup(rest);
        console.log(response);
    };

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (step === 1) {
                const isValid = await trigger('email');
                if (isValid) setStep(2);
            } else if (step === 2) {
                const isValid = await trigger(['password', 'passwordCheck']);
                if (isValid) setStep(3);
            }
        }
    };

    return (
        <main className="relative flex justify-center">
            <div className="absolute flex flex-col items-center gap-2 text-center w-80 top-8">
                <header className="relative flex items-center justify-center w-full">
                    <button className="absolute left-2">{'<'}</button>
                    <h2>회원가입</h2>
                </header>

                <form
                    className="flex flex-col w-full gap-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {step === 1 && (
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <SignupInput
                                    field={field}
                                    type="email"
                                    text="이메일을 입력해주세요"
                                    onKeyDown={handleKeyDown}
                                    error={errors.email}
                                />
                            )}
                        />
                    )}

                    {step === 2 && (
                        <>
                            {email}
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <SignupInput
                                        field={field}
                                        type={'password'}
                                        text="비밀번호를 입력해주세요"
                                        onKeyDown={handleKeyDown}
                                        error={errors.password}
                                    />
                                )}
                            />
                            <Controller
                                name="passwordCheck"
                                control={control}
                                render={({ field }) => (
                                    <SignupInput
                                        field={field}
                                        type="password"
                                        text="비밀번호를 한 번 더 입력해주세요"
                                        onKeyDown={handleKeyDown}
                                        error={errors.passwordCheck}
                                    />
                                )}
                            />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <img
                                src="/profile.png"
                                alt="profile"
                                className="mx-auto rounded-full"
                            />
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <SignupInput
                                        field={field}
                                        type="name"
                                        text="닉네임을 입력해주세요"
                                        error={errors.name}
                                    />
                                )}
                            />
                        </>
                    )}

                    <button
                        type={step === 3 ? 'submit' : 'button'}
                        disabled={
                            isSubmitting ||
                            (step === 1 && !isStep1Valid) ||
                            (step === 2 && !isStep2Valid) ||
                            (step === 3 && !isStep3Valid)
                        }
                        onClick={() => {
                            if (step === 1 && isStep1Valid) setStep(2);
                            else if (step === 2 && isStep2Valid) setStep(3);
                        }}
                        className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-60"
                    >
                        {step === 3 ? '완료' : '다음'}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default SignupPage;
