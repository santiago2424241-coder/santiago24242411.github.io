// ===== main.js - CSL LOGISTICS ULTRA PRO v4.0 GOD MODE + GOOGLE SHEETS =====
const CONFIG = {
    particlesCount: 25, // REDUCIDO: de 80 a 25 (más ligero)
    animationSpeed: {
        typing: 50,
        ripple: 600,
        counter: 20,
        magnetic: 0.1,
        sectionReveal: 0.6,
        wave: 8,
        glowPulse: 2,
        truckMove: 2.8,
        smoke: 1.5,
        road: 1.3
    },
    effects: {
        parallax: true,
        tilt3D: true,
        particles: true,
        stats: true,
        typing: true,
        magneticButtons: true,
        cursorGlow: false,
        gradientWave: true,
        inputGlow: true,
        sectionLines: true,
        imageZoom: true,
        floatingIcons: true,
        scrollProgress: true,
        scrollToTop: true,
        preloaderTruck: false, // DESACTIVADO
        sectionReveal: true,
        cardPulse: true,
        navbarGlow: true,
        heroWave: true,
        statsGlow: true,
        formGlow: true,
        rippleGlow: true,
        parallaxLayers: true,
        floatingText: true,
        sectionBgReveal: true,
        card3D: true,
        magneticCards: true,
        advancedParticles: true,
        navbarWave: false,
        cardGlowHover: true,
        scrollGlow: true,
        buttonRippleGlow: true,
        tabWave: false,
        formRipple: true,
        iconPulse: true,
        sectionWave: false,
        preloaderWave: false, // DESACTIVADO
        cursorTrail: false,
        debug: true,
        googleMaps3D: true,
    }
};

// ===== UTILIDADES AVANZADAS =====
const Utils = {
    exists: (selector) => document.querySelector(selector) !== null,
    isMobile: () => window.innerWidth <= 768,
    isTablet: () => window.innerWidth <= 992,
    throttle: (func, delay) => {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) return;
            lastCall = now;
            return func(...args);
        }
    },
    debounce: (func, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        }
    },
    rafThrottle: (func) => {
        let running = false;
        return function(...args) {
            if (!running) {
                running = true;
                requestAnimationFrame(() => {
                    func.apply(this, args);
                    running = false;
                });
            }
        };
    },
    log: (msg, color = '#0d6efd') => {
        if (CONFIG.effects.debug) console.log(`%c${msg}`, `color: ${color}; font-weight: bold;`);
    }
};

