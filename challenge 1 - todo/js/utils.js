function activeFilter(todos){
    return todos.filter(todo =>{
        return !todo.completed;
    })
}

function completeFilter(todos){
    return todos.filter(todo =>{
        return todo.completed;
    })
}

export default{
    activeFilter,
    //"activeFilter": activeFilter;
    completeFilter
}