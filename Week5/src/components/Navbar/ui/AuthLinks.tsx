import ROUTES from '../../../constants/routes';
import { useAuth } from '../../../context/AuthContext';
import AuthLink from './AuthLink';

function AuthLinks() {
    const { accessToken } = useAuth();

    return (
        <div className="flex gap-4">
            {accessToken ? (
                <AuthLink to={ROUTES.MYPAGE}>My Page</AuthLink>
            ) : (
                <>
                    <AuthLink to={ROUTES.LOGIN}>Log in</AuthLink>
                    <AuthLink to={ROUTES.SIGNUP}>Sign Up</AuthLink>
                </>
            )}
        </div>
    );
}

export default AuthLinks;
