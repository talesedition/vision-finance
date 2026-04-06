// ========================================
// VISION FINANCE - JavaScript Completo
// ========================================

// Typing Animation
function initTypingAnimation() {
    const words = ['CPF', 'CNPJ', 'Score', 'Crédito', 'Futuro'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing');
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    if (typingElement) {
        type();
    }
}

// Number Counter Animation
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                function updateNumber(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function - easeOutQuart
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(countTo * easeOutQuart);
                    
                    target.textContent = current.toLocaleString('pt-BR');
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    } else {
                        target.textContent = countTo.toLocaleString('pt-BR');
                    }
                }
                
                requestAnimationFrame(updateNumber);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

// FAQ Accordion
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked if wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

function initFAQ() {
    // Close all on load
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Parallax Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            const circles = document.querySelectorAll('.hero-circle');
            circles.forEach((circle, index) => {
                const speed = 0.3 + (index * 0.1);
                circle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
}

// WhatsApp Tracking
function initWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Aqui você pode adicionar tracking do Google Analytics, Facebook Pixel, etc.
            console.log('WhatsApp clicado:', btn.href);
            
            // Exemplo de tracking:
            // gtag('event', 'conversion', {
            //     'send_to': 'AW-XXXXXXXX/XXXXXXXX',
            //     'value': 40.0,
            //     'currency': 'BRL'
            // });
        });
    });
}

// Urgency Counter Animation
function initUrgencyCounter() {
    const counter = document.querySelector('.urgency-counter strong');
    if (!counter) return;
    
    let count = 7;
    const minCount = 3;
    
    setInterval(() => {
        if (count > minCount && Math.random() > 0.7) {
            count--;
            counter.textContent = count + ' vagas';
            
            // Flash effect
            counter.style.color = '#fff';
            setTimeout(() => {
                counter.style.color = '';
            }, 300);
        }
    }, 15000); // Check every 15 seconds
}

// Initialize Everything
function init() {
    initTypingAnimation();
    animateNumbers();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initParallax();
    initWhatsAppTracking();
    initUrgencyCounter();
    
    console.log('Vision Finance website initialized successfully!');
}

// DOM Ready
document.addEventListener('DOMContentLoaded', init);

// Handle resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }
});

// Prevent console errors in production
window.onerror = function(msg, url, line) {
    console.log('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
    return false;
};