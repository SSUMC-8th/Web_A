import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className = "text-left">
      <h1 className='text-5xl text-left p-2 text-gray-700'> Something's Wrong 😒 </h1>
      <div
      onClick={()=> navigate(`/`)}
      className="inline-block shadow-md cursor-pointer bg-[#f59871]  text-white p-2 m-3 rounded-lg hover:bg-[#c4896b] disabled:bg-gray-300 transition-all duration-200 disabled;bg-gray-300 disabled:cursor-not-allowed"
      >
      Go To Home
      </div>
    </div>
  )
}

export default NotFound