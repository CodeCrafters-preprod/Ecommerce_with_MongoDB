/* META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* Developer details:
    Name: Harshita Jangde
    Role: Architect */

/* Version:
    Version: V 1.0 (2 December 2024)
    Developers: Harshita Jangde
    Unit test: Pass
    Integration test: Pass */

/* Description:
    This JavaScript file handles the dynamic behavior for the personal details section,
    including interactive features like form input adjustments, active link highlighting, 
    and saving user details to localStorage. */

/* Dependencies:
    - No external JavaScript libraries are used.
    - Vanilla JavaScript used to handle interactions, DOM manipulation, and event handling for the interactive UI components.

/* To use: Link this JavaScript file within the HTML to enable the dynamic interactivity
   for the personal details section. */

document.addEventListener("DOMContentLoaded", () => {
    // Navbar functionality (active link highlighting)
    // Get all navbar links
    const navbarLinks = document.querySelectorAll(".navbar a");

    // Add click event listeners to each navbar link
    navbarLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the default anchor behavior (page reload)

            // Remove the "active" class from all navbar links
            navbarLinks.forEach((link) => link.classList.remove("active"));

            // Add the "active" class to the clicked link
            link.classList.add("active");

            // Optionally, handle navigation to the target page (uncomment below if needed)
            const targetPage = link.getAttribute("href"); // Get the target page URL
            window.location.href = targetPage; // Navigate to the target page
        });
    });

    // --- Navbar Username Update ---
    // Retrieve the username from localStorage
    const username = localStorage.getItem("username") || "Chris Dave";

    // Split the username into first and last names
    const nameParts = username.split(" ");
    const firstName = nameParts.slice(0, -1).join(" ") || "Chris"; // Everything except the last word
    const lastName = nameParts.slice(-1).join(" ") || "DAVE"; // The last word

    // Update the DOM elements with the first and last names
    document.querySelector(".first-name").textContent = firstName;
    document.querySelector(".last-name").textContent = lastName;

    // --- Dynamically adjust input field width ---
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        const adjustWidth = () => {
            // Create a temporary span to measure text width
            const span = document.createElement("span");
            span.style.visibility = "hidden";
            span.style.position = "absolute";
            span.style.font = window.getComputedStyle(input).font;
            span.textContent = input.value || input.placeholder || ""; // Set text content to input's value or placeholder
            document.body.appendChild(span);
            input.style.width = `${span.offsetWidth + 30}px`; // Adjust width based on text width with some padding
            document.body.removeChild(span);
        };

        // Adjust width when the page loads and when the value changes
        adjustWidth(); // Adjust width on page load
        input.addEventListener("input", adjustWidth); // Adjust width on input change
    });

    // Get the elements that need to be updated with saved values
    const fullNameInput = document.querySelector('input[type="text"][value="Chris Dave"]');
    const emailInput = document.querySelector('input[type="email"][value="cdave@fakeemail.com"]');
    const phoneInput = document.querySelector('input[type="text"][value="+91 1234 5678"]');
    const addressInput = document.querySelector('input[type="text"][value="#12, Fake tower, Fake street, Fake area"]');
    const cityInput = document.querySelector('input[type="text"][value="123456"]');
    const stateInput = document.querySelector('input[type="text"][value="Big State"]');
    const countryInput = document.querySelector('input[type="text"][value="Djibouti"]');
    const secretCodeInput = document.querySelector('input[type="text"][value="164"]');

    // Function to set saved details from localStorage
    function setDetails() {
        fullNameInput.value = localStorage.getItem('fullName') || "Chris Dave";
        emailInput.value = localStorage.getItem('email') || "cdave@fakeemail.com";
        phoneInput.value = localStorage.getItem('phone') || "+91 1234 5678";
        addressInput.value = localStorage.getItem('address') || "#12, Fake tower, Fake street, Fake area";
        cityInput.value = localStorage.getItem('city') || "123456";
        stateInput.value = localStorage.getItem('state') || "Big State";
        countryInput.value = localStorage.getItem('country') || "Djibouti";
        secretCodeInput.value = localStorage.getItem('secretCode') || "164";
    }
    // Call the function to set initial values
    setDetails();

    // Save button click event listener
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Save the current values to localStorage
        localStorage.setItem('fullName', fullNameInput.value);
        localStorage.setItem('email', emailInput.value);
        localStorage.setItem('phone', phoneInput.value);
        localStorage.setItem('address', addressInput.value);
        localStorage.setItem('city', cityInput.value);
        localStorage.setItem('state', stateInput.value);
        localStorage.setItem('country', countryInput.value);
        localStorage.setItem('secretCode', secretCodeInput.value);

        // Optionally show a message or change button text after saving
        alert('Details saved successfully!'); // Alert user that the details were saved
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Load cart count from localStorage
    const cartCount = localStorage.getItem('cartCount') || 0;

    // Update the cart link on the navbar
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.textContent = `Cart (${cartCount})`;
    }
});
