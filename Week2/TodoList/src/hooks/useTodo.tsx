import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo는 TodoProvider 내에서만 사용하세요');
  return context;
};