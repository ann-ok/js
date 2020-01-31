function addNewLi() {
    var text = document.getElementById("inp").value;
    if (!(text === "undefined" || text === null || text ===  ""))
    {
        var li = document.createElement("li");
        li.innerText = text;
        list.append(li);
    }
}