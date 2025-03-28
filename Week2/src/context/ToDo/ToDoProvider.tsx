import { PropsWithChildren, useState } from "react";
import { ITodo } from "../../types/todo";
import { ToDoContext } from "./todoContext";

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
