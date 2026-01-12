// Form validation and submission
(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const form = document.getElementById('contactForm');
        const phoneInput = document.getElementById('phone');
        const submitButton = form.querySelector('.btn-submit');
        
        // Phone number formatting
        phoneInput.addEventListener('input', formatPhoneNumber);
        
        // Form validation on input
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', handleSubmit);
        
        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 120;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Free quote button scroll to form
        const quoteButton = document.querySelector('.btn-quote');
        if (quoteButton) {
            quoteButton.addEventListener('click', function() {
                const formCard = document.querySelector('.form-card');
                if (formCard) {
                    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    }

    // Phone number formatting function
    function formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = '(' + value.substring(0, 3);
            if (value.length >= 4) {
                formattedValue += ') ' + value.substring(3, 6);
            }
            if (value.length >= 7) {
                formattedValue += '-' + value.substring(6, 10);
            }
        }
        
        e.target.value = formattedValue;
    }

    // Field validation
    function validateField(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';
        
        // Check if field is empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
            const phoneDigits = field.value.replace(/\D/g, '');
            if (phoneDigits.length !== 10) {
                isValid = false;
                errorMessage = 'Please enter a valid 10-digit phone number.';
            }
        }
        
        // Select validation
        if (field.tagName === 'SELECT' && field.hasAttribute('required')) {
            if (!field.value || field.value === '') {
                isValid = false;
                errorMessage = 'Please select an option.';
            }
        }
        
        // Checkbox validation (for human verification)
        if (field.type === 'checkbox' && field.hasAttribute('required')) {
            if (!field.checked) {
                isValid = false;
                errorMessage = 'Please verify that you are human.';
            }
        }
        
        // Update UI
        if (isValid) {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('visible');
            }
        } else {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('visible');
            }
        }
        
        return isValid;
    }

    // Form submission handler
    function handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('.btn-submit');
        const successMessage = document.getElementById('formSuccess');
        
        // Validate all fields
        let isFormValid = true;
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'SENDING...';
        
        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Send to Vercel serverless function
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Email sent successfully:', data);
            
            // Show success message
            successMessage.classList.add('visible');
            
            // Reset form
            form.reset();
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'SEND';
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                successMessage.classList.remove('visible');
            }, 5000);
            
            // Optional: Send to Google Analytics or tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Service Request'
                });
            }
            
            // Optional: Send to Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead');
            }
        })
        .catch(function(error) {
            console.error('Error submitting form:', error);
            
            // Show error message
            alert('There was an error submitting your request. Please call us directly at (555) 123-4567.');
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'SEND';
        });
    }
    
    // Lazy load background image for better performance
    function loadHeroBackground() {
        const hero = document.querySelector('.hero');
        if (hero && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        // Background is already set in CSS, this is for future image optimization
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(hero);
        }
    }
    
    // Initialize lazy loading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeroBackground);
    } else {
        loadHeroBackground();
    }
    
    // Performance: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            // Add scroll-based effects here if needed
        });
    }, { passive: true });
    
})();
