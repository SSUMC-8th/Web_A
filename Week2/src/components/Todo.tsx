import ToDoList from "./Todo/ToDoList";
import ToDoForm from "./Todo/ToDoForm";

import ToDoHeader from "./Todo/ToDoHeader";
import Navbar from "./Navigation";
import { useTodo } from "../context/ToDo/useTodo";

const Todo = () => {
  const { toDos, doneToDos, handleCompleteBtn, handleDeleteBtn } = useTodo();

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="todo-container">
        <ToDoHeader />
        <ToDoForm />
        <div className="render-container">
          <ToDoList
            title="할 일"
            toDos={toDos}
            buttonLabel="완료"
            buttonColor="#28a745"
            onClick={handleCompleteBtn}
          />
          <ToDoList
            title="완료"
            toDos={doneToDos}
            buttonLabel="삭제"
            buttonColor="#dc3545"
            onClick={handleDeleteBtn}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
