// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CTA Button click animation and action
    const ctaButton = document.getElementById('bookTourBtn');
    
    ctaButton.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 150);

        // Show booking modal or redirect (for demo, we'll show an alert)
        setTimeout(() => {
            showBookingModal();
        }, 300);
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.destinations, .about, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Observe destination cards for staggered animation
    const cards = document.querySelectorAll('.destination-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        observer.observe(card);
    });

    // Parallax effect for floating planets
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const planets = document.querySelectorAll('.planet');
        
        planets.forEach((planet, index) => {
            const speed = 0.5 + (index * 0.2);
            planet.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Dynamic stars animation
    createDynamicStars();
    
    // Add mouse movement parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const planets = document.querySelectorAll('.planet');
        planets.forEach((planet, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            planet.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
});

// Create additional dynamic stars
function createDynamicStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 50;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'dynamic-star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
            animation-delay: ${Math.random() * 2}s;
        `;
        starsContainer.appendChild(star);
    }
}

// Booking modal function
function showBookingModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        padding: 3rem;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        border: 1px solid rgba(0, 212, 255, 0.3);
        box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    modalContent.innerHTML = `
        <h2 style="font-family: 'Orbitron', monospace; color: #00d4ff; margin-bottom: 1rem;">🚀 Ready for Launch!</h2>
        <p style="margin-bottom: 2rem; opacity: 0.9;">Thank you for your interest in NovaWay! Our space travel specialists will contact you within 24 hours to discuss your galactic adventure.</p>
        <button id="closeModal" style="
            background: linear-gradient(45deg, #00d4ff, #ff00ff);
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            color: white;
            font-family: 'Orbitron', monospace;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        ">Close</button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Animate modal in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close modal functionality
    const closeBtn = modalContent.querySelector('#closeModal');
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    function closeModal() {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Add some extra visual effects
window.addEventListener('load', function() {
    // Add loading animation completion
    document.body.style.opacity = '1';
    
    // Create shooting stars occasionally
    setInterval(createShootingStar, 8000);
});

function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #00d4ff, #ffffff);
        border-radius: 50%;
        top: ${Math.random() * 50}%;
        left: -10px;
        z-index: 1000;
        box-shadow: 0 0 10px #00d4ff;
    `;
    
    document.body.appendChild(shootingStar);
    
    // Animate shooting star
    shootingStar.animate([
        { transform: 'translateX(-10px) translateY(0px)', opacity: 0 },
        { transform: 'translateX(50px) translateY(-20px)', opacity: 1 },
        { transform: 'translateX(200px) translateY(-40px)', opacity: 1 },
        { transform: 'translateX(400px) translateY(-80px)', opacity: 0 }
    ], {
        duration: 2000,
        easing: 'ease-out'
    }).onfinish = () => {
        document.body.removeChild(shootingStar);
    };
}
