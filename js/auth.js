// Authentication and User Management
class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
    }

    register(email, password, fullName) {
        if (this.users.find(user => user.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser = {
            id: Date.now(),
            email: email,
            password: password, // In production, use proper hashing
            fullName: fullName,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();
        return { success: true, message: 'Registration successful! Please login.' };
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = { id: user.id, email: user.email, fullName: user.fullName };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return { success: true, message: 'Login successful!' };
        }

        return { success: false, message: 'Invalid email or password' };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Order Management
    createOrder(items, shippingInfo, total) {
        if (!this.currentUser) {
            return { success: false, message: 'User not logged in' };
        }

        const order = {
            id: 'ORDER-' + Date.now(),
            userId: this.currentUser.id,
            items: items,
            shippingInfo: shippingInfo,
            total: total,
            status: 'pending',
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        this.orders.push(order);
        localStorage.setItem('orders', JSON.stringify(this.orders));
        
        return { success: true, message: 'Order placed successfully!', order: order };
    }

    getUserOrders() {
        if (!this.currentUser) return [];
        return this.orders.filter(order => order.userId === this.currentUser.id);
    }

    getOrderById(orderId) {
        return this.orders.find(order => order.id === orderId);
    }

    updateOrderStatus(orderId, newStatus) {
        const order = this.orders.find(order => order.id === orderId);
        if (order) {
            order.status = newStatus;
            localStorage.setItem('orders', JSON.stringify(this.orders));
            return true;
        }
        return false;
    }
}

// Initialize auth system
const auth = new AuthSystem();

// Check if user is logged in on page load
function checkAuthStatus() {
    const accountNav = document.getElementById('account-nav');
    if (accountNav) {
        if (auth.isLoggedIn()) {
            const user = auth.getCurrentUser();
            const link = accountNav.querySelector('a');
            link.textContent = `${user.fullName} (Account)`;
        }
    }
}

// Redirect to login if not logged in
function requireLogin() {
    if (!auth.isLoggedIn()) {
        window.location.href = 'pages/account.html?tab=login';
        return false;
    }
    return true;
}

// Load auth status when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuthStatus);
} else {
    checkAuthStatus();
}
