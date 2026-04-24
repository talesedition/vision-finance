// Vision Finance - Script Completo
// Site de alta conversão com animações profissionais

document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
    animateNumbers();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initFaqAccordion();
    initMobileMenu();
    initExitIntent();
    initScrollProgress();
    initWhatsAppTracking();
    initLazyLoad();
    initScoreAnimation();
    initParallax();
});

// Animação de digitação no Hero
function initTypingAnimation() {
    const words = ['conquistar crédito', 'limpar seu nome', 'aumentar o score', 'regularizar dívidas'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing');
    
    if (!typingElement) return;
    
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
            typeSpeed = 3000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Animação de números contadores
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    
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

// Animação do velocímetro de score
function initScoreAnimation() {
    const speedometerSection = document.querySelector('.score-section');
    if (!speedometerSection) return;
    
    const needle = document.getElementById('needle');
    const scoreValue = document.getElementById('scoreValue');
    const phases = document.querySelectorAll('.score-phase');
    
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateSpeedometer();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(speedometerSection);
    
    function animateSpeedometer() {
        let score = 0;
        const targetScore = 850;
        const duration = 3000;
        const startTime = performance.now();
        
        // Animação da agulha e número
        function updateScore(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            score = Math.floor(targetScore * easeOutQuart);
            scoreValue.textContent = score;
            
            // Rotaciona a agulha de -90 a 90 graus
            const rotation = -90 + (180 * easeOutQuart);
            if (needle) {
                needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
            }
            
            // Atualiza fases ativas
            updatePhases(progress);
            
            if (progress < 1) {
                requestAnimationFrame(updateScore);
            }
        }
        
        requestAnimationFrame(updateScore);
    }
    
    function updatePhases(progress) {
        phases.forEach((phase, index) => {
            const threshold = (index + 1) / phases.length;
            if (progress >= threshold - 0.3) {
                phase.classList.add('active');
            } else {
                phase.classList.remove('active');
            }
        });
    }
}

// Scroll suave para âncoras
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile se aberto
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// Animações ao scroll (fade-in, slide-up)
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

// Header dinâmico com scroll
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Efeito de transparência/blur
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 30px rgba(0, 102, 255, 0.15)';
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Esconder/mostrar header ao rolar para baixo/cima
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const answer = otherItem.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = '0';
                    answer.style.paddingBottom = '0';
                }
            });
            
            // Abre o clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 24 + 'px';
                    answer.style.paddingBottom = '24px';
                }
            }
        });
    });
}

// Menu Mobile Toggle
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileBtn || !mobileMenu) return;
    
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Exit Intent Popup (quando usuário tenta sair)
function initExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseout', (e) => {
        if (e.clientY < 0 && !exitIntentShown && !localStorage.getItem('exitPopupShown')) {
            showExitPopup();
        }
    });
    
    // Também mostra após 60 segundos na página
    setTimeout(() => {
        if (!exitIntentShown && !localStorage.getItem('exitPopupShown')) {
            showExitPopup();
        }
    }, 60000);
    
    function showExitPopup() {
        exitIntentShown = true;
        localStorage.setItem('exitPopupShown', 'true');
        
        // Cria popup dinamicamente
        const popup = document.createElement('div');
        popup.id = 'exitPopup';
        popup.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            ">
                <div style="
                    background: linear-gradient(145deg, #1a1a1a 0%, #121212 100%);
                    border: 2px solid #00D26A;
                    border-radius: 24px;
                    padding: 40px;
                    max-width: 500px;
                    text-align: center;
                    position: relative;
                    animation: slideUp 0.3s ease;
                ">
                    <button onclick="this.closest('#exitPopup').remove()" style="
                        position: absolute;
                        top: 16px;
                        right: 16px;
                        background: none;
                        border: none;
                        color: #666;
                        font-size: 24px;
                        cursor: pointer;
                    ">×</button>
                    <i class="fas fa-gift" style="font-size: 48px; color: #00D26A; margin-bottom: 16px;"></i>
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 28px; color: white; margin-bottom: 16px;">
                        Espere! Não saia ainda
                    </h3>
                    <p style="color: rgba(255,255,255,0.8); margin-bottom: 24px; line-height: 1.6;">
                        Temos vagas disponíveis para atendimento imediato. Clique abaixo e fale conosco no WhatsApp agora mesmo!
                    </p>
                    <a href="https://chat.visionfinance.com.br" target="_blank" style="
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        background: linear-gradient(135deg, #00D26A 0%, #00A854 100%);
                        color: #0a0a0a;
                        padding: 16px 32px;
                        border-radius: 50px;
                        text-decoration: none;
                        font-weight: 700;
                        font-size: 16px;
                    ">
                        <i class="fab fa-whatsapp"></i>
                        Falar no WhatsApp Agora
                    </a>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Fecha ao clicar fora
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.remove();
            }
        });
    }
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0066FF, #00D26A);
        z-index: 10000;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Tracking de cliques no WhatsApp (conversão)
function initWhatsAppTracking() {
    const whatsappLinks = document.querySelectorAll('a[href*="chat.visionfinance.com.br"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Evento para analytics (Google Analytics, Facebook Pixel, etc)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-XXXXXXXXX/XXXXXXXX',
                    'value': 40.0,
                    'currency': 'BRL'
                });
            }
            
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact');
            }
            
            // Feedback visual
            showToast('Redirecionando para o WhatsApp...');
        });
    });
}

// Lazy Loading de imagens
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Parallax suave nos elementos
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-circle, .hero-grid');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #1a1a1a;
        border: 1px solid #0066FF;
        color: white;
        padding: 16px 24px;
        border-radius: 50px;
        font-size: 14px;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 102, 255, 0.3);
    `;
    toast.innerHTML = `<i class="fas fa-info-circle" style="color: #00D26A; margin-right: 8px;"></i> ${message}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Funções globais para uso inline no HTML
window.toggleFaq = function(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = '0';
            answer.style.paddingBottom = '0';
        }
    });
    
    if (!isActive) {
        faqItem.classList.add('active');
        const answer = faqItem.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 24 + 'px';
            answer.style.paddingBottom = '24px';
        }
    }
};

window.toggleMenu = function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
};

// Console branding
console.log('%c Vision Finance ', 'background: linear-gradient(135deg, #0066FF, #00D26A); color: white; font-size: 24px; font-weight: bold; border-radius: 8px;');
console.log('%c Especialistas em Regularização Financeira ', 'color: #0066FF; font-size: 14px;');