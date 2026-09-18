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
// 2. حركة ظهور العناصر (Reveal Animation)
// ==========================================
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealElements);
document.addEventListener('DOMContentLoaded', revealElements);

// ==========================================
// 3. التفاعل مع حركة الماوس 3D (Interactive Card Only)
// ==========================================
const imageCard = document.querySelector('.image-card');

if (imageCard) {
    imageCard.addEventListener('mousemove', (e) => {
        const cardRect = imageCard.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        const moveX = (x - centerX) / 15;
        const moveY = (y - centerY) / 15;
        
        imageCard.style.transform = `translateY(-15px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });
    
    imageCard.addEventListener('mouseleave', () => {
        imageCard.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
}

// ==========================================
// 4. التبديل بين الوضع النهاري والليلي (Light/Dark Mode)
// ==========================================
function toggleTheme() {
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        if(sunIcon) sunIcon.style.display = 'block';
        if(moonIcon) moonIcon.style.display = 'none';
    } else {
        localStorage.setItem('theme', 'dark');
        if(sunIcon) sunIcon.style.display = 'none';
        if(moonIcon) moonIcon.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if(sunIcon) sunIcon.style.display = 'block';
        if(moonIcon) moonIcon.style.display = 'none';
    } else {
        body.classList.remove('light-mode');
        if(sunIcon) sunIcon.style.display = 'none';
        if(moonIcon) moonIcon.style.display = 'block';
    }
});

// ==========================================
// 5. حل مشكلة وضع توفير الطاقة (Low Power Mode) لفيديو المطور
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");
    videos.forEach(vid => {
        let playPromise = vid.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // الفيديو شغال تمام مفيش مشكلة
            }).catch(error => {
                // لو المتصفح وقف الفيديو عشان الموبايل على وضع توفير الطاقة
                const posterSrc = vid.getAttribute('poster');
                if (posterSrc) {
                    // بنعمل عنصر صورة جديد ونحط فيه مسار الـ poster
                    const fallbackImg = document.createElement('img');
                    fallbackImg.src = posterSrc;
                    fallbackImg.alt = "Profile Image";
                    
                    // بنحط الصورة مكان الفيديو بالظبط عشان تاخد نفس الـ CSS والـ Hover
                    vid.parentElement.appendChild(fallbackImg);
                }
                // بنمسح الفيديو خالص عشان نشيل علامة הـ Play المزعجة
                vid.remove(); 
            });
        }
    });
});
