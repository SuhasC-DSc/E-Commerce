# CustomWear - Ecommerce Website for Custom Printed Hoodies & T-Shirts

A complete, beginner-friendly ecommerce website built with vanilla HTML, CSS, and JavaScript. No frameworks needed!

## Features

### ✅ Core Features Implemented
- **Product Catalog**: 20 pre-configured products (hoodies and t-shirts for men and women)
- **Smart Filtering**: Filter by gender (men/women), type (hoodie/t-shirt), color, and size
- **Shopping Cart**: Add items, adjust quantities, remove items with persistent storage
- **User Accounts**: Register, login, and manage user profiles
- **Order Management**: Track order history with order status updates
- **Checkout System**: Complete checkout flow with shipping and payment information
- **MockPayment**: Demo payment mode (no real credit card processing)
- **Dark Mode Theme**: Professional dark interface with red accents
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

```
Lucy's/
├── index.html                 # Home page with product listing
├── css/
│   └── styles.css            # All styling and responsive design
├── js/
│   ├── products.js           # Product data and filtering logic
│   ├── cart.js               # Shopping cart management
│   ├── auth.js               # User authentication and order system
│   ├── app.js                # Main application logic
│   ├── account.js            # Account page functionality
│   └── checkout.js           # Checkout process handling
├── pages/
│   ├── account.html          # User account & profile page
│   └── checkout.html         # Checkout page
└── images/                   # Placeholder for product images

```

## How to Run

### Option 1: Using a Local Web Server (Recommended)

**Using Python 3:**
```bash
cd "d:\Personal_Project\Lucy's"
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (with http-server):**
```bash
npm install -g http-server
cd "d:\Personal_Project\Lucy's"
http-server
```

**Using PHP:**
```bash
cd "d:\Personal_Project\Lucy's"
php -S localhost:8000
```

### Option 2: Using VS Code Live Server Extension

1. Install the "Live Server" extension (by Ritwick Dey)
2. Right-click on `index.html`
3. Select "Open with Live Server"

The website will automatically open in your default browser.

## User Guide

### For Customers

#### 1. Browsing Products
- Visit the home page to see all products
- Use the filter section to find products by:
  - Gender (Men/Women)
  - Type (Hoodie/T-Shirt)
  - Color
  - Size
- Click "Details" or "Add to Cart" on any product

#### 2. Adding to Cart
- Click "Add to Cart" or "Details" button on a product
- Select your desired size
- Click "Add to Cart" in the product modal
- View cart by clicking the cart icon in the navigation

#### 3. Creating an Account
- Click "Account" in the navigation
- Go to the "Register" tab
- Fill in: Full Name, Email, Password, and Confirm Password
- Click "Register"

#### 4. Logging In
- Click "Account" in the navigation
- Enter your email and password
- Click "Login"

#### 5. Checking Out
- Click the cart icon and review your items
- Click "Proceed to Checkout"
- Fill in shipping information
- Select payment method (demo mode - any card works)
- Enter card details (demo - any numbers work)
- Click "Complete Order"
- You'll receive an order confirmation

#### 6. Managing Orders
- Click "Account" in the navigation
- Go to "My Orders" tab
- View all your orders with status and details

### Sample Test Accounts

You can create your own account, but here are some example credentials:

**Note**: The system uses localStorage, so accounts persist in your browser until local storage is cleared.

## Product Information

### Available Products

**Hoodies** (Men & Women)
- Colors: Black, White, Gray, Navy Blue, Red
- Sizes: S, M, L, XL, XXL (Men); S, M, L, XL (Women)
- Price: $49.99

**T-Shirts** (Men & Women)
- Colors: Black, White, Gray, Navy Blue, Red
- Sizes: S, M, L, XL, XXL (Men); S, M, L, XL (Women)
- Price: $19.99

## Key Features Explained

### 1. Product Filtering
Combine multiple filters to find exactly what you're looking for:
```
Example: Men's Black Hoodies in Size L
- Gender: Men
- Type: Hoodie
- Color: Black
- Size: L
```

### 2. Shopping Cart
- Items are saved in your browser's local storage
- Add the same product in different sizes (tracked separately)
- Modify quantities or remove items anytime
- Cart persists even after closing the browser

### 3. User Authentication
- Accounts are stored in browser local storage
- **Note**: For production, use proper backend authentication
- Passwords are not encrypted (demo only)
- Each user can track their own orders

### 4. Order System
- Orders are created when checkout is completed
- Order status starts as "pending"
- Estimated delivery is 7 days from order date
- Users can view all their orders in their account

### 5. Payment (Demo Mode)
- Mock payment system - no real processing
- Accept any credit card number for testing
- Expiry format: MM/YY
- Any 3-digit CVV works

## Customization Guide

### Change Store Name
Edit in `index.html`, `pages/account.html`, `pages/checkout.html`:
```html
<div class="logo">CustomWear</div>
```

### Change Logo Color
Edit in `css/styles.css`:
```css
.logo {
    color: #ff6b6b;  /* Change this hex code */
}
```

### Edit Product List
Modify `js/products.js`:
```javascript
const products = [
    {
        id: 1,
        name: "Your Product Name",
        type: "hoodie",
        gender: "men",
        color: "black",
        price: 49.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Your product description",
        emoji: "🖤"  // Change emoji
    },
    // Add more products...
];
```

### Add Your Company Info to Footer
Edit in `css/styles.css` or HTML files.

### Change Colors
The main color scheme uses:
- Primary Color: `#ff6b6b` (Red)
- Background: `#1a1a1a` (Dark)
- Text: `#e0e0e0` (Light Gray)