// ===== NOTIFICACIONES PREMIUM CON GLOW =====
const Notificaciones = {
    init: function() {
        if (!document.getElementById('notificaciones-container')) {
            const container = document.createElement('div');
            container.id = 'notificaciones-container';
            container.style.cssText = `
                position: fixed; top: 80px; right: 20px; z-index: 9999; max-width: 400px;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    },
    mostrar: function(tipo, titulo, mensaje) {
        this.init();
        const iconos = { exito: 'Check', error: 'Cross', info: 'Info', advertencia: 'Warning' };
        const colores = { exito: '#198754', error: '#dc3545', info: '#0d6efd', advertencia: '#ffc107' };
        
        const notif = document.createElement('div');
        notif.className = 'notificacion-custom';
        notif.style.cssText = `
            background: linear-gradient(135deg, ${colores[tipo]} 0%, ${colores[tipo]}dd 100%);
            color: white; padding: 20px 25px; border-radius: 12px; margin-bottom: 15px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.2);
            display: flex; align-items: center; gap: 15px;
            animation: slideInGlow 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.3); pointer-events: auto;
            position: relative; overflow: hidden;
        `;
        
        notif.innerHTML = `
            <div class="notif-icon-glow" style="background: rgba(255,255,255,0.2); width: 40px; height: 40px; border-radius: 50%; 
                        display: flex; align-items: center; justify-content: center; font-size: 24px; 
                        font-weight: bold; flex-shrink: 0; position: relative; z-index: 2;">
                ${iconos[tipo]}
            </div>
            <div style="flex: 1; z-index: 2;"><strong style="display: block; font-size: 16px; margin-bottom: 5px;">${titulo}</strong>
            <span style="font-size: 14px; opacity: 0.95;">${mensaje}</span></div>
            <button class="notif-close" style="background: rgba(255,255,255,0.2); 
                    border: none; color: white; width: 28px; height: 28px; border-radius: 50%; 
                    cursor: pointer; font-size: 18px; display: flex; align-items: center; 
                    justify-content: center; flex-shrink: 0; transition: all 0.2s; z-index: 2;" 
                    onmouseover="this.style.background='rgba(255,255,255,0.4)'" 
                    onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
        `;
        
        notif.querySelector('.notif-close').onclick = () => notif.remove();
        
        if (!document.getElementById('notif-style')) {
            const style = document.createElement('style');
            style.id = 'notif-style';
            style.textContent = `
                @keyframes slideInGlow { 
                    0% { transform: translateX(400px) scale(0.8); opacity: 0; filter: blur(4px); }
                    100% { transform: translateX(0) scale(1); opacity: 1; filter: blur(0); }
                }
                .notificacion-custom:hover { 
                    transform: translateX(-5px) scale(1.02); 
                    box-shadow: 0 15px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,255,0.3);
                }
                .notif-icon-glow::before {
                    content: ''; position: absolute; inset: -10px; background: radial-gradient(circle, rgba(255,255,255,0.4), transparent);
                    border-radius: 50%; animation: pulseGlow 2s infinite; opacity: 0.6;
                }
                @keyframes pulseGlow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
            `;
            document.head.appendChild(style);
        }
        
        document.getElementById('notificaciones-container').appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideInGlow 0.4s reverse';
            setTimeout(() => notif.remove(), 400);
        }, 5000);
    },
    exito: function(t, m) { this.mostrar('exito', t, m); },
    error: function(t, m) { this.mostrar('error', t, m); },
    info: function(t, m) { this.mostrar('info', t, m); },
    advertencia: function(t, m) { this.mostrar('advertencia', t, m); }
};

// ===== ENVÍO A GOOGLE SHEETS (SIN RECARGA) - ARREGLADO =====
function initGoogleSheetsForm() {
    const form = document.querySelector('#contacto form, form[action*="script.google.com"]');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(() => {
            Notificaciones.exito('¡Mensaje Enviado!', 'Gracias, te contactaremos en breve.');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            Notificaciones.error('Error', 'No se pudo enviar. Intenta más tarde.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
        });
    });

    Utils.log('Formulario Google Sheets activado', '#0d6efd');
}

// ===== PRELOADER ELIMINADO (NO SE EJECUTA) =====
// La función sigue aquí para no romper referencias, pero no se llama
function initPreloaderLogistico() {
    // DESACTIVADO: No se ejecuta
}

// ===== PARTÍCULAS 3D AVANZADAS (REDUCIDAS) =====
function createParticles() {
    if (!CONFIG.effects.particles || !CONFIG.effects.advancedParticles) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: 1; overflow: hidden; perspective: 1000px;
    `;
    
    if (!document.querySelector('#particles-style')) {
        const style = document.createElement('style');
        style.id = 'particles-style';
        style.textContent = `
            @keyframes float3D {
                0%, 100% { transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg); opacity: 0.3; }
                25% { transform: translate3d(20px, -30px, 50px) rotateX(15deg) rotateY(10deg); opacity: 0.6; }
                50% { transform: translate3d(-20px, -50px, -30px) rotateX(-10deg) rotateY(-15deg); opacity: 0.8; }
                75% { transform: translate3d(25px, -25px, 40px) rotateX(20deg) rotateY(12deg); opacity: 0.5; }
            }
            @keyframes pulseParticle {
                0%, 100% { filter: brightness(1); }
                50% { filter: brightness(2) drop-shadow(0 0 10px #0d6efd); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.insertBefore(particlesContainer, document.body.firstChild);

    const particleCount = Utils.isMobile() ? 15 : CONFIG.particlesCount; // Móvil: 15, Desktop: 25
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        const depth = Math.random() * 500 - 250;
        
        particle.style.cssText = `
            position: absolute; width: ${size}px; height: ${size}px;
            background: rgba(13, 110, 253, ${Math.random() * 0.7 + 0.3});
            border-radius: 50%; left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
            animation: float3D ${duration}s infinite ease-in-out, pulseParticle 3s infinite;
            animation-delay: ${delay}s, ${delay * 0.3}s;
            box-shadow: 0 0 ${size * 3}px rgba(13, 110, 253, 0.6);
            transform: translateZ(${depth}px);
            will-change: transform, opacity, filter;
        `;
        particlesContainer.appendChild(particle);
    }
    
    Utils.log('Partículas 3D avanzadas creadas (25 máx)', '#0d6efd');
}

// ===== GOOGLE MAPS 3D OPTIMIZADO =====
function initGoogleMaps3D() {
    if (!CONFIG.effects.googleMaps3D || !Utils.exists('#map')) return;

    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    mapContainer.style.height = '500px';
    mapContainer.style.borderRadius = '16px';
    mapContainer.style.overflow = 'hidden';
    mapContainer.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
    mapContainer.style.transition = 'all 0.5s ease';

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&callback=initMap3D`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap3D = function() {
        const cslLocation = { lat: -12.0464, lng: -77.0428 };

        const map = new google.maps.Map(mapContainer, {
            center: cslLocation,
            zoom: 16,
            mapTypeId: 'roadmap',
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            styles: [
                { elementType: 'geometry', stylers: [{ color: '#0d1b2a' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#0d1b2a' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#0d6efd' }] },
                { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1e3a5f' }] },
                { featureType: 'water', stylers: [{ color: '#0a58ca' }] }
            ]
        });

        map.setTilt(45);
        map.setHeading(0);

        const marker = new google.maps.Marker({
            position: cslLocation,
            map: map,
            title: 'CSL Logistics',
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="18" fill="#0d6efd" stroke="#fff" stroke-width="3"/>
                        <circle cx="20" cy="20" r="10" fill="#fff"/>
                        <text x="20" y="25" font-family="Arial" font-size="16" fill="#0d6efd" text-anchor="middle">C</text>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40)
            },
            animation: google.maps.Animation.DROP
        });

        window.addEventListener('resize', () => {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(cslLocation);
        });

        const panorama = map.getStreetView();
        panorama.setPosition(cslLocation);
        panorama.setPov({ heading: 34, pitch: 10 });

        Utils.log('Google Maps 3D optimizado activado', '#0d6efd');
    };

    setTimeout(() => {
        if (!window.google?.maps) {
            mapContainer.innerHTML = `
                <div style="height:100%; display:flex; align-items:center; justify-content:center; color:#fff; background:#0d1b2a; font-family:Montserrat;">
                    <div style="text-align:center;">
                        <i class="bi bi-geo-alt-fill" style="font-size:48px; color:#0d6efd;"></i>
                        <h4 style="margin:20px 0 10px; color:#0d6efd;">CSL Logistics</h4>
                        <p>Lima, Perú</p>
                    </div>
                </div>
            `;
        }
    }, 8000);
}

// ===== ANIMACIÓN DE CAROUSEL OPTIMIZADA (SOLO APARICIÓN DE TEXTO) =====
function animateCarouselText() {
    if (!Utils.exists('#carouselE')) return;
    
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    // Configurar estado inicial de elementos
    carouselItems.forEach(item => {
        const h5 = item.querySelector('h5');
        const p = item.querySelector('p');
        const btn = item.querySelector('.btn');
        
        // Solo opacidad y desplazamiento simple
        if (h5) h5.style.cssText = `opacity: 0; transform: translateY(30px); transition: all 0.8s ease 0.2s;`;
        if (p) p.style.cssText = `opacity: 0; transform: translateY(30px); transition: all 0.8s ease 0.4s;`;
        if (btn) btn.style.cssText += `opacity: 0; transform: translateY(30px); transition: all 0.8s ease 0.6s;`;
        
        // ELIMINADO: transiciones pesadas en img
    });
    
    const carousel = document.querySelector('#carouselE');
    
    // Función simple para animar elementos
    const animateElements = (item) => {
        const h5 = item.querySelector('h5');
        const p = item.querySelector('p');
        const btn = item.querySelector('.btn');
        
        // Solo aparecer, sin efectos azules
        if (h5) h5.style.cssText += 'opacity: 1; transform: translateY(0);';
        if (p) p.style.cssText += 'opacity: 1; transform: translateY(0);';
        if (btn) btn.style.cssText += 'opacity: 1; transform: translateY(0);';
        
        // ELIMINADO: efectos en img con scale y blur
    };
    
    // Animar cuando cambia el slide
    carousel.addEventListener('slide.bs.carousel', function(e) {
        const next = e.relatedTarget;
        // ELIMINADO: efectos en imagen
        setTimeout(() => animateElements(next), 100);
    });
    
    // Animar el primer slide al cargar
    const firstItem = carousel.querySelector('.carousel-item.active');
    if (firstItem) {
        setTimeout(() => animateElements(firstItem), 500);
        // ELIMINADO: efectos en imagen
    }
    
    Utils.log('Animación de carousel OPTIMIZADA (solo texto)', '#0d6efd');
}

// ===== EFECTO RIPPLE GLOW =====
function createRippleEffect() {
    if (document.querySelector('#ripple-style')) return;
    
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
        @keyframes ripple-glow { 
            0% { transform: scale(0); opacity: 1; box-shadow: 0 0 0 0 rgba(13,110,253,0.7); }
            100% { transform: scale(4); opacity: 0; box-shadow: 0 0 0 20px rgba(13,110,253,0); }
        }
        .ripple-glow {
            position: absolute; border-radius: 50%; background: rgba(13,110,253,0.4);
            transform: scale(0); animation: ripple-glow 600ms ease-out; pointer-events: none;
            box-shadow: 0 0 20px rgba(13,110,253,0.8);
        }
    `;
    document.head.appendChild(style);
    
    document.querySelectorAll('.btn, .card, .nav-link, .form-control').forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-glow';
            ripple.style.cssText = `
                width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    Utils.log('Efecto ripple con glow activado', '#0d6efd');
}

// ===== CONTADORES CON SKELETON + GLOW =====
function createStatsCounter() {
    if (!CONFIG.effects.stats || Utils.exists('.stats-section')) return;
    
    const statsHTML = `
        <section class="stats-section section-padding" style="background: linear-gradient(135deg, #000000 0%, #0d1b2a 100%); position: relative; overflow: hidden;">
            <div class="container">
                <div class="row text-center">
                    <div class="col-md-3 col-6 mb-4"><div class="stat-item"><i class="bi bi-truck" style="font-size: 50px; color: #0d6efd;"></i><h2 class="counter text-white mt-3" data-target="500"><div class="skeleton-line"></div></h2><p class="text-white">Entregas Realizadas</p></div></div>
                    <div class="col-md-3 col-6 mb-4"><div class="stat-item"><i class="bi bi-people" style="font-size: 50px; color: #0d6efd;"></i><h2 class="counter text-white mt-3" data-target="150"><div class="skeleton-line"></div></h2><p class="text-white">Clientes Satisfechos</p></div></div>
                    <div class="col-md-3 col-6 mb-4"><div class="stat-item"><i class="bi bi-geo-alt" style="font-size: 50px; color: #0d6efd;"></i><h2 class="counter text-white mt-3" data-target="50"><div class="skeleton-line"></div></h2><p class="text-white">Ciudades Cubiertas</p></div></div>
                    <div class="col-md-3 col-6 mb-4"><div class="stat-item"><i class="bi bi-star-fill" style="font-size: 50px; color: #0d6efd;"></i><h2 class="counter text-white mt-3" data-target="98"><div class="skeleton-line"></div></h2><p class="text-white">% Satisfacción</p></div></div>
                </div>
            </div>
        </section>
    `;
    
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutSection.insertAdjacentHTML('afterend', statsHTML);
        
        const style = document.createElement('style');
        style.textContent = `
            .skeleton-line {
                width: 60px; height: 32px; background: #333; border-radius: 8px; margin: 0 auto;
                animation: pulse 1.5s infinite ease-in-out;
            }
            @keyframes pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }
            .stat-item i { animation: iconPulse 2s infinite; }
            @keyframes iconPulse {
                0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px #0d6efd); }
                50% { transform: scale(1.1); filter: drop-shadow(0 0 20px #0d6efd); }
            }
        `;
        document.head.appendChild(style);
        
        const counters = document.querySelectorAll('.counter');
        const statsSection = document.querySelector('.stats-section');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        const skeleton = counter.querySelector('.skeleton-line');
                        if (skeleton) skeleton.remove();
                        
                        const target = +counter.getAttribute('data-target');
                        const increment = target / 100;
                        let current = 0;
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.textContent = Math.ceil(current);
                                setTimeout(updateCounter, CONFIG.animationSpeed.counter);
                            } else {
                                counter.textContent = target;
                                counter.style.animation = 'glowText 2s infinite';
                            }
                        };
                        setTimeout(updateCounter, 300);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        if (statsSection) statsObserver.observe(statsSection);
        
        Utils.log('Contador de estadísticas con glow activado', '#0d6efd');
    }
}

