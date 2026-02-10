// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addItem(product, size) {
        const existingItem = this.items.find(item => item.id === product.id && item.size === size);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                color: product.color,
                type: product.type,
                gender: product.gender,
                size: size,
                quantity: 1,
                emoji: product.emoji
            });
        }
        
        this.save();
        this.updateCartUI();
        this.showNotification(`Added to cart: ${product.name} (Size: ${size})`);
    }

    removeItem(productId, size) {
        this.items = this.items.filter(item => !(item.id === productId && item.size === size));
        this.save();
        this.updateCartUI();
    }

    updateQuantity(productId, size, quantity) {
        const item = this.items.find(item => item.id === productId && item.size === size);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.save();
            this.updateCartUI();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    clear() {
        this.items = [];
        this.save();
        this.updateCartUI();
    }

    getItems() {
        return this.items;
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }
    }

    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4caf50;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Display cart items in modal
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartEmpty = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    
    const items = cart.getItems();
    
    cartItemsContainer.innerHTML = '';
    
    if (items.length === 0) {
        cartEmpty.style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartSummary.style.display = 'block';
        
        items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.emoji} ${item.name}</h4>
                    <p>Size: ${item.size} | Color: ${item.color}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id}, '${item.size}')">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id}, '${item.size}')">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        document.getElementById('cart-total').textContent = cart.getTotal().toFixed(2);
    }
}

function increaseQuantity(productId, size) {
    const items = cart.getItems();
    const item = items.find(item => item.id === productId && item.size === size);
    if (item) {
        cart.updateQuantity(productId, size, item.quantity + 1);
        displayCartItems();
    }
}

function decreaseQuantity(productId, size) {
    const items = cart.getItems();
    const item = items.find(item => item.id === productId && item.size === size);
    if (item && item.quantity > 1) {
        cart.updateQuantity(productId, size, item.quantity - 1);
        displayCartItems();
    }
}

function removeFromCart(productId, size) {
    cart.removeItem(productId, size);
    displayCartItems();
}
