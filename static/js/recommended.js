// META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Developer details:
//     Name: Khushboo Mittal
//     Role: Architect

// Version:
//     Version: V 1.0 (26 November 2024)
//     Developers: Khushboo Mittal
//     Unit test: Pass
//     Integration test: Pass

// Description:
//     This JavaScript file handles the dynamic functionality for the "Recommended Products" section of the e-commerce homepage.
//     It includes features like the carousel functionality for displaying product recommendations, event listeners for navigation 
//     (such as next/previous buttons), and interactive zoom effect for product images. The script ensures smooth user interactions
//     with the carousel, automatic item scrolling, and efficient handling of user inputs to navigate through recommended products. 
//     It is optimized to provide a responsive and engaging experience for the user. 

// Dependencies:
//     - No external JavaScript libraries are used.
//     - Vanilla JavaScript used to handle interactions, DOM manipulation, and event handling for the interactive UI components.

// To use: Include this JavaScript file in the "recommended.html" to enable carousel scrolling,
//        zoom effects, and dynamic content updates for a personalized and interactive user experience.


document.addEventListener("DOMContentLoaded", () => {
    // --- Navbar Functionality ---
   
    // Get all navbar links
    const navbarLinks = document.querySelectorAll(".navbar a");

    // Add click event listeners to each navbar link
    navbarLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the default anchor behavior

            // Remove the "active" class from all navbar links
            navbarLinks.forEach((link) => link.classList.remove("active"));

            // Add the "active" class to the clicked link
            link.classList.add("active");

            // Optionally, handle navigation to the target page (uncomment below if needed)
            const targetPage = link.getAttribute("href"); // Get the target page URL
            window.location.href = targetPage; // Navigate to the target page
        });
    });

    // --- Carousel Functionality ---
    const carousel = document.querySelector(".carousel"); // Get the carousel container
    const items = document.querySelectorAll(".carousel-item"); // Get all carousel items
    const rightArrow = document.querySelector(".carousel-arrow.right"); // Get the right arrow element
    const leftArrow = document.querySelector(".carousel-arrow.left"); // Get the left arrow element
    const totalItems = items.length; // Total number of items in the carousel

    let currentIndex = 0; // Track the current index of the carousel

    // Function to scroll the carousel to the current index
    function scrollToIndex(index) {
        const offset = items[index].offsetLeft; // Get the left offset of the current item
        carousel.scrollTo({
            left: offset, // Scroll to the calculated offset
            behavior: "smooth", // Smooth scrolling animation
        });
    }

    // Right arrow click event to move to the next item
    rightArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalItems; // Increment index (loop back to the start if needed)
        scrollToIndex(currentIndex); // Scroll to the updated index
    });

    // Left arrow click event to move to the previous item
    leftArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + totalItems - 1) % totalItems; // Decrement index (loop back to the end if needed)
        scrollToIndex(currentIndex); // Scroll to the updated index
    });

    // Automatic Carousel Movement
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems; // Increment index (loop back to the start if needed)
        if (currentIndex === 0) {
            // Special handling for resetting to the first item
            carousel.scrollTo({
                left: 0, // Scroll to the extreme left (first image)
                behavior: "instant", // Instantly reset without smooth animation
            });
        } else {
            scrollToIndex(currentIndex); // Scroll to the updated index
        }
    }, 3000); // Change items every 3 seconds

    // --- Carousel Zooming Functionality ---
    items.forEach(item => {
        // Add a mousemove event listener to each carousel item for zoom effect
        item.addEventListener("mousemove", (e) => {
            const itemRect = item.getBoundingClientRect(); // Get the dimensions of the item
            const offsetX = e.clientX - itemRect.left; // X-coordinate of the mouse relative to the item
            const offsetY = e.clientY - itemRect.top; // Y-coordinate of the mouse relative to the item

            // Set the transform-origin based on the mouse position
            item.style.transformOrigin = `${(offsetX / itemRect.width) * 100}% ${(offsetY / itemRect.height) * 100}%`;

            // Apply a slight zoom-in effect with smooth transition
            item.style.transform = 'scale(1.02)'; // Subtle zoom effect
            item.style.transition = 'transform 0.2s ease-in-out'; // Smooth animation for zoom effect
        });

        // Reset the zoom effect when the mouse leaves the carousel item
        item.addEventListener("mouseleave", () => {
            item.style.transform = 'scale(1)'; // Reset to original scale
        });
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