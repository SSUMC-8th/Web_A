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

export interface IToDoContext {
  toDos: ITodo[];
  doneToDos: ITodo[];
  addToDo: (text: string) => void;
  handleCompleteBtn: (todo: ITodo) => void;
  handleDeleteBtn: (todo: ITodo) => void;
}
