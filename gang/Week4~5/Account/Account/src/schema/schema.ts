import { z } from "zod";

export const RegistrationSchema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호가 일치하지 않습니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요" }),
    avatar: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export const LpSchema = z.object({
  title: z.string().min(1, { message: "이름을 입력해주세요" }),
  content: z.string().min(1, { message: "내용을 입력해주세요" }),
  thumbnail: z.string(),
  tags: z.array(z.string()).min(1, { message: "태그를 하나 이상 입력해야 합니다." }),
  published: z.boolean(),
});
