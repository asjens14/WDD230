//code for table of contents
//will automatically update index.html
const links = [
    {
        label: "Week 1",
        url: "Week1/week1.html"
    }
];

links.forEach(displayLinks);

//format: <li><a href="">week#</a></li><br>
function displayLinks(links){
    document.getElementById("links").innerHTML += "<li><a href=\"" + links.url + "\">" + links.label + "</a></li><br>";
    console.log(document.getElementById("links").innerHTML);
}