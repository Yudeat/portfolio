// Portfolio Website Main JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupHeroEffects();
        this.setupProjectCards();
        this.setupSkillCounters();
        this.setupContactForm();
        this.setupProjectFilters();
    }

    logIn() {
        this.showModal('login');
    }   
    
    logOut() {
        this.showModal('logout');
    }   
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });
    }
    
    closeModal(modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    // Navigation System
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
            
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('skill-counter')) {
                        this.animateCounter(entry.target);
                    }
                    
                    if (entry.target.classList.contains('stagger-children')) {
                        this.staggerChildren(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.animate-on-scroll, .skill-counter, .stagger-children').forEach(el => {
            observer.observe(el);
        });
    }

    // Hero background effects
    setupHeroEffects() {
        const heroCanvas = document.getElementById('hero-canvas');
        if (!heroCanvas) return;

        // Simple particle system using canvas
        const ctx = heroCanvas.getContext('2d');
        const particles = [];
        const particleCount = 50;

        function resizeCanvas() {
            heroCanvas.width = window.innerWidth;
            heroCanvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * heroCanvas.width,
                y: Math.random() * heroCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1
            };
        }

        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        }

        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > heroCanvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > heroCanvas.height) particle.vy *= -1;
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 154, 122, ${particle.opacity})`;
                ctx.fill();
            });
        }

        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        a[0].addEventListener('click', function() {     
            resizeCanvas();
            initParticles();
            animate();
        });

    }

    // Project card interactions
    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: card,
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: 5,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: card,
                        scale: 1,
                        rotateX: 0,
                        rotateY: 0,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });

            // Click handler for project details
            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                if (projectId) {
                    this.showProjectDetails(projectId);
                }
            });
        });
    }

    // Animated counters for skills
    setupSkillCounters() {
        // This will be triggered by scroll animations
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Staggered animations for child elements
    staggerChildren(parent) {
        const children = parent.children;
        if (typeof anime !== 'undefined') {
            anime({
                targets: children,
                opacity: [0, 1],
                translateY: [30, 0],
                delay: anime.stagger(100),
                duration: 600,
                easing: 'easeOutCubic'
            });
        }
    }

    // Contact form handling
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                this.showSuccessMessage();
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isValid = value.length > 0;
        
        field.classList.toggle('valid', isValid);
        field.classList.toggle('invalid', !isValid);
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="success-content">
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
            </div>
        `;
        
        document.body.appendChild(message);
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: message,
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 400,
                easing: 'easeOutCubic',
                complete: () => {
                    setTimeout(() => {
                        anime({
                            targets: message,
                            opacity: 0,
                            scale: 0.8,
                            duration: 400,
                            easing: 'easeInCubic',
                            complete: () => message.remove()
                        });
                    }, 3000);
                }
            });
        }
    }

    // Project filtering system
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    const shouldShow = filter === 'all' || category === filter;
                    
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: card,
                            opacity: shouldShow ? 1 : 0,
                            scale: shouldShow ? 1 : 0.8,
                            duration: 300,
                            easing: 'easeOutCubic',
                            complete: () => {
                                card.style.display = shouldShow ? 'block' : 'none';
                            }
                        });
                    } else {
                        card.style.display = shouldShow ? 'block' : 'none';
                    }
                });
            });
        });
    }

    // Show project details modal
    showProjectDetails(projectId) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="project-details">
                    <h2>Project Details</h2>
                    <p>This is where detailed project information would be displayed for project ${projectId}.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });
        
        // Animate modal in
        if (typeof anime !== 'undefined') {
            anime({
                targets: modal,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    }

    closeModal(modal) {
        if (typeof anime !== 'undefined') {
            anime({
                targets: modal,
                opacity: 0,
                duration: 300,
                easing: 'easeInCubic',
                complete: () => modal.remove()
            });
        } else {
            modal.remove();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Typewriter effect for hero text
function initTypewriter() {
    const element = document.querySelector('.typewriter');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Initialize typewriter when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initTypewriter, 1000);
});