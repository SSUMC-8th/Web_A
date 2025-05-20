import { useAuth } from '#/context/AuthContext';

import AuthLinks from './ui/AuthLinks';
import NavLogo from './ui/NavLogo';
import SearchBar from './ui/SearchBar';
import UserMenu from './ui/UserMenu';

interface NavbarProps {
  toggleSidebar?: () => void;
}

function Navbar({ toggleSidebar }: NavbarProps) {
  const { accessToken } = useAuth();

  return (
    <nav className="relative z-20 flex items-center justify-between h-20 gap-6 p-4 pr-8 text-black bg-white">
      <div className="flex items-center gap-3">
        <button
          className="mr-4 text-2xl xl:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <NavLogo />
      </div>

      <div className="flex items-center gap-4">
        <SearchBar />
        {accessToken ? <UserMenu /> : <AuthLinks />}
      </div>
    </nav>
  );
}

export default Navbar;
