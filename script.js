/* =========================================
   1. NAVIGATION & UI
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');
    
    // Toggle Mobile Menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

/* =========================================
   2. PORTFOLIO FILTERING
   ========================================= */

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        });
    });
});

/* =========================================
   3. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================= */

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Select elements to animate
const animatedElements = document.querySelectorAll('.service-card, .section-header, .timeline-item');

animatedElements.forEach(el => {
    // Set initial state via JS to ensure graceful degradation if JS fails
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

/* =========================================
   4. FORM HANDLING
   ========================================= */

const form = document.getElementById('projectForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = form.querySelector('button');
    const originalText = submitBtn.innerText;
    
    submitBtn.innerText = 'Sending...';
    submitBtn.style.opacity = '0.7';
    
    setTimeout(() => {
        submitBtn.innerText = 'Message Sent!';
        submitBtn.style.backgroundColor = 'var(--success)';
        submitBtn.style.color = '#fff';
        submitBtn.style.borderColor = 'var(--success)';
        
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerText = originalText;
            submitBtn.style.backgroundColor = 'var(--primary-color)';
            submitBtn.style.color = 'var(--black)';
            submitBtn.style.borderColor = 'transparent';
            submitBtn.style.opacity = '1';
        }, 3000);
    }, 1500);
});