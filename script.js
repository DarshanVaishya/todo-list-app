"use strict";

const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".addBtn");
const todoItems = document.querySelector(".todo-items");
const todoFilter = document.querySelector(".todo-filter");

document.addEventListener("DOMContentLoaded", loadTodos);
addBtn.addEventListener("click", addTodo);
todoItems.addEventListener("click", (event) => {
	let item = event.target;
	let todo = item.parentElement;

	if (item.classList[1] === "checkBtn") {
		todo.classList.toggle("checked");
		updateTodoClass(todo);
	} else if (item.classList[1] === "deleteBtn") {
		todo.classList.add("fall");
		todo.addEventListener("transitionend", (e) => {
			if (todo !== e.target) return;
			todo.remove();
		});
		deleteTodoItem(todo);
	}
});

todoFilter.addEventListener("change", () => {
	let todos = document.querySelectorAll(".todo");
	switch (todoFilter.value) {
		case "all":
			todos.forEach((todo) => (todo.style.display = "flex"));
			break;
		case "completed":
			todos.forEach((todo) => {
				if (!todo.classList.contains("checked")) todo.style.display = "none";
				else todo.style.display = "flex";
			});
			break;
		case "remaining":
			todos.forEach((todo) => {
				if (todo.classList.contains("checked")) todo.style.display = "none";
				else todo.style.display = "flex";
			});
			break;
	}
});

function addTodo(event, text = undefined, completed = "") {
	if (event) event.preventDefault();
	if (event && !todoInput.value) return;

	let todo = document.createElement("div");
	todo.classList.add("todo", "hidden");
	if (completed) todo.classList.add(completed);
	todo.innerHTML = `
		<li class="item">${text ?? todoInput.value}</li>
    <button class="btn checkBtn">
      <i class="fas fa-check"></i>
    </button>
    <button class="btn deleteBtn">
      <i class="fas fa-trash-alt"></i>
    </button>`;
	if (event) storeTodoItem(text ?? todoInput.value);
	todoItems.append(todo);
	setTimeout(() => todo.classList.toggle("hidden"), 10);

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
	saveToStorage(todos);
}

function getStoredTodos() {
	return JSON.parse(localStorage.getItem("todos")) ?? {};
}

function saveToStorage(todos) {
	localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
	let todos = getStoredTodos();
	for (let [todo, isCompleted] of Object.entries(todos)) {
		addTodo(undefined, todo, isCompleted);
	}
}
