// Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Reveal animations on scroll
const revealOnScroll = () => {
    const cards = document.querySelectorAll('.stat-card, .feature-card, .version-card, .carousel-wrapper');
    const windowHeight = window.innerHeight;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initial card styles for animation
document.querySelectorAll('.stat-card, .feature-card, .version-card, .carousel-wrapper').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(13, 13, 13, 0.95)';
        header.style.padding = '15px 0';
    } else {
        header.style.background = 'rgba(13, 13, 13, 0.8)';
        header.style.padding = '20px 0';
    }
});

// Carousel Logic
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dotsContainer = document.getElementById('dotsContainer');

if (track && slides.length > 0) {
    let currentSlideIndex = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.dot'));

    const updateDots = (index) => {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    };

    const moveToSlide = (index) => {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        track.style.transform = `translateX(-${index * 100}%)`;
        currentSlideIndex = index;
        updateDots(index);
    };

    nextBtn.addEventListener('click', () => moveToSlide(currentSlideIndex + 1));
    prevBtn.addEventListener('click', () => moveToSlide(currentSlideIndex - 1));

    // Auto slide
    setInterval(() => {
        moveToSlide(currentSlideIndex + 1);
    }, 5000);
}
