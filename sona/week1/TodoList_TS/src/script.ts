const todoInput = document.querySelector("#todo-input") as HTMLInputElement;
const todoForm = document.querySelector("#todo-form") as HTMLFormElement;
const todoItem = document.querySelector("#todo-item") as HTMLUListElement; //result
const doneItem = document.querySelector("#done-item") as HTMLUListElement;

type Todo = {
  id: number;
  text: string;
};

let TodoTasks: Todo[] = []; //빈 배열
let doneTasks: Todo[] = []; // 빈 배열

const renderTask = (): void => {
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

//text처리
const getTodoText = (): string => {
  return todoInput.value.trim();
};

//할 일 추가 처리 함수
const addTodo = (text: string): void => {
  TodoTasks.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTask();
};

// <li class="container-content" id="result">
// <p>매튜</p>
// <button class="btn">완료</button>
// </li>

const createNode = (todo: Todo, isDone: boolean): HTMLElement => {
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
  } else {
    btn.textContent = "완료";
    btn.style.backgroundColor = "green";
  }

  btn.addEventListener("click", () => {
    if (isDone) {
      deleteTask(todo);
    } else {
      completeTask(todo);
    }
  });
  liNode.appendChild(pNode);
  liNode.appendChild(btn);
  return liNode;
};

//할 일 상태 변경
const completeTask = (todo: Todo): void => {
  TodoTasks = TodoTasks.filter((t): boolean => t.id !== todo.id);
  doneTasks.push(todo);
  renderTask();
};

//완료된 할 일 삭제 함수
const deleteTask = (done: Todo): void => {
  doneTasks = doneTasks.filter((t) => t.id !== done.id);
  renderTask();
};

//폼 제출
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = getTodoText();
  console.log(text);
  if (text) {
    addTodo(text);
  }
});

renderTask();
