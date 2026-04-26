// Update cart count badge
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        if(el) el.textContent = totalItems;
    });
}

// Render products to any container
function renderProducts(containerId, productList = products) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = productList.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Added to cart!');
}

// Initialize page-specific rendering
if (document.getElementById('featured-products')) {
    renderProducts('featured-products', products.slice(0, 2));
}
if (document.getElementById('all-products')) {
    renderProducts('all-products', products);
}

updateCartCount();
