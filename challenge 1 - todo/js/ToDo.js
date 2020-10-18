import utils from './utils.js';
import ls from './ls.js';

document.querySelector('#addBtn').onclick = newTodo;

function loadTodos(){
    const todoList = ls.getTodoList();
    
    todoList.forEach(todo => {
        const el = createTodoElement(todo);//get list from local storage
        addToList(el);
    })
}

function newTodo(){
    const todo = createTodo();//create todo
    const todoDiv = createTodoElement(todo);//creates the element
    addToList(todoDiv);//adds it to list
    ls.saveTodo(todo);//imported from ls.js
}

function createTodo(){
    const input = document.querySelector('#todoInput');
    const newTodo = {id: Date.now(), content: input.value, completed: false}//create object
    input.value = '';
    return newTodo;
}

//create the HTML elements for the todo list
function createTodoElement(todo){
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //complete btn
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('completeBtn');

    //todo content
    const todoContent = document.createElement('div');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todoContent');

    //delete btn
    const deleteBnt = document.createElement('button');
    deleteBnt.setAttribute('data-id', todo.id);
    deleteBnt.classList.add('todoDeleteBtn');
    deleteBnt.innerText = "X";
    deleteBnt.onclick = deleteTodo;

    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(deleteBnt);

    return todoDiv;
}

function addToList(todoDiv){
    document.querySelector('#todos').appendChild(todoDiv);
}

//event handlers
function deleteTodo(e){
    const btn = e.currentTarget;
    ls.deleteTodo(btn.getAttribute('data-id'));
    document.querySelector('#todos').innerHTML = '';
    loadTodos();
}