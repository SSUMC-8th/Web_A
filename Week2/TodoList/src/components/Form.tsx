import { FormEvent, useRef } from "react";
import { useTodo } from "../hooks/useTodo";

function Form () {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { pushTodo } = useTodo();

    const handleSubmit = (event : FormEvent<HTMLFormElement>) : void => {
      event.preventDefault();

      const text = inputRef.current?.value.trim();
      if (!text) return;

      pushTodo(text)
      if (inputRef.current?.value) inputRef.current.value = ''
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-2 mb-3'>
          <input 
            ref={inputRef} 
            type='text' 
            placeholder='할 일' required 
            className='p-2 flex-1 border border-gray-500 rounded-[6px] outline-none focus:border-black' 
            />
          <button type='submit' className='px-3 py-2 text-[#f9f9f9] bg-green-600 rounded-[12px] border-none cursor-pointer transition-colors duration-200 ease-in hover:bg-[rgb(0,100,0)]'>ㄱㄱ</button>
        </form>
    )
}

export default Form;