import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('ㄴㄴ안됨')
    return context;
}