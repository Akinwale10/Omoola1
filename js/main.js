// Initialize Firebase
let db, auth;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    if (typeof firebase !== 'undefined' && window.firebaseConfig) {
        try {
            firebase.initializeApp(window.firebaseConfig);
            db = firebase.firestore();
            auth = firebase.auth();
            console.log('Firebase initialized successfully');
            
            // Check authentication state
            auth.onAuthStateChanged(user => {
                if (user) {
                    checkAdminStatus(user);
                }
                updateCartCount();
            });
        } catch (error) {
            console.error('Firebase initialization error:', error);
        }
    }
    
    // Initialize page
    initializePage();
});

// Initialize page functionality
function initializePage() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Category cards navigation
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            window.location.href = `shop.html?category=${category}`;
        });
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Load products if on homepage
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        loadFeaturedProducts();
        loadBestSellers();
    }
    
    // Update cart count
    updateCartCount();
}

// Check if user is admin
async function checkAdminStatus(user) {
    try {
        if (db) {
            const userDoc = await db.collection('users').doc(user.uid).get();
            if (userDoc.exists && userDoc.data().role === 'admin') {
                const adminLink = document.getElementById('adminLink');
                if (adminLink) {
                    adminLink.style.display = 'block';
                }
            }
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
    }
}

// Load featured products
async function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    try {
        if (db) {
            // Load from Firestore
            const snapshot = await db.collection('products')
                .where('featured', '==', true)
                .limit(6)
                .get();
            
            if (!snapshot.empty) {
                container.innerHTML = '';
                snapshot.forEach(doc => {
                    const product = { id: doc.id, ...doc.data() };
                    container.appendChild(createProductCard(product));
                });
                return;
            }
        }
        
        // Fallback to demo data
        displayDemoProducts(container, getDemoProducts().slice(0, 6));
    } catch (error) {
        console.error('Error loading featured products:', error);
        displayDemoProducts(container, getDemoProducts().slice(0, 6));
    }
}

// Load best sellers
async function loadBestSellers() {
    const container = document.getElementById('bestSellers');
    if (!container) return;
    
    try {
        if (db) {
            // Load from Firestore
            const snapshot = await db.collection('products')
                .where('bestSeller', '==', true)
                .limit(6)
                .get();
            
            if (!snapshot.empty) {
                container.innerHTML = '';
                snapshot.forEach(doc => {
                    const product = { id: doc.id, ...doc.data() };
                    container.appendChild(createProductCard(product));
                });
                return;
            }
        }
        
        // Fallback to demo data
        displayDemoProducts(container, getDemoProducts().slice(6, 12));
    } catch (error) {
        console.error('Error loading best sellers:', error);
        displayDemoProducts(container, getDemoProducts().slice(6, 12));
    }
}

// Display demo products
function displayDemoProducts(container, products) {
    container.innerHTML = '';
    products.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₦${product.price.toLocaleString()}</p>
            <div class="product-rating">
                <span class="stars">${getStarRating(product.rating || 5)}</span>
                <span>(${product.reviews || 0})</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary btn-sm" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">
                    Add to Cart
                </button>
                <button class="btn btn-outline btn-sm" onclick="viewProduct('${product.id}')">
                    View Details
                </button>
            </div>
        </div>
    `;
    return card;
}

// Get star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    while (stars.length < 5) stars += '☆';
    return stars;
}

// View product details
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Add to cart
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!', 'success');
}

// Update cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Handle newsletter submission
async function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    try {
        if (db) {
            await db.collection('newsletter').add({
                email: email,
                subscribedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        showNotification('Thank you for subscribing!', 'success');
        e.target.reset();
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        showNotification('Subscription successful!', 'success');
        e.target.reset();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '250px';
    notification.style.animation = 'slideDown 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Demo products data
function getDemoProducts() {
    return [
        {
            id: 'prod1',
            name: 'Paracetamol 500mg',
            category: 'Medicines',
            price: 1500,
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
            rating: 5,
            reviews: 124,
            featured: true
        },
        {
            id: 'prod2',
            name: 'Vitamin C Tablets',
            category: 'Health',
            price: 3500,
            image: 'https://images.unsplash.com/photo-1550572017-4257b39c8c44?w=400',
            rating: 4.5,
            reviews: 89,
            featured: true
        },
        {
            id: 'prod3',
            name: 'Hand Sanitizer 500ml',
            category: 'Health',
            price: 2000,
            image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',
            rating: 5,
            reviews: 156,
            featured: true
        },
        {
            id: 'prod4',
            name: 'Face Masks (Pack of 50)',
            category: 'Health',
            price: 4500,
            image: 'https://images.unsplash.com/photo-1584634355548-6a8a091ce856?w=400',
            rating: 4,
            reviews: 203,
            featured: true
        },
        {
            id: 'prod5',
            name: 'Organic Honey 500g',
            category: 'Groceries',
            price: 5000,
            image: 'https://images.unsplash.com/photo-1587049352846-4a222e784691?w=400',
            rating: 5,
            reviews: 67,
            featured: true
        },
        {
            id: 'prod6',
            name: 'Blood Pressure Monitor',
            category: 'Health',
            price: 15000,
            image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400',
            rating: 4.5,
            reviews: 45,
            featured: true
        },
        {
            id: 'prod7',
            name: 'Ibuprofen 400mg',
            category: 'Medicines',
            price: 2500,
            image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
            rating: 5,
            reviews: 178,
            bestSeller: true
        },
        {
            id: 'prod8',
            name: 'Multivitamin Supplements',
            category: 'Health',
            price: 6000,
            image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
            rating: 4.5,
            reviews: 234,
            bestSeller: true
        },
        {
            id: 'prod9',
            name: 'Digital Thermometer',
            category: 'Health',
            price: 3000,
            image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400',
            rating: 4,
            reviews: 112,
            bestSeller: true
        },
        {
            id: 'prod10',
            name: 'First Aid Kit',
            category: 'Health',
            price: 8500,
            image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
            rating: 5,
            reviews: 89,
            bestSeller: true
        },
        {
            id: 'prod11',
            name: 'Omega-3 Fish Oil',
            category: 'Health',
            price: 7500,
            image: 'https://images.unsplash.com/photo-1526326489322-c9d89dda1ec8?w=400',
            rating: 4.5,
            reviews: 156,
            bestSeller: true
        },
        {
            id: 'prod12',
            name: 'Protein Powder 1kg',
            category: 'Health',
            price: 12000,
            image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400',
            rating: 5,
            reviews: 298,
            bestSeller: true
        }
    ];
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(20px); }
    }
`;
document.head.appendChild(style);
