// Modal logic for dashboard (omoola-db.html)
function openAddProductModal() {
    document.getElementById('productModal').classList.add('active');
}
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}
function openAddCategoryModal() {
    document.getElementById('categoryModal').classList.add('active');
}
function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
}
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('productModal')) closeProductModal();
    if (e.target === document.getElementById('categoryModal')) closeCategoryModal();
});
// Add more dashboard logic as needed
