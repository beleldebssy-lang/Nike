console.log("Boots page JS is ready and connected!");

// ==========================================
// برمجة سلة المشتريات (Shopping Cart)
// ==========================================

// 1. استدعاء المنتجات من التخزين المحلي (عشان تبقى مربوطة بالموقع كله)
let cart = JSON.parse(localStorage.getItem('nike_bluelock_cart')) || [];

// 2. دالة فتح وقفل السلة
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }
}

// 3. دالة إضافة منتج للسلة
window.addToCart = function(itemName, itemPrice, itemImg) {
    // إضافة المنتج للمصفوفة
    cart.push({ name: itemName, price: parseFloat(itemPrice), image: itemImg });
    
    // حفظ السلة في التخزين المحلي عشان يسمّع في باقي الموقع
    localStorage.setItem('nike_bluelock_cart', JSON.stringify(cart));
    
    // تحديث شكل السلة
    updateCartUI();
    
    // فتح السلة أوتوماتيك عشان العميل يشوف إنه اتضاف بنجاح
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && !cartSidebar.classList.contains('active')) {
        toggleCart();
    }
}

// 4. دالة مسح منتج من السلة
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    // تحديث التخزين المحلي بعد المسح
    localStorage.setItem('nike_bluelock_cart', JSON.stringify(cart));
    updateCartUI();
}

// 5. دالة تحديث شكل السلة والأرقام (العداد والإجمالي)
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartBadge = document.getElementById('cart-badge');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    // التأكد إن العناصر موجودة عشان ميعملش أي إيرور
    if (!cartItemsContainer || !cartBadge || !cartTotalPrice) return;

    // تفريغ السلة عشان نرسمها من جديد بالتحديثات
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

    // تحديث الإجمالي والعداد
    cartBadge.innerText = cart.length;
    cartTotalPrice.innerText = '$' + total.toFixed(2);
}

// 6. تشغيل تحديث السلة أول ما صفحة الكوتشيات تفتح
document.addEventListener('DOMContentLoaded', updateCartUI);
