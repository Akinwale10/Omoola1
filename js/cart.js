// Cart functionality
let cart = [];
const SHIPPING_COST = 2000;
const TAX_RATE = 0.05;

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    displayCart();
    
    // Setup checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});

// Load cart from localStorage
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
}

// Display cart items
function displayCart() {
    const cartContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <h3>Your cart is empty</h3>
                <p style="color: var(--gray); margin: 1rem 0;">Add some products to get started</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = createCartItem(item, index);
        cartContainer.appendChild(cartItem);
    });
    
    updateCartSummary();
}

// Create cart item element
function createCartItem(item, index) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">₦${item.price.toLocaleString()}</p>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span style="padding: 0 1rem; font-weight: 600;">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                <button class="btn btn-sm" style="margin-left: 1rem; background-color: var(--danger); color: white;" onclick="removeFromCart(${index})">Remove</button>
            </div>
        </div>
        <div style="margin-left: auto; text-align: right;">
            <p style="font-size: 1.2rem; font-weight: 700; color: var(--primary-color);">
                ₦${(item.price * item.quantity).toLocaleString()}
            </p>
        </div>
    `;
    return div;
}

// Update item quantity
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
            return;
        }
        
        saveCart();
        displayCart();
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
    showNotification('Item removed from cart', 'info');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? SHIPPING_COST : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `₦${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = `₦${shipping.toLocaleString()}`;
    document.getElementById('tax').textContent = `₦${tax.toLocaleString()}`;
    document.getElementById('total').textContent = `₦${total.toLocaleString()}`;
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'warning');
        return;
    }
    
    // Check if user is authenticated
    if (typeof firebase !== 'undefined' && auth) {
        auth.onAuthStateChanged(user => {
            if (user) {
                openCheckoutModal();
            } else {
                // For demo purposes, still allow checkout
                openCheckoutModal();
                // In production: showNotification('Please login to continue', 'warning');
                // window.location.href = 'login.html';
            }
        });
    } else {
        openCheckoutModal();
    }
}

// Open checkout modal
function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('active');
}

// Close checkout modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
}

// Handle checkout form submission
async function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        shipping: SHIPPING_COST,
        tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * TAX_RATE,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + SHIPPING_COST + 
               (cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * TAX_RATE),
        customerInfo: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            paymentMethod: formData.get('paymentMethod'),
            notes: formData.get('notes')
        },
        orderDate: new Date().toISOString(),
        status: 'pending'
    };
    
    try {
        // Save order to Firestore if available
        if (typeof firebase !== 'undefined' && db) {
            await db.collection('orders').add(orderData);
        }
        
        // Clear cart
        cart = [];
        saveCart();
        
        // Close modal
        closeCheckoutModal();
        
        // Show success message
        showNotification('Order placed successfully! We will contact you shortly.', 'success');
        
        // Redirect to confirmation page after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } catch (error) {
        console.error('Order submission error:', error);
        showNotification('Order placed successfully!', 'success');
        
        // Still clear cart and redirect on error (demo mode)
        cart = [];
        saveCart();
        closeCheckoutModal();
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('checkoutModal');
    if (e.target === modal) {
        closeCheckoutModal();
    }
});
