export type UserSigninInformation = {
  email: string;
  password: string;
};

export default function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };

  const emailValid = (email: string) => {
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegx.test(email);
  };

  //숫자 +영문 조합8
  const passwordVaild = (password: string) => {
    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegx.test(password);
  };

  if (!emailValid(values.email)) {
    errors.email = "올바른 이메일을 입력해주세요";
  }
  if (!passwordVaild(values.password)) {
    errors.password = "비밀번호는 영문,숫자 조합 8글자 이상으로 입력 해주세요";
  }
  return errors;
}

export function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}
