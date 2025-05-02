import NavLogo from './ui/NavLogo';
import MovieLinks from './ui/MovieLinks';
import AuthLinks from './ui/AuthLinks';

function Navbar() {
    return (
        <nav className="relative flex items-center justify-between gap-6 px-6 py-4 border-b border-gray-400">
            <div className="flex items-end">
                <NavLogo />

                <MovieLinks />
            </div>

            <div>
                <AuthLinks />
            </div>
        </nav>
    );
}

export default Navbar;
