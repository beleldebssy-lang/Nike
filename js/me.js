// ==========================================
// 1. تأثير شريط التنقل (Navbar) مع السكرول
// ==========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
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
