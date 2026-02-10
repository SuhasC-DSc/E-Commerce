// Account Page Logic

// Check authentication on page load
function checkAccountPage() {
    const loggedInView = document.getElementById('logged-in-view');
    const loginRegisterView = document.getElementById('login-register-view');

    if (auth.isLoggedIn()) {
        loggedInView.style.display = 'block';
        loginRegisterView.style.display = 'none';
        loadProfileInfo();
        loadOrders();
    } else {
        loggedInView.style.display = 'none';
        loginRegisterView.style.display = 'block';
        
        // Check URL for tab parameter
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab === 'register') {
            switchAuthTab('register');
        }
    }

    setupCartListener();
    cart.updateCartUI();
}

// Load profile information
function loadProfileInfo() {
    const user = auth.getCurrentUser();
    
    if (user) {
        document.getElementById('profile-name').textContent = user.fullName;
        document.getElementById('profile-email').textContent = user.email;
        
        // Find user's creation date
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userData = allUsers.find(u => u.id === user.id);
        
        if (userData) {
            const createdDate = new Date(userData.createdAt).toLocaleDateString();
            document.getElementById('profile-created').textContent = createdDate;
        }
        
        const userOrders = auth.getUserOrders();
        document.getElementById('profile-orders').textContent = userOrders.length;
    }
}

// Load orders
function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    const noOrders = document.getElementById('no-orders');
    const userOrders = auth.getUserOrders();

    if (userOrders.length === 0) {
        ordersList.style.display = 'none';
        noOrders.style.display = 'block';
        return;
    }

    ordersList.style.display = 'block';
    noOrders.style.display = 'none';
    ordersList.innerHTML = '';

    userOrders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';
        
        const statusClass = `status-${order.status}`;
        const itemSummary = order.items.map(item => `${item.quantity}x ${item.name}`).join(', ');
        const deliveryDate = new Date(order.estimatedDelivery).toLocaleDateString();

        orderElement.innerHTML = `
            <h3>${order.id}</h3>
            <p><strong>Items:</strong> ${itemSummary}</p>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Estimated Delivery:</strong> ${deliveryDate}</p>
            <span class="order-status ${statusClass}">${order.status.toUpperCase()}</span>
        `;
        
        ordersList.appendChild(orderElement);
    });
}

// Switch between tabs in account section
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    const selectedTab = document.getElementById(tabName);
    const selectedButton = event.target;

    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    if (tabName === 'orders') {
        loadOrders();
    }
}

// Switch between login/register
function switchAuthTab(tabName) {
    const forms = document.querySelectorAll('.auth-form');
    const buttons = document.querySelectorAll('.auth-tab-button');

    forms.forEach(form => form.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    const selectedForm = document.getElementById(tabName + '-form');
    const selectedButton = event.target;

    if (selectedForm) {
        selectedForm.classList.add('active');
    }
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Clear messages
    document.getElementById('login-message').style.display = 'none';
    document.getElementById('register-message').style.display = 'none';
}

// Fix switchAuthTab to handle button clicks properly
document.addEventListener('DOMContentLoaded', function() {
    const authTabButtons = document.querySelectorAll('.auth-tab-button');
    authTabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.textContent.toLowerCase();
            const formName = tabName === 'login' ? 'login' : 'register';
            
            const forms = document.querySelectorAll('.auth-form');
            const buttons = document.querySelectorAll('.auth-tab-button');
            
            forms.forEach(form => form.classList.remove('active'));
            buttons.forEach(btn => btn.classList.remove('active'));
            
            document.getElementById(formName + '-form').classList.add('active');
            this.classList.add('active');
        });
    });
});

// Handle login
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const messageDiv = document.getElementById('login-message');

    if (!email || !password) {
        showMessage(messageDiv, 'Please fill in all fields', 'error');
        return;
    }

    const result = auth.login(email, password);
    
    if (result.success) {
        showMessage(messageDiv, result.message, 'success');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    } else {
        showMessage(messageDiv, result.message, 'error');
    }
}

// Handle registration
function handleRegister() {
    const fullName = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    const messageDiv = document.getElementById('register-message');

    if (!fullName || !email || !password || !confirmPassword) {
        showMessage(messageDiv, 'Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage(messageDiv, 'Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage(messageDiv, 'Password must be at least 6 characters', 'error');
        return;
    }

    const result = auth.register(email, password, fullName);
    
    if (result.success) {
        showMessage(messageDiv, result.message, 'success');
        
        // Clear form
        document.getElementById('register-name').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('register-confirm').value = '';
        
        // Switch to login after 2 seconds
        setTimeout(() => {
            switchAuthTab('login');
        }, 2000);
    } else {
        showMessage(messageDiv, result.message, 'error');
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        auth.logout();
        window.location.reload();
    }
}

// Update password
function updatePassword() {
    const newPassword = document.getElementById('new-password').value;
    
    if (!newPassword) {
        alert('Please enter a new password');
        return;
    }

    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    alert('Password update feature would require server-side implementation');
    document.getElementById('new-password').value = '';
}

// Show message helper
function showMessage(messageDiv, message, type) {
    messageDiv.textContent = message;
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.style.display = 'block';
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
            if (!auth.isLoggedIn()) {
                alert('Please login to proceed with checkout');
                return;
            }
            
            if (cart.getItems().length === 0) {
                alert('Your cart is empty');
                return;
            }

            window.location.href = 'checkout.html';
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

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAccountPage);
} else {
    checkAccountPage();
}
