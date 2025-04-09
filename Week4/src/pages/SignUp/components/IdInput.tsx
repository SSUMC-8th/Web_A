import clsx from "clsx";
import { ReactNode } from "react";

interface IdInputProps {
  step: number;
}

function IdInput({ step }: IdInputProps): ReactNode {
  return (
    <div className={clsx("w-full", step !== 1 && "hidden")}>
      <button className="box-border relative flex items-center justify-center w-full p-2 overflow-hidden border-2 rounded-md">
        <img
          alt="google-logo"
          src="/google-logo.png"
          className="absolute w-8 contain left-2"
        />
        구글 로그인
      </button>

      <p>OR</p>

      <input
        type="email"
        placeholder="이메일을 입력해주세요"
        className="w-full px-2 py-1 text-black border-2 rounded-md"
      />
    </div>
  );
}

export default IdInput;
