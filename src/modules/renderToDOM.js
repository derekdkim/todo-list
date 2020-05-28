import { populateElement, addItemBtn } from './userInterface.js';
import { createItemModalBox } from './itemModalBox.js';

const renderList = (list) => {
    clearDiv('list-div');
    const listDiv = document.getElementById('list-div');
    populateElement(list.title, 'h1', 'list-title', listDiv);
    
    const itemContainer = document.createElement('div');
    itemContainer.id = 'item-container';
    listDiv.appendChild(itemContainer);

    renderItems(list);
    addItemBtn(list);
}

const renderItems = (list) => {
    if (list.itemArr.length > 0) {
        clearDiv('item-container');
        const targetDiv = document.getElementById('item-container');

        for (let i = 0; i < list.itemArr.length; i++) {
            renderItem(list.itemArr[i], i, targetDiv);
        }

        document.querySelectorAll('.item').forEach(elem => {
            elem.addEventListener('dblclick', (e) => {
                createItemModalBox(e.target.id.match(/[0-9]+/), list);
            });
        });
        
    } else {
        clearDiv('item-container');
        const targetDiv = document.getElementById('item-container');
        populateElement('Nothing yet', 'p', 'nothing-msg', targetDiv);
    }
}

const renderItem = (item, id, targetDiv) => {
    const itemDiv = document.createElement('div');
    itemDiv.id = id;
    itemDiv.classList.add('item');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    if (item.complete) {
        checkBox.checked = true;
    }
    itemDiv.appendChild(checkBox);
    populateElement(item.title, 'h2', `${id}-name`, itemDiv);
    populateElement(item.dueDate, 'h3', `${id}-date`, itemDiv);

    targetDiv.appendChild(itemDiv);

    checkBox.addEventListener('change', (e) => {
        if (checkBox.checked) {
            item.complete = true;
        } else {
            item.complete = false;
        }
    });
}

const clearDiv = (divID) => {
    if (document.getElementById(divID).hasChildNodes) {
        const childNodes = document.getElementById(divID).childNodes;
        while (childNodes.length > 0) {
            document.getElementById(divID).removeChild(childNodes[0]);
        }
    }
}

export { renderList, renderItems, clearDiv }