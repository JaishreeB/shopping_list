document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('cart-summary-footer');
    const itemCountDisplay = document.getElementById('item-count');
    const budgetRemainingDisplay = document.getElementById('budget-remaining');
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

    // Redirect to the cart page using window.location.replace
    goToCartButton.addEventListener('click', () => {
        window.location.replace('list.html');
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
