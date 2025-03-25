import TodoSection from "./TodoSection"

function TodoContainer () {
    return (
        <div className='flex justify-around gap-3'>
            <TodoSection title='할 일' />
            <TodoSection title='끝남' />
        </div>
    )
}

export default TodoContainer