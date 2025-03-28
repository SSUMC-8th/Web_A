import { savedArray } from "../interfaces/savedArray";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ITodoContext{
    todos: savedArray[],
    done: savedArray[],
    completeTodo: (todo: savedArray) => void,
    deleteTodo: (todo: savedArray) => void,
    addTodo: (text: string) => void,
}

const TodoContext = createContext<ITodoContext|undefined>(undefined);

export const TodoProvider = ({children}: PropsWithChildren)=>{
    const [todos, setTodos] = useState<savedArray[]>([]);
    const [done, setDoneTodos] = useState<savedArray[]>([]);

    const addTodo = (text: string):void => {
        const newTodo:savedArray={id: Date.now(), text};
            setTodos((prevTodos):savedArray[] => [...prevTodos,newTodo]);
    }

    const completeTodo = (todo: savedArray):void => {
        setTodos((prevTodos):savedArray[] => prevTodos.filter((t):boolean => t.id !== todo.id));    
        setDoneTodos((prevDoneTodos):savedArray[] => [...prevDoneTodos, todo]);
    }

    const deleteTodo = (todo: savedArray):void => {
        setDoneTodos((prevDoneTodos):savedArray[] => prevDoneTodos.filter((t):boolean => t.id !== todo.id));
    }
    return (<TodoContext.Provider 
        value={{todos, done, addTodo, completeTodo, deleteTodo}}
    >
        {children}
        </TodoContext.Provider>
    );
};
export const useTodo = (): ITodoContext =>{
    const context = useContext(TodoContext);
    if(!context){
        throw new Error("Must Cover With TodoProvider");    
    }
    return context;
}