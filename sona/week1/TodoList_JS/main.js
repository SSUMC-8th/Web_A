"use strict";
let title = document.querySelector("#title"); //input
let todoForm = document.querySelector("#todoForm"); // form제출
let todoResult = document.querySelector("#result1"); // 해야할 일
let doneResult = document.querySelector("#result2"); //해낸 일

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let titleValue = title.value.trim();
  if (titleValue) {
    todoResult.innerHTML += `<li class="liNode">
    ${titleValue}
    <button class="btn doneBtn"  type="button">완료</button>
  </li>`;
    title.value = "";
  }
});

//완료 누르면
todoResult.addEventListener("click", (e) => {
  if (e.target.classList.contains("doneBtn")) {
    let li = e.target.parentElement;
    let todoText = li.firstChild.textContent.trim(); //해야할 일 content빼옴
    // console.log(todoText);
    doneResult.innerHTML += `<li class="liNode">
      ${todoText}
      <button class="btn deleteBtn" type="button">삭제</button>
    </li>`;
    li.remove();
  }
});
//삭제 누르면
doneResult.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    let li2 = e.target.parentElement;
    // // console.log(doneText);
    li2.remove();
  }
});
