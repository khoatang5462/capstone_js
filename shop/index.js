const iconCart = document.querySelector('.icon-cart');
const closeCartButton = document.querySelector('.close');
const cart = document.getElementById('cart');
const productList = document.getElementById('productList');
const cartItemsList = document.querySelector('.listCart');

let cartCount = 0; 

iconCart.addEventListener('click', () => {
    console.log('Cart icon clicked'); 
    cart.classList.toggle('showCart'); 
});

closeCartButton.addEventListener('click', () => {
    cart.classList.toggle('showCart'); 
});

const baseUrl = 'https://673ddc070118dbfe86091490.mockapi.io';

const qlspServices = {
    getProductList: async () => {
        try {
            const response = await axios.get(`${baseUrl}/QLDT`);
            return response.data; 
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error; 
        }
    }
};

const renderProducts = (products) => {
    let htmlContent = '';

    products.forEach((product) => {
        htmlContent += `
            <div class="item">
                <img src="${product.img}" alt="${product.name}" />
                <h2>${product.name}</h2>
                <div class="price">${product.price} VNĐ</div>
                <button class="addCart" onclick="addToCart('${product.id}')">Add to cart</button>
            </div>
        `;
    });

    productList.innerHTML = htmlContent;
};

const getProducts = async () => {
    const products = await qlspServices.getProductList(); 
    renderProducts(products); 
};

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 

window.addToCart = async (productId) => {
    try {
        const products = await qlspServices.getProductList(); 
        const product = products.find(item => item.id === productId); 

        if (product) {
            const existingItem = cartItems.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1; 
            } else {
                cartItems.push({ ...product, quantity: 1 }); 
            }
            updateCartDisplay();
            saveCartToLocalStorage(); 
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

window.updateCartDisplay = () => {
    cartItemsList.innerHTML = ''; 
    cartCount = 0; 

    cartItems.forEach(item => {
        const cartItemHTML = `
            <div class="item">
                <div class="image">
                    <img src="${item.img}" alt="${item.name}" />
                </div>
                <div class="name">${item.name}</div>
                <div class="totalPrice">${item.price * item.quantity} VNĐ</div>
                <div class="quantity">
                    <span class="minus" onclick="updateQuantity('${item.id}', -1)">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus" onclick="updateQuantity('${item.id}', 1)">+</span>
                </div>
            </div>
        `;
        cartItemsList.innerHTML += cartItemHTML; 
        cartCount += item.quantity; 
    });

    iconCart.querySelector('span').textContent = cartCount;
};

window.updateQuantity = (productId, change) => {
    const item = cartItems.find(i => i.id === productId);
    if (item) {
        item.quantity += change; 
        if (item.quantity <= 0) {
            cartItems.splice(cartItems.indexOf(item), 1); 
        }
        updateCartDisplay();
        saveCartToLocalStorage(); 
    }
};

const saveCartToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
};

window.onload = () => {
    updateCartDisplay();
    getProducts();
};