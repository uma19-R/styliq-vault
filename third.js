// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('#main-menu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Newsletter subscribe button - use custom notification
    const subscribeButton = document.querySelector('.newsletter-form button');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.querySelector('.newsletter-form input[type="email"]').value;
            if (email) {
                showNotification(this, 'Thank you for subscribing!');
            } else {
                showNotification(this, 'Please enter your email address', 'error');
            }
        });
    }

    // Add to cart functionality - use custom notification
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the product name and price from parent elements
            const productCard = this.closest('.style-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Add item to cart
            console.log(`Added ${productName} (${productPrice}) to cart`);
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = parseInt(cartCount.textContent) + 1;
            }
            // third.js

// Add to Cart functionality
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');

    // Load initial cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.style-card');
            const title = productCard.querySelector('h3').textContent;
            const price = productCard.querySelector('.price').textContent;
            const img = productCard.querySelector('img').src;

            const product = { title, price, img };

            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            cartCount.textContent = cart.length;
            alert(`${title} added to cart!`);
        });
    });
});

            
            // Show custom notification near the button
            showNotification(this, `${productName} added to cart!`);
        });
    });

    // Custom notification function
    function showNotification(element, message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'absolute';
        notification.style.padding = '10px 15px';
        notification.style.borderRadius = '4px';
        notification.style.fontSize = '14px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.maxWidth = '200px';
        notification.style.textAlign = 'center';
        notification.style.animation = 'fadeInOut 3s ease-in-out';
        
        if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
        } else {
            notification.style.backgroundColor = '#f44336';
            notification.style.color = 'white';
        }
        
        // Get position of the element
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Position the notification above the element
        notification.style.top = (rect.top + scrollTop - 40) + 'px';
        notification.style.left = (rect.left + rect.width/2 - 100) + 'px'; // Center horizontally
        
        // Add animation keyframes to head if not already added
        if (!document.querySelector('#notification-keyframes')) {
            const style = document.createElement('style');
            style.id = 'notification-keyframes';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(10px); }
                    10% { opacity: 1; transform: translateY(0); }
                    80% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to document and remove after animation completes
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});