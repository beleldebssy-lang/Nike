console.log("Shirts page JS is ready and connected!");

// ==========================================
// برمجة سلة المشتريات (Shopping Cart)
// ==========================================

// استدعاء المنتجات من التخزين المحلي (عشان تبقى مربوطة بالصفحة الرئيسية)
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

// دالة إضافة منتج للسلة
window.addToCart = function(itemName, itemPrice, itemImg) {
    // إضافة المنتج للمصفوفة
    cart.push({ name: itemName, price: parseFloat(itemPrice), image: itemImg });
    
    // حفظ السلة في التخزين المحلي عشان يسمّع في باقي الموقع
    localStorage.setItem('nike_bluelock_cart', JSON.stringify(cart));
    
    // تحديث شكل السلة
    updateCartUI();
    
    // فتح السلة عشان العميل يشوف إنه اتضاف
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

// دالة تحديث شكل السلة والأرقام
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartBadge = document.getElementById('cart-badge');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (!cartItemsContainer || !cartBadge || !cartTotalPrice) return;

    // تفريغ السلة
    cartItemsContainer.innerHTML = '';
    let total = 0;

    // لو السلة فاضية
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty. Time to gear up!</p>';
        cartBadge.innerText = '0';
        cartTotalPrice.innerText = '$0.00';
        return;
    }

    // رسم المنتجات
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

    // تحديث الإجمالي والعداد
    cartBadge.innerText = cart.length;
    cartTotalPrice.innerText = '$' + total.toFixed(2);
}

// تشغيل تحديث السلة أول ما صفحة التيشيرتات تفتح
document.addEventListener('DOMContentLoaded', updateCartUI);
