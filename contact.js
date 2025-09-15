// contact.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.textContent = '';

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            status.textContent = 'Please fill in all required fields.';
            return;
        }

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            status.textContent = 'Please enter a valid email address.';
            return;
        }

        // Simulate sending message (could integrate real backend)
        status.style.color = '#16a34a'; // green for success
        status.textContent = 'Sending message...';

        setTimeout(() => {
            status.textContent = 'Thank you for contacting us! We will respond shortly.';
            form.reset();
            status.style.color = '#16a34a';
        }, 1500);
    });
});
 
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});