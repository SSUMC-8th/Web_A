import { ITodo } from "../../../types/todo";
import ToDoItem from "./ToDoItem";

interface ITodoListProps {
  title: string;
  toDos: ITodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (todo: ITodo) => void;
}

const TodoList = ({
  title,
  toDos,
  buttonColor,
  buttonLabel,
  onClick,
}: ITodoListProps) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {toDos.map((todo) => (
          <ToDoItem
            key={todo.id}
            toDo={todo}
            onClick={onClick}
            buttonLabel={buttonLabel}
            buttonColor={buttonColor}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
