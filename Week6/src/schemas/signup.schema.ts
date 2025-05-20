import { z } from 'zod';

import { loginSchema } from './login.schema';

export const signupSchema = loginSchema
  .extend({
    passwordCheck: loginSchema.shape.password,
    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFields = z.infer<typeof signupSchema>;
