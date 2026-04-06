// ==========================================
// VISION FINANCE - SCRIPT PRINCIPAL
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // TYPING EFFECT - HERO SECTION
    // ==========================================
    const words = ['CPF', 'CNPJ', 'Score', 'Crédito', 'Futuro'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing');
    
    function type() {
        if (!typingElement) return;
        
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
    
    // Iniciar typing effect
    type();
    
    
    // ==========================================
    // HEADER - SHOW/HIDE ON SCROLL
    // ==========================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Mostrar header após scroll de 100px
        if (currentScroll > 100) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ==========================================
    // INTERSECTION OBSERVER - SCROLL ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar contadores se houver dentro do elemento
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (target && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter, target);
                    }
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todos os elementos com animação
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Função para animar contadores
    function animateCounter(element, target) {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        function updateCounter() {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + (target > 100 ? '+' : '');
            }
        }
        
        updateCounter();
    }
    
    
    // ==========================================
    // FAQ - ACCORDION
    // ==========================================
    window.toggleFaq = function(button) {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        
        // Fechar todos os itens
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Abrir o clicado se não estava ativo
        if (!isActive) {
            item.classList.add('active');
        }
    };
    
    
    // ==========================================
    // SMOOTH SCROLL - ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Compensar header fixo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ==========================================
    // MOBILE MENU
    // ==========================================
    window.toggleMenu = function() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('mobile-open');
        
        // Alternar ícone
        const btn = document.querySelector('.mobile-menu-btn i');
        if (nav.classList.contains('mobile-open')) {
            btn.classList.remove('fa-bars');
            btn.classList.add('fa-times');
        } else {
            btn.classList.remove('fa-times');
            btn.classList.add('fa-bars');
        }
    };
    
    // Fechar menu ao clicar em link (mobile)
    document.querySelectorAll('.nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            nav.classList.remove('mobile-open');
            const btn = document.querySelector('.mobile-menu-btn i');
            if (btn) {
                btn.classList.remove('fa-times');
                btn.classList.add('fa-bars');
            }
        });
    });
    
    
    // ==========================================
    // BUTTON RIPPLE EFFECT
    // ==========================================
    document.querySelectorAll('.btn-primary, .btn-pricing, .nav-cta').forEach(button => {
        button.addEventListener('click', function(e) {
            // Não aplicar se for link externo (WhatsApp)
            if (this.getAttribute('target') === '_blank') return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Adicionar keyframe para ripple dinamicamente
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    
    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c Vision Finance ', 'background: linear-gradient(135deg, #0066cc, #00c853); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%cSite carregado com sucesso! 🚀', 'color: #00c853; font-size: 14px;');
    
});