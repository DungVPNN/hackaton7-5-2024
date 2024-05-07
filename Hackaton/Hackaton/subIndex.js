"use strict";
class TodoList {
    constructor(todoList) {
        this.renderJob = () => {
            const center = document.getElementById('center');
            let text = ``;
            if (this.todoList.length === 0) {
                return center.innerHTML = '';
            }
            this.todoList.forEach(item => {
                text += `
            <div class="form-check">
                <p>${item.name}</p>
                <div class="icon">
                <input onclick="isCompleted(${item.id})" type="checkbox">
                <i onclick="edits(${item.id})" class="fa-solid fa-pen"></i>
                <i onclick="deletes(${item.id})" class="fa-solid fa-trash"></i>
            </div>
        </div>
            `;
                center.innerHTML = text;
            });
        };
        this.deleteJob = (value) => {
            this.todoList.map(item => {
                if (item.id === value) {
                    this.todoList.splice(1, 1);
                }
            });
        };
        this.createJob = (value) => {
            this.todoList.push({ id: Math.floor(Math.random() * 10000000), name: value, completed: false });
        };
        this.deleteAll = () => {
            this.todoList = [];
        };
        this.id = 0;
        this.name = '';
        this.completed = false;
        this.todoList = todoList;
    }
}
const todoList = new TodoList(JSON.parse(localStorage.getItem("todoList") || '[]'));
todoList.renderJob();
const addTodo = () => {
    const input = document.getElementById('new-todo-input');
    if (input.value === '') {
        alert('Please enter your job');
        return;
    }
    todoList.createJob(input.value);
    todoList.renderJob();
    input.value = '';
    localStorage.setItem("todoList", JSON.stringify(todoList.todoList));
};
const deletes = (value) => {
    if (todoList.todoList.length === 1) {
        todoList.deleteAll();
    }
    else {
        todoList.deleteJob(value);
    }
    todoList.renderJob();
    localStorage.setItem("todoList", JSON.stringify(todoList.todoList));
};
