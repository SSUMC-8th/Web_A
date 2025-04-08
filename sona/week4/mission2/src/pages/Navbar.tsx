import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="flex gap-3 justify-end">
        <Link to={"/login"}>
          <div className="text-white bg-amber-500 px-2 rounded-2xl pb-1 h-8 ">
            Login
          </div>
        </Link>
        <button className="text-white bg-amber-500 px-2 rounded-2xl pb-1 h-8 ">
          signUp
        </button>
      </div>
    </>
  );
}
