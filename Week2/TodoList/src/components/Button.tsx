import { useTodo } from "../hooks/useTodo";

type buttonType = {
    type: boolean,
    text: string,
    id: number
}

function Button ({type, text, id} : buttonType) {
    const { completeTodo, removeDone } = useTodo();

    return (
        <button 
            className={`px-3 py-2 text-[#f9f9f9] rounded-[12px] border-none cursor-pointer transition-colors duration-200 ease-in 
            ${type ? 'bg-green-600 hover:bg-[rgb(0,100,0)]' : 'bg-red-600 hover:bg-[rgb(180,0,0)]'}`}
            onClick={() => (type ? completeTodo : removeDone)(id)}
        >
        {text}
        </button>
    )
}

export default Button;