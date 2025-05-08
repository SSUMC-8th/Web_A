import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface AuthLinkProps {
    to: string;
    children: React.ReactNode;
}

function AuthLink({ to, children }: AuthLinkProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                clsx(
                    'text-base transition hover:text-indigo-600',
                    isActive && 'text-indigo-700 font-bold',
                )
            }
        >
            {children}
        </NavLink>
    );
}

export default AuthLink;