// ===== TILT 3D AVANZADO EN CARDS =====
function add3DTiltEffect() {
    if (!CONFIG.effects.tilt3D || Utils.isMobile()) return;
    
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        card.style.willChange = 'transform';
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            this.style.boxShadow = '0 30px 60px rgba(0,0,0,0.4), 0 0 30px rgba(13,110,253,0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    });
    
    Utils.log('Efecto 3D Tilt avanzado activado', '#0d6efd');
}

// ===== TYPING EN LOGO CON GLOW =====
function addTypingEffect() {
    if (!CONFIG.effects.typing) return;
    
    const title = document.querySelector('.navbar-brand');
    if (!title) return;
    
    const originalText = title.innerHTML;
    title.innerHTML = '';
    title.style.opacity = '1';
    
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalText;
    
    const span = tempDiv.querySelector('span');
    const spanText = span ? span.textContent : '';
    const restText = tempDiv.textContent.replace(spanText, '');
    
    let i = 0;
    let fullText = spanText + restText;
    
    function type() {
        if (i < fullText.length) {
            if (i < spanText.length) {
                if (i === 0) title.innerHTML = '<span class="text-primary" style="animation: glowText 2s infinite;"></span>';
                title.querySelector('span').textContent += fullText.charAt(i);
            } else {
                title.innerHTML += fullText.charAt(i);
            }
            i++;
            setTimeout(type, CONFIG.animationSpeed.typing);
        }
    }
    
    setTimeout(type, 300);
    
    if (!document.getElementById('typing-style')) {
        const style = document.createElement('style');
        style.id = 'typing-style';
        style.textContent = `
            @keyframes glowText {
                0%, 100% { text-shadow: 0 0 10px #0d6efd; }
                50% { text-shadow: 0 0 30px #0d6efd, 0 0 50px #0d6efd; }
            }
        `;
        document.head.appendChild(style);
    }
    
    Utils.log('Efecto typing con glow activado', '#0d6efd');
}

