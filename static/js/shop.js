/* META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* Developer details:
    Name: Prachi Tavse
    Role: Architect */

/* Version:
    Version: V 1.0 (2 December 2024)
    Developers: Prachi Tavse
    Unit test: Pass
    Integration test: Pass */

/* Description:
    This JavaScript file handles the dynamic behavior for the shop categories image gallery. */

/* Dependencies:
    - No external JavaScript libraries are used.

/* To use: Link this JavaScript file within the HTML to enable the dynamic interactivity
   for the shop. */

// Sample data for each category
// Sample data for each category with product details (id, name, price, etc.)
const categories = {
  footwear: [
    { id: 1, name: 'Bellies', image: '../assets/Shoes/12.png', price: 50, description: 'Comfortable running shoes' },
    { id: 2, name: 'Heels', image: '../assets/Shoes/13.png', price: 80, description: 'Durable winter boots' },
    { id: 3, name: 'Heels', image: '../assets/Shoes/14.png', price: 20, description: 'Perfect for summer' },
    { id: 4, name: 'Shoes', image: '../assets/Shoes/15.png', price: 30, description: 'Cozy home slippers' },
  ],
  fragrance: [
    { id: 5, name: 'Perfume A', image: '../assets/Perfume/46.png', price: 60, description: 'Perfume for men' },
    { id: 6, name: 'Perfume B', image: '../assets/Perfume/47.png', price: 70, description: 'Luxurius fragrance' },
    { id: 7, name: 'Perfume C', image: '../assets/Perfume/48.png', price: 50, description: 'Woody fragrance' },
  ],
  apparels: [
    { id: 8, name: 'T-Shirt', image: '../assets/Tshirt/16.png', price: 25, description: 'Comfortable cotton t-shirt' },
    { id: 9, name: 'T-shirt', image: '../assets/Tshirt/17.png', price: 40, description: 'Comfortable cotton t-shirt' },
    { id: 10, name: 'Jacket', image: '../assets/Tshirt/18.png', price: 60, description: 'Warm winter hoodie' },
  ],
  bags: [
    { id: 11, name: 'Handbag', image: '../assets/Bag/31.png', price: 100, description: 'Elegant leather handbag' },
    { id: 12, name: 'Handbag', image: '../assets/Bag/32.png', price: 50, description: 'Spacious and practical' },
    { id: 13, name: 'Handbag', image: '../assets/Bag/33.png', price: 40, description: 'Elegant Handbag' },
  ],
};

const imageGallery = document.querySelector('.image-gallery');

// Load Images for Selected Category
function loadImages(category) {
  // Clear existing images
  imageGallery.innerHTML = '';

  // Add new images with product details
  categories[category].forEach(item => {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-container';

    const img = document.createElement('img');
    img.src = item.image; // Use the product's image
    img.alt = item.name;  // Use the product's name as alt text

    imgContainer.appendChild(img);
    imageGallery.appendChild(imgContainer);

    // Attach click event to open modal with product details
    imgContainer.addEventListener('click', () => openModal(item));
  });
}

// Load default category images on page load
loadImages('footwear'); // Load default category

// Reference to the modal and its content
const modal = document.getElementById('product-modal');
const productDetailsDiv = document.getElementById('product-details');

// Open Modal and Display Product Details
function openModal(item) {
  modal.style.display = 'block';

  // Populate the modal with product details
  productDetailsDiv.innerHTML = `
    <img src="${item.image}" alt="Product Image" style="width: 100%; border-radius: 10px;"/>
    <h3>Category: ${item.name}</h3>
    <p>${item.description}</p>
    <p>Price: $${item.price}</p>
    <button id="add-to-cart-btn" class="add-to-cart-btn">Add to Cart</button>
  `;

  // Attach the Add to Cart button functionality dynamically
  document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    console.log("Item passed to addToCart:", item); // Debug item object
    addToCart(item);
  });
}


// Add to Cart Functionality
function addToCart(item) {
  // Retrieve the current cart items from localStorage (or initialize an empty array if not found)
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Check if the item is already in the cart
  const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

  if (existingItemIndex > -1) {
    // If the item is already in the cart, increase the quantity
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // If it's a new item, add it to the cart with quantity 1
    item.quantity = 1; // Set initial quantity to 1
    cartItems.push(item);
  }

  // Store the updated cart items back into localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update the cart count in localStorage and the navbar
  let cartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0); // Sum up the quantities
  localStorage.setItem('cartCount', cartCount);

  // Update the cart count in the navbar
  const cartLink = document.getElementById('cart-link');
  cartLink.textContent = `Cart (${cartCount})`;

  // Close the modal after adding to cart
  closeModal();
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';

}

// Select all buttons in the category navbar
const buttons = document.querySelectorAll('.category-navbar button');

// Add click event listeners to each button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove the active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add the active class to the clicked button
    button.classList.add('active');

    // Load the appropriate category
    loadImages(button.dataset.category); // Assuming each button has a data-category attribute
  });
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

document.addEventListener('DOMContentLoaded', function () {
  // Load cart count from localStorage
  const cartCount = localStorage.getItem('cartCount') || 0;

  // Update the cart link on the navbar
  const cartLink = document.getElementById('cart-link');
  if (cartLink) {
      cartLink.textContent = `Cart (${cartCount})`;
  }
});
