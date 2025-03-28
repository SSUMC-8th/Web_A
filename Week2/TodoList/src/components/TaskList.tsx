import { TodoType } from "../types/TodoType";
import Button from "./Button";

type TaskListType = {
    type: boolean,
    task: TodoType
}
//type ? 초록색 : 빨간색
function TaskList ({type, task} : TaskListType) {
    return (
        <>
            <p className='flex-1 m-0'>{task.content}</p>
            <Button 
                type={type}
                text={type ? '완료' : '삭제'}
                id={task.id}
                >
            </Button>
        </>
    )
}

export default TaskList;