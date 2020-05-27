import { populateElement, addItemBtn } from './userInterface.js';

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
                alert(e.target.id.match(/[0-9]/));
                const targetItem = list.itemArr[e.target.id.match(/[0-9]/)];
                alert(JSON.stringify(targetItem));
                targetItem.modifyDesc('test');
                renderItems(list);
            });
        });
        
    } else {
        const targetDiv = document.getElementById('item-container');
        populateElement('Nothing yet', 'p', 'nothing-msg', targetDiv);
    }
}

const renderItem = (item, id, targetDiv) => {
    const itemDiv = document.createElement('div');
    itemDiv.id = id;
    itemDiv.classList.add('item');
    populateElement(item.title, 'h2', `${id}-name`, itemDiv);
    populateElement(item.dueDate, 'h3', `${id}-date`, itemDiv);
    populateElement(item.desc, 'p', `${id}-desc`, itemDiv);
    targetDiv.appendChild(itemDiv);
}

const clearDiv = (divID) => {
    if (document.getElementById(divID).hasChildNodes) {
        const childNodes = document.getElementById(divID).childNodes;
        while (childNodes.length > 0) {
            document.getElementById(divID).removeChild(childNodes[0]);
        }
    }
}

export { renderList, renderItems }