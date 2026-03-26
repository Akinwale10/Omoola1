// Media Management for Hero and Featured Products Images
// Handles uploading, storing, and removing images from localStorage

// Initialize media data structure
function initializeMediaStorage() {
    const existingData = localStorage.getItem('omoola_media');
    if (!existingData) {
        const mediaData = {
            heroImages: [
                {
                    id: 'hero-1',
                    src: 'img/omoola_pharmacy_storefront_day.jpg',
                    alt: 'Omoola Pharmacy Storefront - Daytime',
                    isDefault: true,
                    uploadedAt: new Date().toISOString()
                },
                {
                    id: 'hero-2',
                    src: 'img/omoola_pharmacy_storefront_night.jpg',
                    alt: 'Omoola Pharmacy Storefront - Nighttime',
                    isDefault: true,
                    uploadedAt: new Date().toISOString()
                }
            ],
            featuredProducts: [
                {
                    id: 'featured-1',
                    name: 'Herbal Vitamin C',
                    src: 'https://images.unsplash.com/photo-1550572017-4781e5e8e9c7?w=400&h=400&fit=crop',
                    alt: 'Vitamin C',
                    isDefault: true,
                    uploadedAt: new Date().toISOString()
                },
                {
                    id: 'featured-2',
                    name: 'Premium First Aid Kit',
                    src: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
                    alt: 'First Aid Kit',
                    isDefault: true,
                    uploadedAt: new Date().toISOString()
                },
                {
                    id: 'featured-3',
                    name: 'Hand Sanitizer 500ml',
                    src: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop',
                    alt: 'Hand Sanitizer',
                    isDefault: true,
                    uploadedAt: new Date().toISOString()
                }
            ]
        };
        localStorage.setItem('omoola_media', JSON.stringify(mediaData));
    }
}

// Get all media data
function getMediaData() {
    const data = localStorage.getItem('omoola_media');
    return data ? JSON.parse(data) : null;
}

// Save media data to localStorage
function saveMediaData(data) {
    localStorage.setItem('omoola_media', JSON.stringify(data));
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Upload hero image
async function uploadHeroImage(file, altText) {
    try {
        const base64 = await fileToBase64(file);
        const mediaData = getMediaData();
        
        const newImage = {
            id: 'hero-' + Date.now(),
            src: base64,
            alt: altText,
            isDefault: false,
            uploadedAt: new Date().toISOString()
        };
        
        mediaData.heroImages.push(newImage);
        saveMediaData(mediaData);
        
        return newImage;
    } catch (error) {
        console.error('Error uploading hero image:', error);
        throw error;
    }
}

// Upload featured product image
async function uploadFeaturedImage(file, productName, price, description) {
    try {
        const base64 = await fileToBase64(file);
        const mediaData = getMediaData();
        
        const newImage = {
            id: 'featured-' + Date.now(),
            name: productName,
            price: price,
            description: description,
            src: base64,
            alt: productName,
            isDefault: false,
            uploadedAt: new Date().toISOString()
        };
        
        mediaData.featuredProducts.push(newImage);
        saveMediaData(mediaData);
        
        return newImage;
    } catch (error) {
        console.error('Error uploading featured image:', error);
        throw error;
    }
}

// Remove hero image
function removeHeroImage(imageId) {
    const mediaData = getMediaData();
    mediaData.heroImages = mediaData.heroImages.filter(img => img.id !== imageId);
    saveMediaData(mediaData);
}

// Remove featured product image
function removeFeaturedImage(imageId) {
    const mediaData = getMediaData();
    mediaData.featuredProducts = mediaData.featuredProducts.filter(img => img.id !== imageId);
    saveMediaData(mediaData);
}

// Render hero images gallery
function renderHeroImagesGallery() {
    const mediaData = getMediaData();
    const gallery = document.getElementById('heroImagesGallery');
    const emptyState = document.getElementById('heroEmptyState');
    
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    if (mediaData.heroImages.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    mediaData.heroImages.forEach(image => {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.style.cssText = `
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s ease;
        `;
        
        card.innerHTML = `
            <div style="position: relative; overflow: hidden; height: 200px; background: #f5f5f5;">
                <img src="${image.src}" alt="${image.alt}" style="width: 100%; height: 100%; object-fit: cover;">
                ${image.isDefault ? '<div style="position: absolute; top: 10px; right: 10px; background: #6B1FA8; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">Default</div>' : ''}
            </div>
            <div style="padding: 15px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                    <strong>Alt Text:</strong> ${image.alt}
                </p>
                <p style="margin: 0 0 15px 0; font-size: 12px; color: #999;">
                    Uploaded: ${new Date(image.uploadedAt).toLocaleDateString()}
                </p>
                <div style="display: flex; gap: 8px;">
                    <button class="action-btn remove-hero-btn" data-id="${image.id}" style="flex: 1; padding: 8px 12px; background: #f8f8f8; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.3s ease;">
                        Remove
                    </button>
                </div>
            </div>
        `;
        
        gallery.appendChild(card);
    });
    
    // Attach event listeners to remove buttons
    document.querySelectorAll('.remove-hero-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const imageId = e.target.dataset.id;
            if (confirm('Are you sure you want to remove this image?')) {
                removeHeroImage(imageId);
                renderHeroImagesGallery();
                window.showNotification('Hero image removed successfully!');
            }
        });
    });
}

