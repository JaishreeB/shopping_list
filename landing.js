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
        const listExists = lists.some(list => list.name === listName); // Check for duplicates
        if (!listExists) {
            lists.push({ name: listName, url: 'firstlist.html' }); // Add the list with a default URL
            localStorage.setItem('lists', JSON.stringify(lists));
        }
    }
    

    // Function to dynamically add a list card
    // Function to dynamically add a list card
function addListToGrid(list) {
    // Create the wrapper for each list item
    const listWrapper = document.createElement('div');
    listWrapper.classList.add('list-wrapper');

    // Create the card container for text and delete button
    const listCard = document.createElement('div');
    listCard.classList.add('list-card');

    // Add the list name as a clickable link
    const listLink = document.createElement('a');
    listLink.href = list.url; // URL associated with the list
    listLink.textContent = list.name;
    listLink.style.flex = "1"; // Make the link take up remaining space

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('remove-btn');
    deleteButton.textContent = 'Delete';

    // Add event listener for deleting the list
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent navigating when clicking delete
        deleteList(list.name, listWrapper);
    });

    // Append the list name and delete button to the card
    listCard.appendChild(listLink);
    listCard.appendChild(deleteButton);

    // Append the card to the wrapper
    listWrapper.appendChild(listCard);

    // Add the wrapper to the grid container
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