document.addEventListener('DOMContentLoaded', function () {
    // Ensure "create-button" exists and is clickable
    const createButton = document.getElementById('create-button');
    if (createButton) {
        createButton.addEventListener('click', function () {
            // Redirect to "index.html" when clicked
            window.location.href = 'index.html';
        });
    }

    const viewAllButton = document.getElementById('view-all');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function () {
            // Redirect to "categ.html" when clicked
            window.location.href = 'categ.html';
        });
    }
    const login = document.getElementById('login');
    if (login) {
        login.addEventListener('click', function () {
            // Redirect to "categ.html" when clicked
            window.location.href = 'landing.html';
        });
    }

    const signupLink = document.getElementById("signup-link"); // Sign Up link on the login page
    if (signupLink) {
        signupLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link action
            window.location.href = "signin.html"; // Redirect to the signup page
        });
    }

    // Signup Page Functionality
    const signUpPageButton = document.getElementById("signup-button"); // Signup button on the signup page
    if (signUpPageButton) {
        signUpPageButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission
            window.location.href = "login.html"; // Redirect to the login page
        });
    }

    const loginLink = document.querySelector(".signup-text a"); // Login link on the signup page
    if (loginLink) {
        loginLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link action
            window.location.href = "login.html"; // Redirect to the login page
        });
    }
    const signinLink = document.querySelector(".signin-text a"); // Login link on the signup page
    if (signinLink) {
        signinLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link action
            window.location.href = "signin.html"; // Redirect to the login page
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Budget Display Logic
    const setBudgetBtn = document.querySelector('.set-budget-btn');
    const budgetInput = document.getElementById('budget'); // Correct input field
    const budgetDisplay = document.getElementById('budget-display');

    const footer = document.getElementById('cart-summary-footer');
    const itemCountDisplay = document.getElementById('item-count');
    const budgetRemainingDisplay = document.getElementById('budget-remaining');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let itemCount = 0;
    let totalCost = 0;
    let budgetRemaining = parseFloat(localStorage.getItem('budget-display')) || 0;

    // Initialize budget display from localStorage
    updateBudgetDisplay(budgetRemaining);

    // Set budget functionality
    setBudgetBtn.addEventListener('click', () => {
        const budgetValue = parseFloat(budgetInput.value) || 0;
        if (budgetValue > 0) {
            // Save budget to localStorage and update variables
            localStorage.setItem('budget-display', budgetValue.toFixed(2));
            budgetRemaining = budgetValue;
            itemCount = 0;
            totalCost = 0;

            // Update UI elements
            updateBudgetDisplay(budgetRemaining);
            resetFooter();
        } else {
            alert('Please enter a valid budget.');
        }
    });

    // Add to cart functionality
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const itemCost = parseFloat(button.getAttribute('data-price'));
            if (!itemCost || isNaN(itemCost)) {
                alert('Invalid item price!');
                return;
            }

            if (budgetRemaining >= itemCost) {
                // Update counts and budget
                itemCount++;
                totalCost += itemCost;
                budgetRemaining -= itemCost;

                // Update UI elements
                itemCountDisplay.textContent = itemCount;
                budgetRemainingDisplay.textContent = budgetRemaining.toFixed(2);
                localStorage.setItem('budget-display', budgetRemaining.toFixed(2));
                footer.style.display = 'block';
            } else {
                alert('Insufficient budget!');
            }
        });
    });

    // Function to update budget display
    function updateBudgetDisplay(budget) {
        budgetDisplay.textContent = `₹${budget}`;
        if (budgetRemainingDisplay) {
            budgetRemainingDisplay.textContent = budget.toFixed(2);
        }
    }

    // Function to reset footer display
    function resetFooter() {
        if (itemCountDisplay) {
            itemCountDisplay.textContent = itemCount;
        }
        if (footer) {
            footer.style.display = 'none';
        }
    }
});


  

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const suggestionsBox = document.getElementById('suggestions');

    // Predefined list of items
    const items = [
        "Apple", "Banana", "Cherry", "Date", "Eggplant", "Fig",
        "Grape", "Honeydew", "Iceberg Lettuce", "Jackfruit", "Kiwi",
        "Lemon", "Mango", "Nectarine", "Orange", "Papaya", "Quince",
        "Raspberry", "Strawberry", "Tomato", "Ugli Fruit", "Vanilla",
        "Watermelon", "Xigua", "Yam", "Zucchini"
    ];

    // Debounce function to limit excessive calls
    function debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    }

    // Handle search input
    const handleSearch = () => {
        const query = searchBar.value.toLowerCase().trim();
        suggestionsBox.innerHTML = ''; // Clear previous suggestions

        if (query === '') return; // Do nothing if input is empty

        // Filter items based on query
        const filteredItems = items.filter(item => item.toLowerCase().includes(query));

        if (filteredItems.length === 0) {
            // Display "No results found" if no matches
            const noResults = document.createElement('div');
            noResults.textContent = 'No results found';
            noResults.className = 'no-results';
            suggestionsBox.appendChild(noResults);
        } else {
            // Create suggestion elements
            filteredItems.forEach(item => {
                const suggestion = document.createElement('div');
                suggestion.textContent = item;
                suggestion.tabIndex = 0; // Make suggestion focusable
                suggestion.setAttribute('role', 'option');
                suggestion.addEventListener('click', () => {
                    searchBar.value = item; // Fill the search bar with the selected item
                    suggestionsBox.innerHTML = ''; // Clear suggestions
                });
                suggestion.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        searchBar.value = item; // Select item on Enter or Space key
                        suggestionsBox.innerHTML = ''; // Clear suggestions
                    }
                });
                suggestionsBox.appendChild(suggestion);
            });
        }
    };


    // Attach event listener with debounce
    searchBar.addEventListener('input', debounce(handleSearch, 300));
});
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('cart-summary-footer');
    const itemCountDisplay = document.getElementById('item-count');
    const budgetRemainingDisplay = document.getElementById('budget-display');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const goToCartButton = document.getElementById('go-to-cart');
    const resetBtn = document.querySelector('.reset-btn');
    const setBudgetBtn = document.querySelector('.set-budget-btn');
    const budgetInput = document.getElementById('budget');

    // Retrieve item count and budget from localStorage
    let itemCount = parseInt(localStorage.getItem('itemCount')) || 0;
    let totalCost = parseFloat(localStorage.getItem('totalCost')) || 0;
    let budgetRemaining = parseFloat(localStorage.getItem('budget')) || 0;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Update UI with cart and budget information
    itemCountDisplay.textContent = itemCount;
    budgetRemainingDisplay.textContent = `₹${budgetRemaining.toFixed(2)}`;

    // If there are items in the cart, update the footer display
    if (cartItems.length > 0) {
        footer.style.display = 'block';
    }

    // Add to cart functionality
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));

            // Fetch the updated budget from localStorage before checking if it's enough
            budgetRemaining = parseFloat(localStorage.getItem('budget')) || 0;

            // Check if there is enough budget to add the item
            if (budgetRemaining >= itemPrice) {
                itemCount++;
                totalCost += itemPrice;
                budgetRemaining -= itemPrice;

                // Check if the item already exists in the cart
                const existingItem = cartItems.find(item => item.name === itemName);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
                }

                // Update the UI with the new item count and remaining budget
                itemCountDisplay.textContent = itemCount;
                budgetRemainingDisplay.textContent = `₹${budgetRemaining.toFixed(2)}`;

                // Persist updated cart, item count, and budget to localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                localStorage.setItem('itemCount', itemCount);
                localStorage.setItem('totalCost', totalCost.toFixed(2));
                localStorage.setItem('budget', budgetRemaining.toFixed(2));

                // Show footer if there are items in the cart
                footer.style.display = 'block';
            } else {
                alert('Insufficient budget!');
            }
        });
    });

    // Redirect to the cart page
    goToCartButton.addEventListener('click', () => {
        window.location.href = 'list.html';
    });

    // Set the budget when the user enters a value
    setBudgetBtn.addEventListener('click', () => {
        const newBudget = parseFloat(budgetInput.value);
        if (!isNaN(newBudget) && newBudget > 0) {
            // Update localStorage and UI with the new budget
            budgetRemaining = newBudget;
            localStorage.setItem('budget', budgetRemaining.toFixed(2));

            // Update the displayed budget
            budgetRemainingDisplay.textContent = `₹${budgetRemaining.toFixed(2)}`;
        } else {
            alert('Please enter a valid budget amount.');
        }
    });

    // Reset button functionality to clear the cart and budget
    resetBtn.addEventListener('click', () => {
        // Reset cart, item count, and budget in localStorage
        localStorage.removeItem('cartItems');
        localStorage.removeItem('itemCount');
        localStorage.removeItem('totalCost');
        localStorage.removeItem('budget');

        // Reset the UI to default state
        itemCount = 0;
        totalCost = 0;
        budgetRemaining = 0; // Reset budget to 0 or any initial value you want
        itemCountDisplay.textContent = itemCount;
        budgetRemainingDisplay.textContent = `₹${budgetRemaining.toFixed(2)}`;

        // Hide the footer if no items are in the cart
        footer.style.display = 'none';

        alert('Cart and budget have been reset!');
    });
});
