import { populateElement } from './userInterface.js';

const createItem = (title) => {
    var title = title;
    var desc = '';
    var dueDate = '';
    var complete = false;
    
    return { title, dueDate, desc, complete };
};

export { createItem }