// ===== PARALLAX EN CAROUSEL DESACTIVADO =====
function enhancedParallax() {
    // DESACTIVADO: Ya no afecta al carousel
    // Solo mantener el log para no romper referencias
    Utils.log('Parallax del carousel DESACTIVADO para mejor rendimiento', '#198754');
}

// ===== NAVBAR HOVER + GLOW =====
function enhanceNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const brand = document.querySelector('.navbar-brand');
    
    if (brand && CONFIG.effects.cursorGlow) {
        brand.style.transition = 'all 0.3s ease';
        brand.addEventListener('mouseenter', () => {
            brand.style.textShadow = '0 0 30px #0d6efd, 0 0 60px #0d6efd';
            brand.style.transform = 'scale(1.05)';
        });
        brand.addEventListener('mouseleave', () => {
            brand.style.textShadow = '';
            brand.style.transform = '';
        });
    }
    
    navLinks.forEach(link => {
        link.style.position = 'relative';
        const underline = document.createElement('span');
        underline.style.cssText = `position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background: #0d6efd; transition: all 0.3s ease; transform: translateX(-50%); box-shadow: 0 0 15px #0d6efd;`;
        link.appendChild(underline);
        
        link.addEventListener('mouseenter', () => {
            underline.style.width = '80%';
            link.style.color = '#0d6efd';
            link.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', () => {
            underline.style.width = '0';
            link.style.color = '';
            link.style.transform = '';
        });
    });
    
    Utils.log('Efectos de navbar con glow activados', '#0d6efd');
}

