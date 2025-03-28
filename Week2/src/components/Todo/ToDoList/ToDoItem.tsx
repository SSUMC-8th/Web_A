import { ToDoItemProps } from "../../../types/todo";

const ToDoItem = ({
  toDo,
  onClick,
  buttonLabel,
  buttonColor,
}: ToDoItemProps) => (
  <li className="render-container__item">
    <span className="render-container__item-text">{toDo.text}</span>
    <button
      onClick={() => onClick(toDo)}
      style={{ backgroundColor: buttonColor }}
      className="render-container__item-button"
    >
      {buttonLabel}
    </button>
  </li>
);

export default ToDoItem;
