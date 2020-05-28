import { populateElement } from './userInterface.js';
import { renderItems, clearDiv } from './renderToDOM.js';

/* Item modal box for viewing and editing */
const createItemModalBox = (id, list) => {
    const itemModalDiv = document.createElement('div');
    itemModalDiv.id = 'item-modal-div';
    const item = list.itemArr[id];

    populateElement(item.title, 'h2', `${id}-modal-name`, itemModalDiv);
    populateElement(item.dueDate, 'h3', `${id}-modal-date`, itemModalDiv);
    populateElement(item.desc, 'p', `${id}-modal-desc`, itemModalDiv);
    populateElement('Edit', 'button', 'edit-btn', itemModalDiv);
    populateElement('Delete', 'button', 'del-btn', itemModalDiv);
    populateElement('Exit', 'button', 'exit-btn', itemModalDiv);

    document.getElementById('list-div').appendChild(itemModalDiv);

    /* Editing item details */
    document.getElementById('edit-btn').addEventListener('click', () => {
        clearDiv(itemModalDiv.id);

        /* Name input field */
        populateElement('', 'input', 'new-name-input', itemModalDiv);
        document.getElementById('new-name-input').setAttribute('value', item.title);

        /* Desc input field */
        populateElement('', 'input', 'new-desc-input', itemModalDiv);
        document.getElementById('new-desc-input').setAttribute('value', item.desc);

        /* Due date input field */
        populateElement('', 'input', 'new-due-date-input', itemModalDiv);
        document.getElementById('new-due-date-input').type = 'date';

        populateElement('Confirm Changes', 'button', 'submit-btn', itemModalDiv);
        populateElement('Cancel', 'button', 'cancel-btn', itemModalDiv);

        /* On submit, make changes and remake modal box */
        document.getElementById('submit-btn').addEventListener('click', () => {
            item.title = document.getElementById('new-name-input').value;
            item.desc = document.getElementById('new-desc-input').value;
            item.dueDate = document.getElementById('new-due-date-input').value;
            itemModalDiv.remove();
            createItemModalBox(id, list);
        });

        /* Cancel making changes*/
        document.getElementById('cancel-btn').addEventListener('click', () => {
            itemModalDiv.remove();
            createItemModalBox(id, list);
        });
    });

    /* Delete current item */
    document.getElementById('del-btn').addEventListener('click', () => {
        list.itemArr.splice(id, 1);
        itemModalDiv.remove();
        renderItems(list);
    });

    /* Exit out without any changes */
    document.getElementById('exit-btn').addEventListener('click', () => {
        itemModalDiv.remove();
        renderItems(list);
    });
}

export { createItemModalBox }