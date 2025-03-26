import clsx from "clsx";
import Main from "./Main";
import Nav from "./Nav";
import { useTheme } from "../hooks/useTheme";

function Home () {
    const {isDark} = useTheme()

    return (
        <div className={clsx('w-screen h-screen', isDark && 'bg-[#242424]')}>
            <Nav></Nav>

            <Main></Main>
        </div>
    )
}

export default Home