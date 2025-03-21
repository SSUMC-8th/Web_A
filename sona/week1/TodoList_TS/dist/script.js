"use strict";
const todoInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
const todoItem = document.querySelector("#todo-item");
const doneItem = document.querySelector("#done-item");
let TodoTasks = [];
let doneTasks = [];
const renderTask = () => {
    todoItem.innerHTML = "";
    doneItem.innerHTML = "";
    TodoTasks.forEach((item) => {
        const li = createNode(item, false);
        todoItem.appendChild(li);
    });
    doneTasks.forEach((item) => {
        const li = createNode(item, true);
        doneItem.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    TodoTasks.push({ id: Date.now(), text });
    todoInput.value = "";
    renderTask();
};
const createNode = (todo, isDone) => {
    const liNode = document.createElement("li");
    liNode.className = "container-content";
    liNode.id = "result";
    const pNode = document.createElement("p");
    pNode.textContent = todo.text;
    const btn = document.createElement("button");
    btn.className = "btn";
    if (isDone) {
        btn.textContent = "삭제";
        btn.style.backgroundColor = "red";
    }
    else {
        btn.textContent = "완료";
        btn.style.backgroundColor = "green";
    }
    btn.addEventListener("click", () => {
        if (isDone) {
            deleteTask(todo);
        }
        else {
            completeTask(todo);
        }
    });
    liNode.appendChild(pNode);
    liNode.appendChild(btn);
    return liNode;
};
const completeTask = (todo) => {
    TodoTasks = TodoTasks.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTask();
};
const deleteTask = (done) => {
    doneTasks = doneTasks.filter((t) => t.id !== done.id);
    renderTask();
};
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = getTodoText();
    console.log(text);
    if (text) {
        addTodo(text);
    }
});
renderTask();
