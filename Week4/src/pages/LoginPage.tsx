import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { userSignInInformation, validateSignIn } from '../utils/validate';
import { postSignin } from '../apis/auth';

function LoginPage() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const { values, errors, touched, getInputProps } =
        useForm<userSignInInformation>({
            initialValue: {
                email: '',
                password: '',
            },
            validate: validateSignIn,
        });

    const isFormValid =
        Object.values(errors).every((error) => error === '') &&
        Object.values(values).every((value) => value !== '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) return;

        try {
            const response = await postSignin(values);
            console.log('로그인 성공:', response);

            //토큰 저장
            localStorage.setItem('accessToken', response.data.accessToken);
            navigate('/my');
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('이메일 또는 비밀번호가 잘못되었습니다.');
        }
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

                <button className="box-border relative flex items-center justify-center w-full p-2 overflow-hidden border-2 rounded-md">
                    <img
                        alt="google-logo"
                        src="/google-logo.png"
                        className="absolute w-8 contain left-2"
                    />
                    구글 로그인
                </button>

                <p>OR</p>

                <form
                    className="flex flex-col w-full gap-2"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        placeholder="아이디"
                        {...getInputProps('email')}
                        className="px-2 py-1 text-black border-2 rounded-md"
                    />
                    {touched?.email && errors?.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                    )}

                    <input
                        type="password"
                        placeholder="비밀번호"
                        {...getInputProps('password')}
                        className="px-2 py-1 border-2 rounded-md"
                    />
                    {touched?.password && errors?.password && (
                        <p className="text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!isFormValid}
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
