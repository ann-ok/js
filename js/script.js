const ITEM_SEP = ' - ';

const button_add = document.getElementById('button-add');
button_add.addEventListener('click', addItem);

const sort_type_buttons = document.getElementsByName('sort-type-buttons');
for (let i = 0; i < sort_type_buttons.length; i++) {
    sort_type_buttons[i].addEventListener('click',
        () => {updateSort(document.getElementById('list-items'), sort_type_buttons[i].value)});
}

function addItem() {
    const input = document.getElementById('input-text');
    if (input.value === 'undefined' || input.value === null || input.value ===  '') {
        return;
    }

    const list_root = document.getElementById('list-items');
    const list_item = document.createElement('li');
    const item_div = document.createElement('div');
    const item_id = document.createElement('span');
    item_id.setAttribute('class', 'item-id');
    const item_sep = document.createElement('span');
    const item_text = document.createElement('span');
    item_text.setAttribute('class', 'item-text');

    item_id.innerText = list_root.getElementsByTagName('li').length + 1;
    item_sep.innerText = ITEM_SEP;
    item_text.innerText  = input.value;

    const btn_edit = document.createElement('input');
    btn_edit.type = 'button';
    btn_edit.value = 'ред.';
    btn_edit.addEventListener('click', () => { editItem(list_item, item_div, item_text)});

    const btn_delete = document.createElement('input');
    btn_delete.type = 'button';
    btn_delete.value = 'X';
    btn_delete.addEventListener('click', () => {deleteItem(list_item)});

    item_div.appendChild(item_id);
    item_div.appendChild(item_sep);
    item_div.appendChild(item_text);
    item_div.appendChild(btn_edit);
    item_div.appendChild(btn_delete);

    list_item.appendChild(item_div);
    list_root.appendChild(list_item);

    input.value = '';

    updateSort(list_root, getTypeSort());
}

function editItem(item, item_div, item_text) {
    let close_action = () => {
        item_input.remove();
        btn_ok.remove();
        btn_cancel.remove();
        item_div.style.display = '';
    };

    item_div.style.display = 'none';

    const item_input = document.createElement('input');
    item_input.value = item_text.innerText;

    const btn_ok = document.createElement('input');
    btn_ok.type = 'button';
    btn_ok.value = 'Ok';
    btn_ok.addEventListener('click', () => {
        if (item_input.value !== '') {
            item_text.innerText = item_input.value;
            updateSort(document.getElementById('list-items'), getTypeSort());
        }
        close_action();
    });

    const btn_cancel = document.createElement('input');
    btn_cancel.type = 'button';
    btn_cancel.value = 'Cancel';
    btn_cancel.addEventListener('click', () => {
        close_action();
    });

    item.appendChild(item_input);
    item.appendChild(btn_ok);
    item.appendChild(btn_cancel);
}

function deleteItem(list_item) {
    const list_root = document.getElementById('list-items');
    const delete_item_id = list_item.getElementsByClassName('item-id')[0].innerText;
    list_item.remove();

    let items = [].slice.call(list_root.getElementsByTagName('li'));
    for(let i = 0; i < items.length; i++) {
        let item_id = items[i].getElementsByClassName('item-id')[0].innerText;
        if (item_id >= delete_item_id) {
            items[i].getElementsByClassName('item-id')[0].innerText = item_id - 1;//???
        }
    }

    updateList(list_root, items);
}

function updateSort(ul, sort_type) {
    let list = [].slice.call(ul.getElementsByTagName('li'));

    list.sort(function (a, b) {
        let sort_type_name = sort_type.includes('id') ? 'item-id' : 'item-text';
        let aValue = a.getElementsByTagName('div')[0].getElementsByClassName(sort_type_name)[0].innerText;
        let bValue = b.getElementsByTagName('div')[0].getElementsByClassName(sort_type_name)[0].innerText;
        return sort_type.includes('asc') ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    updateList(ul, list);
}

function updateList(old_list, new_items) {
    let new_list = old_list.cloneNode(false);
    new_items.forEach(function (items) {
        new_list.appendChild(items);
    });

    old_list.parentNode.replaceChild(new_list, old_list);
}

function getTypeSort() {
    for (let i = 0; i < sort_type_buttons.length; i++) {
        const sort_type_button = sort_type_buttons[i];
        if (sort_type_button.checked) {
            return sort_type_button.value;
        }
    }
    return 'error';
}