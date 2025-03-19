const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
};

let todoTasks: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todoTasks.forEach((todo) => {
        const todoElement = createTodoElement(todo, false);
        todoList.appendChild(todoElement);
    });

    doneTasks.forEach((todo) => {
        const doneElement = createTodoElement(todo, true);
        doneList.appendChild(doneElement);
    });
};

const completeTodo = (todo: Todo): void => {
    todoTasks = todoTasks.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};

const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__list-item');

    const text = document.createElement('p');
    text.classList.add('render-container__list-item-text');
    text.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__list-item-button');

    button.textContent = isDone ? '삭제' : '완료';
    button.classList.add(isDone ? 'red' : 'green');
    button.addEventListener('click', () => isDone ? deleteTodo(todo) : completeTodo(todo));


    li.appendChild(text);
    li.appendChild(button);
    
    return li;
};

todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();

    const text: string = todoInput.value.trim();

    todoTasks.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
});

renderTasks();