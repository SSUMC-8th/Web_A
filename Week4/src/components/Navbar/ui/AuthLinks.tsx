import AuthLink from './AuthLink';

function AuthLinks() {
    return (
        <div className="flex gap-4">
            <AuthLink to="/login">Log in</AuthLink>
            <AuthLink to="/signup">Sign Up</AuthLink>
        </div>
    );
}

export default AuthLinks;
