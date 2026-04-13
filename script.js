// Navbar transparency on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.backdropFilter = 'blur(5px)';
    } else {
        navbar.style.backgroundColor = '#07111C';
    }
});

// Testimonial Slider JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot-Testimonial');
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;

        // Reset auto-play timer
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 8000);
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Start auto-play
    startAutoPlay();
});

// Text rotation with typing effect
document.addEventListener('DOMContentLoaded', function () {
    const texts = ['Graphics Designer1', 'UI/UX Designer2', 'Development3', 'Video Editing4'];
    const rotatingText = document.getElementById('rotating-text');
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseTime = 2000;

    function typeText() {
        const currentText = texts[currentIndex];
        
        if (!isDeleting) {
            // Typing
            rotatingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                // Finished typing, pause before deleting
                setTimeout(() => {
                    isDeleting = true;
                    typeText();
                }, pauseTime);
                return;
            }
        } else {
            // Deleting
            rotatingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                // Finished deleting, move to next text
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
            }
        }
        
        // Continue typing/deleting
        setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    }

    // Add cursor CSS
    const style = document.createElement('style');
    style.textContent = `
        #rotating-text {
            border-right: 3px solid #EAF900;
            animation: blink 0.7s infinite;
            display: inline-block;
        }
        
        @keyframes blink {
            0%, 50% { border-color: #EAF900; }
            51%, 100% { border-color: transparent; }
        }
    `;
    document.head.appendChild(style);

    // Start typing effect
    typeText();
});

 // Counter animation for experience numbers
        function animateCounter(element, target, duration = 2000, suffix = '') {
            let start = 0;
            const increment = target / (duration / 10); // 60fps
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + suffix;
                }
            }, 16);
        }

        // Skill percentage animation
        function animateSkillBar(percentageElement, progressBar, targetPercentage, duration = 2000) {
            let start = 0;
            const increment = targetPercentage / (duration / 6); // 60fps
            const timer = setInterval(() => {
                start += increment;
                if (start >= targetPercentage) {
                    percentageElement.textContent = targetPercentage + '%';
                    progressBar.style.width = targetPercentage + '%';
                    clearInterval(timer);
                } else {
                    percentageElement.textContent = Math.floor(start) + '%';
                    progressBar.style.width = Math.floor(start) + '%';
                }
            }, 16);
        }

        // Intersection Observer to trigger animation when section is visible
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '100px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate experience numbers
                    const numbers = entry.target.querySelectorAll('.exp-number');
                    numbers.forEach(num => {
                        const text = num.textContent;
                        const hasPlus = text.includes('+');
                        const target = parseInt(text.replace(/\D/g, ''));
                        const suffix = hasPlus ? '+' : '';

                        // Reset to 0 before animating
                        num.textContent = '0' + suffix;

                        // Start animation
                        setTimeout(() => {
                            animateCounter(num, target, 2000, suffix);
                        }, 200);
                    });

                    // Animate skill bars if this is skills section
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        const percentageElement = item.querySelector('.skill-percentage');
                        const progressBar = item.querySelector('.progress-fill');

                        if (percentageElement && progressBar) {
                            const text = percentageElement.textContent;
                            const targetPercentage = parseInt(text.replace('%', ''));

                            // Reset to 0 before animating
                            percentageElement.textContent = '10%';
                            progressBar.style.width = '10%';

                            // Start animation with staggered delay
                            setTimeout(() => {
                                animateSkillBar(percentageElement, progressBar, targetPercentage, 2000);
                            }, 200 + (index * 100)); // Stagger each skill by 100ms
                        }
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Start observing both sections
        document.addEventListener('DOMContentLoaded', () => {
            const expSection = document.querySelector('.experience-section');
            const skillsSection = document.querySelector('.skills-section');

            if (expSection) {
                observer.observe(expSection);
            }
            if (skillsSection) {
                observer.observe(skillsSection);
            }
        });

        // Active navbar link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        function activateNavLink() {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', activateNavLink);
        document.addEventListener('DOMContentLoaded', activateNavLink);

        // Close mobile navbar when scrolling
        window.addEventListener('scroll', function () {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const navbarToggler = document.querySelector('.navbar-toggler');

            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.add('collapsed');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });

        // Testimonial Slider Functionality
        class TestimonialSlider {
            constructor() {
                this.currentSlide = 0;
                this.slides = document.querySelectorAll('.testimonial-slide');
                this.dots = document.querySelectorAll('.dot-Testimonial');
                this.prevBtn = document.querySelector('.testimonial-prev');
                this.nextBtn = document.querySelector('.testimonial-next');
                this.wrapper = document.querySelector('.testimonial-wrapper');

                this.init();
            }

            init() {
                if (this.slides.length === 0) return;

                // Add event listeners
                this.prevBtn?.addEventListener('click', () => this.prevSlide());
                this.nextBtn?.addEventListener('click', () => this.nextSlide());

                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });

                // Auto-play functionality
                this.startAutoPlay();

                // Pause on hover
                const sliderContainer = document.querySelector('.testimonial-slider-container');
                sliderContainer?.addEventListener('mouseenter', () => this.stopAutoPlay());
                sliderContainer?.addEventListener('mouseleave', () => this.startAutoPlay());

                // Touch/swipe support
                this.initTouchSupport();
            }

            updateSlider() {
                // Update slides
                this.slides.forEach((slide, index) => {
                    slide.classList.remove('active', 'prev');
                    if (index === this.currentSlide) {
                        slide.classList.add('active');
                    } else if (index === this.getPrevIndex()) {
                        slide.classList.add('prev');
                    }
                });

                // Update dots
                this.dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentSlide);
                });

                // Update wrapper transform
                if (this.wrapper) {
                    this.wrapper.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                }
            }

            nextSlide() {
                this.currentSlide = this.getNextIndex();
                this.updateSlider();
            }

            prevSlide() {
                this.currentSlide = this.getPrevIndex();
                this.updateSlider();
            }

            goToSlide(index) {
                this.currentSlide = index;
                this.updateSlider();
            }

            getNextIndex() {
                return (this.currentSlide + 1) % this.slides.length;
            }

            getPrevIndex() {
                return (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            }

            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
            }

            stopAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                }
            }

            initTouchSupport() {
                let startX = 0;
                let endX = 0;
                const slider = document.querySelector('.testimonial-slider');

                if (!slider) return;

                slider.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });

                slider.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    this.handleSwipe();
                });

                this.handleSwipe = () => {
                    const swipeThreshold = 50;
                    const diff = startX - endX;

                    if (Math.abs(diff) > swipeThreshold) {
                        if (diff > 0) {
                            this.nextSlide(); // Swipe left, go to next
                        } else {
                            this.prevSlide(); // Swipe right, go to prev
                        }
                    }
                };
            }
        }

        // Initialize testimonial slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new TestimonialSlider();
        });


        // Portfolio

        function imgLoad(img, shimId) {
            img.classList.add('loaded');
            const sh = document.getElementById(shimId);
            if (sh) sh.classList.add('done');
        }

        // run on DOM ready too (cached images)
        document.querySelectorAll('.card-img').forEach((img, i) => {
            if (img.complete) imgLoad(img, 'sh' + (i + 1));
        });

        // Filter logic
        const btns = document.querySelectorAll('.fb');
        const cards = document.querySelectorAll('.card');

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const f = btn.dataset.f;

                cards.forEach((card, idx) => {
                    const match = f === 'all' || card.dataset.cat === f;
                    if (!match) {
                        card.classList.add('hiding');
                        card.classList.remove('showing');
                        setTimeout(() => {
                            card.style.display = 'none';
                            card.classList.remove('hiding');
                        }, 200);
                    } else {
                        card.style.display = '';
                        card.classList.remove('hiding');
                        void card.offsetWidth; // reflow
                        card.style.animationDelay = (idx * .06) + 's';
                        card.classList.add('showing');
                        setTimeout(() => card.classList.remove('showing'), 500);
                    }
                });
            });
        });

        // View All Projects button functionality
        const viewAllBtn = document.querySelector('.cta-btn');
        const allFilterBtn = document.querySelector('.fb[data-f="all"]');
        
        if (viewAllBtn && allFilterBtn) {
            viewAllBtn.addEventListener('click', () => {
                allFilterBtn.click();
            });
        }
