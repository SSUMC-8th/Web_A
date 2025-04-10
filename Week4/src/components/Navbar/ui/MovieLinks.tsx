import { navItems } from '../constants/NavItems';
import MovieLink from './MovieLink';

function MovieLinks() {
    return (
        <div className="flex gap-4">
            {navItems.map(({ label, path }) => (
                <MovieLink key={path} to={`/movies/${path}`}>
                    {label}
                </MovieLink>
            ))}
        </div>
    );
}

export default MovieLinks;
