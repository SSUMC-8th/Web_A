import { NavLink } from "react-router-dom";


const LINKS = [
  {to:"" ,label:"Home"},
  {to:"movies/popular", label:"Popular"},
  {to:"movies/now_playing", label:"Now Playing"},
  {to:"movies/top_rated", label:"Top Rated"},
  {to:"movies/upcoming", label:"Upcoming"},
]

const NavBar = () => {
  return (
    <div className="p-2 flex items-center space-x-6">
      {LINKS.map(({ to, label}) =>(
      <NavLink
      key={to}
      to={to}
      className={({isActive}) =>{return isActive ? "shadow-2xl rounded-xl p-3 bg-orange-400 transition-all" : "shadow-2xl rounded-xl p-3 bg-orange-200 transition-all"
      }}>
      {label}
      </NavLink>
      ))}
    </div>
    )
  } 

export default NavBar;
