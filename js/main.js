// Main JavaScript for Omoola Pharmacy & Stores

/**
 * Cart Management System
 * 
 * The cart is stored in localStorage with key 'omoola_cart'
 * and exposed globally via window.cart for use by other scripts
 * 
 * Cart item structure:
 * {
 *   id: string/number - Unique product identifier
 *   name: string - Product name
 *   price: number - Product price
 *   image: string - Product image URL
 *   quantity: number - Number of items
 * }
 */

// Initialize cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem('omoola_cart')) || [];

/**
 * Updates the cart count badge in the navigation header
 * Shows total number of items (sum of all quantities)
 */
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

/**
 * Adds a product to the shopping cart
 * If product already exists, increases quantity by 1
 * Otherwise, adds new item with quantity 1
 * 
 * @param {string|number} productId - Unique product identifier
 * @param {string} productName - Display name of the product
 * @param {number} price - Product price
 * @param {string} image - URL to product image
 */
function addToCart(productId, productName, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('omoola_cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    showNotification('Product added to cart!');
}

/**
 * Displays a temporary notification message to the user
 * 
 * @param {string} message - The message to display
 * @param {string} type - Notification type: 'success' or 'error' (default: 'success')
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2C5F2D' : '#d32f2f'};
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Initialize event listeners and components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Update cart count on page load
    updateCartCount();
    
    // Attach click handlers to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productId = e.target.dataset.productId;
            const productName = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('£', ''));
            const image = productCard.querySelector('img').src;
            
            addToCart(productId, productName, price, image);
        });
    });
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navbar = document.querySelector('.navbar');
            if (navMenu.classList.contains('active') && 
                !navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
    
    // Newsletter form submission handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would typically send this to your backend
            console.log('Newsletter signup:', email);
            showNotification('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }
    
    // Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect - adds shadow when scrolling
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
        }
        
        lastScroll = currentScroll;
    });
});

/**
 * Inject CSS animations for notifications and mobile menu
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        right: 0;
        width: 280px;
        max-width: calc(100vw - 40px);
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        border-radius: 8px;
        margin-top: 10px;
        z-index: 1000;
    }
    
    .nav-menu.active .nav-links {
        flex-direction: column;
        gap: 20px;
    }
    
    .nav-menu.active .nav-actions {
        margin-top: 20px;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

/**
 * Export cart and utility functions to global scope
 * for use by other scripts (e.g., cart.js, shop.js)
 */
window.cart = cart;
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.showNotification = showNotification;
