import { Link } from 'react-router-dom';

function NavLogo() {
    return (
        <Link
            to="/"
            className="mr-8 text-3xl italic font-extrabold text-gray-900 transition hover:text-indigo-600"
        >
            Movie Archive
        </Link>
    );
}

export default NavLogo;
