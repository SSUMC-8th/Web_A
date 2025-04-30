import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface MovieLinkProps {
    children: string;
    to: string;
}

function MovieLink({ children, to }: MovieLinkProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                clsx(
                    'hover:text-indigo-600 text-gray-700',
                    isActive &&
                        'font-bold text-indigo-700 underline underline-offset-4',
                )
            }
        >
            {children}
        </NavLink>
    );
}

export default MovieLink;
