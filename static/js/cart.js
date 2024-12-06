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

// --- API endpoint URLs ---
const API_BASE_URL = 'http://localhost:5000'; // Base URL for backend API; update this to match your backend's URL.
const CART_API_URL = `${API_BASE_URL}/cart`; // Endpoint for cart-related operations, built dynamically.

// --- Function to render cart items on the page ---
function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Retrieve cart items from localStorage or initialize as an empty array.
    const cartContainer = document.getElementById('cart-container'); // Get the container element where cart items will be displayed.

    // Check if there are items in the cart and render them, else display a message indicating the cart is empty.
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
      `).join('') // Generate HTML for each cart item and join them into a single string.
      : `<p>Your cart is empty.</p>`; // Fallback if no items are in the cart.

    updateCartCount(); // Update the cart item count in the UI.
}

// --- Function to update cart count displayed in the navbar ---
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Get cart items or initialize as an empty array.
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total item count based on quantities.

    localStorage.setItem('cartCount', cartCount); // Store updated cart count in localStorage.

    const cartLink = document.getElementById('cart-link'); // Find the navbar element displaying the cart count.
    cartLink.textContent = `Cart (${cartCount})`; // Update its text content with the new count.
}

// --- Function to increase the quantity of an item in the cart ---
function increaseQuantity(itemId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Fetch cart items from localStorage.
    const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId)); // Find the item in the cart by its ID.

    if (itemIndex > -1) { // If the item exists in the cart:
        cartItems[itemIndex].quantity += 1; // Increment the item's quantity.
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save the updated cart back to localStorage.
        renderCart(); // Re-render the cart UI.
    }
}

// --- Function to decrease the quantity of an item in the cart ---
function decreaseQuantity(itemId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Fetch cart items from localStorage.
    const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId)); // Find the item in the cart by its ID.

    if (itemIndex > -1) { // If the item exists in the cart:
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity -= 1; // Decrease quantity if greater than 1.
        } else {
            cartItems.splice(itemIndex, 1); // Remove the item if quantity becomes 0.
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save the updated cart back to localStorage.
        renderCart(); // Re-render the cart UI.
    }
}

// --- Function to remove an item from the cart ---
function removeItem(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Fetch cart items from localStorage.
    cartItems = cartItems.filter(item => item.id !== parseInt(itemId)); // Filter out the item to be removed.

    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save the updated cart back to localStorage.
    renderCart(); // Re-render the cart UI.
}

// --- Function to clear all items from the cart ---
function clearCart() {
    localStorage.removeItem('cartItems'); // Remove the cart items from localStorage.
    localStorage.setItem('cartCount', 0); // Reset the cart count in localStorage.
    renderCart(); // Clear the cart UI.
}

// --- Event listener for cart actions ---
document.getElementById('cart-container').addEventListener('click', (event) => {
    const itemId = event.target.dataset.id; // Get the ID of the clicked item.

    // Determine the action based on the button clicked and call the appropriate function.
    if (event.target.classList.contains('increase-quantity')) {
        increaseQuantity(itemId);
    } else if (event.target.classList.contains('decrease-quantity')) {
        decreaseQuantity(itemId);
    } else if (event.target.classList.contains('remove-item')) {
        removeItem(itemId);
    }
});

// --- Initialize cart on page load ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded'); // Log a message for debugging.
    renderCart(); // Render the cart when the page loads.

    // Add event listener for the "Clear Cart" button if it exists.
    const clearCartButton = document.getElementById('clear-cart-btn');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            clearCart();
        });
    }
});

// --- Navbar Username Update ---
const username = localStorage.getItem("username") || "Chris Dave"; // Retrieve the username from localStorage or set a default.

const nameParts = username.split(" "); // Split the username into parts (first and last names).
const firstName = nameParts.slice(0, -1).join(" ") || "Chris"; // Combine all but the last word as the first name.
const lastName = nameParts.slice(-1).join(" ") || "DAVE"; // Use the last word as the last name.

// Update the DOM elements with the extracted first and last names.
document.querySelector(".first-name").textContent = firstName;
document.querySelector(".last-name").textContent = lastName;
