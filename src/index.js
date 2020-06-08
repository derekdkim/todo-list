import { createList } from './modules/todoList.js';
import { renderList } from './modules/renderToDOM.js';
import { createInterface } from './modules/userInterface.js';
import { createSideNav } from './modules/sideNav.js';

createInterface();

const masterListArr = [];
const defaultList = createList('Default');
masterListArr.push(defaultList);
renderList(defaultList);

document.getElementById('side-nav-div').style.display = 'none';

document.getElementById('menu-btn').addEventListener('click', () => {
    const sideNavDiv = document.getElementById('side-nav-div');
    if (sideNavDiv.style.display === 'none') {
        createSideNav(masterListArr);
        sideNavDiv.style.display = 'block';
    } else {
        sideNavDiv.style.display = 'none';
    }
});