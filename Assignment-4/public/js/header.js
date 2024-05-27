document.addEventListener('DOMContentLoaded', () => {

    function cartNumber() {
    const cart = JSON.parse(getCookie('cart') || '[]');
    return cart.length;
    }

})
