import { Link } from 'react-router-dom';
import ROUTES from '../../../../constants/routes';
import { IMAGE_PATH } from '../../../../constants/images';

function NavLogo() {
    return (
        <Link to={ROUTES.HOME}>
            <img src={IMAGE_PATH.LOGO} alt="Logo" className="h-14" />
        </Link>
    );
}

export default NavLogo;
