//const { default: ls } = require("../challenge 1 - todo/js/ls");
//import utils from './utils.js'
import ls from './ls.js';

window.addEventListener("load", loadEntries);
document.querySelector('#addBtn').onclick = renderEntryPage;
document.querySelector('#back').onclick = back;

document.querySelector('#clear').onclick = clear;
function clear(){
    if(confirm("This will clear all entries. Do you want to procede?")){
        localStorage.clear();
    }
}

function back(){
    document.querySelector('#entries').innerHTML = '';
    toggleClasses();
    loadEntries();

}

//load entries - 0
function loadEntries(){
    console.log("load entries");
    const entryList = ls.getEntryList();
    
    
    entryList.forEach(entry => {
        console.log("created");
        const el = createEntryElement(entry);//get list from local storage
        addToList(el);
    })
}

//new entry - 1
function newEntry(){
    const entry = createEntry();
    const entryDiv = createEntryElement(entry);
    
    
    addToList(entryDiv);
    ls.saveEntry(entry);
    toggleClasses();
    document.querySelector('#entries').innerHTML = '';
    loadEntries();
}

//create entry object - 2
function createEntry(){
    console.log('creating entry');
    const input = document.querySelector('#content');
    const entryTitle = document.querySelector('#title');
    let d = new Date();
    let full = d.toLocaleDateString();
    
    const newEntry = {date: full, id: Date.now(),title: entryTitle.value,content: input.value};
    console.log(newEntry);
    return newEntry;
}

//create entry element - 3 --add delete button?
function createEntryElement(entry){
    console.log('creating entry element');
    //entry div
    const entryDiv = document.createElement('div');//create entry div
    entryDiv.classList.add('entry');

    //content - date, title,
    const entryDate = document.createElement('span');//create span element for date
    entryDate.innerText = entry.date;

    const entryTitle = document.createElement('div');//create title element
    entryTitle.innerText = entry.title;
    entryTitle.classList.add('entryTitle');
    entryTitle.setAttribute('data-id', entry.id);
    //entryTitle.setAttribute('data-content', entry.content);
    //entryTitle.setAttribute('data-title', entry.content);
        entryTitle.onclick = renderEditPage;

    //delete btn
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id-2', entry.id);
    deleteBtn.classList.add('entryDeleteBtn');
    deleteBtn.innerText = "X";
    deleteBtn.onclick = deleteEntry;

    entryDiv.appendChild(entryDate);
    entryDiv.appendChild(entryTitle);
    entryDiv.appendChild(deleteBtn);

    return entryDiv;
}

function toggleClasses(){
    const backBtn = document.querySelector('#back');
    backBtn.classList.toggle('hidden');

    const wrapper = document.querySelector('#wrapper');
    wrapper.classList.toggle('hidden');
    //wrapper.innerHTML = "";

    const edit = document.querySelector('#edit');
    edit.classList.toggle('hidden');

    const newEntryBtn = document.querySelector('#addBtn');
    newEntryBtn.classList.toggle('hidden');
}

//delete an entry
function deleteEntry(e){
    const btn = e.currentTarget;
    ls.deleteEntry(btn.getAttribute('data-id-2'));
    document.querySelector('#entries').innerHTML = '';
    loadEntries();
}

//show entry page
function renderEntryPage(){
    toggleClasses();

    edit.innerHTML = 
    "<input type='textbox' id='title' placeholder='Title'><br>" +
    "<textarea id='content' rows='10' cols='40'></textarea><br>" +
    "<button id='save'>Save</button>";

    document.querySelector('#save').onclick = newEntry;    
}

//allows user to edit an entry
function renderEditPage(e){
    const btn = e.currentTarget;
    editEntry(btn.getAttribute('data-id'));
}
function editEntry(id){
    toggleClasses();
    const entryList = ls.getEntryList();
    console.log('editEntry');
    console.log(entryList);

    const entryToEdit = entryList.filter(entry => entry.id == id);//find entry to edit
    console.log('entryToEdit');
    console.log(entryToEdit);
    
    const title = entryToEdit[0].title;//fill title text
    console.log('title:');
    console.log(title);

    const content = entryToEdit[0].content;//fill entry text
    console.log('content');
    console.log(content);
    //const entryID = entryToEdit.id;
    
    edit.innerHTML =
    "<input type='textbox' id='title2' placeholder='Title' value='"+title+"'><br>"+
    "<textarea id='content2' rows='10' cols='40'>"+content+"</textarea><br>"+
    "<button id='saveEdits'>Save</button>"+
    "<button id='delete' data-id-3='"+id+"'>Delete Entry</button>";
    document.querySelector('#saveEdits').onclick = saveEdits;
    document.querySelector('#delete').onclick = deleteEdit;
}

//delete entry from edit page
function deleteEdit(e){
    const deleteBtn = e.currentTarget;
    ls.deleteEntry(deleteBtn.getAttribute('data-id-3'));
    toggleClasses();
    document.querySelector('#entries').innerHTML = '';
    loadEntries();
}

//save new edits to entry
function saveEdits(){
    const title = document.querySelector('#title2');
    console.log(title);
    console.log(title.value);

    const content = document.querySelector('#content2');
    console.log(content);
    console.log(content.value);

    const id = document.querySelector('#delete').getAttribute('data-id-3');
    console.log(id);

    const entryList = ls.getEntryList();
    console.log('save edits entrylist');
    console.log(entryList);
    console.log(entryList.length);
    let entries = [];
    for (let i = 0; i < entryList.length; i++){
        if (entryList[i].id == id){
            entryList[i].title = title.value;
            entryList[i].content = content.value;
        }
        //entries.push(entryList[i]);
    }
    console.log("entry array");
    console.log(entryList);
    localStorage.setItem('entryList', JSON.stringify(entryList));
}

//edit entry - same as creating an entry, but will save instead of creating a new one
//have one function that does both?


//add to list
function addToList(entryDiv){
    console.log('adding to list');
    document.querySelector('#entries').appendChild(entryDiv);
    //document.querySelector('#entries').innerHTML = '';
    //loadEntries();
}

//