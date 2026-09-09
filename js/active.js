// =========================================
// حساب الارتفاع الحقيقي للشاشة على الموبايل (--vh)
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
const exploreBtn = document.getElementById('explore-btn');
 
function openSidebar() { sidebar.classList.add('active'); }
function closeSidebar() { sidebar.classList.remove('active'); }
 
menuBtn.addEventListener('click', openSidebar);
exploreBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    openSidebar();
});
closeBtn.addEventListener('click', closeSidebar);
 
[menuBtn, closeBtn].forEach((el) => {
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
        }
    });
});
 
// قفل القائمة لو المستخد داس بره
document.addEventListener('click', (e) => {
    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedMenuBtn = menuBtn.contains(e.target);
    const clickedExploreBtn = exploreBtn.contains(e.target);
 
    if (sidebar.classList.contains('active') && !clickedInsideSidebar && !clickedMenuBtn && !clickedExploreBtn) {
        closeSidebar();
    }
});
 
// قفل بـ Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});
 
// =========================================
// أنيميشن ظهور المحتوى (Reveal on Scroll)
// =========================================
const reveals = document.querySelectorAll('.reveal');
 
function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 120;
 
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// =========================================================
// الضربة القاضية: حل مشكلة زرار التشغيل في وضع توفير الطاقة
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
    const bgVideo = document.querySelector('.video-bg');
    
    if (bgVideo) {
        let playPromise = bgVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // لو الموبايل منع التشغيل بسبب توفير الطاقة، هنخفي الفيديو تماماً
                // بكده الزرار المستفز هيختفي، والصورة البديلة اللي حطيناها في الـ CSS هتظهر فوراً
                bgVideo.style.display = 'none';
            });
        }
    }
});evealOnScroll();
 
