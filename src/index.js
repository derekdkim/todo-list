import { createList } from './modules/todoList.js';
import { renderList } from './modules/renderToDOM.js';
import { createInterface } from './modules/userInterface.js';

createInterface();

const newList = createList('Default');
renderList(newList);

document.addEventListener('click', (e) => {
   if (e.target.className === 'item') {
    alert('This is an item'); 
   }
});