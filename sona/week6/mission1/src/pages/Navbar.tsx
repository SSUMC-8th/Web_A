import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="flex gap-2 justify-end mt-2 pr-2">
        sdfsdf
        <Link to={"/login"}>
          <div className="custom-btn pt-[2px]">login</div>
        </Link>
        <Link to={"/signup"}>
          <div className="custom-btn pt-[2px]">sign up</div>
        </Link>
        <Link to={"/my"}>
          <div className="custom-btn pt-[2px]">myPage</div>
        </Link>
      </div>
    </>
  );
}
