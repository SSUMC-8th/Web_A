import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";

function Nav () {
    const {isDark, toggleDarkMode} = useTheme();

    return (
        <nav className={clsx("p-3  border-b  flex flex-row justify-between items-center", isDark ? 'border-white' :  'border-gray-800')}>
            <h2 className={clsx("text-xl font-bold", isDark && 'text-white')}>Toggle Dark Mode with UseContext</h2>
            <button className={clsx("p-2 border rounded-lg cursor-pointer", isDark ? 'border-white' :  'border-gray-800')}
            onClick={toggleDarkMode}>{isDark?'🌙':'☀️'}</button>
        </nav>
    )
}

export default Nav;