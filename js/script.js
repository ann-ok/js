btn_elem.onclick = function() {
    var inp = document.getElementById("inp");
    if (!(inp.value === "undefined" || inp.value === null || inp.value ===  "")) {
        var parent = document.getElementById("list");

        var li = document.createElement("li");
        li.innerText = inp.value;

        var del = document.createElement("input");
        del.type = "button";
        del.value = "X";
        del.id = parent.getElementsByTagName('li').length;
        del.addEventListener('click', () => li.remove());

        li.appendChild(del);
        parent.appendChild(li);

        inp.value = "";
    }
};