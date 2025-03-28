import { savedArray } from "../interfaces/savedArray";

interface TodoListProps{
  title: string;
  todos: savedArray[];
  buttonLabel: string;  
  buttonColor: string;
  onClick: (todo:savedArray)=> void;
}

const TodoList = ({
  title,
  todos,
  buttonColor,
  buttonLabel,
  onClick,
}: TodoListProps)=>{
  return (
    <div className="render-container-box">
    <h2 >{title}</h2>
    <ul>
        {todos?.map((todo) => (
            <li className="listline" key={todo.id}>
                <span>{todo.text}</span>
                <button 
                  className="btn" style={{
                  backgroundColor:buttonColor ,
                  }} 
                  onClick={():void=> onClick(todo)}>{buttonLabel}</button>
            </li>
        ))}
    </ul>
</div>
  )
}

export default TodoList;
