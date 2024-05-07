interface ITodoList {
    id: number;
    name: string;
    completed: boolean;
}

class TodoList implements ITodoList{
    id: number;
    name: string;
    completed: boolean;
    todoList: ITodoList[];
    constructor(todoList: ITodoList[]){
        this.id = 0;
        this.name = '';
        this.completed = false;
        this.todoList = todoList;
    }
    renderJob = () =>{
        const center = document.getElementById('center') as HTMLDivElement;
        let text = ``;
        if(this.todoList.length === 0){
            return center.innerHTML = '';
        }
        this.todoList.forEach(item =>{
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
        })
    }
    deleteJob = (value: number) =>{
        this.todoList.map(item =>{
            if(item.id === value){
                this.todoList.splice(1, 1)
            }
        })
    }
    createJob = (value: string) =>{
        this.todoList.push({id: Math.floor(Math.random() * 10000000), name: value, completed: false});
    }
    deleteAll = () =>{
        this.todoList = [];
    }
}
const todoList = new TodoList(JSON.parse(localStorage.getItem("todoList") || '[]'));
todoList.renderJob();

const addTodo = () =>{
    const input = document.getElementById('new-todo-input') as HTMLInputElement;
    if(input.value === ''){
        alert('Không được để trống');
        return
    }
    todoList.createJob(input.value);
    todoList.renderJob();
    input.value = '';
    localStorage.setItem("todoList", JSON.stringify(todoList.todoList));
}

const deletes = (value: number) =>{
    if(todoList.todoList.length === 1){
        todoList.deleteAll();
    }else{
        todoList.deleteJob(value);
    }
    todoList.renderJob();
    localStorage.setItem("todoList", JSON.stringify(todoList.todoList));
}
const deleteAll=() =>{
    if (confirm("Bạn có chắc chắn muốn xóa tất cả công việc?")){
        localStorage.removeItem('todoList');
    }
 }
