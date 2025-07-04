// Portfolio JavaScript - إيهاب حسين
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CTA Buttons functionality
    const viewWorkBtn = document.getElementById('viewWorkBtn');
    const contactBtn = document.getElementById('contactBtn');

    // Mobile optimizations
    const isMobile = window.innerWidth <= 768;

    // Adjust animations for mobile
    if (isMobile) {
        // Reduce animation intensity on mobile
        const codeElements = document.querySelectorAll('.code-element');
        codeElements.forEach(element => {
            element.style.animationDuration = '8s';
        });

        // Disable parallax on mobile for better performance
        window.removeEventListener('scroll', handleParallax);
    }

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;

                // Add click animation
                this.style.transform = 'translateX(-50%) scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'translateX(-50%) scale(1)';
                }, 150);

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });

        // Hide scroll indicator when scrolling down
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        mobileMenuBtn.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenuOverlay.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Handle mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                closeMobileMenu();

                setTimeout(() => {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Add click animation
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 5px 15px rgba(0, 212, 255, 0.6)';

            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.4)';
            }, 150);

            // Scroll to projects section
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 80;

                // Add visual feedback before scrolling
                setTimeout(() => {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Highlight projects section briefly
                    projectsSection.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%, rgba(0, 212, 255, 0.1) 100%)';
                    setTimeout(() => {
                        projectsSection.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
                    }, 2000);
                }, 300);
            }
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgb(10, 10, 10)';
            navbar.style.backdropFilter = 'blur(100px)';
            navbar.style.webkitBackdropFilter = 'blur(100px)';
            navbar.style.boxShadow = '0 6px 40px rgba(0, 0, 0, 0.95)';
            navbar.style.borderBottom = '2px solid rgba(0, 212, 255, 0.3)';
        } else {
            navbar.style.background = 'rgb(10, 10, 10)';
            navbar.style.backdropFilter = 'blur(50px)';
            navbar.style.webkitBackdropFilter = 'blur(50px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.8)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
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
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Animate stats when about section is visible
                if (entry.target.classList.contains('about')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.about, .skills, .projects, .contact');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe individual elements for staggered animations
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.2}s`;
        category.classList.add('slide-in-right');
        observer.observe(category);
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        card.classList.add('fade-in');
        observer.observe(card);
    });

    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.classList.add('slide-in-left');
        observer.observe(item);
    });

    // Parallax effect for floating code elements (disabled on mobile)
    function handleParallax() {
        if (window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            const codeElements = document.querySelectorAll('.code-element');

            codeElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
            });
        }
    }

    window.addEventListener('scroll', handleParallax);

    // Mouse movement parallax effect (disabled on mobile)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            const codeElements = document.querySelectorAll('.code-element');
            codeElements.forEach((element, index) => {
                const speed = (index + 1) * 0.02;
                const x = (mouseX - 0.5) * speed * 100;
                const y = (mouseY - 0.5) * speed * 100;

                element.style.transform += ` translate(${x}px, ${y}px)`;
            });
        });
    }

    // Touch events for mobile
    if (window.innerWidth <= 768) {
        // Add touch feedback for buttons
        const touchElements = document.querySelectorAll('.cta-button, .social-link, .contact-item');

        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Dynamic stars creation
    createDynamicStars();
    
    // Typing animation for code block
    animateCodeBlock();
    
    // Create floating particles occasionally
    setInterval(createFloatingParticle, 3000);
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 200);
    });
}

// Animate statistics numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const increment = finalValue / 50;
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            if (stat.textContent.includes('+')) {
                stat.textContent = Math.floor(currentValue) + '+';
            } else if (stat.textContent.includes('%')) {
                stat.textContent = Math.floor(currentValue) + '%';
            } else {
                stat.textContent = Math.floor(currentValue);
            }
        }, 50);
    });
}

// Create additional dynamic stars
function createDynamicStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 30;
    
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

// Animate code block with typing effect
function animateCodeBlock() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'typewriter 0.8s ease-in-out';
        }, index * 800);
    });
}

// Create floating particles
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #00d4ff, #ff00ff);
        border-radius: 50%;
        top: ${Math.random() * 100}vh;
        left: -10px;
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    `;
    
    document.body.appendChild(particle);
    
    // Animate particle across screen
    particle.animate([
        { transform: 'translateX(-10px) translateY(0px)', opacity: 0 },
        { transform: 'translateX(50px) translateY(-20px)', opacity: 1 },
        { transform: 'translateX(200px) translateY(-40px)', opacity: 1 },
        { transform: 'translateX(100vw) translateY(-80px)', opacity: 0 }
    ], {
        duration: 4000,
        easing: 'ease-out'
    }).onfinish = () => {
        document.body.removeChild(particle);
    };
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';

    // Add entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.animation = 'fadeInUp 1s ease-out';

    // Add special animation to profile image
    const profileImg = document.querySelector('.profile-img');
    const profileImage = document.querySelector('.profile-image');

    if (profileImg) {
        profileImg.style.opacity = '0';
        profileImg.style.transform = 'scale(0.8)';

        setTimeout(() => {
            profileImg.style.transition = 'all 0.8s ease-out';
            profileImg.style.opacity = '1';
            profileImg.style.transform = 'scale(1)';
        }, 500);
    }

    // Add click effect to profile image
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            // Create ripple effect
            createProfileRipple();

            // Add temporary extra glow
            this.style.filter = 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.8))';
            setTimeout(() => {
                this.style.filter = 'none';
            }, 1000);
        });
    }

    // Start periodic shooting stars
    setInterval(createShootingStar, 6000);
});

