import Form from './Form';
import TodoContainer from './TodoContainer';

function Todo () {
    return (
        <div className='absolute top-1/4 w-120 p-10 flex flex-col bg-white rounded-[12px] shadow-md'>
            <h1 className='text-4xl mb-4'>Todo List</h1>

            <Form />

            <TodoContainer />
        </div>
    )
}

export default Todo;