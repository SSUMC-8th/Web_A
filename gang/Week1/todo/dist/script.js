"use strict";
const todoContainer = document.getElementById('container');
const todoInput = document.getElementById('input');
const todoButton = document.getElementById('input_button');
const ongoingList = document.getElementById('ongoing_list');
const doneList = document.getElementById('done_list');
;
let todos = [];
let donetodos = [];
const savedDoneList = localStorage.getItem("donetodos");
const savedTodoList = localStorage.getItem("todos");
function addTodo(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    todos.push(newTodoObj);
    todoInput.value = "";
    todoListup(newTodoObj);
    saveTodo();
}
function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function saveDone() {
    localStorage.setItem("donetodos", JSON.stringify(donetodos));
}
function todoListup(newTodoObj) {
    const newtodoList = document.createElement('li');
    newtodoList.classList.add("listline");
    newtodoList.id = newTodoObj.id.toString();
    const newtodoText = document.createElement('span');
    newtodoText.innerText = newTodoObj.text;
    const newtodoButton = document.createElement('button');
    newtodoButton.classList.add("greenbtn");
    newtodoButton.innerText = "완료";
    newtodoButton.addEventListener('click', doneListup);
    newtodoList.appendChild(newtodoText);
    newtodoList.appendChild(newtodoButton);
    ongoingList.appendChild(newtodoList);
}
function doneListup(event) {
    const doneBtn = event.target;
    ;
    const doneLi = doneBtn.parentElement;
    const doneSpan = doneLi.querySelector('span');
    todos = todos.filter((todo) => todo.id !== parseInt(doneLi.id));
    donetodos.push({
        text: doneSpan.innerText,
        id: parseInt(doneLi.id),
    });
    doneLi.remove();
    saveTodo();
    const newdoneList = document.createElement('li');
    newdoneList.classList.add("listline");
    newdoneList.id = doneLi.id.toString();
    const newdoneText = document.createElement('span');
    newdoneText.innerText = doneSpan.innerText;
    const newdoneButton = document.createElement('button');
    newdoneButton.innerText = "삭제";
    newdoneButton.classList.add("redbtn");
    newdoneButton.addEventListener('click', deleteDone);
    newdoneList.appendChild(newdoneText);
    newdoneList.appendChild(newdoneButton);
    doneList.appendChild(newdoneList);
    saveDone();
}
function deleteDone(event) {
    const eraseBtn = event.target;
    const eraseList = eraseBtn.parentElement;
    donetodos = donetodos.filter((done) => done.id !== parseInt(eraseList.id));
    eraseList.remove();
    saveDone();
}
function createDoneList(doneObj) {
    const newdoneList = document.createElement('li');
    newdoneList.classList.add("listline");
    newdoneList.id = doneObj.id.toString();
    const newdoneText = document.createElement('span');
    newdoneText.innerText = doneObj.text;
    const newdoneButton = document.createElement('button');
    newdoneButton.innerText = "삭제";
    newdoneButton.classList.add("redbtn");
    newdoneButton.addEventListener('click', deleteDone);
    newdoneList.appendChild(newdoneText);
    newdoneList.appendChild(newdoneButton);
    doneList.appendChild(newdoneList);
}
if (savedDoneList) {
    const parsedDone = JSON.parse(savedDoneList);
    donetodos = parsedDone;
    parsedDone.forEach(createDoneList);
}
if (savedTodoList) {
    const parsedTodos = JSON.parse(savedTodoList);
    todos = parsedTodos;
    parsedTodos.forEach(todoListup);
}
todoContainer.addEventListener('submit', addTodo);
