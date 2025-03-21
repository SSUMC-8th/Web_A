"use strict";
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todoTasks = [];
let doneTasks = [];
const renderTasks = () => {
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
const completeTodo = (todo) => {
    todoTasks = todoTasks.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, isDone) => {
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
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = todoInput.value.trim();
    todoTasks.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
});
renderTasks();
