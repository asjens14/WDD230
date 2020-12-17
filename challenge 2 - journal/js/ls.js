//save entry
function saveEntry(entry){
    const entryList = getEntryList();
    entryList.unshift(entry);
    localStorage.setItem('entryList', JSON.stringify(entryList));
}

//delete entry
function deleteEntry(id){
    const entryList = getEntryList();

    const updatedEntries = entryList.filter(entry => entry.id != id);
    localStorage.setItem('entryList', JSON.stringify(updatedEntries));
}

//get entry list
function getEntryList(){
    const entryListString = localStorage.getItem('entryList');//retrieves list from local storage
    console.log('entryliststring: ');
    console.log(entryListString);
    
    let entryList = [];

    if (entryListString){
        entryList = JSON.parse(entryListString);//parse the JSON string into the array
        console.log('entryList:');
        console.log(entryList);
    }

    console.log('entryList');
    console.log(entryList);

    const entryListRev = entryList;
    return entryListRev;
}

/*function saveEdits(){
    
}*/
export default{
    saveEntry,
    getEntryList,
    deleteEntry
}