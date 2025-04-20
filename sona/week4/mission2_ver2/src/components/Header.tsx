import { useMatch, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const signup = useMatch("/signup");
  const login = useMatch("/login");
  const profile = useMatch("/profile");
  const signUpPassword = useMatch("/signUpPassword");
  console.log(signup);
  const titles = [
    { match: login, title: "로그인" },
    { match: signup, title: "회원가입" },
    { match: profile, title: "회원가입" },
    { match: signUpPassword, title: "회원가입" },
  ];

  const headerMatch = login || signup || profile || signUpPassword;
  const getTitle = () => {
    // match가 null이 아닌 것의 title을 반환, null이면 undefined
    const matchedTitle = titles.find(({ match }) => match)?.title;
    return matchedTitle;
  };
  if (headerMatch) {
    return (
      <>
        <div className="py-4 flex w-full">
          <p className="cursor-point " onClick={() => navigate(-1)}>
            {"<"}
          </p>
          <h1 className="font-bold text-center w-full pr-3">{getTitle()}</h1>
        </div>
      </>
    );
  }
}
