/* ============================================================
   SCRIPT.JS — Md Uddin Portfolio
   Handles navigation, form validation, scroll animations,
   and all interactive behavior on the site.
   ============================================================ */

// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================================
       1. MOBILE HAMBURGER MENU TOGGLE
       Opens and closes the slide-in navigation on small screens.
       ========================================================== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function () {
        // Toggle the 'open' class on both the button and the menu
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');

        // Update ARIA attribute for screen readers
        const isOpen = hamburger.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a link is clicked (smooth scroll then close)
    const navLinkElements = document.querySelectorAll('.nav-link');

    navLinkElements.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });


    /* ==========================================================
       2. NAVBAR SCROLL SHADOW
       Adds a subtle shadow to the navbar when the user scrolls
       past the top of the page.
       ========================================================== */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    /* ==========================================================
       3. ACTIVE NAV LINK HIGHLIGHTING
       Uses the Intersection Observer API to detect which section
       is currently in view and highlights the matching nav link.
       ========================================================== */
    const sections = document.querySelectorAll('.section');

    // Options: trigger when 30% of a section is visible
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Get the ID of the section in view
                const sectionId = entry.target.getAttribute('id');

                // Remove 'active' from all links, add to the matching one
                navLinkElements.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(function (section) {
        navObserver.observe(section);
    });


    /* ==========================================================
       4. BACK-TO-TOP BUTTON
       Shows a floating button after the user scrolls down 400px.
       Clicking it smoothly scrolls back to the top.
       ========================================================== */
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* ==========================================================
       5. SCROLL-TRIGGERED FADE-IN ANIMATIONS
       Elements with the 'animate-in' class fade in when they
       scroll into the viewport. Uses Intersection Observer.
       ========================================================== */

    // Add the 'animate-in' class to elements we want to animate
    const animateTargets = document.querySelectorAll(
        '.skill-card, .project-card, .highlight-card, .about-text, .contact-form-wrapper'
    );

    animateTargets.forEach(function (el) {
        el.classList.add('animate-in');
    });

    // Observer to trigger the animation when elements become visible
    const animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated (animate only once)
                animObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15  // Trigger when 15% of the element is visible
    });

    animateTargets.forEach(function (el) {
        animObserver.observe(el);
    });


    /* ==========================================================
       6. CONTACT FORM VALIDATION & SUBMISSION
       Validates the Name, Email, and Message fields on submit.
       Shows inline error messages for invalid fields.
       Displays a success message on valid submission.
       ========================================================== */
    const submitBtn = document.getElementById('submitBtn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    /**
     * validateEmail — Checks if a string matches a standard email pattern.
     * @param {string} email - The email string to validate.
     * @returns {boolean} - True if the email format is valid.
     */
    function validateEmail(email) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    /**
     * clearErrors — Removes all error states and messages from the form.
     */
    function clearErrors() {
        nameInput.classList.remove('invalid');
        emailInput.classList.remove('invalid');
        messageInput.classList.remove('invalid');
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
    }

    // Clear error styling when the user starts typing in a field
    nameInput.addEventListener('input', function () {
        nameInput.classList.remove('invalid');
        nameError.textContent = '';
    });

    emailInput.addEventListener('input', function () {
        emailInput.classList.remove('invalid');
        emailError.textContent = '';
    });

    messageInput.addEventListener('input', function () {
        messageInput.classList.remove('invalid');
        messageError.textContent = '';
    });

    // Handle form submission
    submitBtn.addEventListener('click', function () {
        clearErrors();

        var isValid = true;
        var nameVal = nameInput.value.trim();
        var emailVal = emailInput.value.trim();
        var messageVal = messageInput.value.trim();

        // Validate Name field
        if (nameVal === '') {
            nameInput.classList.add('invalid');
            nameError.textContent = 'Please enter your name.';
            isValid = false;
        }

        // Validate Email field
        if (emailVal === '') {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Please enter your email address.';
            isValid = false;
        } else if (!validateEmail(emailVal)) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate Message field
        if (messageVal === '') {
            messageInput.classList.add('invalid');
            messageError.textContent = 'Please enter a message.';
            isValid = false;
        }

        // If all fields pass validation, show success message
        if (isValid) {
            formSuccess.classList.add('visible');
            // Reset form fields
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';

            // Hide the success message after 5 seconds
            setTimeout(function () {
                formSuccess.classList.remove('visible');
            }, 5000);
        }
    });

});
