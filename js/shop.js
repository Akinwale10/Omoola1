// Shop page functionality
let allProducts = [];
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', function() {
    loadAllProducts();
    setupFilters();
    checkURLParameters();
});

// Load all products
async function loadAllProducts() {
    try {
        if (typeof firebase !== 'undefined' && db) {
            const snapshot = await db.collection('products').get();
            
            if (!snapshot.empty) {
                allProducts = [];
                snapshot.forEach(doc => {
                    allProducts.push({ id: doc.id, ...doc.data() });
                });
                applyFilters();
                return;
            }
        }
        
        // Fallback to demo data
        allProducts = getAllDemoProducts();
        applyFilters();
    } catch (error) {
        console.error('Error loading products:', error);
        allProducts = getAllDemoProducts();
        applyFilters();
    }
}

// Setup filter event listeners
function setupFilters() {
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('priceFilter').addEventListener('change', applyFilters);
    document.getElementById('sortFilter').addEventListener('change', applyFilters);
}

// Check URL parameters for pre-filtering
function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        document.getElementById('categoryFilter').value = category.toLowerCase();
        applyFilters();
    }
}

// Apply all filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value.toLowerCase();
    const priceRange = document.getElementById('priceFilter').value;
    const sortBy = document.getElementById('sortFilter').value;
    
    // Filter products
    filteredProducts = allProducts.filter(product => {
        // Search filter
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm));
        
        // Category filter
        const matchesCategory = !category || 
            product.category.toLowerCase() === category;
        
        // Price filter
        let matchesPrice = true;
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            matchesPrice = product.price >= min && product.price <= max;
        }
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    // Sort products
    sortProducts(sortBy);
    
    // Display products
    displayProducts();
    updateProductCount();
}

// Sort products
function sortProducts(sortBy) {
    switch (sortBy) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
    }
}

// Display products
function displayProducts() {
    const container = document.getElementById('productsContainer');
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;"><h3>No products found</h3><p>Try adjusting your filters</p></div>';
        return;
    }
    
    container.innerHTML = '';
    filteredProducts.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Update product count
function updateProductCount() {
    const countElement = document.getElementById('productCount');
    const count = filteredProducts.length;
    const total = allProducts.length;
    
    if (count === total) {
        countElement.textContent = `Showing all ${total} products`;
    } else {
        countElement.textContent = `Showing ${count} of ${total} products`;
    }
}

// Clear all filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('sortFilter').value = 'name-asc';
    applyFilters();
}

