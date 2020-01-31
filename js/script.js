let button_add = document.getElementById("button-add");
button_add.addEventListener('click', addItem);

function addItem() {
    let input = document.getElementById("input-text");
    if (!(input.value === "undefined" || input.value === null || input.value ===  "")) {
        let list_root = document.getElementById("list-items");
        let list_item = document.createElement("li");
        let item_div = document.createElement("div");
        let item_text = document.createElement("span");

        item_text.innerText  = input.value;

        let btn_edit = document.createElement("input");
        btn_edit.type = "button";
        btn_edit.value = "ред.";
        btn_edit.addEventListener('click', function() { editItem(list_item, item_div, item_text)});

        let btn_delete = document.createElement("input");
        btn_delete.type = "button";
        btn_delete.value = "X";
        btn_delete.addEventListener('click', () => list_item.remove());

        item_div.appendChild(item_text);
        item_div.appendChild(btn_edit);
        item_div.appendChild(btn_delete);

        list_item.appendChild(item_div);
        list_root.appendChild(list_item);

        input.value = "";
    }
}

function editItem(item, item_div, item_text) {
    let close_action = function () {
        item_input.remove();
        btn_ok.remove();
        btn_cancel.remove();
        item_div.style.display = '';
    };

    item_div.style.display = 'none';

    let item_input = document.createElement("input");
    item_input.value = item_text.innerText;

    let btn_ok = document.createElement("input");
    btn_ok.type = "button";
    btn_ok.value = "Ok";
    btn_ok.addEventListener("click", () => {
        item_text.innerText = item_input.value;
        close_action();
    });

    let btn_cancel = document.createElement("input");
    btn_cancel.type = "button";
    btn_cancel.value = "Cancel";
    btn_cancel.addEventListener("click", () => {
        close_action();
    });

    item.appendChild(item_input);
    item.appendChild(btn_ok);
    item.appendChild(btn_cancel);
}