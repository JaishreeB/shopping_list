document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.getElementById('create-button');
    const modal = document.getElementById('modal');
    const listNameInput = document.getElementById('list-name-input');
    const submitListName = document.getElementById('submit-list-name');
    const closeModalButton = document.getElementById('close-modal');
    const listsGrid = document.querySelector('.lists-grid');

    // Show modal on "Create a New Shopping List" button click
    createButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    // Close the modal when the user clicks "Close"
    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Handle list name submission
    submitListName.addEventListener('click', () => {
        const listName = listNameInput.value.trim();
        if (listName) {
            // Save the list name to localStorage
            saveList(listName);

            // Redirect to index.html
            window.location.href = 'index.html';
        }
    });

    // Save list to localStorage and render it dynamically
    function saveList(listName) {
        const lists = JSON.parse(localStorage.getItem('lists')) || [];
        lists.push({ name: listName, url: 'firstlist.html' }); // Add the list with a default URL
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    // Function to dynamically add a list card
    function addListToGrid(list) {
        const listWrapper = document.createElement('div');
        listWrapper.classList.add('list-wrapper');

        const listCard = document.createElement('a');
        listCard.classList.add('list-card');
        listCard.href = list.url; // URL associated with the list
        listCard.textContent = list.name;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('remove-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteList(list.name, listWrapper));

        listWrapper.appendChild(listCard);
        listWrapper.appendChild(deleteButton);
        listsGrid.appendChild(listWrapper);
    }

    // Delete a list from the DOM and localStorage
    function deleteList(listName, listWrapper) {
        // Remove from DOM
        listWrapper.remove();

        // Remove from localStorage
        const lists = JSON.parse(localStorage.getItem('lists')) || [];
        const updatedLists = lists.filter(list => list.name !== listName);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    }

    // Render saved lists on page load
    const savedLists = JSON.parse(localStorage.getItem('lists')) || [];
    savedLists.forEach(list => addListToGrid(list));
});
