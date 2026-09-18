// ==========================================
// 1. تأثير شريط التنقل (Navbar) مع السكرول
// ==========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ==========================================
// 2. القائمة الجانبية للموبايل (Sidebar)
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
}

if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}
// ==========================================
// إغلاق القائمة الجانبية عند الضغط في أي مكان فارغ الشاشة
// ==========================================
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menu-btn');
    const exploreBtn = document.getElementById('explore-btn');

    if (sidebar && sidebar.classList.contains('active')) {
        if (!sidebar.contains(event.target) && 
            (!menuBtn || !menuBtn.contains(event.target)) && 
            (!exploreBtn || !exploreBtn.contains(event.target))) {
            sidebar.classList.remove('active');
        }
    }
});

// ==========================================
// 3. حركة ظهور العناصر (Reveal Animation)
// ==========================================
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 50; 

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', revealElements);
document.addEventListener('DOMContentLoaded', revealElements);

// ==========================================
// 4. برمجة سلة المشتريات (Shopping Cart)
// ==========================================
let cart = JSON.parse(localStorage.getItem('nike_bluelock_cart')) || [];

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }
}

window.addToCart = function(itemName, itemPrice, itemImg) {
    cart.push({ name: itemName, price: parseFloat(itemPrice), image: itemImg });
    localStorage.setItem('nike_bluelock_cart', JSON.stringify(cart));
    updateCartUI();
    
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && !cartSidebar.classList.contains('active')) {
        toggleCart();
    }
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('nike_bluelock_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartBadge = document.getElementById('cart-badge');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (!cartItemsContainer || !cartBadge || !cartTotalPrice) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty. Time to gear up!</p>';
        cartBadge.innerText = '0';
        cartTotalPrice.innerText = '$0.00';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="remove-item" onclick="removeFromCart(${index})">&times;</div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });

    cartBadge.innerText = cart.length;
    cartTotalPrice.innerText = '$' + total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', updateCartUI);

// ==========================================
// 5. التبديل بين الوضع النهاري والليلي (Light/Dark Mode)
// ==========================================
function toggleTheme() {
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        // في اللايت مود: إظهار الشمس وإخفاء القمر
        if(sunIcon) sunIcon.style.display = 'block';
        if(moonIcon) moonIcon.style.display = 'none';
    } else {
        localStorage.setItem('theme', 'dark');
        // في الدارك مود: إظهار القمر وإخفاء الشمس
        if(sunIcon) sunIcon.style.display = 'none';
        if(moonIcon) moonIcon.style.display = 'block';
    }
}

// الكشف عن الثيم المحفوظ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        // لو مسجل لايت مود: إظهار الشمس وإخفاء القمر
        if(sunIcon) sunIcon.style.display = 'block';
        if(moonIcon) moonIcon.style.display = 'none';
    } else {
        body.classList.remove('light-mode');
        // لو مسجل دارك مود: إظهار القمر وإخفاء الشمس
        if(sunIcon) sunIcon.style.display = 'none';
        if(moonIcon) moonIcon.style.display = 'block';
    }
});
