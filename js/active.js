// =========================================
// حساب الارتفاع الحقيقي للشاشة على الموبايل (--vh)
// المشكلة: على الموبايل، وحدة "vh" بتتحسب أحيانًا على أساس الشاشة كاملة من غير
// شريط العنوان (اللي بيظهر ويختفي وهو بتسكرول)، فده كان بيخلي الفيديو في الـ Hero
// ميغطيش الشاشة لحد الآخر ويسيب لون فاضي تحت. الكود ده بيحسب الارتفاع الحقيقي
// الظاهر فعليًا ويحدّثه كل ما الشاشة تتغير (تدوير الموبايل، أو ظهور/اختفاء شريط العنوان)
// =========================================
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
 
// تأثير الـ Navbar مع السكرول
const navbar = document.getElementById('navbar');
 
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled'); 
    } else {
        navbar.classList.remove('scrolled'); 
    }
});
 
// تعريف العناصر بتاعة القائمة الجانبية والزرار الجديد
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const exploreBtn = document.getElementById('explore-btn'); // ده الزرار بتاع Explore Collection
 
// دالة لفتح القائمة
function openSidebar() {
    sidebar.classList.add('active');
}
 
// دالة لقفل القائمة (اتعملت فانكشن منفصلة عشان نقدر نستخدمها في أكتر من مكان)
function closeSidebar() {
    sidebar.classList.remove('active');
}
 
// تشغيل القائمة لما ندوس على أيقونة المنيو اللي فوق
menuBtn.addEventListener('click', openSidebar);
 
// تشغيل القائمة لما ندوس على زرار Explore Collection في نص الشاشة
exploreBtn.addEventListener('click', (e) => {
    e.preventDefault(); // عشان نمنع الصفحة إنها تطلع لفوق أو تعمل ريفريش لما تدوس عليه
    openSidebar();
});
 
// قفل القائمة
closeBtn.addEventListener('click', closeSidebar);
 
// دعم لوحة المفاتيح لـ menu-btn و close-btn (مش زرارير <button> حقيقية، فبنضيفلهم Enter/Space يدويًا)
[menuBtn, closeBtn].forEach((el) => {
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
        }
    });
});
 
// قفل القائمة الجانبية لو دُست في أي مكان برة الصندوق نفسه (مفيد جدًا على الموبايل)
document.addEventListener('click', (e) => {
    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedMenuBtn = menuBtn.contains(e.target);
    const clickedExploreBtn = exploreBtn.contains(e.target);
 
    if (sidebar.classList.contains('active') && !clickedInsideSidebar && !clickedMenuBtn && !clickedExploreBtn) {
        closeSidebar();
    }
});
 
// قفل القائمة لو المستخدم دوس زرار Escape (تحسين بسيط لسهولة الاستخدام)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});
 
// =========================================
// أنيميشن ظهور المحتوى وإحنا بننزل لتحت (Reveal on Scroll)
// =========================================
const reveals = document.querySelectorAll('.reveal');
 
function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 120; // النقطة اللي بيبدأ يظهر عندها العنصر
 
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
 
// تشغيل الفانكشن مع السكرول
window.addEventListener('scroll', revealOnScroll);
 
// تشغيلها مرة واحدة أول ما الصفحة تفتح
revealOnScroll();

// =========================================================
// الضربة القاضية: حل مشكلة زرار التشغيل في وضع توفير الطاقة
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
    const bgVideo = document.querySelector('.video-bg');
    
    if (bgVideo) {
        // بنخلي الموقع يحاول يشغل الفيديو
        let playPromise = bgVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // لو الموبايل (سواء أندرويد أو آيفون) منع التشغيل بسبب توفير الطاقة
                // هنخفي عنصر الفيديو بالكامل من الصفحة
                // وبكده الزرار المستفز هيختفي، والصورة البديلة اللي حطيناها كخلفية في الـ CSS هتظهر
                bgVideo.style.display = 'none';
            });
        }
    }
});
