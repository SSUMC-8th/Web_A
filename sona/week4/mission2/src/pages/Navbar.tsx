import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="flex gap-2 justify-end mt-2 pr-2">
        <Link to={"/login"}>
          <div className="custom-btn pt-[2px]">login</div>
        </Link>
        <div className="custom-btn pt-[2px]">sign up</div>
      </div>
    </>
  );
}
