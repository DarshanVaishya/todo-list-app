"use strict";

const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".addBtn");
const todoItems = document.querySelector(".todo-items");

addBtn.addEventListener("click", addTodo);

todoItems.addEventListener("click", (event) => {
	let item = event.target;
	let todo = item.parentElement;

	if (item.classList[1] === "checkBtn") {
		todo.classList.toggle("checked");
	} else if (item.classList[1] === "deleteBtn") {
		todo.classList.add("fall");
		todo.addEventListener("transitionend", todo.remove);
		deleteTodoItem(todo);
	}
});

function loadTodos() {
	let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
	todos.forEach((todo) => {
		addTodo(undefined, todo);
	});
}
loadTodos();

function addTodo(event, text = undefined) {
	if (event) event.preventDefault();
	if (event && !todoInput.value) return;
	let todo = `
  <div class="todo"> <li class="item">${text ?? todoInput.value}</li>
    <button class="btn checkBtn">
      <i class="fas fa-check"></i>
    </button>
    <button class="btn deleteBtn">
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>`;
	if (event) storeTodoItem(text ?? todoInput.value);
	todoItems.innerHTML += todo;
	todoInput.value = "";
	todoInput.focus();
}

function storeTodoItem(todo) {
	let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoItem(todo) {
	let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
	let index = todos.indexOf(todo);

	todos.splice(index, 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}
