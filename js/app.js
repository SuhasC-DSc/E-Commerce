// Main Application Logic

// Display all products
function displayProducts(productsToDisplay = null) {
    const productsGrid = document.getElementById('products-grid');
    const itemsToDisplay = productsToDisplay || getAllProducts();
    
    productsGrid.innerHTML = '';
    
    if (itemsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No products found matching your filters.</p>';
        return;
    }

    itemsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-type">${product.type === 'hoodie' ? 'Hoodie' : 'T-Shirt'} - ${product.gender === 'men' ? "Men's" : "Women's"}</div>
                <div style="margin-bottom: 0.5rem;">
                    <span class="product-color" style="background-color: ${getColorHex(product.color)};" title="${product.color}"></span>
                    <span style="color: #999; font-size: 0.9rem;">${product.color.toUpperCase()}</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-details">
                    Sizes: ${product.sizes.join(', ')}
                </div>
                <div class="product-action">
                    <button class="btn-add-cart" onclick="showProductModal(${product.id})">Add to Cart</button>
                    <button class="btn-view-details" onclick="showProductModal(${product.id})">Details</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Show product detail modal
function showProductModal(productId) {
    const product = getProductById(productId);
    const modal = document.getElementById('product-modal');
    const productDetail = document.getElementById('product-detail');
    
    if (!product) return;

    const sizeButtons = product.sizes.map(size => 
        `<button class="size-option" onclick="selectSize(this, '${size}')">${size}</button>`
    ).join('');

    productDetail.innerHTML = `
        <div class="product-detail-image">${product.emoji}</div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>
                <strong>Type:</strong> ${product.type === 'hoodie' ? 'Hoodie' : 'T-Shirt'} | 
                <strong>Gender:</strong> ${product.gender === 'men' ? "Men's" : "Women's"}
            </p>
            <p>
                <strong>Color:</strong> <span class="product-color" style="background-color: ${getColorHex(product.color)};"></span> ${product.color.toUpperCase()}
            </p>
            <div class="size-selector">
                <label>Select Size:</label>
                <div class="size-options" id="size-options">
                    ${sizeButtons}
                </div>
                <input type="hidden" id="selected-size" value="">
            </div>
            <div class="detail-price">$${product.price.toFixed(2)}</div>
            <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Select size in product modal
function selectSize(button, size) {
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(opt => opt.classList.remove('selected'));
    button.classList.add('selected');
    document.getElementById('selected-size').value = size;
}

// Add to cart from modal
function addToCart(productId) {
    const selectedSize = document.getElementById('selected-size').value;
    
    if (!selectedSize) {
        alert('Please select a size before adding to cart');
        return;
    }

    const product = getProductById(productId);
    cart.addItem(product, selectedSize);
    
    // Close modal
    document.getElementById('product-modal').style.display = 'none';
}

// Filter products
function applyFilters() {
    const genderFilter = document.getElementById('gender-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    const colorFilter = document.getElementById('color-filter').value;
    const sizeFilter = document.getElementById('size-filter').value;

    const filteredProducts = filterProducts(genderFilter, typeFilter, colorFilter, sizeFilter);
    displayProducts(filteredProducts);
}

// Reset filters
function resetFilters() {
    document.getElementById('gender-filter').value = '';
    document.getElementById('type-filter').value = '';
    document.getElementById('color-filter').value = '';
    document.getElementById('size-filter').value = '';
    displayProducts();
}

// Modal event listeners
function setupModalListeners() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Cart icon event listener
function setupCartListener() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            displayCartItems();
            cartModal.style.display = 'block';
        });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (!auth.isLoggedIn()) {
                alert('Please login to proceed with checkout');
                window.location.href = 'pages/account.html?tab=login';
                return;
            }
            
            if (cart.getItems().length === 0) {
                alert('Your cart is empty');
                return;
            }

            // Redirect to checkout page
            window.location.href = 'pages/checkout.html';
        });
    }
}

// Filter event listeners
function setupFilterListeners() {
    const genderFilter = document.getElementById('gender-filter');
    const typeFilter = document.getElementById('type-filter');
    const colorFilter = document.getElementById('color-filter');
    const sizeFilter = document.getElementById('size-filter');
    const resetBtn = document.getElementById('reset-filters');

    [genderFilter, typeFilter, colorFilter, sizeFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

// Initialize app
function initializeApp() {
    displayProducts();
    setupModalListeners();
    setupCartListener();
    setupFilterListeners();
    cart.updateCartUI();
    
    // Add some CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
