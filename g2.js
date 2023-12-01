class Item {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

const Appetizer = [
    new Item('Paneer Sandwich', 60, 'Appetizer'),
    new Item('Cheese Sandwich', 60, 'Appetizer'),
    new Item('Chilli Cheese Toast', 40, 'Appetizer'),
    new Item('Chicken Cheese', 70, 'Appetizer'),
    new Item('Aloo Tikki', 60, 'Appetizer'),
    new Item('Veg Roll', 30, 'Appetizer'),
    new Item('French Fries', 60, 'Appetizer'),
    new Item('Cheese Corn Nuggets', 60, 'Appetizer'),
    new Item('Chicken Nuggets', 70, 'Appetizer'),
    new Item('Veg Puff', 20, 'Appetizer'),
    // Add more items in this category
];

const Desserts = [
    new Item('Chocolate Truffle', 50, 'Desserts'),
    new Item('Choco Lava', 50, 'Desserts'),
    new Item('Brownie', 60, 'Desserts'),
    new Item('Donut', 50, 'Desserts'),
    new Item('Chocolate Swiss Roll', 50, 'Desserts'),
    new Item('Chocolate Musse', 40, 'Desserts'),
    new Item('Banna Bread', 30, 'Desserts'),
    new Item('Ice-cream Scope', 40, 'Desserts'),
    new Item('Fudget Brownie',70, 'Desserts'),
    new Item('Fuffin', 30, 'Desserts'),
    // Add more items in this category
];

const Beverages = [
    new Item('Water Melon Juice', 40, 'Beverages'),
    new Item('Lime', 30, 'Beverages'),
    new Item('Pinnapple', 50, 'Beverages'),
    new Item('Banna', 40, 'Beverages'),
    new Item('Sweet Lime', 50, 'Beverages'),
    new Item('Grape', 50, 'Beverages'),
    new Item('Muskmelon', 50, 'Beverages'),
    new Item('Pomegranat Juice', 60, 'Beverages'),
    new Item('Tea', 15, 'Beverages'),
    new Item('Coffee', 15, 'Beverages'),
    // Add more items in this category
];

function generateCategory(categoryName, items) {
    const menuContainer = document.getElementById('menu-container');

    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('menu-category');

    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = categoryName;
    categoryDiv.appendChild(categoryTitle);

    items.forEach((item) => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');

        menuItemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
            <button class="add-button" onclick="promptQuantity('${item.name}', ${item.price}, '${item.category}')">Add</button>
        `;

        categoryDiv.appendChild(menuItemDiv);
    });

    menuContainer.appendChild(categoryDiv);
}

function promptQuantity(itemName, itemPrice, category) {
    const quantity = prompt(`Enter quantity for ${itemName}:`, '1');

    if (quantity !== null && !isNaN(quantity) && parseInt(quantity) > 0) {
        addItem(itemName, itemPrice, quantity, category);
    } else {
        alert('Invalid quantity. Please enter a valid number.');
    }
}

function addItem(name, price, quantity, category) {
    const totalItemPrice = price * parseInt(quantity);
    const summaryList = document.getElementById('summary-list');
    const totalPriceElement = document.getElementById('total-price');

    const summaryItem = document.createElement('li');
    summaryItem.textContent = `${name} x${quantity}: ₹${totalItemPrice}`;

    summaryList.appendChild(summaryItem);

    const totalOrderPrice = calculateTotalOrderPrice();
    totalPriceElement.textContent = `Total: ₹${totalOrderPrice}`;
}

function calculateTotalOrderPrice() {
    const itemPrices = document.querySelectorAll('#summary-list li');
    let total = 0;

    itemPrices.forEach((item) => {
        const price = parseInt(item.textContent.match(/₹(\d+)/)[1]);
        total += price;
    });

    return total;
}

function confirmOrder() {
    const referenceId = generateReferenceId();
    var orderSummary = getSummary();
    orderSummary["ID"]=referenceId;
    const data=JSON.stringify(orderSummary);
    console.log(data)
    alert(`Your order has been placed!\nReference ID: ${referenceId}`)
    resetOrder();
}

function getSummary() {
    const summaryList = document.getElementById('summary-list');
    const obj = {};

    summaryList.childNodes.forEach(item => {
        var index=item.textContent.indexOf(' x');
        var name=item.textContent.slice(0,index);
        var qty=item.textContent.slice(index+2, item.textContent.indexOf(':'));
        obj[name]=qty;
        console.log(obj);
    });

    return obj;
}

function getOrderSummary() {
    const summaryList = document.getElementById('summary-list');
    const items = [];

    summaryList.childNodes.forEach(item => {
        items.push(item.textContent.trim());
    });

    return items.length ? items.join('\n') : 'No items in the order.';
}

function resetOrder() {
    const summaryList = document.getElementById('summary-list');
    const totalPriceElement = document.getElementById('total-price');

    summaryList.innerHTML = '';
    totalPriceElement.textContent = 'Total: ₹0';
}

function generateReferenceId() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Call the function to generate menu items for each category
generateCategory('Appetizer', Appetizer);
generateCategory('Desserts', Desserts);
generateCategory('Beverages', Beverages);
