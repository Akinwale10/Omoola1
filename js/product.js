// Product detail page functionality
let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
});

// Load product from URL parameter
async function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }
    
    try {
        // Try to load from Firestore
        if (typeof firebase !== 'undefined' && db) {
            const doc = await db.collection('products').doc(productId).get();
            if (doc.exists) {
                currentProduct = { id: doc.id, ...doc.data() };
                displayProduct(currentProduct);
                loadRelatedProducts(currentProduct.category);
                return;
            }
        }
        
        // Fallback to demo data
        currentProduct = getDemoProductById(productId);
        if (currentProduct) {
            displayProduct(currentProduct);
            loadRelatedProducts(currentProduct.category);
        } else {
            window.location.href = 'shop.html';
        }
    } catch (error) {
        console.error('Error loading product:', error);
        currentProduct = getDemoProductById(productId);
        if (currentProduct) {
            displayProduct(currentProduct);
            loadRelatedProducts(currentProduct.category);
        }
    }
}

// Display product details
function displayProduct(product) {
    document.getElementById('productImage').src = product.image;
    document.getElementById('productImage').alt = product.name;
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `₦${product.price.toLocaleString()}`;
    
    // Rating
    const ratingDiv = document.getElementById('productRating');
    ratingDiv.innerHTML = `
        <span class="stars">${getStarRating(product.rating || 5)}</span>
        <span>(${product.reviews || 0} reviews)</span>
    `;
    
    // Description
    const description = product.description || 'High-quality product for your health and wellness needs. Sourced from trusted manufacturers and verified for authenticity.';
    document.getElementById('productDescription').textContent = description;
}

// Load related products
async function loadRelatedProducts(category) {
    const container = document.getElementById('relatedProducts');
    
    try {
        if (typeof firebase !== 'undefined' && db) {
            const snapshot = await db.collection('products')
                .where('category', '==', category)
                .limit(4)
                .get();
            
            if (!snapshot.empty) {
                container.innerHTML = '';
                snapshot.forEach(doc => {
                    const product = { id: doc.id, ...doc.data() };
                    if (product.id !== currentProduct.id) {
                        container.appendChild(createProductCard(product));
                    }
                });
                return;
            }
        }
        
        // Fallback to demo data
        const relatedProducts = getDemoProductsByCategory(category)
            .filter(p => p.id !== currentProduct.id)
            .slice(0, 4);
        
        container.innerHTML = '';
        relatedProducts.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    } catch (error) {
        console.error('Error loading related products:', error);
        const relatedProducts = getDemoProductsByCategory(category)
            .filter(p => p.id !== currentProduct.id)
            .slice(0, 4);
        
        container.innerHTML = '';
        relatedProducts.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }
}

// Change quantity
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value) + change;
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity;
}

// Add product to cart
function addProductToCart() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').value);
    
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${currentProduct.name} added to cart!`, 'success');
}

// Get demo product by ID
function getDemoProductById(id) {
    const allProducts = [
        {
            id: 'prod1',
            name: 'Paracetamol 500mg',
            category: 'Medicines',
            price: 1500,
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
            rating: 5,
            reviews: 124,
            description: 'Effective pain relief and fever reducer. Suitable for adults and children over 12 years. Take 1-2 tablets every 4-6 hours as needed.'
        },
        {
            id: 'prod2',
            name: 'Vitamin C Tablets',
            category: 'Health',
            price: 3500,
            image: 'https://images.unsplash.com/photo-1550572017-4257b39c8c44?w=800',
            rating: 4.5,
            reviews: 89,
            description: 'High-strength Vitamin C supplement to support immune system health. 1000mg per tablet. Take one daily with food.'
        },
        {
            id: 'prod3',
            name: 'Hand Sanitizer 500ml',
            category: 'Health',
            price: 2000,
            image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800',
            rating: 5,
            reviews: 156,
            description: 'Antibacterial hand sanitizer with 70% alcohol content. Kills 99.9% of germs. Gentle on skin with added moisturizers.'
        },
        {
            id: 'prod4',
            name: 'Face Masks (Pack of 50)',
            category: 'Health',
            price: 4500,
            image: 'https://images.unsplash.com/photo-1584634355548-6a8a091ce856?w=800',
            rating: 4,
            reviews: 203,
            description: 'Disposable 3-ply protective face masks. Breathable material with elastic ear loops. Perfect for daily protection.'
        },
        {
            id: 'prod5',
            name: 'Organic Honey 500g',
            category: 'Groceries',
            price: 5000,
            image: 'https://images.unsplash.com/photo-1587049352846-4a222e784691?w=800',
            rating: 5,
            reviews: 67,
            description: 'Pure organic honey harvested from natural bee farms. Rich in antioxidants and natural enzymes. No additives or preservatives.'
        },
        {
            id: 'prod6',
            name: 'Blood Pressure Monitor',
            category: 'Health',
            price: 15000,
            image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800',
            rating: 4.5,
            reviews: 45,
            description: 'Digital blood pressure monitor with large LCD display. Accurate readings with irregular heartbeat detection. Includes storage case.'
        }
    ];
    
    return allProducts.find(p => p.id === id);
}

// Get demo products by category
function getDemoProductsByCategory(category) {
    const allProducts = [
        {
            id: 'prod1',
            name: 'Paracetamol 500mg',
            category: 'Medicines',
            price: 1500,
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
            rating: 5,
            reviews: 124
        },
        {
            id: 'prod2',
            name: 'Vitamin C Tablets',
            category: 'Health',
            price: 3500,
            image: 'https://images.unsplash.com/photo-1550572017-4257b39c8c44?w=400',
            rating: 4.5,
            reviews: 89
        },
        {
            id: 'prod3',
            name: 'Hand Sanitizer 500ml',
            category: 'Health',
            price: 2000,
            image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',
            rating: 5,
            reviews: 156
        },
        {
            id: 'prod5',
            name: 'Organic Honey 500g',
            category: 'Groceries',
            price: 5000,
            image: 'https://images.unsplash.com/photo-1587049352846-4a222e784691?w=400',
            rating: 5,
            reviews: 67
        },
        {
            id: 'prod7',
            name: 'Ibuprofen 400mg',
            category: 'Medicines',
            price: 2500,
            image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
            rating: 5,
            reviews: 178
        }
    ];
    
    return allProducts.filter(p => p.category === category);
}
