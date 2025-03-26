import { TTodo } from "../types/todo";
import Button from "./Button";

interface TodoListItemProps {
  item: TTodo;
  onClick: (todo: TTodo) => void;
  isDone: boolean;
}
export default function TodoListItem({
  item,
  onClick,
  isDone,
}: TodoListItemProps) {
  console.log(item);
  console.log(isDone);
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{item.title}</span>
      <Button color={isDone ? "red" : "green"} onClick={() => onClick(item)}>
        {isDone ? "삭제" : "완료"}
      </Button>
    </li>
  );
}
