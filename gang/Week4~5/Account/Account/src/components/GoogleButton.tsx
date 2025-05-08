const GoogleButton = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          (window.location.href = "http://localhost:8000/v1/auth/google/login")
        }
        className=" flex justify-center items-center gap-2 w-2xs p-4  font-extrabold  text-white bg-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        구글로 로그인
      </button>
    </div>
  );
};

export default GoogleButton;