// ===== NAVBAR SCROLL EFECTO (ACTUALIZADO) =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = Utils.throttle(() => {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
    }, 10);

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    Utils.log('Efecto scroll navbar activado', '#0d6efd');
}

// ===== SMOOTH SCROLL + CIERRE NAVBAR EN MÓVIL (ACTUALIZADO) =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!' || !href.startsWith('#')) return;
            e.preventDefault();

            const collapse = document.querySelector('.navbar-collapse');
            if (collapse && collapse.classList.contains('show')) {
                new bootstrap.Collapse(collapse).hide();
            }

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    Utils.log('Smooth scroll + cierre navbar activado', '#0d6efd');
}

// ===== SCROLL REVEAL CON LÍNEAS =====
function initScrollReveal() {
    const elements = document.querySelectorAll('.card, .about-img, .section-header');
    
    elements.forEach(el => {
        if (el.classList.contains('section-header')) {
            const line = document.createElement('div');
            line.className = 'reveal-line';
            line.style.cssText = `
                position: absolute; bottom: -10px; left: 50%; width: 0; height: 3px;
                background: #0d6efd; transform: translateX(-50%); transition: width 0.8s ease;
                box-shadow: 0 0 15px #0d6efd;
            `;
            el.style.position = 'relative';
            el.appendChild(line);
        }
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.classList.contains('section-header')) {
                    const line = entry.target.querySelector('.reveal-line');
                    if (line) line.style.width = '80px';
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach(el => {
        el.classList.add('fade-out');
        revealObserver.observe(el);
    });
    
    Utils.log('Scroll reveal con líneas activado', '#0d6efd');
}

// ===== FORMULARIOS CON GLOW + RIPPLE =====
function initFormHandlers() {
    const formContacto = document.querySelector('#contacto form:not([id])');
    if (formContacto) {
        Utils.log('Formulario de contacto inicializado', '#0d6efd');
    }

    if (CONFIG.effects.inputGlow || CONFIG.effects.formRipple) {
        const inputs = document.querySelectorAll('input, textarea, .form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '0 0 0 4px rgba(13, 110, 253, 0.3), 0 0 20px rgba(13,110,253,0.5)';
                input.style.borderColor = '#0d6efd';
                input.style.transform = 'scale(1.02)';
            });
            input.addEventListener('blur', () => {
                input.style.boxShadow = '';
                input.style.borderColor = '';
                input.style.transform = '';
            });
        });
    }
}

