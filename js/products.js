// Product Data
const products = [
    {
        id: 1,
        name: "Classic Hoodie",
        type: "hoodie",
        gender: "men",
        color: "black",
        price: 49.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Premium comfortable hoodie perfect for custom prints. Made with high-quality cotton blend.",
        emoji: "🖤"
    },
    {
        id: 2,
        name: "White Hoodie",
        type: "hoodie",
        gender: "men",
        color: "white",
        price: 49.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Clean white hoodie ideal for vibrant custom designs.",
        emoji: "🤍"
    },
    {
        id: 3,
        name: "Gray Hoodie",
        type: "hoodie",
        gender: "men",
        color: "gray",
        price: 49.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Versatile gray hoodie that goes with any design.",
        emoji: "🩶"
    },
    {
        id: 4,
        name: "Navy Hoodie",
        type: "hoodie",
        gender: "men",
        color: "navy",
        price: 49.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Deep navy hoodie for professional styled prints.",
        emoji: "💙"
    },
    {
        id: 5,
        name: "Red Hoodie",
        type: "hoodie",
        gender: "men",
        color: "red",
        price: 49.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Bold red hoodie that makes a statement.",
        emoji: "❤️"
    },
    {
        id: 6,
        name: "Men's Black T-Shirt",
        type: "tshirt",
        gender: "men",
        color: "black",
        price: 19.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Classic black t-shirt, perfect for any custom design or logo.",
        emoji: "🖤"
    },
    {
        id: 7,
        name: "Men's White T-Shirt",
        type: "tshirt",
        gender: "men",
        color: "white",
        price: 19.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Crisp white t-shirt ideal for colored prints.",
        emoji: "🤍"
    },
    {
        id: 8,
        name: "Men's Gray T-Shirt",
        type: "tshirt",
        gender: "men",
        color: "gray",
        price: 19.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Soft gray t-shirt with comfortable fit.",
        emoji: "🩶"
    },
    {
        id: 9,
        name: "Men's Navy T-Shirt",
        type: "tshirt",
        gender: "men",
        color: "navy",
        price: 19.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Professional navy t-shirt for business prints.",
        emoji: "💙"
    },
    {
        id: 10,
        name: "Men's Red T-Shirt",
        type: "tshirt",
        gender: "men",
        color: "red",
        price: 19.99,
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Vibrant red t-shirt guaranteed to stand out.",
        emoji: "❤️"
    },
    {
        id: 11,
        name: "Women's Hoodie",
        type: "hoodie",
        gender: "women",
        color: "black",
        price: 49.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Fitted women's hoodie with tapered sleeves. Great for custom prints.",
        emoji: "🖤"
    },
    {
        id: 12,
        name: "Women's White Hoodie",
        type: "hoodie",
        gender: "women",
        color: "white",
        price: 49.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Elegant white hoodie tailored for women.",
        emoji: "🤍"
    },
    {
        id: 13,
        name: "Women's Gray Hoodie",
        type: "hoodie",
        gender: "women",
        color: "gray",
        price: 49.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Cozy gray hoodie perfect for layering.",
        emoji: "🩶"
    },
    {
        id: 14,
        name: "Women's Navy Hoodie",
        type: "hoodie",
        gender: "women",
        color: "navy",
        price: 49.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Stylish navy hoodie for sophisticated designs.",
        emoji: "💙"
    },
    {
        id: 15,
        name: "Women's Red Hoodie",
        type: "hoodie",
        gender: "women",
        color: "red",
        price: 49.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Eye-catching red hoodie for bold statements.",
        emoji: "❤️"
    },
    {
        id: 16,
        name: "Women's Black T-Shirt",
        type: "tshirt",
        gender: "women",
        color: "black",
        price: 19.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Fitted black t-shirt with feminine cut.",
        emoji: "🖤"
    },
    {
        id: 17,
        name: "Women's White T-Shirt",
        type: "tshirt",
        gender: "women",
        color: "white",
        price: 19.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Classic white t-shirt for any design.",
        emoji: "🤍"
    },
    {
        id: 18,
        name: "Women's Gray T-Shirt",
        type: "tshirt",
        gender: "women",
        color: "gray",
        price: 19.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Comfortable gray t-shirt in women's sizing.",
        emoji: "🩶"
    },
    {
        id: 19,
        name: "Women's Navy T-Shirt",
        type: "tshirt",
        gender: "women",
        color: "navy",
        price: 19.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Sophisticated navy t-shirt for professional looks.",
        emoji: "💙"
    },
    {
        id: 20,
        name: "Women's Red T-Shirt",
        type: "tshirt",
        gender: "women",
        color: "red",
        price: 19.99,
        sizes: ["S", "M", "L", "XL"],
        description: "Bold red t-shirt to express yourself.",
        emoji: "❤️"
    }
];

// Get all products
function getAllProducts() {
    return products;
}

// Filter products based on criteria
function filterProducts(genderFilter, typeFilter, colorFilter, sizeFilter) {
    return products.filter(product => {
        const genderMatch = !genderFilter || product.gender === genderFilter;
        const typeMatch = !typeFilter || product.type === typeFilter;
        const colorMatch = !colorFilter || product.color === colorFilter;
        const sizeMatch = !sizeFilter || product.sizes.includes(sizeFilter);
        
        return genderMatch && typeMatch && colorMatch && sizeMatch;
    });
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Get color hex value for display
function getColorHex(colorName) {
    const colorMap = {
        black: "#000000",
        white: "#FFFFFF",
        gray: "#808080",
        navy: "#000080",
        red: "#FF0000"
    };
    return colorMap[colorName] || "#808080";
}