// Render featured images gallery
function renderFeaturedImagesGallery() {
    const mediaData = getMediaData();
    const gallery = document.getElementById('featuredImagesGallery');
    const emptyState = document.getElementById('featuredEmptyState');
    
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    if (mediaData.featuredProducts.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    mediaData.featuredProducts.forEach(image => {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.style.cssText = `
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s ease;
        `;
        
        card.innerHTML = `
            <div style="position: relative; overflow: hidden; height: 200px; background: #f5f5f5;">
                <img src="${image.src}" alt="${image.alt}" style="width: 100%; height: 100%; object-fit: cover;">
                ${image.isDefault ? '<div style="position: absolute; top: 10px; right: 10px; background: #6B1FA8; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">Default</div>' : ''}
            </div>
            <div style="padding: 15px;">
                <p style="margin: 0 0 5px 0; font-size: 14px; color: #333; font-weight: 600;">
                    ${image.name}
                </p>
                <p style="margin: 0 0 5px 0; font-size: 13px; color: #6B1FA8; font-weight: 700;">
                    ₦${image.price ? image.price.toFixed(2) : '0.00'}
                </p>
                <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;">
                    ${image.description || ''}
                </p>
                <p style="margin: 0 0 10px 0; font-size: 11px; color: #999;">
                    Uploaded: ${new Date(image.uploadedAt).toLocaleDateString()}
                </p>
                <div style="display: flex; gap: 8px;">
                    <button class="action-btn remove-featured-btn" data-id="${image.id}" style="flex: 1; padding: 8px 12px; background: #f8f8f8; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.3s ease;">
                        Remove
                    </button>
                </div>
            </div>
        `;
        
        gallery.appendChild(card);
    });
    
    // Attach event listeners to remove buttons
    document.querySelectorAll('.remove-featured-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const imageId = e.target.dataset.id;
            if (confirm('Are you sure you want to remove this image?')) {
                removeFeaturedImage(imageId);
                renderFeaturedImagesGallery();
                window.showNotification('Featured product image removed successfully!');
            }
        });
    });
}

// Initialize media management on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize storage with default images
    initializeMediaStorage();
    
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.media-tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            
            // Update button styles
            tabButtons.forEach(b => {
                b.style.color = '#999';
                b.style.borderBottomColor = 'transparent';
            });
            e.target.style.color = '#6B1FA8';
            e.target.style.borderBottomColor = '#6B1FA8';
            
            // Update content visibility
            document.querySelectorAll('.media-tab-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(tabName + '-tab').style.display = 'block';
        });
    });
    
    // Hero image form submission
    const heroForm = document.getElementById('heroImageForm');
    if (heroForm) {
        heroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fileInput = document.getElementById('heroImageInput');
            const altInput = document.getElementById('heroImageAlt');
            
            if (!fileInput.files || fileInput.files.length === 0) {
                window.showNotification('Please select an image', 'error');
                return;
            }
            
            try {
                const file = fileInput.files[0];
                
                // Validate file size (5MB max)
                if (file.size > 5 * 1024 * 1024) {
                    window.showNotification('File size must be less than 5MB', 'error');
                    return;
                }
                
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    window.showNotification('Please select a valid image file', 'error');
                    return;
                }
                
                await uploadHeroImage(file, altInput.value);
                
                // Show success message
                const successMsg = document.getElementById('heroUploadSuccess');
                successMsg.style.display = 'block';
                
                // Reset form
                heroForm.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 3000);
                
                // Refresh gallery
                renderHeroImagesGallery();
                window.showNotification('Hero image uploaded successfully!');
            } catch (error) {
                console.error('Error uploading hero image:', error);
                window.showNotification('Error uploading image. Please try again.', 'error');
            }
        });
    }
    
	    // Featured product image form submission
	    const featuredForm = document.getElementById('featuredImageForm');
	    if (featuredForm) {
	        featuredForm.addEventListener('submit', async (e) => {
	            e.preventDefault();
	            
	            const fileInput = document.getElementById('featuredImageInput');
	            const productNameInput = document.getElementById('featuredProductName');
	            const productPriceInput = document.getElementById('featuredProductPrice');
	            const productDescInput = document.getElementById('featuredProductDesc');
	            
	            if (!fileInput.files || fileInput.files.length === 0) {
	                window.showNotification('Please select an image', 'error');
	                return;
	            }
	            
	            try {
	                const file = fileInput.files[0];
	                
	                // Validate file size (5MB max)
	                if (file.size > 5 * 1024 * 1024) {
	                    window.showNotification('File size must be less than 5MB', 'error');
	                    return;
	                }
	                
	                // Validate file type
	                if (!file.type.startsWith('image/')) {
	                    window.showNotification('Please select a valid image file', 'error');
	                    return;
	                }
	                
	                await uploadFeaturedImage(
	                    file, 
	                    productNameInput.value, 
	                    parseFloat(productPriceInput.value), 
	                    productDescInput.value
	                );
                
                // Show success message
                const successMsg = document.getElementById('featuredUploadSuccess');
                successMsg.style.display = 'block';
                
                // Reset form
                featuredForm.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 3000);
                
                // Refresh gallery
                renderFeaturedImagesGallery();
                window.showNotification('Featured product image uploaded successfully!');
            } catch (error) {
                console.error('Error uploading featured image:', error);
                window.showNotification('Error uploading image. Please try again.', 'error');
            }
        });
    }
    
    // Initial render of galleries
    renderHeroImagesGallery();
    renderFeaturedImagesGallery();
});

// Export functions for global use
window.getMediaData = getMediaData;
window.removeHeroImage = removeHeroImage;
window.removeFeaturedImage = removeFeaturedImage;
window.renderHeroImagesGallery = renderHeroImagesGallery;
window.renderFeaturedImagesGallery = renderFeaturedImagesGallery;
