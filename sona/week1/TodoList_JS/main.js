"use strict";
const title = document.querySelector("#title"); //input
const todoForm = document.querySelector("#todoForm"); // form제출
const todoResult = document.querySelector("#todo-task"); // 해야할 일
const doneResult = document.querySelector("#done-task"); //해낸 일

const result = [];
//제출
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleValue = title.value.trim();
  result.push(titleValue);
  if (titleValue) {
    renderTask(titleValue);
    title.value = "";
  }
});

//할 일
const renderTask = (titleValue) => {
  const liNode = document.createElement("li");
  liNode.className = "liNode";
  const liTxt = document.createTextNode(titleValue);

  const btnNode = document.createElement("button");
  btnNode.className = "btn doneBtn";
  const btnTxt = document.createTextNode("완료");
  btnNode.appendChild(btnTxt);
  btnNode.setAttribute("type", "button");

  liNode.appendChild(liTxt);
  liNode.appendChild(btnNode);
  todoResult.appendChild(liNode);

  //완료
  btnNode.addEventListener("click", (e) => {
    doneResult.appendChild(liNode);
    btnNode.textContent = "삭제";
    btnNode.className = "btn deleteBtn";
    //삭제
    btnNode.addEventListener("click", () => {
      liNode.remove();
    });
  });
};
