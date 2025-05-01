const todoContainer = document.getElementById('todo-container') as HTMLFormElement;
const todoInput = document.getElementById('todo-container_input') as HTMLInputElement;
const todoButton = document.getElementById('todo-container_button');
const ongoingList= document.getElementById('render-container-ongoing') as HTMLUListElement;
const doneList= document.getElementById('render-container-done')as HTMLUListElement;;

interface savedArray{
    text: string,
    id: number,
}

let todos: savedArray[] = []; //할 일 저장 배열
let donetodos: savedArray[] = [];;//완료 저장 배열


const savedDoneList = localStorage.getItem("donetodos");//새로고침 시 저장된 목록 
const savedTodoList = localStorage.getItem("todos");//저장된 할 일 목록

//할 일 추가
function addTodo(event:SubmitEvent){
    event.preventDefault();
    const newTodo:string = todoInput.value;
    const newTodoObj={
        text: newTodo,
        id: Date.now(),
    };
    
    todos.push(newTodoObj);
    todoInput.value = "";
    todoListup(newTodoObj);
    saveTodo();
}

//저장
function saveTodo(){
    localStorage.setItem("todos", JSON.stringify(todos));
}
function saveDone(){
    localStorage.setItem("donetodos", JSON.stringify(donetodos));
}

//할 일 목록 생성
function todoListup(newTodoObj: {text:string, id: number}){
    const newtodoList = document.createElement('li');
    newtodoList.classList.add("listline");
    newtodoList.id = newTodoObj.id.toString();//newtodoList의 id는 HtmlElement의 id속성이라 string 형식만 가능하다
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

//완료 목록 생성
function doneListup(event: MouseEvent){
    const doneBtn = event.target as HTMLButtonElement; ;
    const doneLi = doneBtn.parentElement as HTMLLIElement;
    const doneSpan= doneLi.querySelector('span') as HTMLSpanElement;
    todos = todos.filter((todo) => todo.id !== parseInt(doneLi.id));//할 일 목록에서 삭제
    donetodos.push({
        text: doneSpan.innerText,
        id:parseInt(doneLi.id),
    });//완료 목록에 추가
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

//삭제
function deleteDone(event: Event){
    const eraseBtn = event.target as HTMLButtonElement;
    const eraseList = eraseBtn.parentElement as HTMLLIElement;
    donetodos = donetodos.filter((done) => done.id !== parseInt(eraseList.id));
    eraseList.remove();
    saveDone();
}

//새로 고침 시 완료 목록 불러오기
function createDoneList(doneObj: { text: string, id: number }) {
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

//새로고침 시 저장된 배열 불러오기
if(savedDoneList){
    const parsedDone = JSON.parse(savedDoneList);
    donetodos = parsedDone;
    parsedDone.forEach(createDoneList);
}
if(savedTodoList){
    const parsedTodos = JSON.parse(savedTodoList);
    todos = parsedTodos;
    parsedTodos.forEach(todoListup);
}

//폼 제출 시 할 일 추가
todoContainer.addEventListener('submit', addTodo);