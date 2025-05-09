import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { postSignup } from '../../apis/auth';
import SignupInput from './components/SignupInput';
import { signupSchema } from '../../schemas/signup.schema';
import { IMAGE_PATH } from '../../constants/images';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/routes';

type FormFields = z.infer<typeof signupSchema>;

function SignupPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<FormFields>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordCheck: '',
            name: '',
        },
    });

    // 스텝별 유효성 검사 대상 필드
    const stepFields: (keyof FormFields)[][] = [
        ['email'],
        ['password', 'passwordCheck'],
        ['name'],
    ];
    const lastStep = stepFields.length;

    const handleNext = async () => {
        const valid = await trigger(stepFields[step - 1]);
        if (!valid) return;

        if (step < lastStep) {
            setStep((prev) => Math.min(prev + 1, lastStep));
        }

        handleSubmit(onSubmit)();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter') return;

        if (step < lastStep) {
            e.preventDefault();
            handleNext();
        }
    };

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const { passwordCheck, ...rest } = data;
        await postSignup(rest);

        alert('회원가입이 성공적으로 완료되었습니다!');
        navigate(ROUTES.LOGIN);
    };

    return (
        <main className="relative flex justify-center">
            <div className="absolute flex flex-col items-center gap-2 text-center w-80 top-8">
                <header className="relative flex items-center justify-center w-full">
                    <button
                        className="absolute left-2"
                        onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                    >
                        {'<'}
                    </button>
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
                            <p className="mb-2 text-sm text-left text-gray-500">
                                이메일: {watch('email')}
                            </p>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <SignupInput
                                        field={field}
                                        type="password"
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
                                src={IMAGE_PATH.PROFILE}
                                alt="profile"
                                className="w-20 h-20 mx-auto rounded-full"
                            />
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <SignupInput
                                        field={field}
                                        type="text"
                                        text="닉네임을 입력해주세요"
                                        onKeyDown={handleKeyDown}
                                        error={errors.name}
                                    />
                                )}
                            />
                        </>
                    )}

                    {/* 버튼 */}
                    <button
                        type={step === lastStep ? 'submit' : 'button'}
                        onClick={step === lastStep ? undefined : handleNext}
                        disabled={isSubmitting}
                        className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-60"
                    >
                        {step === lastStep ? '완료' : '다음'}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default SignupPage;
