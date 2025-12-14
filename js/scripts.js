// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('ontec-dark-mode', isDarkMode);
});

// Check for saved theme preference
if (localStorage.getItem('ontec-dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').classList.remove('fa-times');
        mobileToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = {
        slides: document.querySelectorAll('.slide'),
        dots: document.querySelectorAll('.dot'),
        prevArrow: document.querySelector('.prev-arrow'),
        nextArrow: document.querySelector('.next-arrow'),
        toggleBtn: document.getElementById('sliderToggle'),
        currentSlide: 0,
        isPlaying: true,
        interval: 2000, // 5 seconds per slide
        timer: null,
        
        init: function() {
            this.startAutoPlay();
            this.setupEventListeners();
        },
        
        startAutoPlay: function() {
            this.timer = setInterval(() => {
                this.nextSlide();
            }, this.interval);
        },
        
        stopAutoPlay: function() {
            clearInterval(this.timer);
            this.isPlaying = false;
            if (this.toggleBtn) {
                this.toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        },
        
        resumeAutoPlay: function() {
            this.stopAutoPlay();
            this.timer = setInterval(() => {
                this.nextSlide();
            }, this.interval);
            this.isPlaying = true;
            if (this.toggleBtn) {
                this.toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        },
        
        toggleAutoPlay: function() {
            if (this.isPlaying) {
                this.stopAutoPlay();
            } else {
                this.resumeAutoPlay();
            }
        },
        
        nextSlide: function() {
            this.goToSlide((this.currentSlide + 1) % this.slides.length);
        },
        
        prevSlide: function() {
            this.goToSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length);
        },
        
        goToSlide: function(n) {
            // Remove active class from current slide and dot
            this.slides[this.currentSlide].classList.remove('active');
            this.dots[this.currentSlide].classList.remove('active');
            
            // Update current slide
            this.currentSlide = n;
            
            // Add active class to new slide and dot
            this.slides[this.currentSlide].classList.add('active');
            this.dots[this.currentSlide].classList.add('active');
            
            // Reset auto-play timer when manually changing slides
            if (this.isPlaying) {
                this.stopAutoPlay();
                this.resumeAutoPlay();
            }
        },
        
        setupEventListeners: function() {
            // Previous arrow click
            if (this.prevArrow) {
                this.prevArrow.addEventListener('click', () => {
                    this.prevSlide();
                });
            }
            
            // Next arrow click
            if (this.nextArrow) {
                this.nextArrow.addEventListener('click', () => {
                    this.nextSlide();
                });
            }
            
            // Dot navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                });
            });
            
            // Toggle button
            if (this.toggleBtn) {
                this.toggleBtn.addEventListener('click', () => {
                    this.toggleAutoPlay();
                });
            }
            
            // Pause on hover (optional)
            const sliderContainer = document.querySelector('.image-slider');
            sliderContainer.addEventListener('mouseenter', () => {
                if (this.isPlaying) {
                    this.stopAutoPlay();
                }
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                if (!this.isPlaying) {
                    this.resumeAutoPlay();
                }
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                } else if (e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    this.toggleAutoPlay();
                }
            });
            
            // Touch/swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
            
            // Handle swipe gesture
            this.handleSwipe = () => {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left - next slide
                        this.nextSlide();
                    } else {
                        // Swipe right - previous slide
                        this.prevSlide();
                    }
                }
            };
        }
    };
    
    // Initialize the slider
    slider.init();
});