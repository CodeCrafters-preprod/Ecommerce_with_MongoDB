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
//     This JavaScript file powers the homepage interactivity of a modern, AI-enabled e-commerce website. It handles the dynamic behavior of various homepage components, 
//     including navigation, carousel/slider, live product predictions, and interactive features. The functionality is designed to enhance the user experience, 
//     providing smooth transitions, user engagement, and a seamless browsing experience for products like shoes, apparels, and bags.

// Dependencies:
//     - Custom JavaScript for homepage interactions such as carousel functionality, live predictions, and dynamic content updates.
//     - Supports dynamic DOM manipulation, event handling, and responsive behavior for enhanced interactivity and smooth user experience.

// To use: Link this JS file to the homepage HTML for the e-commerce website.



// Redirect to Personal Details Page
function redirectToPersonalDetails() {
  // Changes the current location of the browser to the Personal Details page
  window.location.href = "/personal_details";
}

// Redirect to Recommended Page
function redirectToRecommended() {
  // Retrieve the input values for username and password from the HTML form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check if both username and password are provided
  if (username && password) {
      // Show a welcome alert to the user with their username
      alert(`Welcome, ${username}! Redirecting to Recommended Page...`);
      // Redirect the browser to the Recommended page
      window.location.href = "/recommended";
      localStorage.setItem("username", username); // Save to localStorage
  } else {
      // Alert the user to provide valid credentials if either field is empty
      alert("Please enter valid credentials.");
  }
}

// JavaScript for Carousel with Forward-Only Circular Loop
const carousel = document.querySelector(".carousel"); // Get the carousel container element
const items = document.querySelectorAll(".carousel-item"); // Get all items in the carousel
const prevArrow = document.getElementById("prevArrow"); // Get the previous arrow button element
const nextArrow = document.getElementById("nextArrow"); // Get the next arrow button element

let scrollPosition = 0; // Keeps track of the current scroll position
const scrollStep = items[0].offsetWidth + 10; // Calculate the scroll step as item width + margin (10px)

// Function to scroll the carousel forward
function scrollForward() {
  // Increment the scroll position by the scroll step
  scrollPosition += scrollStep;

  // If the scroll position exceeds the total scrollable width, reset to the start
  if (scrollPosition >= carousel.scrollWidth) {
      scrollPosition = 0; // Reset to the first item
  }

  // Smoothly scroll the carousel to the updated position
  carousel.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
  });
}

// Function to scroll the carousel backward
function scrollBackward() {
  // Decrement the scroll position by the scroll step
  scrollPosition -= scrollStep;

  // If the scroll position goes below zero, wrap around to the last item
  if (scrollPosition < 0) {
      scrollPosition = carousel.scrollWidth - scrollStep; // Go to the last item
  }

  // Smoothly scroll the carousel to the updated position
  carousel.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
  });
}

// Add event listeners to the arrows
nextArrow.addEventListener("click", scrollForward); // Scroll forward on next arrow click
prevArrow.addEventListener("click", scrollBackward); // Scroll backward on previous arrow click

// Automatically scroll forward every 3 seconds
setInterval(scrollForward, 3000);

