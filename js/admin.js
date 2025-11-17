// Admin Dashboard JavaScript

// Section Navigation
const navItems = document.querySelectorAll('.nav-item[data-section]');
const sections = document.querySelectorAll('.admin-section');
const pageTitle = document.getElementById('pageTitle');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.dataset.section;
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show selected section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        // Update page title
        const titleText = item.querySelector('span').textContent;
        pageTitle.textContent = titleText;
    });
});

// Logout functionality - clears admin session
const logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        if (confirm('Are you sure you want to logout?')) {
            // Clear admin session
            sessionStorage.removeItem('adminLoggedIn');
            sessionStorage.removeItem('adminEmail');
            sessionStorage.removeItem('adminUid');
            
            window.showNotification('Logged out successfully');
            setTimeout(() => {
                // Redirect to admin login page
                window.location.href = 'admin-login.html';
            }, 1000);
        }
    });
}

// Product Upload Form Handler
const productUploadForm = document.getElementById('productUploadForm');
if (productUploadForm) {
    productUploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const productName = document.getElementById('productName').value;
        const productCategory = document.getElementById('productCategory').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const productStock = document.getElementById('productStock').value;
        const productImageInput = document.getElementById('productImage');
        
        // Handle image upload (for now, use placeholder or convert to base64)
        let imageUrl = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=50&h=50&fit=crop';
        
        if (productImageInput.files && productImageInput.files[0]) {
            // In production, upload to Firebase Storage or Cloudinary
            // For demo, use a placeholder based on category
            if (productCategory === 'Medicine') {
                imageUrl = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=50&h=50&fit=crop';
            } else if (productCategory === 'Health Supplies') {
                imageUrl = 'https://images.unsplash.com/photo-1550572017-4781e5e8e9c7?w=50&h=50&fit=crop';
            } else if (productCategory === 'Groceries') {
                imageUrl = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=50&h=50&fit=crop';
            }
        }
        
        // Create product object
        const newProduct = {
            id: Date.now(), // Simple ID generation for demo
            name: productName,
            category: productCategory,
            description: productDescription,
            price: parseFloat(productPrice).toFixed(2),
            stock: parseInt(productStock),
            imageUrl: imageUrl,
            status: 'Active',
            createdAt: new Date().toISOString()
        };
        
        // Save to localStorage (in production, save to Firestore)
        let products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
        products.push(newProduct);
        localStorage.setItem('adminProducts', JSON.stringify(products));
        
        // Add product to table
        addProductToTable(newProduct);
        
        // Show success message
        const successMsg = document.getElementById('productUploadSuccess');
        successMsg.style.display = 'block';
        
        // Reset form
        productUploadForm.reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
        
        window.showNotification('Product added successfully!');
    });
}

// Function to add product to table
function addProductToTable(product) {
    const tbody = document.getElementById('productsTableBody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <div class="product-cell">
                <img src="${product.imageUrl}" alt="${product.name}">
                <span>${product.name}</span>
            </div>
        </td>
        <td>${product.category}</td>
        <td>£${product.price}</td>
        <td>${product.stock}</td>
        <td><span class="status-badge active">${product.status}</span></td>
        <td>
            <button class="action-btn edit-btn" data-id="${product.id}">Edit</button>
            <button class="action-btn delete delete-btn" data-id="${product.id}">Delete</button>
        </td>
    `;
    
    tbody.appendChild(row);
    
    // Add event listeners for new buttons
    attachProductActionListeners(row);
}

// Function to attach event listeners to product action buttons
function attachProductActionListeners(row) {
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            window.showNotification('Edit functionality coming soon!');
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            const productId = deleteBtn.dataset.id;
            if (confirm('Are you sure you want to delete this product?')) {
                // Remove from localStorage
                let products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
                products = products.filter(p => p.id !== parseInt(productId));
                localStorage.setItem('adminProducts', JSON.stringify(products));
                
                // Remove row from table
                row.remove();
                
                window.showNotification('Product deleted successfully!');
            }
        });
    }
}

// Load existing products from localStorage on page load
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    products.forEach(product => {
        addProductToTable(product);
    });
}

// Load products when page loads
window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Simple chart for demo (you would use Chart.js in production)
const salesChart = document.getElementById('salesChart');
if (salesChart) {
    const ctx = salesChart.getContext('2d');
    
    // Simple bar chart visualization
    const data = [120, 190, 300, 500, 200, 300, 450];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const max = Math.max(...data);
    
    salesChart.width = salesChart.parentElement.clientWidth;
    salesChart.height = 300;
    
    const barWidth = salesChart.width / data.length - 20;
    const barSpacing = 20;
    
    ctx.fillStyle = '#2C5F2D';
    
    data.forEach((value, index) => {
        const barHeight = (value / max) * (salesChart.height - 50);
        const x = index * (barWidth + barSpacing) + barSpacing;
        const y = salesChart.height - barHeight - 30;
        
        // Draw bar
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#666';
        ctx.font = '12px Lato';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x + barWidth / 2, salesChart.height - 10);
        
        // Draw value
        ctx.fillText('£' + value, x + barWidth / 2, y - 5);
        
        ctx.fillStyle = '#2C5F2D';
    });
}

// Table search functionality
const searchInputs = document.querySelectorAll('.search-input');
searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const table = e.target.closest('.admin-section').querySelector('.data-table tbody');
        
        if (table) {
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }
    });
});

// Filter select functionality
const filterSelects = document.querySelectorAll('.filter-select');
filterSelects.forEach(select => {
    select.addEventListener('change', (e) => {
        const filterValue = e.target.value.toLowerCase();
        const table = e.target.closest('.admin-section').querySelector('.data-table tbody');
        
        if (table) {
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                if (filterValue === 'all orders') {
                    row.style.display = '';
                } else {
                    const statusBadge = row.querySelector('.status-badge');
                    const statusText = statusBadge ? statusBadge.textContent.toLowerCase() : '';
                    row.style.display = statusText === filterValue ? '' : 'none';
                }
            });
        }
    });
});

// Action button handlers (demo) for existing buttons
document.querySelectorAll('.action-btn:not(.edit-btn):not(.delete-btn)').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        window.showNotification(`${action} functionality coming soon!`);
    });
});

console.log('Admin dashboard loaded successfully');
