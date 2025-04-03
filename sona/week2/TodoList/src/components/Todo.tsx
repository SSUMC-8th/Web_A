import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useTodo } from "../context/TodoContext";

export default function Todo() {
  const { todo, done, doneTodo, deleteTodo } = useTodo();

  return (
    <>
      <div className="todo-container">
        <h1 className="todo-container__header">SUNA TODO</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList
            title="할 일"
            todo={todo}
            onClick={doneTodo}
            isDone={false}
          />
          <TodoList
            title="완료"
            todo={done}
            onClick={deleteTodo}
            isDone={true}
          />
        </div>
        <div />
      </div>
    </>
  );
}
