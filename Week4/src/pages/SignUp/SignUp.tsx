import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { postSignup } from '../../apis/auth';

const schema = z
    .object({
        email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
        password: z
            .string()
            .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
            .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
        passwordCheck: z
            .string()
            .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
            .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
        name: z.string().min(1, { message: '이름을 입력해주세요.' }),
    })
    .refine((data) => data.password === data.passwordCheck, {
        path: ['passwordCheck'],
        message: '비밀번호가 일치하지 않습니다.',
    });

type FormFields = z.infer<typeof schema>;

function SignUp() {
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<FormFields>({
        defaultValues: {
            email: '',
            password: '',
            passwordCheck: '',
            name: '',
        },
        resolver: zodResolver(schema),
        mode: 'onBlur',
    });

    const email = watch('email');
    const password = watch('password');
    const passwordCheck = watch('passwordCheck');
    const name = watch('name');

    const isStep1Valid = email && !errors.email;
    const isStep2Valid =
        password && passwordCheck && !errors.password && !errors.passwordCheck;
    const isStep3Valid = name && !errors.name;

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const { passwordCheck, ...rest } = data;
        const response = await postSignup(rest);
        console.log(response);
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
                        <>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="이메일을 입력해주세요"
                                className={`w-full px-2 py-1 text-black border-2 rounded-md ${
                                    errors?.email
                                        ? 'border-red-500 bg-red-200'
                                        : ''
                                }`}
                            />
                            {errors.email && (
                                <div className="text-sm text-red-500">
                                    {errors.email.message}
                                </div>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <input
                                {...register('email')}
                                type="email"
                                disabled
                                className="w-full px-2 py-1 text-gray-400 bg-gray-100 border-2 rounded-md"
                            />

                            <input
                                {...register('password')}
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                className={`w-full px-2 py-1 text-black border-2 rounded-md ${
                                    errors?.password
                                        ? 'border-red-500 bg-red-200'
                                        : ''
                                }`}
                            />
                            {errors.password && (
                                <div className="text-sm text-red-500">
                                    {errors.password.message}
                                </div>
                            )}

                            <input
                                {...register('passwordCheck')}
                                type="password"
                                placeholder="비밀번호를 다시 한 번 입력해주세요."
                                className={`w-full px-2 py-1 text-black border-2 rounded-md ${
                                    errors?.passwordCheck
                                        ? 'border-red-500 bg-red-200'
                                        : ''
                                }`}
                            />
                            {errors.passwordCheck && (
                                <div className="text-sm text-red-500">
                                    {errors.passwordCheck.message}
                                </div>
                            )}
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <img
                                src="/profile.png"
                                alt="profile"
                                className="w-16 h-16 mx-auto rounded-full"
                            />
                            <input
                                {...register('name')}
                                type="text"
                                placeholder="닉네임을 입력해주세요."
                                className={`w-full px-2 py-1 text-black border-2 rounded-md ${
                                    errors?.name
                                        ? 'border-red-500 bg-red-200'
                                        : ''
                                }`}
                            />
                            {errors.name && (
                                <div className="text-sm text-red-500">
                                    {errors.name.message}
                                </div>
                            )}
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

export default SignUp;
