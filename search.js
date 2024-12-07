const searchBar = document.getElementById('search-bar');
const suggestionsBox = document.getElementById('suggestions');

// Predefined list of items
const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Eggplant",
    "Fig",
    "Grape",
    "Honeydew",
    "Iceberg Lettuce",
    "Jackfruit",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tomato",
    "Ugli Fruit",
    "Vanilla",
    "Watermelon",
    "Xigua",
    "Yam",
    "Zucchini"
];

// Event listener for search input
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase().trim();
    suggestionsBox.innerHTML = ''; // Clear previous suggestions

    if (query === '') {
        return; // Do nothing if input is empty
    }

    // Filter items based on query
    const filteredItems = items.filter(item => item.toLowerCase().includes(query));

    if (filteredItems.length === 0) {
        // Display "No results found" if no matches
        suggestionsBox.innerHTML = '<div class="no-results">No results found</div>';
    } else {
        // Create suggestion elements
        filteredItems.forEach(item => {
            const suggestion = document.createElement('div');
            suggestion.textContent = item;
            suggestion.addEventListener('click', () => {
                searchBar.value = item; // Fill the search bar with the selected item
                suggestionsBox.innerHTML = ''; // Clear suggestions
            });
            suggestionsBox.appendChild(suggestion);
        });
    }
});
