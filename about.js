// About.js

// Currently minimal JS - can add interactivity if needed.

// Example: Implement a simple toggle for nav icons on small screens (optional)

// No interactive functionality requested in the screenshot; this file is prepared for enhancements.

document.addEventListener("DOMContentLoaded", () => {
    // Placeholder for future JS if needed
    // e.g. open/close mobile menu, search bar toggle, cart modal, etc.

    // Example: Could add responsive menu toggle here if design expands.
});
 
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});