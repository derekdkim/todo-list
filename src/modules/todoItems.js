import { populateElement } from './userInterface.js';

const createItem = (title) => {
    var desc = '';
    var dueDate = '';
    var complete = false;

    const modifyDesc = (text) => {
        desc = text;
        alert(`This worked. New desc: ${text}`);
    }
    
    return { title, dueDate, desc, complete, modifyDesc };
};

export { createItem }