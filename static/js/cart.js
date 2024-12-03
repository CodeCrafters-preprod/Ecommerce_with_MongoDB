//In progess
// <!-- META DATA -->
// <!--
// Developer Details:
//     Name: Prachi Tavse, Tanisha Priya
//     Role: Frontend Developer

// Version:
//     Version: V 1.0 (2 December 2024)
//     Developers: Prachi Tavse, Tanisha Priya
//     Unit Test: Pass
//     Integration Test: Pass

// Description:
//     This is the shopping cart page for the Peoplely Fashion e-commerce platform.
//     Users can view their selected items, update quantities, and remove items from the cart.
//     The page displays item details like name, price, and expected delivery date, providing a clear and intuitive shopping experience.

// Dependencies:
//     - Environment:
//         - HTML5
//         - CSS3
//         - JavaScript (ES6+)

// To Run:
//     Open the `cart.html` file in a modern web browser.
// -->

function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');
    
    cartContainer.innerHTML = cartItems.length > 0 
      ? cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Delivered by: ${item.delivery}</p>
            <p>Quantity: 
              <button class="decrease-quantity" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="increase-quantity" data-id="${item.id}">+</button>
            </p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `).join('')
      : `<p>Your cart is empty.</p>`;
    
    updateCartCount(); // Ensure the count is updated every time the cart is rendered
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    localStorage.setItem('cartCount', cartCount);

    const cartLink = document.getElementById('cart-link');
    cartLink.textContent = `Cart (${cartCount})`; // Update the navbar count
}

function increaseQuantity(itemId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId));

    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    }
}

function decreaseQuantity(itemId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId));

    if (itemIndex > -1) {
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity -= 1;
        } else {
            cartItems.splice(itemIndex, 1); // Remove the item if quantity is 0
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    }
}

function removeItem(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== parseInt(itemId));

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

function clearCart() {
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartCount', 0);
    renderCart();
}

document.getElementById('cart-container').addEventListener('click', (event) => {
    const itemId = event.target.dataset.id;

    if (event.target.classList.contains('increase-quantity')) {
        increaseQuantity(itemId);
    } else if (event.target.classList.contains('decrease-quantity')) {
        decreaseQuantity(itemId);
    } else if (event.target.classList.contains('remove-item')) {
        removeItem(itemId);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    renderCart();

    // Add event listener for the "Clear Cart" button
    const clearCartButton = document.getElementById('clear-cart-btn');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            clearCart();
        });
    }
});


// --- Navbar Username Update ---
// Retrieve the username from localStorage
const username = localStorage.getItem("username") || "Chris Dave";

// Split the username into first and last names
const nameParts = username.split(" ");
const firstName = nameParts.slice(0, -1).join(" ") || "Chris"; // Everything except the last word
const lastName = nameParts.slice(-1).join(" ") || "DAVE"; // The last word

// Update the DOM elements with the names
document.querySelector(".first-name").textContent = firstName;
document.querySelector(".last-name").textContent = lastName;