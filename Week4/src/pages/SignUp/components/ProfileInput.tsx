import clsx from "clsx";
import { ReactNode } from "react";

interface ProfileInputProps {
  step: number;
}

function ProfileInput({ step }: ProfileInputProps): ReactNode {
  return (
    <div
      className={clsx(
        step !== 3 && "hidden",
        "flex flex-col items-center gap-4"
      )}
    >
      <img src="/profile.png" alt="profile" className="rounded-full" />
      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        className="w-full px-2 py-1 text-black border-2 rounded-md"
      />
    </div>
  );
}

export default ProfileInput;
