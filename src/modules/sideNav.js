import { clearDiv, renderList } from './renderToDOM.js';
import { populateElement } from './userInterface.js';

const createSideNav = (listOfLists) => {
    clearDiv('side-nav-div');

    const sideNavContainer = document.createElement('div');
    const sideNavList = document.createElement('ul');

    listOfLists.forEach((list, index) => {
        // let listItem = `<li id='list-${index}'>${list.title}</li>`;
        let listItem = populateElement(list.title, 'li', `list-${index}`, sideNavList);
        listItem.classList.add('side-nav-list');
        // sideNavList.appendChild(listItem);
    });

    sideNavContainer.appendChild(sideNavList);
    document.getElementById('side-nav-div').appendChild(sideNavContainer);

    const listArr = document.querySelectorAll('.side-nav-list');
    listArr.forEach(list => {
        list.addEventListener('click', () => {
            // Determines which list to load based on its id, which is equivalent to its index in listOfLists
            const listIndex = list.id.match(/[0-9]+/);
            renderList(listOfLists[listIndex]);
        });
    });
}

export { createSideNav }