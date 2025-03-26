import { useState } from "react";
import Button from "./Button";
import { useTodo } from "../context/TodoContext";

export default function TodoForm() {
  const [input, setInput] = useState<string>("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const title = input.trim();

    if (title) {
      addTodo(title);
      setInput("");
    }
  };

  return (
    <form
      id="todo-form"
      className="todo-container__form"
      onSubmit={handleSubmit}
    >
      <input
        value={input}
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
        onChange={(e) => setInput(e.target.value)}
      />
      <Button color="green">할일추가</Button>
    </form>
  );
}
