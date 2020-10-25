//code for table of contents
//will automatically update index.html
const links = [
    {
        label: "Week 1",
        url: "Week1/week1.html"
    },
    {
        label: "Week 2",
        url: "Week2/week2.html"
    },
    {
        label: "Week 3",
        url: "Week3/week3.html"
    },
    {
        label: "Week 4",
        url: "Week4/week4.html"
    },
    {
        label: "Week 5",
        url: "Week5/week5.html"
    },
    {
        label:"Todo List",
        url: "challenge 1 - todo/index.html"
    }
];

links.forEach(displayLinks);

//format: <li><a href="">week#</a></li><br>
function displayLinks(links){
    document.getElementById("links").innerHTML += "<li><a href=\"" + links.url + "\">" + links.label + "</a></li><br>";
    console.log(document.getElementById("links").innerHTML);
}