// Get all demo products
function getAllDemoProducts() {
    return [
        {
            id: 'prod1',
            name: 'Paracetamol 500mg',
            category: 'Medicines',
            price: 1500,
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
            rating: 5,
            reviews: 124,
            description: 'Effective pain relief and fever reducer'
        },
        {
            id: 'prod2',
            name: 'Vitamin C Tablets',
            category: 'Health',
            price: 3500,
            image: 'https://images.unsplash.com/photo-1550572017-4257b39c8c44?w=400',
            rating: 4.5,
            reviews: 89,
            description: 'Immune system support'
        },
        {
            id: 'prod3',
            name: 'Hand Sanitizer 500ml',
            category: 'Health',
            price: 2000,
            image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400',
            rating: 5,
            reviews: 156,
            description: 'Antibacterial hand sanitizer'
        },
        {
            id: 'prod4',
            name: 'Face Masks (Pack of 50)',
            category: 'Health',
            price: 4500,
            image: 'https://images.unsplash.com/photo-1584634355548-6a8a091ce856?w=400',
            rating: 4,
            reviews: 203,
            description: 'Disposable protective face masks'
        },
        {
            id: 'prod5',
            name: 'Organic Honey 500g',
            category: 'Groceries',
            price: 5000,
            image: 'https://images.unsplash.com/photo-1587049352846-4a222e784691?w=400',
            rating: 5,
            reviews: 67,
            description: 'Pure organic honey'
        },
        {
            id: 'prod6',
            name: 'Blood Pressure Monitor',
            category: 'Health',
            price: 15000,
            image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400',
            rating: 4.5,
            reviews: 45,
            description: 'Digital blood pressure monitor'
        },
        {
            id: 'prod7',
            name: 'Ibuprofen 400mg',
            category: 'Medicines',
            price: 2500,
            image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
            rating: 5,
            reviews: 178,
            description: 'Anti-inflammatory pain reliever'
        },
        {
            id: 'prod8',
            name: 'Multivitamin Supplements',
            category: 'Health',
            price: 6000,
            image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
            rating: 4.5,
            reviews: 234,
            description: 'Complete daily multivitamin'
        },
        {
            id: 'prod9',
            name: 'Digital Thermometer',
            category: 'Health',
            price: 3000,
            image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400',
            rating: 4,
            reviews: 112,
            description: 'Fast and accurate temperature reading'
        },
        {
            id: 'prod10',
            name: 'First Aid Kit',
            category: 'Health',
            price: 8500,
            image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
            rating: 5,
            reviews: 89,
            description: 'Complete home first aid kit'
        },
        {
            id: 'prod11',
            name: 'Omega-3 Fish Oil',
            category: 'Health',
            price: 7500,
            image: 'https://images.unsplash.com/photo-1526326489322-c9d89dda1ec8?w=400',
            rating: 4.5,
            reviews: 156,
            description: 'Heart health supplement'
        },
        {
            id: 'prod12',
            name: 'Protein Powder 1kg',
            category: 'Health',
            price: 12000,
            image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400',
            rating: 5,
            reviews: 298,
            description: 'High-quality protein supplement'
        },
        {
            id: 'prod13',
            name: 'Aspirin 100mg',
            category: 'Medicines',
            price: 1800,
            image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
            rating: 5,
            reviews: 201,
            description: 'Low dose aspirin for heart health'
        },
        {
            id: 'prod14',
            name: 'Cough Syrup',
            category: 'Medicines',
            price: 2200,
            image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
            rating: 4,
            reviews: 87,
            description: 'Relief from cough and cold'
        },
        {
            id: 'prod15',
            name: 'Antibiotic Ointment',
            category: 'Medicines',
            price: 1200,
            image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
            rating: 4.5,
            reviews: 142,
            description: 'Topical antibiotic for minor cuts'
        },
        {
            id: 'prod16',
            name: 'Calcium Supplements',
            category: 'Health',
            price: 4000,
            image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
            rating: 4,
            reviews: 76,
            description: 'Bone health support'
        },
        {
            id: 'prod17',
            name: 'Probiotic Capsules',
            category: 'Health',
            price: 5500,
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
            rating: 4.5,
            reviews: 123,
            description: 'Digestive health support'
        },
        {
            id: 'prod18',
            name: 'Organic Green Tea',
            category: 'Groceries',
            price: 2800,
            image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
            rating: 5,
            reviews: 189,
            description: 'Premium organic green tea'
        },
        {
            id: 'prod19',
            name: 'Whole Grain Oats',
            category: 'Groceries',
            price: 1500,
            image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400',
            rating: 4.5,
            reviews: 95,
            description: 'Nutritious whole grain oats'
        },
        {
            id: 'prod20',
            name: 'Coconut Oil 500ml',
            category: 'Groceries',
            price: 3200,
            image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
            rating: 5,
            reviews: 167,
            description: 'Pure virgin coconut oil'
        },
        {
            id: 'prod21',
            name: 'Pulse Oximeter',
            category: 'Health',
            price: 6500,
            image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',
            rating: 4.5,
            reviews: 92,
            description: 'Monitor oxygen levels'
        },
        {
            id: 'prod22',
            name: 'Insulin Pen',
            category: 'Medicines',
            price: 18000,
            image: 'https://images.unsplash.com/photo-1579154204845-3e1fc82b0cf6?w=400',
            rating: 5,
            reviews: 43,
            description: 'Insulin delivery system'
        },
        {
            id: 'prod23',
            name: 'Compression Socks',
            category: 'Health',
            price: 2500,
            image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=400',
            rating: 4,
            reviews: 78,
            description: 'Improve circulation'
        },
        {
            id: 'prod24',
            name: 'Aloe Vera Gel',
            category: 'Health',
            price: 1800,
            image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
            rating: 4.5,
            reviews: 134,
            description: 'Soothing skin care gel'
        }
    ];
}
