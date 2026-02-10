// Checkout Page Logic

// Prefill user info if logged in
function prefillCheckoutForm() {
    if (!auth.isLoggedIn()) {
        // Redirect to account page if not logged in
        alert('Please login to proceed with checkout');
        window.location.href = 'account.html?tab=login';
        return;
    }

    const user = auth.getCurrentUser();
    
    // Prefill email
    document.getElementById('email').value = user.email;
    document.getElementById('cardname').value = user.fullName;
    document.getElementById('fullname').value = user.fullName;

    // Load cart items
    loadCheckoutItems();
    calculateTotals();

    // Setup event listeners
    setupPaymentMethodListeners();
    setupCartListener();
    cart.updateCartUI();
}

// Load items from cart
function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    const items = cart.getItems();

    if (items.length === 0) {
        checkoutItems.innerHTML = '<p style="color: #999;">Your cart is empty</p>';
        return;
    }

    checkoutItems.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'summary-item';
        itemElement.innerHTML = `
            <span>${item.emoji} ${item.name} (${item.size}) x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        checkoutItems.appendChild(itemElement);
    });
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.getTotal();
    const shipping = 5.00;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('shipping').textContent = shipping.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Setup payment method listeners
function setupPaymentMethodListeners() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardPayment = document.getElementById('card-payment');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                cardPayment.style.display = 'block';
                document.querySelectorAll('#card-payment input[required]').forEach(input => {
                    input.required = true;
                });
            } else {
                cardPayment.style.display = 'none';
                document.querySelectorAll('#card-payment input[required]').forEach(input => {
                    input.required = false;
                });
            }
        });
    });
}

// Validate form
function validateCheckoutForm() {
    const requiredFields = document.querySelectorAll('input[required]');
    let isValid = true;
    let errorMessage = '';

    for (let field of requiredFields) {
        if (!field.value.trim()) {
            isValid = false;
            errorMessage = `Please fill in: ${field.previousElementSibling.textContent}`;
            break;
        }
    }

    if (isValid) {
        // Validate email
        const email = document.getElementById('email').value;
        if (!email.includes('@')) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    if (isValid) {
        // Validate phone
        const phone = document.getElementById('phone').value;
        if (phone.replace(/\D/g, '').length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    if (isValid && document.querySelector('input[name="payment"]:checked').value === 'credit-card') {
        // Validate card number (basic validation)
        const cardNumber = document.getElementById('cardnumber').value.replace(/\s/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            isValid = false;
            errorMessage = 'Please enter a valid card number';
        }
    }

    if (!isValid) {
        alert(errorMessage || 'Please fill in all required fields');
    }

    return isValid;
}

// Process checkout
function processCheckout() {
    if (!validateCheckoutForm()) {
        return;
    }

    // Get shipping information
    const shippingInfo = {
        fullName: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value
    };

    const items = cart.getItems();
    const total = parseFloat(document.getElementById('total').textContent);

    // Create order
    const result = auth.createOrder(items, shippingInfo, total);

    if (result.success) {
        // Show success message
        document.getElementById('checkout-form').style.display = 'none';
        document.getElementById('order-success').style.display = 'block';
        document.getElementById('order-id').textContent = `Order ID: ${result.order.id}`;

        // Clear cart
        cart.clear();
        cart.updateCartUI();

        // Redirect after 5 seconds
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 5000);
    } else {
        alert(result.message);
    }
}

// Setup cart listener
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
            if (cart.getItems().length === 0) {
                alert('Your cart is empty');
                return;
            }
            loadCheckoutItems();
            calculateTotals();
        });
    }

    // Close modal
    const closeButtons = document.querySelectorAll('.close');
    const modals = document.querySelectorAll('.modal');

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

// Format card number input
function setupCardNumberFormatting() {
    const cardNumberInput = document.getElementById('cardnumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = formattedValue;
        });
    }

    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
}

// Initialize checkout page
function initializeCheckout() {
    prefillCheckoutForm();
    setupCardNumberFormatting();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCheckout);
} else {
    initializeCheckout();
}
