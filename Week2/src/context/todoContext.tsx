/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ITodo } from "../types/todo";

interface IToDoContext {
  toDos: ITodo[];
  doneToDos: ITodo[];
  addToDo: (text: string) => void;
  handleCompleteBtn: (todo: ITodo) => void;
  handleDeleteBtn: (todo: ITodo) => void;
}

export const ToDoContext = createContext<IToDoContext | undefined>(undefined);

export const ToDoProvider = ({ children }: PropsWithChildren) => {
  const [toDos, setToDos] = useState<ITodo[]>([]);
  const [doneToDos, setDonToDos] = useState<ITodo[]>([]);

  const addToDo = (text: string): void => {
    const newTodos: ITodo = { id: Date.now(), text };
    setToDos((prev) => [...prev, newTodos]);
  };

  const handleCompleteBtn = (todo: ITodo): void => {
    setToDos((prev) => prev.filter((item) => item.id !== todo.id));
    setDonToDos((prev) => [...prev, todo]);
  };

  const handleDeleteBtn = (todo: ITodo): void => {
    setDonToDos((prev) => prev.filter((item) => item.id !== todo.id));
  };

  return (
    <ToDoContext.Provider
      value={{
        toDos,
        doneToDos,
        addToDo,
        handleCompleteBtn,
        handleDeleteBtn,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(ToDoContext);
  // 컨텍스트가 없는 경우 처리
  if (!context) {
    throw new Error(
      "useToDo는 반드시 ToDoProvider 내부에서 사용되어야 합니다."
    );
  }
  // 컨텍스트가 있는 경우
  return context;
};
