//In progess
// <!-- META DATA -->
// <!--
// Developer Details:
//     Name: Tanisha Priya, Prachi Tavse
//     Role: Frontend Developer

// Version:
//     Version: V 1.0 (2 December 2024)
//     Developers: Tanisha Priya, Prachi Tavse
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
// Function to update the cart item count

function updateCartCount() {
    const quantity1 = parseInt(document.getElementById('quantity1').textContent);
    const quantity2 = parseInt(document.getElementById('quantity2').textContent);
    const totalItems = quantity1 + quantity2;

    const cartLink = document.getElementById('cart-link');
    if(cartLink){
        cartLink.textContent = `Cart (${totalItems})`;
    }
    
    localStorage.setItem('cartCount', totalItems);
}

// Functionality for quantity buttons
const plus1 = document.getElementById('plus1');
if(plus1){
plus1.addEventListener('click', function() {
    let quantity = document.getElementById('quantity1');
    quantity.textContent = parseInt(quantity.textContent) + 1;
    updateCartCount();
});
}

const minus1 = document.getElementById('minus1');
if(minus1){
minus1.addEventListener('click', function() {
    let quantity = document.getElementById('quantity1');
    if (parseInt(quantity.textContent) > 1) {
        quantity.textContent = parseInt(quantity.textContent) - 1;
    }
    updateCartCount();
});
}

const plus2 = document.getElementById('plus2');
if(plus2){
plus2.addEventListener('click', function() {
    let quantity = document.getElementById('quantity2');
    quantity.textContent = parseInt(quantity.textContent) + 1;
    updateCartCount();
});
}

const minus2 = document.getElementById('minus2')
if(minus2){
minus2.addEventListener('click', function() {
    let quantity = document.getElementById('quantity2');
    if (parseInt(quantity.textContent) > 1) {
        quantity.textContent = parseInt(quantity.textContent) - 1;
    }
    updateCartCount();
});
}

// Functionality for remove button
let removeButtons = document.querySelectorAll('.remove-btn');
if (removeButtons) {
    removeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let cartItem = button.closest('.cart-item');
            let quantity = cartItem.querySelector('.quantity').textContent; // Assuming quantity has class 'quantity'
            updateCartCount(-parseInt(quantity)); // Decrease cart count by the quantity being removed
            cartItem.remove();
        });
    });
}

updateCartCount();

// Function to load cart items from localStorage
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    // Clear the existing content in the cart container
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block'; // Show "Cart is empty" message
    } else {
        emptyCartMessage.style.display = 'none'; // Hide the message if cart has items

        cartItems.forEach(item => {
            // Create and insert cart item dynamically
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            
            cartItemDiv.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h2>${item.name}</h2>
                    <p class="price">$${item.price}</p>
                    <p class="date">Delivery Date: ${item.deliveryDate}</p>
                    <div class="quantity">
                        <button class="quantity-btn" data-action="minus" data-item-id="${item.id}">-</button>
                        <span class="quantity" id="quantity-${item.id}">${item.quantity}</span>
                        <button class="quantity-btn" data-action="plus" data-item-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-item-id="${item.id}">Remove</button>
                </div>
            `;
            
            cartContainer.appendChild(cartItemDiv);
        });

        // Attach event listeners to quantity buttons and remove buttons
        attachCartEventListeners();
    }
}

// Attach event listeners to quantity buttons and remove buttons
function attachCartEventListeners() {
    const plusButtons = document.querySelectorAll('.quantity-btn[data-action="plus"]');
    const minusButtons = document.querySelectorAll('.quantity-btn[data-action="minus"]');
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item-id');
            updateItemQuantity(itemId, 1);
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item-id');
            updateItemQuantity(itemId, -1);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item-id');
            removeItemFromCart(itemId);
        });
    });
}

// Function to update item quantity in cart
function updateItemQuantity(itemId, change) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        const item = cartItems[itemIndex];
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeItemFromCart(itemId);
        } else {
            cartItems[itemIndex] = item;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            loadCartItems(); // Refresh cart
            updateCartCount();
        }
    }
}

// Function to remove item from cart
function removeItemFromCart(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems(); // Refresh cart
    updateCartCount();
}

// Function to update cart count in navbar
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const cartLink = document.getElementById('cart-link');
    cartLink.textContent = `Cart (${totalItems})`;

    localStorage.setItem('cartCount', totalItems);
}

// Initialize the cart
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartCount();
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