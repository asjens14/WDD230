function saveTodo(todo){
    const toDoList = getTodoList();

    toDoList.push(todo);//pushes task to list
    localStorage.setItem('toDoList', JSON.stringify(toDoList));//turn list into a string
}

function deleteTodo(id){
    const toDoList = getTodoList();

    const updatedTodos = toDoList.filter(todo => todo.id != id);//filters list
    localStorage.setItem('toDoList', JSON.stringify(updatedTodos));
}

function getTodoList(){
    const todoListString = localStorage.getItem('toDoList');//retrieves list from local storage
    let todoList = [];

    if (todoListString){
        todoList = JSON.parse(todoListString);//parse the JSON string into the array
    }

    return todoList;
}

export default{
    saveTodo,
    getTodoList,
    deleteTodo
}