import { useState } from "react";
import TodoList from "./TodoList";
import { TTodo } from "../types/todo";
import TodoForm from "./TodoForm";

export default function Todo() {
  const [todo, setTodo] = useState<TTodo[]>([]); // 할 배열
  const [done, setDone] = useState<TTodo[]>([]); // 한 배열
  const [input, setInput] = useState<string>(""); //inmput

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const title = input.trim();

    if (title) {
      const newTodo: TTodo = { id: Date.now(), title };
      setTodo((pre): TTodo[] => [...pre, newTodo]);
      setInput("");
    }
  };

  const doneTodo = (todo: TTodo): void => {
    setTodo((pre) => pre.filter((t): boolean => t.id !== todo.id));
    setDone((pre) => [...pre, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDone((pre): TTodo[] => pre.filter((t): boolean => t.id !== todo.id));
  };

  return (
    <>
      <div className="todo-container">
        <h1 className="todo-container__header">SUNA TODO</h1>
        <TodoForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
        <div className="render-container">
          <TodoList title="할 일" todo={todo} onClick={doneTodo} />
          <TodoList title="완료" todo={done} onClick={deleteTodo} />
        </div>
        <div />
      </div>
    </>
  );
}
