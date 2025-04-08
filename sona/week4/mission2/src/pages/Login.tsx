import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center  max-w-[300px]  m-auto px-2">
      <div className="py-4 flex w-full">
        <p className="cursor-point " onClick={() => navigate("-1")}>
          {"<"}
        </p>
        <h1 className="font-bold text-center w-full pr-3">로그인</h1>
      </div>
      <div className="flex border-1 w-full rounded-xl py-1">
        <img src="/public/ggg-Photoroom.png" alt="" className="w-11" />
        <div className="w-full text-center pr-12 text-sm">구글 로그인</div>
      </div>
      <div className="flex items-center gap-2 w-full my-4">
        <div className="border-t border-white grow"></div>
        <span className="text-white text-sm">OR</span>
        <div className="border-t border-white grow"></div>
      </div>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        className="inputField"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="inputField"
      />

      <button className="text-sm">로그인</button>
    </div>
  );
}
