document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = event.target.dataset.productId;

            let cart = JSON.parse(getCookie('cart') || '[]');

            if (!cart.includes(productId)) {
                cart.push(productId);
                setCookie('cart', JSON.stringify(cart), 7); // Expires in 7 days
                alert('Product added to cart');
                updateCartNumber();
                loadCartProducts();

            } else {
                alert('Product is already in cart');
            }
        });
    });

    updateCartNumber();
    loadCartProducts();
});

function getCookie(name) {
    const cookies = Object.fromEntries(document.cookie.split('; ').map(cookie => cookie.split('=')));
    return cookies[name];
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function updateCartNumber() {
    const numberOfProducts = getNumberOfProductsInCart();
    const cartNumberContainer = document.querySelector('.cart-number-container');
    if (cartNumberContainer) {
        cartNumberContainer.textContent = numberOfProducts.toString();
    }
}

function getNumberOfProductsInCart() {
    const cart = JSON.parse(getCookie('cart') || '[]');
    return cart.length;
}

function getProductIdsFromCart() {
    const cart = getCookie('cart');
    return cart ? JSON.parse(cart) : [];
}

async function loadCartProducts() {
    const productIds = getProductIdsFromCart();
    if (productIds.length > 0) {
        try {
            const response = await fetch('/cart-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productIds })
            });
            const products = await response.json();
            appendProducts(products);
        } catch (error) {
            console.error('Error fetching cart products:', error);
        }
    }
    else{
        const cartlist = document.getElementById('cartlist');
        const summarylist = document.getElementById('summarycontainer');

        cartlist.innerHTML='<h1>Nothing to show</h1>'
        summarylist.innerHTML='<h1>Nothing to show</h1>'
    }
}


function removeProduct(productId) {
    const cart = getCookie('cart') ? JSON.parse(getCookie('cart')) : [];
    const index = cart.indexOf(productId);
    if (index !== -1) {
        cart.splice(index, 1);
        setCookie('cart', JSON.stringify(cart), 7);
        loadCartProducts();
        updateCartNumber();

    }
}

function appendProducts(products) {
    const cartlist = document.getElementById('cartlist');
    const summarylist = document.getElementById('summarycontainer');
    cartlist.innerHTML = ''; 
    summarylist.innerHTML='';

    let total=0;
    products.forEach(product => {
        const singleProduct = document.createElement('div');
        const summaryDiv = document.createElement('div');
        singleProduct.classList.add('single-product-cart');
        singleProduct.innerHTML = `
            <div class="image-container">
                <img src="/assets/${product.path}" alt="${product.name}">
            </div>
            <div class="content-container">
            <div>
            <h3 class="product-heading">${product.name}</h3>
            <p>Pkr ${product.price}/-</p>
            <p>${product.description}</p>
            </div>
            <div class="buttons-container">
                <button onClick="removeProduct('${product._id}')"> Remove </button>
            </div>
            </div>
        `;
        summaryDiv.classList.add("single-summary");
        summaryDiv.innerHTML= `
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `
        total+=product.price;
        summarylist.append(summaryDiv);
        cartlist.appendChild(singleProduct);

    }
)
const totalContainer = document.createElement('div');
totalContainer.classList.add("total-container")

totalContainer.innerHTML =`<div>Total: ${total}</div>`;

summarylist.append(totalContainer);

}