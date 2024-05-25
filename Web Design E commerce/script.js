// Get all add-to-cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Get the cart items container
const cartItems = document.getElementById('cart-items');

// Initialize an empty cart
let cart = [];

// Function to render cart items
function renderCart() {
    // Clear the cart items container
    cartItems.innerHTML = '';

    // Loop through each item in the cart
    cart.forEach(item => {
        // Check if the item is already in the cart
        const existingItem = cart.find(i => i.name === item.name);
        const count = existingItem ? existingItem.count : 1;

        // Create a new list item for the cart
        const li = document.createElement('li');
        li.textContent = `${item.name} x${count} - $${item.price * count}`;

        // Create a button to remove the item from the cart
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(item));

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the cart items container
        cartItems.appendChild(li);
    });

    // Calculate and display the total price
    const total = cart.reduce((acc, item) => acc + (item.price * item.count), 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Function to add an item to the cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.count++;
    } else {
        cart.push({ name, price, count: 1 });
    }
    renderCart();
}

// Function to remove an item from the cart
function removeFromCart(item) {
    const index = cart.indexOf(item);
    if (index !== -1) {
        if (item.count > 1) {
            item.count--;
        } else {
            cart.splice(index, 1);
        }
        renderCart();
    }
}

// Function to generate receipt
function generateReceipt() {
    let receipt = 'Receipt:\n\n';
    cart.forEach(item => {
        receipt += `${item.name} x${item.count} - $${item.price * item.count}\n`;
    });
    receipt += `\nTotal: $${document.getElementById('total').textContent}\n`;
    receipt += `Change: $${document.getElementById('change').textContent}`;
    alert(receipt);
}

// Event listeners for add-to-cart buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
    });
});

// Event listener for calculate change button
document.getElementById('calculate-change').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const total = parseFloat(document.getElementById('total').textContent);
    const change = amount - total;
    document.getElementById('change').textContent = change.toFixed(2);
});

// Event listener for complete order button
document.getElementById('complete-order').addEventListener('click', generateReceipt);
