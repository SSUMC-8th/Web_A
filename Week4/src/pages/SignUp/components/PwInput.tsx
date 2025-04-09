import clsx from "clsx";

interface PwInputProps {
  step: number;
}

function PwInput({ step }: PwInputProps) {
  return (
    <div className={clsx(step !== 2 && "hidden")}>
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        className="w-full px-2 py-1 text-black border-2 rounded-md"
      />
      <input
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요"
        className="w-full px-2 py-1 text-black border-2 rounded-md"
      />
    </div>
  );
}

export default PwInput;
