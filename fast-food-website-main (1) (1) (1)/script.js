document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn-menu');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default action of the button

            const menuItem = document.querySelectorAll('.menu-item')[index];
            const name = menuItem.querySelector('.location').textContent;
            const price = parseFloat(menuItem.querySelector('.price').textContent.slice(1));
            const existingItem = cartItems.find(cartItem => cartItem.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name, price, quantity: 1 });
            }

            totalAmount += price;
            updateCartUI();
        });
    });

    function updateCartUI() {
        cartItemCount.textContent = cartItems.reduce((count, item) => count + item.quantity, 0);
        cartItemList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">❌</button>
                <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-index="${index}">
            `;
            cartItemList.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.index);
                cartItems.splice(index, 1);
                updateCartUI();
            });
        });

        document.querySelectorAll('.item-quantity').forEach(input => {
            input.addEventListener('change', (event) => {
                const index = parseInt(event.target.dataset.index);
                const newQuantity = parseInt(event.target.value);
                cartItems[index].quantity = newQuantity;
                updateCartUI();
            });
        });

        updateCartTotal();
    }

    function updateCartTotal() {
        totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    });

    const closeButton = document.querySelector('.sidebar-close span');
    closeButton.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open');
    });

    const checkoutButton = document.querySelector('.checkout-btn');
    checkoutButton.addEventListener('click', () => {
        if (totalAmount > 0) {
            // Replace with your checkout page URL
            window.location.href = 'checkout.html';
        } else {
            alert('Your cart is empty. Please add some items to your cart before checking out.');
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

// Restaurant menu selected list
document.addEventListener('DOMContentLoaded', function () {
    var categories = document.querySelectorAll('.category li');
    var menuItems = document.querySelectorAll('.restaurant-menu .menu-item');

    categories.forEach(function (category) {
        category.addEventListener('click', function () {
            // Xóa class 'active' khỏi tất cả các danh mục
            categories.forEach(function (cat) {
                cat.classList.remove('active');
            });

            // Thêm class 'active' cho danh mục được chọn
            this.classList.add('active');

            // Lấy tên danh mục được chọn
            var selectedCategory = this.textContent.trim().toLowerCase();

            // Hiển thị tất cả món ăn nếu danh mục 'All' được chọn
            if (selectedCategory === 'all') {
                menuItems.forEach(function (item) {
                    item.style.display = 'block';
                });
            } else {
                // Hiển thị các món ăn phù hợp với danh mục được chọn dựa trên class 'location'
                menuItems.forEach(function (item) {
                    var locationText = item.querySelector('.location').textContent.toLowerCase();
                    if (selectedCategory === 'chicken' && locationText.includes('gà')) {
                        item.style.display = 'block';
                    } else if (selectedCategory === 'hamburger' && locationText.includes('burger')) {
                        item.style.display = 'block';
                    } else if (selectedCategory === 'pizza' && locationText.includes('pizza')) {
                        item.style.display = 'block';
                    } else if(selectedCategory=='khai vị'&&locationText.includes('Hải sản','Nachors','Xà lách')){
                            item.style.display=='block';
                    }
                    else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
});
