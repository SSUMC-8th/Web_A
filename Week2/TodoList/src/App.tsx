import { useState, useRef } from 'react'
import './App.css'

function App() {

  type Todo = {
    id: number,
    content: string
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([])
  const [dones, setDones] = useState<Todo[]>([])

  const pushTodo = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if(!inputRef.current) return;

    setTodos([...todos, {id: Date.now(), content: inputRef.current.value }])
    inputRef.current.value = ''
  }

  const completeTodo = (id: number): void => {
    const data = todos.find(todo => todo.id === id)
    if (!data) return;
    const newTodos = todos.filter(todo => todo.id !== id)

    setTodos(newTodos)
    setDones([...dones, data])
  }

  const removeDone = (id: number):void => {
    const newDones = dones.filter(done => done.id !== id)
    setDones(newDones)
  }

  return (
    <>
      <div>
        <h1>Todo List</h1>

        <form onSubmit={pushTodo}>
          <input ref={inputRef} type='text' placeholder='할 일' required />
          <button type='submit'>ㄱㄱ</button>
        </form>

        <div className='flex'>
          <div>
            <h2>할거</h2>
            <ul>
              {todos.map(todo => {
                return (
                  <li key={todo.id} className='flex'>
                    <p>{todo.content}</p>
                    <button onClick={()=>completeTodo(todo.id)}>완료</button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h2>한거</h2>
            <ul>
              {dones.map(done => {
                return (
                  <li key={done.id} className='flex'>
                    <p>{done.content}</p>
                    <button onClick={()=>removeDone(done.id)}>삭제</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
