import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

function NavLogo() {
    return (
        <Link
            to={ROUTES.HOME}
            className="mr-8 text-3xl italic font-extrabold text-gray-900 transition hover:text-indigo-600"
        >
            DolDolDol
        </Link>
    );
}

export default NavLogo;
