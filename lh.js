class Item {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

const PS = [
    new Item('Hi Kitty Cat', 70, 'PS'),
    new Item('JackFruit', 70, 'PS'),
    new Item('Rasamillai', 70, 'PS'),
    new Item('Bubble gum', 70, 'PS'),
    new Item('White House', 70, 'PS'),
    new Item('D-Purple', 70, 'PS'),
    new Item('Tropical Mix', 70, 'PS'),
    new Item('Mango Peach', 70, 'PS'),
    new Item('Crazy Caremel', 70, 'PS'),
    new Item('American Vennila', 70, 'PS'),
    // Add more items in this category
];

const CS = [
    new Item('Oreo', 50, 'Chocolate Shakes'),
    new Item('Belegium', 50, 'Chocolate Shakes'),
    new Item('Ferror Rocker', 50, 'Chocolate Shakes'),
    new Item('Banna Bonkers', 50, 'Chocolate Shakes'),
    new Item('Choco Oreo', 70, 'Chocolate Shakes'),
    new Item('Strawberry Oreo', 70, 'Chocolate Shakes'),
    new Item('ChuckBerry', 70, 'Chocolate Shakes'),
    new Item('Bourbon Shake', 80, 'Chocolate Shakes'),
    new Item('Nuttela Shake',80, 'Chocolate Shakes'),
    new Item('Caramelate', 70, 'Chocolate Shakes'),
    // Add more items in this category
];

const Scope = [
    new Item('Kulfi', 40, 'Scope'),
    new Item('Fruit Boul', 50, 'Scope'),
    new Item('Fruit an Cream', 60, 'Scope'),
    new Item('Cookies and Cream', 70, 'Scope'),
    new Item('Sinful Chocolate', 80, 'Scope'),
    new Item('Fruit Custard', 80, 'Scope'),
    new Item('Fruit Salad Ice-Cream', 90, 'Scope'),
    new Item('Sinful Brownie', 90, 'Scope'),
    new Item('Gudbud', 100, 'Scope'),
    new Item('Death By Chocolate', 100, 'Scope'),
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
generateCategory('Premium Shakes', PS);
generateCategory('Chocolate Shakes', CS);
generateCategory('Scope', Scope);