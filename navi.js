const storeLayouts = {
    store1: {
        entrance: { x: 50, y: 650 },
        zones: [
            { name: 'Dairy', x: 150, y: 100 },
            { name: 'Fruits', x: 350, y: 100 },
            { name: 'Beverages', x: 550, y: 100 },
            { name: 'Snacks', x: 750, y: 100 },
        ],
        products: {
            milk: { x: 150, y: 100 },
            apple: { x: 350, y: 100 },
            juice: { x: 550, y: 100 },
            chips: { x: 750, y: 100 },
        },
    },
    store2: {
        entrance: { x: 50, y: 650 },
        zones: [
            { name: 'Dairy', x: 200, y: 150 },
            { name: 'Fruits', x: 400, y: 150 },
            { name: 'Beverages', x: 600, y: 150 },
            { name: 'Snacks', x: 800, y: 150 },
        ],
        products: {
            milk: { x: 200, y: 150 },
            apple: { x: 400, y: 150 },
            juice: { x: 600, y: 150 },
            chips: { x: 800, y: 150 },
        },
    },
};

const shoppingLists = {
    store1: {
        list1: ['milk', 'apple', 'juice', 'chips'],
        list2: ['bread', 'orange', 'milk', 'soda'],
    },
    store2: {
        list1: ['rice', 'potato', 'onion', 'tomato'],
        list2: ['cereal', 'flour', 'sugar', 'salt'],
    },
};

const urlParams = new URLSearchParams(window.location.search);
const store = urlParams.get('store');
const shoppingList = urlParams.get('list');

let collectedItems = new Set();

function generateShoppingList() {
    const selectedItemsList = document.getElementById('selected-items');
    const items = shoppingLists[store][shoppingList];
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.charAt(0).toUpperCase() + item.slice(1);
        li.addEventListener('click', () => markItemTaken(item));
        selectedItemsList.appendChild(li);
    });
}

function markItemTaken(item) {
    collectedItems.add(item);
    drawStoreMap();
    updateShoppingList();
}

function updateShoppingList() {
    const selectedItemsList = document.getElementById('selected-items');
    selectedItemsList.innerHTML = '';
    const items = shoppingLists[store][shoppingList];
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.charAt(0).toUpperCase() + item.slice(1);
        if (collectedItems.has(item)) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'gray';
        }
        li.addEventListener('click', () => markItemTaken(item));
        selectedItemsList.appendChild(li);
    });
}

function drawStoreMap() {
    const canvas = document.getElementById('store-map');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const layout = storeLayouts[store];
    const { entrance, zones, products } = layout;

    ctx.beginPath();
    ctx.arc(entrance.x, entrance.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

    zones.forEach(zone => {
        ctx.beginPath();
        ctx.rect(zone.x, zone.y, 80, 50);
        ctx.fillStyle = 'lightgrey';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(zone.name, zone.x + 5, zone.y + 25);
        ctx.closePath();
    });

    Object.keys(products).forEach(product => {
        const { x, y } = products[product];
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = collectedItems.has(product) ? 'grey' : 'green';
        ctx.fill();
        ctx.closePath();
    });

    if (collectedItems.size > 0) {
        const items = Array.from(collectedItems);
        items.forEach(item => {
            const product = products[item];
            ctx.beginPath();
            ctx.arc(product.x, product.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = 'yellow';
            ctx.fill();
            ctx.closePath();
        });
    }

    Object.values(products).forEach(product => {
        drawPath(entrance, product);
    });
}

function drawPath(start, end) {
    const canvas = document.getElementById('store-map');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.closePath();
}

generateShoppingList();
drawStoreMap();
