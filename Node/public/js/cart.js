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

            } else {
                alert('Product is already in cart');
            }
        });
    });

    updateCartNumber();

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


