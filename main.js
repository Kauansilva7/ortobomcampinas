// Modern Ortobom Scripts

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Logic
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    const toggleMenu = (active) => {
        mobileMenu.classList.toggle('active', active);
        body.style.overflow = active ? 'hidden' : '';
    };

    menuToggle?.addEventListener('click', () => toggleMenu(true));
    closeMenu?.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu?.classList.contains('active') && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // 2. Announcement Bar Carousel
    const promoItems = document.querySelectorAll('#promo-carousel span');
    let currentPromo = 0;

    if (promoItems.length > 1) {
        setInterval(() => {
            promoItems[currentPromo].style.display = 'none';
            currentPromo = (currentPromo + 1) % promoItems.length;
            promoItems[currentPromo].style.display = 'flex';
        }, 4000);
    }

    // 3. Scroll Header Effect
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Reveal Animation on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.animate-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        // Initial state for JS reveal if not using CSS animations only
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Add visible class styling
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-reveal.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
