import { createItem } from './todoItems.js';
import { renderItems } from './renderToDOM.js';

const populateElement = (name, elemType, id, container) => {
    const newElem = document.createElement(elemType);
    newElem.textContent = name;
    newElem.id = id;
    
    if (container) {
        container.appendChild(newElem);
    }
}

const createInterface = () => {

    const topNavDiv = document.createElement('div');
    populateElement('Menu', 'button', 'menuBtn', topNavDiv);
    populateElement('Clear Data', 'button', 'clearBtn', topNavDiv);

    const sideNavDiv = document.createElement('div');

    const listDiv = document.createElement('div');
    listDiv.id = 'list-div';
    populateElement('Add Task', 'button', 'addItemBtn', listDiv);

    [ topNavDiv, sideNavDiv, listDiv ].forEach((elem) => {
        document.getElementById('content').appendChild(elem);
    });
}

const addItemBtn = (currentList) => {
    const listPanel = document.getElementById('list-div');
    populateElement('Add Task', 'button', 'addItemBtn', listPanel);

    document.getElementById('addItemBtn').addEventListener('click', () => {
        createNewItemForm(currentList);
    });
};

const createNewItemForm = (currentList) => {

    document.getElementById('addItemBtn').remove();
    populateElement('', 'input', 'addItemInput', document.getElementById('list-div'));
    const itemInput = document.getElementById('addItemInput');

    itemInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const newItem = createItem(itemInput.value);
            currentList.itemArr.push(newItem);
            itemInput.remove();
            renderItems(currentList);

            /* TEMPORARY PIECE OF CODE FOR DEBUGGING. REMOVE THIS WHEN COMPLETE*/
            // const targetDiv = document.getElementById('list-div');
            // const test = document.createElement('div');
            // test.textContent = currentList.itemArr.length;
            // targetDiv.appendChild(test);
            /* --------------------------------------------------------------- */

            addItemBtn(currentList);
        }
        if (e.key === 'Escape') {
            itemInput.remove();
            addItemBtn(currentList);
        }
    })
}

export { createInterface, addItemBtn, populateElement }