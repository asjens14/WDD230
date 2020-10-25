import ls from './ls.js';

const btnID = e.currentTarget.nextElementSibling.nextElementSibling.getAttribute('data-id');

const toDoList = ls.getTodoList();
let selected = toDoList.filter(to => toDoList.id == btnID);

for(i = 0; i < toDoList.length; i++){
    if(toDoList[i].id == btnID){
        
    }
}