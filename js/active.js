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

    // لو القائمة الجانبية موجودة ومفتوحة (واخدة كلاس active)
    if (sidebar && sidebar.classList.contains('active')) {
        
        // لو الضغطة مكانتش جوه القائمة نفسها، ومكانتش على زرار المنيو، ومكانتش على زرار Explore
        if (!sidebar.contains(event.target) && 
            (!menuBtn || !menuBtn.contains(event.target)) && 
            (!exploreBtn || !exploreBtn.contains(event.target))) {
            
            // اقفل القائمة فوراً
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
        const elementVisible = 50; // المسافة اللي بيبدأ عندها الظهور

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

// استدعاء المنتجات من التخزين المحلي (عشان متطيرش لو عمل ريفريش)
let cart = JSON.parse(localStorage.getItem('nike_bluelock_cart')) || [];

// دالة فتح وقفل السلة
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }
}

// دالة إضافة منتج للسلة (هتستخدمها في زراير الشراء)
window.addToCart = function(itemName, itemPrice, itemImg) {
    // إضافة المنتج للمصفوفة
    cart.push({ name: itemName, price: parseFloat(itemPrice), image: itemImg });
    
    // حفظ السلة في التخزين المحلي
    localStorage.setItem('nike_bluelock_cart', JSON.stringify(cart));
    
    // تحديث شكل السلة
    updateCartUI();
    
    // فتح السلة أوتوماتيك عشان العميل يتأكد إنها اتضافت
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && !cartSidebar.classList.contains('active')) {
        toggleCart();
    }
}

// دالة مسح منتج من السلة
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('nike_bluelock_cart', JSON.stringify(cart));
    updateCartUI();
}

// دالة تحديث شكل السلة والأرقام (العداد والمجموع)
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartBadge = document.getElementById('cart-badge');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    // التأكد إن العناصر موجودة في الصفحة قبل التعديل
    if (!cartItemsContainer || !cartBadge || !cartTotalPrice) return;

    // تفريغ السلة عشان نرسمها من جديد
    cartItemsContainer.innerHTML = '';
    let total = 0;

    // لو السلة فاضية
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty. Time to gear up!</p>';
        cartBadge.innerText = '0';
        cartTotalPrice.innerText = '$0.00';
        return;
    }

    // رسم المنتجات جوه السلة
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

    // تحديث الأرقام النهائية
    cartBadge.innerText = cart.length;
    cartTotalPrice.innerText = '$' + total.toFixed(2);
}

// تشغيل تحديث السلة أول ما الصفحة تفتح
document.addEventListener('DOMContentLoaded', updateCartUI);
