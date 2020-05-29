import { populateElement, addItemBtn, showHideCompletedBtn } from './userInterface.js';
import { createItemModalBox } from './itemModalBox.js';

const renderList = (list) => {
    showHideCompletedBtn(list);

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
    // Rendering items if there's more than 0
    if (list.itemArr.length > 0) {
        clearDiv('item-container');
        const targetDiv = document.getElementById('item-container');
        console.log(`Show Complete: ${list.showComplete}`)

        for (let i = 0; i < list.itemArr.length; i++) {
            if (list.showComplete) {
                renderItem(list, i, targetDiv);
            } else {
                if (!list.itemArr[i].complete) {
                    renderItem(list, i, targetDiv);
                }
            }

        }

        document.querySelectorAll('.item').forEach(elem => {
            elem.addEventListener('dblclick', (e) => {
                if (e.target.type !== 'checkbox') {
                    createItemModalBox(e.target.id.match(/[0-9]+/), list);
                }
            });
        });
        
    } else {
        clearDiv('item-container');
        const targetDiv = document.getElementById('item-container');
        populateElement('Nothing yet', 'p', 'nothing-msg', targetDiv);
    }
}

const renderItem = (list, id, targetDiv) => {
    const item = list.itemArr[id];
    const itemDiv = document.createElement('div');
    itemDiv.id = id;
    itemDiv.classList.add('item');
    
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    itemDiv.appendChild(checkBox);

    const textContainer = document.createElement('div');
    populateElement(item.title, 'h2', `${id}-name`, textContainer);
    populateElement(item.dueDate, 'h3', `${id}-date`, textContainer);

    if (item.complete) {
        checkBox.checked = true;
        textContainer.style.setProperty('text-decoration', 'line-through');
    }

    itemDiv.appendChild(textContainer);
    targetDiv.appendChild(itemDiv);

    checkBox.addEventListener('change', (e) => {
        if (checkBox.checked) {
            console.log('This is checked and will now change accordingly.');
            item.complete = true;
            renderItems(list);
        } else {
            item.complete = false;
            renderItems(list);
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