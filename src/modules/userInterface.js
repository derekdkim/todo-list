import { createItem } from './todoItems.js';
import { renderItems, clearDiv } from './renderToDOM.js';

const populateElement = (name, elemType, id, container) => {
    const newElem = document.createElement(elemType);
    newElem.textContent = name;
    newElem.id = id;
    
    if (container) {
        container.appendChild(newElem);
    }

    return newElem;
}

const createInterface = () => {
    const topNavDiv = document.createElement('div');
    topNavDiv.id = 'top-nav-div';
    populateElement('Menu', 'button', 'menu-btn', topNavDiv);
    populateElement('Clear Data', 'button', 'clear-btn', topNavDiv);

    const sideNavDiv = document.createElement('div');
    sideNavDiv.id = 'side-nav-div';

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
            addItemBtn(currentList);
        }
        if (e.key === 'Escape') {
            itemInput.remove();
            addItemBtn(currentList);
        }
    })
}

const showHideCompletedBtn = (currentList) => {
    // If this already exists, remove it to prevent event listener stacking
    if (document.getElementById('show-comp-div')) {
        document.getElementById('show-comp-div').remove();
    }

    const showCompToggleDiv = document.createElement('div');
    showCompToggleDiv.id = 'show-comp-div';

    console.log(currentList.showComplete);

    if (currentList.showComplete) {
        console.log('this is true');
        const hideBtn = populateElement('Hide Completed', 'button', 'hide-btn', showCompToggleDiv);
        hideBtn.type = 'button';
    } else {
        console.log('this is false');
        const showBtn = populateElement('Show Completed', 'button', 'show-btn', showCompToggleDiv);
        showBtn.type = 'button';
    }

    document.getElementById('top-nav-div').insertBefore(showCompToggleDiv, document.getElementById('clear-btn'));

    showCompToggleDiv.addEventListener('click', (e) => {
        if (e.target.type === 'button') {
            console.log(`${e.target.id} clicked`);

            e.target.id === 'hide-btn' ? currentList.showComplete = false : currentList.showComplete = true;

            renderItems(currentList);
            showHideCompletedBtn(currentList);
        }
    })
}

export { createInterface, addItemBtn, populateElement, showHideCompletedBtn }