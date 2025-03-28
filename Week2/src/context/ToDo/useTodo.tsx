import { useContext } from "react";
import { ToDoContext } from "./todoContext";

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
