document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelectorAll('.btn-menu');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemlist = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');

    let cartItems = [];
    let totalAmount = 0;
 

    addToCartButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.menu-item .title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(1),
                ),
                quantity: 1,
            };

            const existingItem = cartItems.find(
                (cartItem) => cartItem.name === item.name,
            );
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
        move();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemlist.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-icon');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartItemlist.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = button.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removeItem = cartItems.splice(index, 1)[0];
        totalAmount -= removeItem.price * removeItem.quantity;
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        } else {
            console.error('Không tìm thấy phần tử sidebar');
        }
    });

    const closeButton = document.querySelector('.sidebar-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.remove('open');
            } else {
            }
        });
    } else {
    }

    const checkoutButton = document.querySelector('.checkout-btn');
    checkoutButton.addEventListener('click', () => {
        if (cartItems.length > 0) {
            location.assign("payment/atm.html");
            cartItems = []; // Đặt lại mảng cartItems
            totalAmount = 0; // Đặt lại tổng số tiền
            updateCartUI(); // Cập nhật giao diện người dùng
        } else {
            alert('You must place an order to pay.');
        }
    });
				
});
// image slidershow
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

