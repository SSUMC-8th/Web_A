import { createContext, JSX, PropsWithChildren, useState } from "react"
import { TodoType } from "../types/TodoType"

type TodoContextType = {
    todos : TodoType[],
    dones : TodoType[],
    pushTodo : (text: string) => void,
    completeTodo : (id: number) => void,
    removeDone : (id: number) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children } : PropsWithChildren) : JSX.Element => {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [dones, setDones] = useState<TodoType[]>([])

    const pushTodo = (text: string) : void => {
        const newTodo: TodoType = {id: Date.now(), content: text};
        setTodos([...todos, newTodo])
    }

    const completeTodo = (id: number): void => {
        const data = todos.find(todo => todo.id === id)
        if (!data) return;
        const newTodos = todos.filter(todo => todo.id !== id)

        setTodos(newTodos)
        setDones([...dones, data])
    }

    const removeDone = (id: number):void => {
        const newDones = dones.filter(done => done.id !== id)
        setDones(newDones)
    }

    return (
        <TodoContext.Provider
            value={{ todos, dones, pushTodo, completeTodo, removeDone }}
        >
            {children}
        </TodoContext.Provider>
    )
}