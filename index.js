const todoForm = document.getElementById("todo-form")
const todoInput = document.getElementById("todo-input")
const todoDesc = document.getElementById("todo-desc")
const todoList = document.getElementById("todo-list")

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

document.addEventListener('DOMContentLoaded', () => {
    displayTodos();
});

function addTodo(event) {
    event.preventDefault();

    const todoText = todoInput.value;
    const todoDescription = todoDesc.value;
    if (todoText === '' || todoDescription === '') return;

    let newTodo = {
        text: todoText,
        description: todoDescription,
        completed: false
    }

    todos.push(newTodo);
    saveTodos();
    displayTodos();

    todoInput.value = '';
    todoDesc.value = '';
}

todoForm.addEventListener('submit', addTodo);

function displayTodos(filter = 'all') {

    todoList.innerHTML = '';

    const filteredToDo = []

    for (let index = 0; index < todos.length; index++) {
        const todo = todos[index]
        const include = filter === "completed" ? todo.completed : filter === "incomplete" ? !todo.completed : true;

        if (include) {
            filteredToDo.push({ todo, index })
        }
    }

    filteredToDo.forEach(({ todo, index }) => {
        const todoItem = document.createElement('li');
        todoItem.className = 'list__container__list__tugas flex__row';
        todoItem.innerHTML = `
            <div class="left__container">
                <h4 style="text-decoration: ${todo.completed ? 'line-through' : 'none'};">${index + 1}.${todo.text}</h4>
                <p style="text-decoration: ${todo.completed ? 'line-through' : 'none'};">${todo.description}</p>
            </div>
            <div class="right__container flex__row center" style="justify-content: end">
                <button onclick="editTodo(${index})" class="button__edit" ${todo.completed ? 'style="background-color: grey;"' : ''}>
                    <img src="src/edit.svg" alt="" />
                </button>
                <button onclick="doneTodo(${index})" class="button__done" ${todo.completed ? 'style="background-color: grey;"' : ''}>
                    <img src="src/check.svg" alt="">
                </button>
                <button onclick="deleteTodo(${index})" class="button__delete">
                    <img src="src/trash.svg" alt="" />
                </button>
            </div>
        `;

        todoList.appendChild(todoItem);
    })
}

function deleteTodo(index) {
    let confir = confirm('Hapus List Ini?', todos[index].text);
    if (confir) {
        todos.splice(index, 1);
        saveTodos();
        displayTodos();
    } else return
}

function doneTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    const filterDrop = document.getElementById('filter-dropdown');
    displayTodos(filterDrop.value);
}

function editTodo(index) {
    const todo = todos[index];
    const todoText = prompt('Edit Todo Text', todo.text);
    const todoDescription = prompt('Edit Todo Description', todo.description);

    if (todoText === '' || todoDescription === '' || todoText === null || todoDescription === null) {
        alert('Tidak Boleh Kosong')
        return
    }

    todos[index] = {
        ...todo,
        text: todoText,
        description: todoDescription
    }

    saveTodos();
    displayTodos();
}

const filterDrop = document.getElementById('filter-dropdown')

filterDrop.addEventListener('change', () => {
    displayTodos(filterDrop.value)
});