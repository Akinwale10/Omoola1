// Dynamic Media Loading for Homepage
// Loads Hero and Featured Products images from localStorage

document.addEventListener('DOMContentLoaded', () => {
    const mediaData = JSON.parse(localStorage.getItem('omoola_media'));
    
    if (mediaData) {
        // 1. Load Hero Slider Images
        if (mediaData.heroImages && mediaData.heroImages.length > 0) {
            const heroSlider = document.querySelector('.hero-slider');
            if (heroSlider) {
                // Clear existing slides
                heroSlider.innerHTML = '';
                
                mediaData.heroImages.forEach((image, index) => {
                    const slide = document.createElement('div');
                    slide.className = `slide ${index === 0 ? 'active' : ''}`;
                    slide.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="${index === 0 ? 'eager' : 'lazy'}">`;
                    heroSlider.appendChild(slide);
                });
                
                // Re-initialize hero slider if the script is already loaded
                // The hero-slider.js script will handle the rotation
            }
        }
        
        // 2. Load Featured Products Images
        if (mediaData.featuredProducts && mediaData.featuredProducts.length > 0) {
            const productsGrid = document.querySelector('.featured-products .products-grid');
            if (productsGrid) {
                // Clear existing products
                productsGrid.innerHTML = '';
                
                mediaData.featuredProducts.forEach((product, index) => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    
                    // Use a placeholder price and description since we only manage images here
                    const price = product.isDefault ? (index === 0 ? '₦12.99' : index === 1 ? '₦24.99' : '₦6.99') : '₦0.00';
                    const desc = product.isDefault ? (index === 0 ? '1000mg, 60 capsules' : index === 1 ? 'Complete home care set' : 'Antibacterial protection') : 'New Product';
                    
                    productCard.innerHTML = `
                        <div class="product-image">
                            <img src="${product.src}" alt="${product.alt}" loading="lazy">
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="product-desc">${desc}</p>
                            <div class="product-footer">
                                <span class="price">${price}</span>
                                <button class="btn btn-secondary btn-add-cart" data-product-id="dynamic-${product.id}">Add to Cart</button>
                            </div>
                        </div>
                    `;
                    productsGrid.appendChild(productCard);
                });
                
                // Re-attach add to cart listeners
                attachAddToCartListeners();
            }
        }
    }
});

function attachAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productId = e.target.dataset.productId;
            const productName = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('₦', ''));
            const image = productCard.querySelector('img').src;
            
            if (window.addToCart) {
                window.addToCart(productId, productName, price, image);
            }
        });
    });
}
