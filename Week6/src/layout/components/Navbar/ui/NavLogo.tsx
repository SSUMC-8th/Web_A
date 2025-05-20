import { Link } from 'react-router-dom';

import { IMAGE_PATH } from '#/constants/images';
import ROUTES from '#/constants/routes';

function NavLogo() {
  return (
    <Link to={ROUTES.HOME}>
      <img src={IMAGE_PATH.LOGO} alt="Logo" className="h-14" />
    </Link>
  );
}

export default NavLogo;
