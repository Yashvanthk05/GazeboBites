class Item {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

const Drinks = [
    new Item('Tea', 15, 'Drinks'),
    new Item('Coffee', 15, 'Drinks'),
    new Item('Badam/Ragi malt', 30, 'Drinks'),
    new Item('Nannari Sarpath', 30, 'Drinks'),
    new Item('Butter Milk', 30, 'Drinks'),
    new Item('Rose Milk', 50, 'Drinks'),
    new Item('Sugarcane', 40, 'Drinks'),
    new Item('Carrot Juice', 50, 'Drinks'),
    new Item('Strawberry', 80, 'Drinks'),
    new Item('Mango Milkshake', 70, 'Drinks'),
    // Add more items in this category
];

const mainCourse = [
    new Item('Dosa', 50, 'Main Course'),
    new Item('Idli(2 nos)', 35, 'Main Course'),
    new Item('Ragi-Dosa', 60, 'Main Course'),
    new Item('Egg-Dosa', 60, 'Main Course'),
    new Item('Curry-Dosa', 60, 'Main Course'),
    new Item('Kambu-Dosa', 60, 'Main Course'),
    new Item('Sambar Rice', 60, 'Main Course'),
    new Item('Curd Rice', 55, 'Main Course'),
    new Item('Tomato Rice',60, 'Main Course'),
    new Item('Fried Rice', 60, 'Main Course'),
    // Add more items in this category
];

const Chaat = [
    new Item('Masala Poori', 50, 'Chaat'),
    new Item('Dahi Poori', 50, 'Chaat'),
    new Item('Bhel Poori', 60, 'Chaat'),
    new Item('Paani Poori', 50, 'Chaat'),
    new Item('Chev Poori', 50, 'Chaat'),
    new Item('Channa Samosa', 50, 'Chaat'),
    new Item('Cutlet Channa', 50, 'Chaat'),
    new Item('Mushroom Fry Masala', 50, 'Chaat'),
    new Item('Vada Pav', 50, 'Chaat'),
    new Item('Pav Bhaji', 50, 'Chaat'),
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
generateCategory('Drinks', Drinks);
generateCategory('Main Course', mainCourse);
generateCategory('Chaat', Chaat);
