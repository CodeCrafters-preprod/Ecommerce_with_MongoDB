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

// API endpoint URLs
const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual backend URL
const CART_API_URL = `${API_BASE_URL}/cart`; // Assuming you have a '/cart' endpoint

// --- Render Cart ---
async function renderCart() {
    // Fetch cart items from backend (or fallback to localStorage if offline)
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    try {
        const response = await fetch(`${CART_API_URL}/get`);
        if (response.ok) {
            cartItems = await response.json(); // Replace localStorage items with server data
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Keep localStorage in sync
        } else {
            console.error('Failed to fetch cart items:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }

    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = cartItems.length > 0
        ? cartItems.map(item => `
            <div class="cart-item" data-id="${item._id}">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Delivered by: ${item.delivery}</p>
                <p>Quantity: 
                  <button class="decrease-quantity" data-id="${item._id}">-</button>
                  <span>${item.quantity}</span>
                  <button class="increase-quantity" data-id="${item._id}">+</button>
                </p>
                <button class="remove-item" data-id="${item._id}">Remove</button>
              </div>
            </div>
          `).join('')
        : `<p>Your cart is empty.</p>`;

    updateCartCount(cartItems); // Ensure the count is updated
}

// --- Update Cart Count ---
function updateCartCount(cartItems) {
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem('cartCount', cartCount);

    const cartLink = document.getElementById('cart-link');
    cartLink.textContent = `Cart (${cartCount})`;
}

// --- Add to Cart ---
async function addToCart(item) {
    try {
        const response = await fetch(`${CART_API_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });

        if (response.ok) {
            console.log('Item added to cart:', await response.json());
            renderCart(); // Refresh the cart view
        } else {
            console.error('Failed to add item to cart:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}

// --- Increase Quantity ---
async function increaseQuantity(itemId) {
    try {
        const response = await fetch(`${CART_API_URL}/update`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: itemId, action: 'increase' }),
        });

        if (response.ok) {
            renderCart();
        } else {
            console.error('Failed to increase item quantity:', response.statusText);
        }
    } catch (error) {
        console.error('Error increasing quantity:', error);
    }
}

// --- Decrease Quantity ---
async function decreaseQuantity(itemId) {
    try {
        const response = await fetch(`${CART_API_URL}/update`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: itemId, action: 'decrease' }),
        });

        if (response.ok) {
            renderCart();
        } else {
            console.error('Failed to decrease item quantity:', response.statusText);
        }
    } catch (error) {
        console.error('Error decreasing quantity:', error);
    }
}

// --- Remove Item ---
async function removeItem(itemId) {
    try {
        const response = await fetch(`${CART_API_URL}/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: itemId }),
        });

        if (response.ok) {
            renderCart();
        } else {
            console.error('Failed to remove item from cart:', response.statusText);
        }
    } catch (error) {
        console.error('Error removing item:', error);
    }
}

// --- Clear Cart ---
async function clearCart() {
    try {
        const response = await fetch(`${CART_API_URL}/clear`, {
            method: 'DELETE',
        });

        if (response.ok) {
            localStorage.removeItem('cartItems'); // Clear localStorage as well
            localStorage.setItem('cartCount', 0);
            renderCart();
        } else {
            console.error('Failed to clear cart:', response.statusText);
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}

// --- Event Listeners ---
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
    renderCart();

    const clearCartButton = document.getElementById('clear-cart-btn');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            clearCart();
        });
    }
});

document.querySelector(".first-name").textContent = firstName;
document.querySelector(".last-name").textContent = lastName;

document.addEventListener('DOMContentLoaded', function () {
  // Load cart count from localStorage
  const cartCount = localStorage.getItem('cartCount') || 0;

  // Update the cart link on the navbar
  const cartLink = document.getElementById('cart-link');
  if (cartLink) {
      cartLink.textContent = `Cart (${cartCount})`;
  }
});