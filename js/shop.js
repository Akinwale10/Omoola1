// Shop Page JavaScript

// Sample product data
const products = [
    {
        id: 1,
        name: 'Paracetamol 500mg',
        description: 'Pack of 24 tablets',
        price: 4.99,
        category: 'medicines',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 2,
        name: 'Herbal Vitamin C',
        description: '1000mg, 60 capsules',
        price: 12.99,
        category: 'supplements',
        image: 'https://images.unsplash.com/photo-1550572017-4781e5e8e9c7?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 3,
        name: 'Premium First Aid Kit',
        description: 'Complete home care set',
        price: 24.99,
        category: 'personal-care',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 4,
        name: 'Hand Sanitizer 500ml',
        description: 'Antibacterial protection',
        price: 6.99,
        category: 'personal-care',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 5,
        name: 'Ibuprofen 400mg',
        description: 'Pack of 16 tablets',
        price: 5.49,
        category: 'medicines',
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 6,
        name: 'Multivitamin Complex',
        description: 'Daily health support, 90 tablets',
        price: 18.99,
        category: 'supplements',
        image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 7,
        name: 'Organic Honey 500g',
        description: 'Pure natural honey',
        price: 8.99,
        category: 'groceries',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784715?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 8,
        name: 'Omega-3 Fish Oil',
        description: '1000mg, 120 softgels',
        price: 15.99,
        category: 'supplements',
        image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 9,
        name: 'Digital Thermometer',
        description: 'Fast and accurate reading',
        price: 9.99,
        category: 'personal-care',
        image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 10,
        name: 'Antihistamine Tablets',
        description: 'Allergy relief, 30 tablets',
        price: 7.49,
        category: 'medicines',
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 11,
        name: 'Probiotic Capsules',
        description: 'Digestive health, 60 capsules',
        price: 16.99,
        category: 'supplements',
        image: 'https://images.unsplash.com/photo-1550572017-4781e5e8e9c7?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 12,
        name: 'Organic Green Tea',
        description: '100 tea bags',
        price: 11.99,
        category: 'groceries',
        image: 'https://images.unsplash.com/photo-1594631661960-17f4bb788f58?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 13,
        name: 'Pain Relief Gel',
        description: 'Topical analgesic, 100g',
        price: 8.49,
        category: 'medicines',
        image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 14,
        name: 'Calcium + Vitamin D',
        description: 'Bone health support, 120 tablets',
        price: 13.99,
        category: 'supplements',
        image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 15,
        name: 'Blood Pressure Monitor',
        description: 'Automatic digital monitor',
        price: 34.99,
        category: 'personal-care',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 16,
        name: 'Antiseptic Cream',
        description: 'Wound care, 50g',
        price: 5.99,
        category: 'medicines',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 17,
        name: 'Turmeric Curcumin',
        description: 'Anti-inflammatory, 90 capsules',
        price: 17.49,
        category: 'supplements',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 18,
        name: 'Whole Grain Oats',
        description: 'Organic, 1kg',
        price: 6.49,
        category: 'groceries',
        image: 'https://images.unsplash.com/photo-1611137859-3bdd14058dc4?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 19,
        name: 'Cough Syrup',
        description: 'Relief formula, 200ml',
        price: 9.49,
        category: 'medicines',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 20,
        name: 'Zinc Supplement',
        description: 'Immune support, 100 tablets',
        price: 9.99,
        category: 'supplements',
        image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 21,
        name: 'Face Masks (50 pack)',
        description: '3-ply disposable masks',
        price: 12.99,
        category: 'personal-care',
        image: 'https://images.unsplash.com/photo-1584744982493-457e5106d948?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 22,
        name: 'Eye Drops',
        description: 'Dry eye relief, 10ml',
        price: 7.99,
        category: 'medicines',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 23,
        name: 'Magnesium Citrate',
        description: 'Muscle relaxation, 120 tablets',
        price: 14.49,
        category: 'supplements',
        image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: 24,
        name: 'Almond Milk',
        description: 'Unsweetened, 1L',
        price: 3.99,
        category: 'groceries',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
        inStock: true
    }
];

