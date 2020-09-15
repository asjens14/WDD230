const links = [
    {
        label: "week 1", url: "../index.html"
    }/*,
    {
        label: "week 2", url: "././index.html"
    },
    {
        label: "week 3", url: "././index.html"
    }*/
];

links.forEach(displayLinks);

//format: <li><a href="">week#</a></li><br>
function displayLinks(links){
    document.getElementById("links").innerHTML += "<li><a href=" + links.url + "\">" + links.label + "</a></li><br>";
}