// ===== TABS CLIENTE/PROVEEDOR =====
function initClienteProveedorTabs() {
    const tabs = document.querySelectorAll('#registroTabs .nav-link');
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault(); 
            e.stopPropagation();
            tabs.forEach(t => { 
                t.classList.remove('active'); 
                t.setAttribute('aria-selected', 'false'); 
            });
            this.classList.add('active'); 
            this.setAttribute('aria-selected', 'true');
            const targetId = this.getAttribute('data-bs-target');
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
            const targetPane = document.querySelector(targetId);
            if (targetPane) targetPane.classList.add('show', 'active');
        });
    });

    const firstTab = document.querySelector('#registroTabs .nav-link');
    const firstPane = document.querySelector('.tab-pane');
    if (firstTab && firstPane) {
        firstTab.classList.add('active'); 
        firstTab.setAttribute('aria-selected', 'true');
        firstPane.classList.add('show', 'active');
    }

    Utils.log('Tabs Cliente/Proveedor activados', '#0d6efd');
}

// ===== SCROLL PROGRESS BAR CON GLOW =====
function initScrollProgressBar() {
    if (document.getElementById('scroll-progress')) return;

    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.style.cssText = `
        position: fixed; top: 0; left: 0; width: 0%; height: 4px;
        background: linear-gradient(90deg, #0d6efd, #0a58ca);
        z-index: 9999; transition: width 0.1s ease;
        box-shadow: 0 0 20px rgba(13, 110, 253, 0.9);
        animation: progressPulse 2s infinite;
    `;
    document.body.appendChild(bar);

    const update = Utils.rafThrottle(() => {
        const scroll = window.pageYOffset;
        const height = document.body.scrollHeight - window.innerHeight;
        const percent = (scroll / height) * 100;
        bar.style.width = percent + '%';
    });

    window.addEventListener('scroll', update);
    update();

    if (!document.getElementById('progress-style')) {
        const style = document.createElement('style');
        style.id = 'progress-style';
        style.textContent = `
            @keyframes progressPulse {
                0%, 100% { box-shadow: 0 0 15px rgba(13,110,253,0.8); }
                50% { box-shadow: 0 0 30px rgba(13,110,253,1); }
            }
        `;
        document.head.appendChild(style);
    }

    Utils.log('Barra de progreso con glow activada', '#0d6efd');
}

// ===== CARDS DE SERVICIOS CON GLOW + 3D =====
function enhanceServiceCards() {
    const cards = document.querySelectorAll('.services .card');
    if (cards.length === 0) return;

    cards.forEach(card => {
        const icon = card.querySelector('i');
        const title = card.querySelector('h5');
        const img = card.querySelector('img');

        card.style.transition = 'all 0.4s ease';
        if (icon) icon.style.transition = 'all 0.6s ease';

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.05)';
            card.style.boxShadow = '0 30px 60px rgba(13, 110, 253, 0.5)';
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.5)';
                icon.style.filter = 'drop-shadow(0 0 20px #0d6efd)';
            }
            if (title) title.style.color = '#0d6efd';
            if (img && CONFIG.effects.imageZoom) {
                img.style.transform = 'scale(1.15)';
                img.style.transition = 'transform 0.6s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.filter = '';
            }
            if (title) title.style.color = '';
            if (img) img.style.transform = 'scale(1)';
        });
    });

    Utils.log('Hover effects con glow 3D activados', '#0d6efd');
}

