import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";

function Main () {
    const {isDark} = useTheme();

    return (
        <main className={clsx("m-3")}>
            <p className={clsx(isDark && 'text-white')}>
                Press the button to switch between light and dark mode.<br />
                Now {isDark ? 'Dark Mode' : 'Light Mode'}
            </p>
        </main>
    )
}

export default Main;