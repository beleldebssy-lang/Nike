// ==========================================
// 1. تأثير شريط التنقل (Navbar) مع السكرول
// ==========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    // لو نزلنا أكتر من 50 بيكسل، هنضيف كلاس scrolled اللي بيعمل الشفافية والظل
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// 2. حركة ظهور العناصر (Reveal Animation)
// ==========================================
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 50; // المسافة اللي هيبدأ عندها الظهور

        // لو العنصر وصل للمسافة المطلوبة في الشاشة، هنضيف كلاس active
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// تشغيل دالة الظهور مع السكرول
window.addEventListener('scroll', revealElements);

// تشغيل الدالة أول ما الصفحة تحمل عشان الكارت يظهر فوراً لو هو ظاهر في الشاشة
document.addEventListener('DOMContentLoaded', revealElements);

// ==========================================
// 3. القائمة الجانبية للموبايل (لو ضفتها في المستقبل)
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

// الكود ده فيه أمان (if) عشان لو الزراير مش موجودة في صفحة المطور، ميعملش أي إيرور
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