// ===== ÍCONOS FLOTANTES 3D =====
function initFloatingIcons() {
    const servicesSection = document.querySelector('.services');
    if (!servicesSection || document.querySelector('.floating-icons-container')) return;

    const icons = [
        'bi-truck', 'bi-box-seam', 'bi-geo-alt', 'bi-clock-history',
        'bi-shield-check', 'bi-headset', 'bi-globe', 'bi-cpu'
    ];

    const container = document.createElement('div');
    container.className = 'floating-icons-container';
    container.style.cssText = `
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        pointer-events: none; overflow: hidden; z-index: 0; perspective: 1000px;
    `;
    servicesSection.style.position = 'relative';
    servicesSection.appendChild(container);

    const iconCount = Utils.isMobile() ? 6 : 12;

    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement('i');
        const iconClass = icons[Math.floor(Math.random() * icons.length)];
        const size = Math.random() * 35 + 25;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const depth = Math.random() * 300 - 150;

        icon.className = `bi ${iconClass} text-primary`;
        icon.style.cssText = `
            position: absolute; font-size: ${size}px; opacity: 0.15;
            left: ${left}%; top: ${top}%; 
            animation: floatIcon3D ${duration}s infinite ease-in-out;
            animation-delay: ${delay}s; 
            filter: drop-shadow(0 0 8px rgba(13, 110, 253, 0.5));
            pointer-events: none; transform: translateZ(${depth}px);
            will-change: transform, opacity;
        `;
        icon.style.setProperty('--delay', delay);
        container.appendChild(icon);
    }

    if (!document.getElementById('floating-icons-style')) {
        const style = document.createElement('style');
        style.id = 'floating-icons-style';
        style.textContent = `
            @keyframes floatIcon3D {
                0%, 100% { transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg); opacity: 0.1; }
                50% { transform: translate3d(30px, -40px, 100px) rotateX(20deg) rotateY(15deg); opacity: 0.25; }
            }
        `;
        document.head.appendChild(style);
    }

    Utils.log('Íconos flotantes 3D activados', '#0d6efd');
}

// ===== BOTONES MAGNÉTICOS 3D =====
function initMagneticButtons() {
    if (!CONFIG.effects.magneticButtons || Utils.isMobile()) return;

    document.querySelectorAll('.btn').forEach(btn => {
        btn.style.transition = 'transform 0.2s ease-out';
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    Utils.log('Botones magnéticos 3D activados', '#0d6efd');
}

// ===== ONDA DE GRADIENTE DESACTIVADA =====
function initGradientWave() {
    // DESACTIVADO: No aplicar efectos pesados al carousel
    Utils.log('Onda de gradiente del carousel DESACTIVADA', '#198754');
}

// ===== BOTÓN SCROLL TO TOP CON GLOW + RIPPLE =====
function initScrollToTop() {
    const btn = document.querySelector('.scroll-top-btn');
    if (!btn) return;

    btn.style.display = 'none';
    btn.style.transition = 'all 0.4s ease';

    const toggle = Utils.throttle(() => {
        btn.style.display = window.scrollY > 500 ? 'flex' : 'none';
        btn.style.opacity = window.scrollY > 500 ? '1' : '0';
        btn.style.transform = window.scrollY > 500 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)';
    }, 100);

    window.addEventListener('scroll', toggle);
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute; inset: 0; border-radius: 50%;
            background: rgba(255,255,255,0.4); transform: scale(0);
            animation: ripple-glow 0.6s ease-out;
        `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
    toggle();

    Utils.log('Botón scroll to top con glow activado', '#0d6efd');
}

// ===== EFECTOS POR SECCIÓN: REVEAL + BG + LÍNEA + PULSE =====
function initSectionReveal() {
    const sections = document.querySelectorAll('.section-padding, .about, .services, .flota, .contact');
    
    sections.forEach((section, index) => {
        const bgReveal = document.createElement('div');
        bgReveal.className = 'section-bg-reveal';
        bgReveal.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, rgba(13,110,253,0.08), transparent);
            opacity: 0; transform: scale(0.9); transition: all 1s ease;
            pointer-events: none; z-index: -1; border-radius: inherit;
        `;
        section.style.position = 'relative';
        section.style.overflow = 'hidden';
        section.appendChild(bgReveal);

        const sideLine = document.createElement('div');
        sideLine.className = 'section-side-line';
        sideLine.style.cssText = `
            position: absolute; top: 0; left: 0; width: 5px; height: 0;
            background: #0d6efd; transition: height 1.5s ease;
            box-shadow: 0 0 20px #0d6efd; z-index: 2;
        `;
        section.appendChild(sideLine);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bgReveal.style.opacity = '1';
                    bgReveal.style.transform = 'scale(1)';
                    sideLine.style.height = '100%';
                    
                    const title = section.querySelector('h2, h3');
                    if (title) {
                        title.style.animation = 'pulseGlow 2s infinite';
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(section);
    });

    if (!document.getElementById('section-reveal-style')) {
        const style = document.createElement('style');
        style.id = 'section-reveal-style';
        style.textContent = `
            @keyframes pulseGlow {
                0%, 100% { text-shadow: 0 0 15px #0d6efd; }
                50% { text-shadow: 0 0 40px #0d6efd, 0 0 60px #0d6efd; }
            }
        `;
        document.head.appendChild(style);
    }

    Utils.log('Efectos por sección activados', '#0d6efd');
}

