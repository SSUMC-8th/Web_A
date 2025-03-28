import TaskList from "./TaskList";
import { useTodo } from "../hooks/useTodo";
import { TodoType } from "../types/TodoType";

type TodoSectionType = {
    title : string
}

function TodoSection ({title} : TodoSectionType) {
    const {todos, dones} = useTodo();
    const tasks : TodoType[] = title === '할 일' ? todos : dones

    //props drilling : onClcik함수를 Task에서 사용하지 않음. => useContext 필요 
    return(
        <div className='w-full flex flex-col gap-1'>
            <h2 className='text-xl'>{title}</h2>

            <ul className='list-none m-0 p-0 flex flex-col gap-1'>
                {tasks.map(task => {
                return (
                    <li key={task.id} className='m-0 p-0 flex flex-row justify-between items-center border-b border-[#ddd] rounded-[8px] bg-white'>
                        <TaskList type={title === '할 일'} task={task} />
                    </li>
                )
                })}
            </ul>
        </div>
    )
}

export default TodoSection;