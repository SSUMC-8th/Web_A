import { z } from "zod";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호가 일치하지 않습니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요" }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export default schema;