Change these in `css/styles.css`.

## Data Storage

All data is stored in browser's **localStorage**:
- `cart` - Shopping cart items
- `users` - Registered user accounts
- `currentUser` - Currently logged-in user
- `orders` - All orders in the system

### Clear All Data
Open browser console (F12) and run:
```javascript
localStorage.clear();
location.reload();
```

## Browser Compatibility

Works best on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Important Notes

⚠️ **This is a Demo/Learning Project**
- Uses localStorage (not a real database)
- No real payment processing
- No backend server required
- Password storage is not secure (for demo purposes only)
- For production, you'll need:
  - A proper backend server (Node.js, Python, PHP, etc.)
  - A real database (MongoDB, PostgreSQL, MySQL, etc.)
  - Payment gateway integration (Stripe, PayPal, etc.)
  - User authentication library (bcrypt for password hashing)
  - HTTPS for secure communication

## Learning Outcomes

By studying this project, you'll learn:
- ✅ HTML structure and semantic markup
- ✅ CSS styling and responsive design
- ✅ JavaScript DOM manipulation
- ✅ localStorage for data persistence
- ✅ Event listeners and handlers
- ✅ Filter and search functionality
- ✅ Shopping cart logic
- ✅ Form validation
- ✅ Modal windows
- ✅ User authentication basics

## Next Steps for Production

1. **Replace localStorage with a backend database**
2. **Implement real user authentication** (JWT tokens, OAuth)
3. **Integrate a payment gateway** (Stripe, PayPal)
4. **Add product images** instead of emojis
5. **Implement email notifications**
6. **Add admin dashboard** for managing products
7. **Set up SSL/HTTPS**
8. **Add search functionality**
9. **Implement user reviews and ratings**
10. **Add inventory management**

## Troubleshooting

### Products not showing?
- Make sure you're running a local server, not opening the HTML file directly
- Try clearing browser cache (Ctrl+Shift+Delete)

### Cart not persisting?
- Make sure localStorage is enabled in your browser
- Check if you're in private/incognito mode (some browsers disable localStorage)

### Can't login?
- Make sure you've registered first
- Check that localStorage isn't cleared
- Try a different browser

## Support & Questions

This project is a learning resource. Refer to:
- [MDN Web Docs](https://developer.mozilla.org/) for JavaScript/HTML/CSS
- [W3Schools](https://www.w3schools.com/) for web fundamentals
- Comments in the code for specific explanations

## License

Free to use for personal and educational purposes.

---

**Enjoy building with CustomWear!** 🎨👕
