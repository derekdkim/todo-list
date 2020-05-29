import { populateElement } from './userInterface.js';

const createNewListForm = () => {
    const formDiv = document.createElement('div');
    populateElement('New List', 'h1', 'form-title', formDiv);
    populateElement('Name: ', 'h1', 'form-title', formDiv);
    populateElement('', 'input', 'list-input', formDiv);
    populateElement('Submit', 'button', 'submit-btn', formDiv);

    document.getElementById('submit-btn').addEventListener('click', () => {
       const newList = createList(document.getElementById('list-input').value); 
    });
}

const createList = (title) => {
    const itemArr = [];
    let showComplete = false;

    return { title, itemArr, showComplete };
}

export { createNewListForm, createList }