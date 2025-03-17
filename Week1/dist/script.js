"use strict";
const $todoInput = document.querySelector("#todo-input");
const $todoForm = document.querySelector("#todo-form");
const $todoList = document.querySelector("#todo-list");
const $doneList = document.querySelector("#done-list");
let todos = [];
let doneTasks = [];
const renderTask = () => {
  $doneList.innerHTML = "";
  $todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = createTodoElement(todo, false);
    $todoList.appendChild(li);
  });
  doneTasks.forEach((todo) => {
    const li = createTodoElement(todo, true);
    $doneList.appendChild(li);
  });
};
const getToDoList = () => {
  return $todoInput.value.trim();
};
const addToDO = (text) => {
  todos.push({ id: Date.now(), text });
  $todoInput.value = "";
  renderTask();
};
const completeTask = (todo) => {
  todos = todos.filter((item) => item.id !== todo.id);
  doneTasks.push(todo);
  renderTask();
};
const deleteTodo = (todo) => {
  doneTasks = doneTasks.filter((item) => item.id !== todo.id);
  renderTask();
};
const createTodoElement = (todo, isDone) => {
  const li = document.createElement("li");
  li.classList.add("work-container__item");
  li.textContent = todo.text;
  const button = document.createElement("button");
  button.classList.add("work_container__item-btn");
  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#dc3545";
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745";
  }
  button.addEventListener("click", () => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTask(todo);
    }
  });
  li.appendChild(button);
  return li;
};
$todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = getToDoList();
  if (text) {
    addToDO(text);
  }
});
renderTask();
