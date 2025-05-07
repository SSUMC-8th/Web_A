import { useMatch, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const signup = useMatch("/signup");
  const login = useMatch("/login");
  const my = useMatch("/my");
  const titles = [
    { match: login, title: "로그인" },
    { match: signup, title: "회원가입" },
  ];

  const headerMatch = login || signup || my;
  const getTitle = () => {
    // match가 null이 아닌 것의 title을 반환, null이면 undefined
    const matchedTitle = titles.find(({ match }) => match)?.title;
    return matchedTitle;
  };
  if (headerMatch) {
    return (
      <>
        <div className="py-4 flex w-full">
          <button className="cursor-pointer" onClick={() => navigate(-1)}>
            {"<"}
          </button>
          <h1 className="font-bold text-center w-full pr-3">{getTitle()}</h1>
        </div>
      </>
    );
  }
}
