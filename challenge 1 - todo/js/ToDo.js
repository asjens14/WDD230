import utils from './utils.js';
import ls from './ls.js';

document.querySelector('#addBtn').onclick = newTodo;
document.querySelector('#active').onclick = filters;
document.querySelector('#all').onclick = filters;

//document.querySelector('.check').onclick = toggleCompleted;//testing
document.querySelector('#complete').onclick = filters;


//0
function loadTodos(){
    const todoList = ls.getTodoList();
    
    todoList.forEach(todo => {
        const el = createTodoElement(todo);//get list from local storage
        addToList(el);
    })
}

//1
function newTodo(){
    const todo = createTodo();//create todo
    const todoDiv = createTodoElement(todo);//creates the element
    addToList(todoDiv);//adds it to list
    ls.saveTodo(todo);//imported from ls.js
}
//2
function createTodo(){
    const input = document.querySelector('#todoInput');
    const newTodo = {id: Date.now(), content: input.value, completed: false}//create object
    console.log(newTodo);
    input.value = '';
    return newTodo;
}
//3
//create the HTML elements for the todo list
function createTodoElement(todo){
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //complete btn
    const completeBtn = document.createElement('button');
    completeBtn.setAttribute('value', '');
    completeBtn.classList.add('completeBtn');
    //completeBtn.classList.add('checked');
    completeBtn.onclick = toggleCompleted;

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
//4
function addToList(todoDiv){
    document.querySelector('#todos').appendChild(todoDiv);
}

function toggleCompleted(e){
    //complete button has completeBtn class
    //use gettodos with the button id

    //

    const btnID = e.currentTarget.nextElementSibling.nextElementSibling.getAttribute('data-id');
    console.log(btnID);

    const todoList = ls.getTodoList();
    let selected = todoList.filter(todo => todo.id == btnID);
    //selected.completed = true;    
    //console.log(selected[0].completed);
    console.log(selected[0]);

    console.log("todolist length")
    console.log(todoList.length)
    const btnText = e.currentTarget.innerText;

    for(let i = 0; i < todoList.length; i++){
        if(todoList[i].id == btnID){
            if(todoList[i].completed == false){
                todoList[i].completed = true;
                e.currentTarget.innerText = 'X';
            }else if(todoList[i].completed == true){
                todoList[i].completed = false;
                e.currentTarget.innerText = '';
            }
        }
    }
    
    var toToggle = e.currentTarget.nextElementSibling;
    console.log(toToggle)
    toToggle.classList.toggle('completed');
    console.log('toggled');
    console.log(toToggle);
    


    localStorage.setItem('toDoList', JSON.stringify(todoList));        
}

//event handlers
function deleteTodo(e){
    const btn = e.currentTarget;
    console.log(e.currentTarget);
    ls.deleteTodo(btn.getAttribute('data-id'));
    document.querySelector('#todos').innerHTML = '';
    loadTodos();
}

function filters(e){
    //clear list
    document.querySelector('#todos').innerHTML = '';


    //declare variables
    let filteredTodos = [];
    const allTodos = ls.getTodoList();    

    //check filter to apply
    if (e.currentTarget.id == 'active'){
        filteredTodos = utils.activeFilter(allTodos);
    }else if(e.currentTarget.id == 'all'){
        filteredTodos = allTodos;
    }else if(e.currentTarget.id == 'complete'){
        filteredTodos = utils.completeFilter(allTodos);
    }

    //draw list
    filteredTodos.forEach(todo =>{
        const el = createTodoElement(todo);
        addToList(el);        
    })
}