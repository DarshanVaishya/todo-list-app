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
		updateTodoClass(todo);
	} else if (item.classList[1] === "deleteBtn") {
		todo.classList.add("fall");
		todo.addEventListener("transitionend", todo.remove);
		deleteTodoItem(todo);
	}
});

function loadTodos() {
	let todos = getStoredTodos();
	for (let [todo, isCompleted] of Object.entries(todos)) {
		addTodo(undefined, todo, isCompleted);
	}
}
loadTodos();
function addTodo(event, text = undefined, completed = "") {
	if (event) event.preventDefault();
	if (event && !todoInput.value) return;
	let todo = `
  <div class="todo ${completed}">
		<li class="item">${text ?? todoInput.value}</li>
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
	let todos = getStoredTodos();
	todos[todo] = "";
	saveToStorage(todos);
}

function deleteTodoItem(todo) {
	let todos = getStoredTodos();
	delete todos[todo.children[0].innerText];
	saveToStorage(todos);
}

function updateTodoClass(todo) {
	let todos = getStoredTodos();
	let current = todo.children[0].innerText;
	todos[current] = todos[current] === "" ? "checked" : "";
}

function getStoredTodos() {
	let todos = JSON.parse(localStorage.getItem("todos"));
	return todos;
}

function saveToStorage(todos) {
	localStorage.setItem("todos", JSON.stringify(todos));
}
