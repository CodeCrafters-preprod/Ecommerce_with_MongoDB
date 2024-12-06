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
   
// Assuming `item.files_id` contains the MongoDB file ID for the image
   const imageGallery = document.querySelector('.image-gallery');

   // Load Images for Selected Category
   async function loadImages(category) {
     // Clear existing images
     imageGallery.innerHTML = '';
   
     try {
       // Fetch images from the Flask API
       const response = await fetch(`/images/${category}`);
       const data = await response.json();
   
       // Check if data is available
       if (data.length === 0) {
         imageGallery.innerHTML = '<p>No products available in this category.</p>';
         return;
       }
   
       // Add new images with product details
       data.forEach(item => {
         const imgContainer = document.createElement('div');
         imgContainer.className = 'image-container';
   
         const img = document.createElement('img');
         img.src = item.image_url; // Use the product's image URL
         img.alt = item.name;  // Use the product's name as alt text
   
         imgContainer.appendChild(img);
         imageGallery.appendChild(imgContainer);
   
         // Attach click event to open modal with product details
         imgContainer.addEventListener('click', () => openModal(item));
       });
     } catch (error) {
       console.error('Error loading images:', error);
       imageGallery.innerHTML = '<p>Error loading products. Please try again later.</p>';
     }
   }
   
   // Load default category images on page load
   loadImages('footwear'); // Load default category
   
   // Reference to the modal and its content
   const modal = document.getElementById('product-modal');
   const productDetailsDiv = document.getElementById('product-details');
   
   // Open Modal and Display Product Details
   function openModal(item) {
     modal.style.display = 'block';
   
     // Log item to debug
     console.log("Item in openModal:", item);
   
     // Populate the modal with product details
     productDetailsDiv.innerHTML = `
       <img src="${item.image_url}" alt="Product Image" style="width: 100%; border-radius: 10px;"/>
       <h3>${item.name}</h3>
       <p>${item.description}</p>
       <p>Price: $${item.price}</p>
       <p>Delivery: ${item.delivery}</p>
       <button id="add-to-cart-btn" class="add-to-cart-btn">Add to Cart</button>
     `;
   
     // Attach the Add to Cart button functionality dynamically
     document.getElementById('add-to-cart-btn').addEventListener('click', function() {
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
       cartItems.push({
         id: item.id,
         name: item.name,
         image: item.image_url,
         price: item.price,
         quantity: 1, // Set initial quantity to 1
         delivery: item.delivery
       });
     }
   
     // Store the updated cart items back into localStorage
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
   
     // Update the cart count
     updateCartCount();
   
     // Close the modal
     closeModal();
   }
   
   // Update Cart Count
   function updateCartCount() {
     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
     const cartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
     localStorage.setItem('cartCount', cartCount);
   
     // Update the cart count in the navbar
     const cartLink = document.getElementById('cart-link');
     if (cartLink) {
       cartLink.textContent = `Cart (${cartCount})`;
     }
   }
   
   // Function to close the modal
   function closeModal() {
     modal.style.display = 'none';
   }
   
   // Category Navigation
   const buttons = document.querySelectorAll('.category-navbar button');
   
   // Add click event listeners to each button
   buttons.forEach(button => {
     button.addEventListener('click', () => {
       // Remove the active class from all buttons
       buttons.forEach(btn => btn.classList.remove('active'));
   
       // Add the active class to the clicked button
       button.classList.add('active');
   
       // Load the appropriate category
       const category = button.dataset.category; // Assuming each button has a data-category attribute
       loadImages(category);
     });
   });
   
   // Navbar Username Update
   document.addEventListener('DOMContentLoaded', function () {
     const username = localStorage.getItem("username") || "Chris Dave";
     const nameParts = username.split(" ");
     const firstName = nameParts.slice(0, -1).join(" ") || "Chris";
     const lastName = nameParts.slice(-1).join(" ") || "DAVE";
   
     document.querySelector(".first-name").textContent = firstName;
     document.querySelector(".last-name").textContent = lastName;
   
     // Update cart count from localStorage
     updateCartCount();
   });
   
