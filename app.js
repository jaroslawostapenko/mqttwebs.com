import * as THREE from 'three';

/**
 * MqttWebs Core Application Logic
 * Architecture: Class-based modular design
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Modules
    new ThreeBackground();
    new NavigationController();
    new ScrollObserver();
    new CounterAnimation();
    new TypewriterEffect();
    new PortfolioFilter();
    new TestimonialSlider();
    new AccordionController();
    new ContactFormHandler();
    new ScrollProgress();
});

/* =========================================
   3D Background (Three.js)
   ========================================= */
class ThreeBackground {
    constructor() {
        this.container = document.getElementById('canvas-container');
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
        this.animate();
        this.addListeners();
    }

    init() {
        // Scene Setup
        this.scene = new THREE.Scene();
        // Fog for depth
        this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.002);

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 500;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Geometry (Particles)
        const geometry = new THREE.BufferGeometry();
        const particlesCount = 700;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Spread particles in a wide area
            posArray[i] = (Math.random() - 0.5) * 2000;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Material
        const material = new THREE.PointsMaterial({
            size: 2,
            color: 0x00f2ea,
            transparent: true,
            opacity: 0.8,
        });

        // Mesh
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);

        // Lines connecting particles (using LineSegments for performance)
        // Note: Real-time dynamic lines in ThreeJS can be heavy. 
        // We will stick to a static-ish geometry that rotates or use a simple line loop.
        // For 'mqtt' style connectivity, we can add a secondary object.
        
        const lineGeo = new THREE.BufferGeometry();
        // Creating a wireframe sphere to represent the "Web"
        const sphereGeo = new THREE.IcosahedronGeometry(300, 1);
        const wireframe = new THREE.WireframeGeometry(sphereGeo);
        
        this.webLines = new THREE.LineSegments(wireframe);
        this.webLines.material.depthTest = false;
        this.webLines.material.opacity = 0.15;
        this.webLines.material.transparent = true;
        this.webLines.material.color = new THREE.Color(0x0066ff);
        
        this.scene.add(this.webLines);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = Date.now() * 0.0005;

        // Rotate Particles
        this.particles.rotation.y = time * 0.1;
        this.particles.rotation.x = time * 0.05;

        // Rotate Web
        this.webLines.rotation.x = time * 0.05;
        this.webLines.rotation.y = time * 0.05;

        // Mouse Interaction Parallax
        this.camera.position.x += (this.mouseX * 10 - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouseY * 10 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }

    addListeners() {
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) - 0.5;
            this.mouseY = (event.clientY / window.innerHeight) - 0.5;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

/* =========================================
   Navigation Controller
   ========================================= */
class NavigationController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.mobileLinks = document.querySelectorAll('.mobile-link');
        this.isMenuOpen = false;

        this.init();
    }

    init() {
        // Sticky Header Logic
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('bg-mqtt-dark/90', 'backdrop-blur-lg', 'shadow-lg', 'border-white/5');
                this.navbar.classList.remove('border-transparent');
            } else {
                this.navbar.classList.remove('bg-mqtt-dark/90', 'backdrop-blur-lg', 'shadow-lg', 'border-white/5');
                this.navbar.classList.add('border-transparent');
            }
        });

        // Mobile Menu Toggle
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        
        // Close menu on link click
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(this.isMenuOpen) this.toggleMenu();
            });
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        if (this.isMenuOpen) {
            this.mobileMenu.classList.remove('translate-x-full');
            this.menuBtn.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
            document.body.style.overflow = 'hidden';
        } else {
            this.mobileMenu.classList.add('translate-x-full');
            this.menuBtn.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
            document.body.style.overflow = '';
        }
    }
}

/* =========================================
   Scroll Observer (Reveal Animation)
   ========================================= */
class ScrollObserver {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(el => observer.observe(el));
    }
}

/* =========================================
   Counter Animation
   ========================================= */
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.hasAnimated) {
                this.hasAnimated = true;
                this.counters.forEach(counter => {
                    this.animate(counter);
                });
            }
        }, { threshold: 0.5 });

        if(this.counters.length > 0) {
            observer.observe(this.counters[0].parentElement.parentElement);
        }
    }

    animate(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps

        let current = 0;
        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    }
}

/* =========================================
   Typewriter Effect
   ========================================= */
class TypewriterEffect {
    constructor() {
        this.element = document.getElementById('typewriter');
        this.words = ["Web Applications", "Custom Platforms", "Digital Experiences", "Future Tech"];
        this.wait = 2000;
        this.init();
    }

    init() {
        if(!this.element) return;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = this.txt;

        let typeSpeed = 100;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

/* =========================================
   Portfolio Filter
   ========================================= */
class PortfolioFilter {
    constructor() {
        this.buttons = document.querySelectorAll('.portfolio-filter');
        this.items = document.querySelectorAll('.portfolio-item');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                this.buttons.forEach(b => {
                    b.classList.remove('bg-mqtt-cyan', 'text-mqtt-dark', 'border-mqtt-cyan');
                    b.classList.add('border-white/20', 'text-white');
                });
                // Add active class
                btn.classList.remove('border-white/20', 'text-white');
                btn.classList.add('bg-mqtt-cyan', 'text-mqtt-dark', 'border-mqtt-cyan');

                const filter = btn.getAttribute('data-filter');
                this.filterItems(filter);
            });
        });
    }

    filterItems(filter) {
        this.items.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                // Trigger reflow for animation
                setTimeout(() => item.style.opacity = '1', 50);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    }
}

/* =========================================
   Testimonial Slider
   ========================================= */
class TestimonialSlider {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.testimonial-dot');
        this.current = 0;
        if(this.slides.length > 0) this.init();
    }

    init() {
        // Show first slide
        this.showSlide(0);

        // Interval
        setInterval(() => {
            this.nextSlide();
        }, 5000);

        // Click on dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showSlide(index);
                this.current = index;
            });
        });
    }

    showSlide(index) {
        this.slides.forEach(s => s.style.opacity = '0');
        this.dots.forEach(d => d.classList.remove('bg-mqtt-cyan'));
        
        this.slides[index].style.opacity = '1';
        this.dots[index].classList.add('bg-mqtt-cyan');
        this.dots[index].classList.remove('bg-white/20');
    }

    nextSlide() {
        this.current = (this.current + 1) % this.slides.length;
        this.showSlide(this.current);
    }
}

/* =========================================
   Accordion Controller
   ========================================= */
class AccordionController {
    constructor() {
        this.items = document.querySelectorAll('.faq-question');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                const answer = item.nextElementSibling;
                const icon = item.querySelector('svg');

                // Toggle
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    icon.classList.remove('rotate-180');
                } else {
                    // Close others
                    this.closeAll();
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    icon.classList.add('rotate-180');
                }
            });
        });
    }

    closeAll() {
        this.items.forEach(item => {
            item.nextElementSibling.style.maxHeight = null;
            item.querySelector('svg').classList.remove('rotate-180');
        });
    }
}

/* =========================================
   Contact Form Handler
   ========================================= */
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        if(this.form) this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulation of submission
            const btn = this.form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent!';
                btn.classList.remove('from-mqtt-blue', 'to-mqtt-cyan');
                btn.classList.add('bg-green-500', 'text-white');
                
                this.form.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.add('from-mqtt-blue', 'to-mqtt-cyan');
                    btn.classList.remove('bg-green-500', 'text-white');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

/* =========================================
   Scroll Progress Bar
   ========================================= */
class ScrollProgress {
    constructor() {
        this.bar = document.getElementById('scroll-progress');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            this.bar.style.width = scrolled + "%";
        });
    }
}
