import { TTodo } from "../types/todo";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  title: string;
  onClick: (todo: TTodo) => void;
  todo: TTodo[];
  isDone: boolean;
}
export default function TodoList({
  title,
  todo,
  onClick,
  isDone,
}: TodoListProps) {
  console.log(todo);
  console.log(title);
  const todoItem = todo.map((item, idx) => {
    return (
      <TodoListItem key={idx} item={item} onClick={onClick} isDone={isDone} />
    );
  });

  return (
    <>
      <div className="render-container__section">
        <h2 className="render-container__title">{title}</h2>
        <ul id="todo-list" className="render-container__list">
          {todoItem}
        </ul>
      </div>
    </>
  );
}
