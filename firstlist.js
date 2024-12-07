document.addEventListener('DOMContentLoaded', () => {
    const cartItemsDisplay = document.getElementById('cart-items-display');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // If there are no cart items, display a message
    if (cartItems.length === 0) {
      cartItemsDisplay.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      // Display each cart item
      cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item-display');
        cartItemDiv.innerHTML = `
          <p><strong>${item.name}</strong></p>
          <p>Price: ₹${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Total: ₹${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsDisplay.appendChild(cartItemDiv);
      });
    }
  });
//   document.addEventListener('DOMContentLoaded', () => {
//     const listTitle = document.getElementById('list-title');
//     const listContent = document.getElementById('list-content');

//     // Get the list name from localStorage
//     const listName = localStorage.getItem('listName') || 'My Shopping List';
//     listTitle.textContent = listName; // Set the title dynamically

//     // Retrieve and display items (if available)
//     const groceryList = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const totalCost = localStorage.getItem('totalCost') || 0;

//     if (groceryList.length > 0) {
//         groceryList.forEach(item => {
//             const itemDiv = document.createElement('div');
//             itemDiv.textContent = `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`;
//             listContent.appendChild(itemDiv);
//         });

//         const totalDiv = document.createElement('div');
//         totalDiv.innerHTML = `<strong>Total: ₹${totalCost}</strong>`;
//         listContent.appendChild(totalDiv);
//     } else {
//         listContent.textContent = 'No items in your list.';
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
  const listTitle = document.getElementById('list-title');
  const shoppingListBody = document.getElementById('shopping-list-body');
  const totalCostDiv = document.getElementById('total-cost');

  // Get the list name from localStorage
  const listName = localStorage.getItem('listName') || 'My Shopping List';
  listTitle.textContent = listName;

  // Retrieve items from localStorage
  let groceryList = JSON.parse(localStorage.getItem('cartItems')) || [];
  let totalCost = parseFloat(localStorage.getItem('totalCost')) || 0;

  // Function to render the table
  function renderTable() {
      shoppingListBody.innerHTML = ''; // Clear previous content
      if (groceryList.length === 0) {
          shoppingListBody.innerHTML = `<tr><td colspan="5">No items in your list.</td></tr>`;
          totalCostDiv.textContent = '';
      } else {
          groceryList.forEach((item, index) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${item.name}</td>
                  <td>₹${item.price}</td>
                  <td>${item.quantity}</td>
                  <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                  <td class="delete-column">
                      <button class="delete-btn" data-index="${index}">Delete</button>
                  </td>
              `;
              shoppingListBody.appendChild(row);
          });
          totalCostDiv.textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;
      }
  }

  // Render the initial table
  renderTable();

  // Delete an item
  shoppingListBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
          const index = event.target.getAttribute('data-index');
          const itemToRemove = groceryList[index];
          totalCost -= itemToRemove.price * itemToRemove.quantity;
          groceryList.splice(index, 1);

          // Update localStorage
          localStorage.setItem('cartItems', JSON.stringify(groceryList));
          localStorage.setItem('totalCost', totalCost);

          // Re-render the table
          renderTable();
      }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const storeSelector = document.getElementById('store-selector');
  const storeNavigationSection = document.getElementById('store-navigation');
  const canvas = document.getElementById('store-map');
  const ctx = canvas.getContext('2d');

  // Store layouts with aisles and positions
  const storeLayouts = {
      store1: [
          { name: 'Dairy', x: 50, y: 50, width: 100, height: 200 },
          { name: 'Fruits', x: 200, y: 50, width: 100, height: 200 },
          { name: 'Beverages', x:350, y: 50, width: 100, height: 200 },
          { name: 'Snacks', x: 500, y: 50, width: 100, height: 200 },
          { name: 'Checkout', x: 700, y: 200, width: 100, height: 100 },
          { name: 'Entrance', x: 50, y: 300, width: 100, height: 50 },
          { name: 'Exit', x: 500, y: 300, width: 100, height: 50 },
      ],
      store2: [
          { name: 'Vegetables', x: 100, y: 100, width: 100, height: 60 },
          { name: 'Bakery', x: 250, y: 100, width: 100, height: 60 },
          { name: 'Frozen', x: 400, y: 100, width: 100, height: 60 },
          { name: 'Drinks', x: 550, y: 100, width: 100, height: 60 },
          { name: 'Checkout', x: 700, y: 300, width: 200, height: 50 },
      ],
  };

  /**
   * Renders the store map based on selected store.
   * @param {string} store - The selected store's key.
   */
  function renderStoreMap(store) {
      const layout = storeLayouts[store];

      if (!layout) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw layout zones
      layout.forEach(zone => {
          // Draw zone rectangle
          ctx.fillStyle = '#87CEEB'; // Light blue for aisles
          ctx.fillRect(zone.x, zone.y, zone.width, zone.height);

          // Add aisle text
          ctx.fillStyle = '#000'; // Black text
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(zone.name, zone.x + zone.width / 2, zone.y + zone.height / 2 + 5);
      });

      // Draw navigation lines (optional for user flow)
      ctx.strokeStyle = '#FF6347'; // Tomato red for navigation path
      ctx.lineWidth = 2;
      ctx.beginPath();

      // Example: connecting aisles with lines
      layout.forEach((zone, index) => {
          if (index === 0) ctx.moveTo(zone.x + zone.width / 2, zone.y + zone.height / 2);
          else ctx.lineTo(zone.x + zone.width / 2, zone.y + zone.height / 2);
      });

      ctx.stroke();
  }

  /**
   * Handles the change event for store selection.
   * Displays the map and renders it.
   */
  storeSelector.addEventListener('change', (e) => {
      const selectedStore = e.target.value;

      if (selectedStore) {
          storeNavigationSection.style.display = 'block'; // Show map section
          renderStoreMap(selectedStore); // Render map for the selected store
      } else {
          storeNavigationSection.style.display = 'none'; // Hide map section
      }
  });
});