// Load admin products from localStorage
const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
// Map admin products to shop product structure
const mappedAdminProducts = adminProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: parseFloat(p.price),
    category: p.category,
    image: p.imageUrl,
    inStock: p.stock > 0
}));

// Combine hardcoded products with admin products
const allProducts = [...products, ...mappedAdminProducts];
let filteredProducts = [...allProducts];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.querySelectorAll('input[name="category"]');
const priceFilters = document.querySelectorAll('input[name="price"]');
const sortSelect = document.getElementById('sortSelect');
const resultsCount = document.getElementById('resultsCount');
const mobileFilterBtn = document.querySelector('.mobile-filter-btn');
const shopSidebar = document.querySelector('.shop-sidebar');

// Render products
function renderProducts(productsToRender) {
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<div class="no-results"><p>No products found matching your criteria.</p></div>';
        return;
    }

    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}" data-price="${product.price}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.inStock ? '<span class="stock-status">In Stock</span>' : '<span class="stock-status out-of-stock">Out of Stock</span>'}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="price">₦${product.price.toFixed(2)}</span>
                    <button class="btn btn-secondary btn-add-cart" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Update results count
    resultsCount.textContent = productsToRender.length;

    // Re-attach event listeners to new add to cart buttons
    attachCartListeners();
}

// Filter products
function filterProducts() {
    let filtered = [...allProducts];

    // Search filter
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    // Category filter
    const selectedCategories = Array.from(categoryFilters)
        .filter(cb => cb.checked && cb.value !== 'all')
        .map(cb => cb.value);
    
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => 
            selectedCategories.includes(product.category)
        );
    }

    // Price filter
    const selectedPrice = Array.from(priceFilters).find(radio => radio.checked)?.value;
    if (selectedPrice && selectedPrice !== 'all') {
        const [min, max] = selectedPrice.split('-').map(v => v === '+' ? Infinity : parseFloat(v));
        filtered = filtered.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }

    // Sort products
    const sortValue = sortSelect.value;
    switch(sortValue) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'popular':
            // Keep original order (featured items first)
            break;
        default:
            // featured - keep original order
            break;
    }

    filteredProducts = filtered;
    renderProducts(filtered);
}

// Attach cart button listeners
function attachCartListeners() {
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            const product = allProducts.find(p => p.id === productId);
            
            if (product && product.inStock) {
                window.addToCart(productId, product.name, product.price, product.image);
            }
        });
    });
}

// Event listeners
searchInput.addEventListener('input', filterProducts);

categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        // If "All Products" is checked, uncheck others
        if (filter.value === 'all' && filter.checked) {
            categoryFilters.forEach(f => {
                if (f.value !== 'all') f.checked = false;
            });
        } else if (filter.value !== 'all' && filter.checked) {
            // If any other category is checked, uncheck "All Products"
            const allCheckbox = Array.from(categoryFilters).find(f => f.value === 'all');
            if (allCheckbox) allCheckbox.checked = false;
        }
        
        filterProducts();
    });
});

priceFilters.forEach(filter => {
    filter.addEventListener('change', filterProducts);
});

sortSelect.addEventListener('change', filterProducts);

// Mobile filter toggle
if (mobileFilterBtn) {
    mobileFilterBtn.addEventListener('click', () => {
        shopSidebar.classList.toggle('active');
    });
}

// Parse URL parameters for category filter
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');

if (categoryParam) {
    const categoryCheckbox = Array.from(categoryFilters).find(cb => cb.value === categoryParam);
    if (categoryCheckbox) {
        // Uncheck all
        categoryFilters.forEach(cb => cb.checked = false);
        // Check the specified category
        categoryCheckbox.checked = true;
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    filterProducts();
});
