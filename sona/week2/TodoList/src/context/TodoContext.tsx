import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
  todo: TTodo[];
  done: TTodo[];
  addTodo: (text: string) => void;
  doneTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todo, setTodo] = useState<TTodo[]>([]);
  const [done, setDone] = useState<TTodo[]>([]);

  const addTodo = (text: string): void => {
    const newTodo: TTodo = { id: Date.now(), title: text };
    setTodo((pre) => [...pre, newTodo]);
  };

  const doneTodo = (todoItem: TTodo): void => {
    setTodo((pre) => pre.filter((t) => t.id !== todoItem.id));
    setDone((pre) => [...pre, todoItem]);
  };

  const deleteTodo = (todoItem: TTodo): void => {
    setDone((pre) => pre.filter((t) => t.id !== todoItem.id));
  };

  return (
    <TodoContext.Provider value={{ todo, done, addTodo, doneTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): ITodoContext => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
