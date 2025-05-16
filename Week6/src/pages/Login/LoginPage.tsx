import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFields } from '../../schemas/login.schema';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_AUTH } from '../../constants/api';

function LoginPage() {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (accessToken) {
            navigate('/');
        }
    }, [accessToken, navigate]);

    const onSubmit = async (data: LoginFields) => {
        await login(data);
    };

    const navigateToGoogleLogin = () => {
        window.location.href =
            import.meta.env.VITE_SERVER_API_URL + API_AUTH.GOOGLE_LOGIN;
    };

    return (
        <main className="relative flex justify-center">
            <div className="absolute flex flex-col items-center gap-2 text-center w-80 top-8">
                <div className="relative flex items-center justify-center w-full">
                    <button onClick={goBack} className="absolute left-2">
                        {'<'}
                    </button>
                    <h2>로그인</h2>
                </div>

                <button
                    className="box-border relative flex items-center justify-center w-full p-2 overflow-hidden border-2 rounded-md"
                    onClick={navigateToGoogleLogin}
                >
                    <img
                        alt="google-logo"
                        src="/google-logo.png"
                        className="absolute w-8 contain left-2"
                    />
                    구글 로그인
                </button>

                <p>OR</p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col w-full gap-2"
                >
                    <input
                        type="email"
                        placeholder="아이디"
                        {...register('email')}
                        className="px-2 py-1 text-black border-2 rounded-md"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600">
                            {errors.email.message}
                        </p>
                    )}

                    <input
                        type="password"
                        placeholder="비밀번호"
                        {...register('password')}
                        className="px-2 py-1 border-2 rounded-md"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-600">
                            {errors.password.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-60"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </main>
    );
}

export default LoginPage;