// ===== CARDS 3D ULTRA FLUIDO (SOLO HOVER SUAVE - SIN MOUSEMOVE) =====
function initCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const parent = card.parentElement;
        if (parent && !parent.dataset.perspectiveSet) {
            parent.style.perspective = '1500px';
            parent.style.overflow = 'visible';
            parent.dataset.perspectiveSet = 'true';
        }
    });

    cards.forEach(card => {
        card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.transformStyle = 'preserve-3d';
        card.style.willChange = 'transform, box-shadow';

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) rotateX(8deg) rotateY(6deg) scale(1.03)';
            card.style.boxShadow = '0 35px 70px rgba(13,110,253,0.4), 0 0 30px rgba(13,110,253,0.3)';
            card.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            card.style.zIndex = '';
        });
    });

    if (!document.getElementById('card-effects-style')) {
        const style = document.createElement('style');
        style.id = 'card-effects-style';
        style.textContent = `
            @keyframes cardPulse {
                0%, 100% { box-shadow: 0 15px 30px rgba(13,110,253,0.3); }
                50% { box-shadow: 0 30px 60px rgba(13,110,253,0.5); }
            }
            .card:hover {
                animation: cardPulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    Utils.log('CARDS 3D: HOVER SUAVE (SIN MOUSEMOVE)', '#0d6efd');
}

// ===== NAVBAR GLOW AL MOVER MOUSE =====
function initNavbarGlow() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const glow = document.createElement('div');
    glow.className = 'navbar-glow';
    glow.style.cssText = `
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(13,110,253,0.2), transparent 70%);
        pointer-events: none; opacity: 0; transition: opacity 0.3s;
        z-index: -1; border-radius: inherit; filter: blur(20px);
    `;
    navbar.style.position = 'relative';
    navbar.appendChild(glow);

    navbar.addEventListener('mousemove', (e) => {
        const rect = navbar.getBoundingClientRect();
        glow.style.setProperty('--x', `${e.clientX - rect.left}px`);
        glow.style.setProperty('--y', `${e.clientY - rect.top}px`);
        glow.style.opacity = '1';
    });
    navbar.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    Utils.log('Navbar con glow activado', '#0d6efd');
}

// ===== INICIALIZAR TODO CON TRY/CATCH =====
function init() {
    Utils.log('%c CSL LOGISTICS ULTRA PRO v4.0 - INICIANDO...', '#0d6efd');

    try {
        // NO SE LLAMA AL PRELOADER

        setTimeout(() => {
            initNavbarScroll();
            initSmoothScroll();
            initScrollReveal();
            initFormHandlers();
            initClienteProveedorTabs();
            initScrollToTop();
            initSectionReveal();
            initCardEffects();
            initNavbarGlow();
            initGoogleMaps3D();
            initGoogleSheetsForm();

            createParticles();
            animateCarouselText();
            createRippleEffect();
            createStatsCounter();
            add3DTiltEffect();
            addTypingEffect();
            enhancedParallax();
            enhanceNavbar();
            initScrollProgressBar();
            enhanceServiceCards();
            initFloatingIcons();
            initMagneticButtons();
            initGradientWave();

            Utils.log('%c GOD MODE + GOOGLE SHEETS ACTIVADO', '#198754');
        }, 500);
    } catch (error) {
        console.error('Error crítico:', error);
        document.body.classList.add('loaded');
    }
}

// ===== EJECUTAR =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}