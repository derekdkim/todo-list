import { createList } from './modules/todoList.js';
import { renderList } from './modules/renderToDOM.js';
import { createInterface } from './modules/userInterface.js';

createInterface();

const newList = createList('Default');
renderList(newList);