// Create shooting stars
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #00d4ff, #ffffff);
        border-radius: 50%;
        top: ${Math.random() * 30}%;
        left: -10px;
        z-index: 1000;
        box-shadow: 0 0 15px #00d4ff;
        pointer-events: none;
    `;
    
    document.body.appendChild(shootingStar);
    
    shootingStar.animate([
        { transform: 'translateX(-10px) translateY(0px)', opacity: 0 },
        { transform: 'translateX(100px) translateY(-30px)', opacity: 1 },
        { transform: 'translateX(300px) translateY(-60px)', opacity: 1 },
        { transform: 'translateX(100vw) translateY(-120px)', opacity: 0 }
    ], {
        duration: 2500,
        easing: 'ease-out'
    }).onfinish = () => {
        document.body.removeChild(shootingStar);
    };
}

// Add click effects to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button') || e.target.classList.contains('social-link') || e.target.closest('.cta-button')) {
        const button = e.target.classList.contains('cta-button') ? e.target : e.target.closest('.cta-button');
        createClickEffect(button, e.clientX, e.clientY);

        // Special effect for primary button
        if (button && button.classList.contains('primary')) {
            createButtonSparkles(button);
        }
    }
});

function createClickEffect(element, x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(0, 212, 255, 0.6);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;

    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    document.body.appendChild(ripple);

    setTimeout(() => {
        document.body.removeChild(ripple);
    }, 600);
}

// Create profile image ripple effect
function createProfileRipple() {
    const profileImage = document.querySelector('.profile-image');
    const rect = profileImage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create multiple ripples for better effect
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: fixed;
                width: 150px;
                height: 150px;
                border: 2px solid rgba(0, 212, 255, 0.6);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: profileRipple 1s ease-out forwards;
                pointer-events: none;
                z-index: 1000;
                background: transparent;
            `;

            ripple.style.left = centerX + 'px';
            ripple.style.top = centerY + 'px';

            document.body.appendChild(ripple);

            setTimeout(() => {
                document.body.removeChild(ripple);
            }, 1000);
        }, i * 200);
    }
}

// Create sparkles effect for primary button
function createButtonSparkles(button) {
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #00d4ff, #ffffff);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 6px rgba(0, 212, 255, 0.8);
            `;

            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + Math.random() * rect.height;
            const endX = startX + (Math.random() - 0.5) * 100;
            const endY = startY + (Math.random() - 0.5) * 100;

            sparkle.style.left = startX + 'px';
            sparkle.style.top = startY + 'px';

            document.body.appendChild(sparkle);

            sparkle.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(1)`, opacity: 1 },
                { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => {
                document.body.removeChild(sparkle);
            };
        }, i * 100);
    }
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }

    @keyframes profileRipple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
