import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { LoginFields, loginSchema } from '#/schemas/login.schema';

const useLoginForm = (mutate: (data: LoginFields) => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFields) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    onSubmit,
  };
};

export default useLoginForm;
