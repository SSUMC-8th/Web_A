import ROUTES from '../../../constants/routes';
import AuthLink from './AuthLink';

function AuthLinks() {
    return (
        <div className="flex gap-4">
            <AuthLink to={ROUTES.LOGIN}>Log in</AuthLink>
            <AuthLink to={ROUTES.SIGNUP}>Sign Up</AuthLink>
        </div>
    );
}

export default AuthLinks;
