export interface ITodo {
  id: number;
  text: string;
}

export interface ToDoItemProps {
  toDo: ITodo;
  onClick: (todo: ITodo) => void;
  buttonLabel: string;
  buttonColor: string;
}
