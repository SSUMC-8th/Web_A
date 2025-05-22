import { LoginFields } from '#/schemas/login.schema';

import useLoginForm from '../hooks/useLoginForm';

interface Props {
  mutate: (data: LoginFields) => void;
}

const LoginForm = ({ mutate }: Props) => {
  const { register, handleSubmit, errors, isSubmitting, isValid, onSubmit } =
    useLoginForm(mutate);

  return (
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
        <p className="text-sm text-red-600">{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="비밀번호"
        {...register('password')}
        className="px-2 py-1 border-2 rounded-md"
      />
      {errors.password && (
        <p className="text-sm text-red-600">{errors.password.message}</p>
      )}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-60"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
