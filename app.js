import * as THREE from 'three';

// --- MAIN INIT ---
document.addEventListener('DOMContentLoaded', () => {
    initHeroScene();
    initImpactScene();
    initSurfaceCodeDiagram();
    initTransformerDiagram();
    initPerformanceChart();
    initNavigation();
});

// --- NAVIGATION & SCROLL ---
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navTitle = document.getElementById('nav-title');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-[#F9F8F4]/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
            navbar.classList.remove('bg-transparent', 'py-6');
            navTitle.classList.remove('opacity-0');
        } else {
            navbar.classList.add('bg-transparent', 'py-6');
            navbar.classList.remove('bg-[#F9F8F4]/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
            if(window.innerWidth >= 768) {
                 navTitle.classList.remove('opacity-0');
            } else {
                 navTitle.classList.add('opacity-0');
            }
        }
    });

    // Mobile Menu Toggle
    let isMenuOpen = false;
    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            // small delay to allow display:flex to apply before opacity transition
            setTimeout(() => mobileMenu.classList.remove('opacity-0'), 10);
            iconMenu.classList.add('hidden');
            iconClose.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            iconMenu.classList.remove('hidden');
            iconClose.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            iconMenu.classList.remove('hidden');
            iconClose.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });

    // Smooth Scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// --- HERO SCENE (THREE.JS) ---
function initHeroScene() {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Objects
    // 1. Blue Sphere (Main Particle)
    const sphereGeo = new THREE.IcosahedronGeometry(1, 4); // higher detail
    const sphereMat = new THREE.MeshPhysicalMaterial({
        color: 0x4F46E5,
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        flatShading: true
    });
    const mainSphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(mainSphere);

    // 2. Gold Ring (Macroscopic Wave)
    const torusGeo = new THREE.TorusGeometry(3, 0.05, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
        color: 0xC5A059,
        emissive: 0xC5A059,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const ring = new THREE.Mesh(torusGeo, torusMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // 3. Floating Particles
    const p1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0x9333EA, roughness: 0.2 }));
    p1.position.set(-3, 1, -2);
    scene.add(p1);

    const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), new THREE.MeshStandardMaterial({ color: 0xC5A059, roughness: 0.2, metalness: 0.8 }));
    p2.position.set(3, -1, -3);
    scene.add(p2);

    // Animation Loop
    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Animate Main Sphere
        mainSphere.position.y = Math.sin(t * 1.5) * 0.2;
        mainSphere.rotation.x = t * 0.2;
        mainSphere.rotation.z = t * 0.1;
        
        // Slight scale pulse to simulate distortion
        const scale = 1 + Math.sin(t * 3) * 0.05;
        mainSphere.scale.set(scale, scale, scale);

        // Animate Ring
        ring.rotation.x = (Math.PI / 2) + Math.sin(t * 0.2) * 0.2;
        ring.rotation.y = t * 0.05;

        // Animate Particles
        p1.position.y = 1 + Math.sin(t * 2 - 3) * 0.3;
        p1.rotation.y += 0.01;
        
        p2.position.y = -1 + Math.sin(t * 2 + 3) * 0.3;
        p2.rotation.x += 0.01;

        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --- IMPACT SCENE (QUANTUM COMPUTER) ---
function initImpactScene() {
    const container = document.getElementById('impact-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F4F0); // Match container bg

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const spotLight = new THREE.SpotLight(0xC5A059, 2);
    spotLight.position.set(5, 5, 5);
    scene.add(spotLight);

    // Group for the Cryostat
    const cryostat = new THREE.Group();
    scene.add(cryostat);
    cryostat.position.y = 0.5;

    // Materials
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xC5A059, metalness: 1, roughness: 0.15 });
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xD1D5DB, metalness: 0.8, roughness: 0.2 });
    const copperMat = new THREE.MeshStandardMaterial({ color: 0xB87333, metalness: 0.8, roughness: 0.3 });

    // 1. Top Plate
    const topPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.1, 64), goldMat);
    topPlate.position.y = 1;
    cryostat.add(topPlate);

    // 2. Middle Stage
    const midPlate = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.1, 64), goldMat);
    midPlate.position.y = 0.2;
    cryostat.add(midPlate);

    // 3. Bottom Stage
    const botPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64), goldMat);
    botPlate.position.y = -0.6;
    cryostat.add(botPlate);

    // 4. Rods
    const rodPos = [[0.5, 0.6, 0], [-0.5, 0.6, 0], [0, 0.6, 0.5], [0, 0.6, -0.5]];
    rodPos.forEach(pos => {
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 16), silverMat);
        rod.position.set(...pos);
        cryostat.add(rod);
    });

    const lowRodPos = [[0.2, -0.2, 0], [-0.2, -0.2, 0]];
    lowRodPos.forEach(pos => {
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 16), silverMat);
        rod.position.set(...pos);
        cryostat.add(rod);
    });

    // 5. Coils
    const coil1 = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.015, 16, 64), copperMat);
    coil1.rotation.x = Math.PI/2;
    coil1.position.y = -0.2;
    cryostat.add(coil1);

    const coil2 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.015, 16, 64), copperMat);
    coil2.rotation.x = Math.PI/2;
    coil2.position.y = -1;
    cryostat.add(coil2);
    
    // Animation
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        
        cryostat.rotation.y = Math.sin(t * 0.2) * 0.1;
        cryostat.position.y = 0.5 + Math.sin(t * 0.5) * 0.05;
        
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --- SURFACE CODE DIAGRAM ---
function initSurfaceCodeDiagram() {
    const gridContainer = document.getElementById('surface-grid');
    const statusText = document.getElementById('surface-status');
    if (!gridContainer) return;

    // Grid Configuration
    // Qubits at roughly: (20%, 20%), (80%, 20%), (50%, 50%), (20%, 80%), (80%, 80%)
    const qubits = [
        {id: 0, x: 20, y: 20}, {id: 1, x: 80, y: 20},
        {id: 4, x: 50, y: 50}, // Center
        {id: 2, x: 20, y: 80}, {id: 3, x: 80, y: 80}
    ];

    // Stabilizers: Z (0, 3), X (1, 2)
    // Neighbors map: DataQubit ID -> Stabilizer ID list
    const stabilizers = [
        {id: 0, type: 'Z', x: 50, y: 20, color: 'bg-blue-500'},
        {id: 1, type: 'X', x: 20, y: 50, color: 'bg-red-500'},
        {id: 2, type: 'X', x: 80, y: 50, color: 'bg-red-500'},
        {id: 3, type: 'Z', x: 50, y: 80, color: 'bg-blue-500'}
    ];

    // Adjacency: Which stabilizers check which data qubits?
    const adjacency = {
        0: [0, 1],
        1: [0, 2],
        4: [0, 1, 2, 3], 
        2: [1, 3],
        3: [2, 3]
    };

    let activeErrors = new Set();

    // Render Grid Lines
    const lines = document.createElement('div');
    lines.className = "absolute inset-0 pointer-events-none flex items-center justify-center opacity-20";
    lines.innerHTML = `
        <div class="w-2/3 h-2/3 border border-stone-400"></div>
        <div class="absolute w-full h-[1px] bg-stone-400"></div>
        <div class="absolute h-full w-[1px] bg-stone-400"></div>
    `;
    gridContainer.appendChild(lines);

    // Render Stabilizers
    stabilizers.forEach(s => {
        const el = document.createElement('div');
        el.id = `stab-${s.id}`;
        el.className = `absolute w-10 h-10 -ml-5 -mt-5 flex items-center justify-center text-white text-xs font-bold rounded-sm shadow-sm transition-all duration-300 bg-stone-300 opacity-40`;
        el.style.left = s.x + '%';
        el.style.top = s.y + '%';
        el.innerText = s.type;
        gridContainer.appendChild(el);
    });

    // Render Data Qubits (Buttons)
    qubits.forEach(q => {
        const btn = document.createElement('button');
        btn.className = "absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 bg-white border-stone-300 hover:border-stone-500";
        btn.style.left = q.x + '%';
        btn.style.top = q.y + '%';
        btn.innerHTML = ''; // Start empty
        
        btn.addEventListener('click', () => {
            // Toggle Error
            if(activeErrors.has(q.id)) {
                activeErrors.delete(q.id);
                btn.className = "absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 bg-white border-stone-300 hover:border-stone-500";
                btn.innerHTML = '';
            } else {
                activeErrors.add(q.id);
                btn.className = "absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 bg-stone-800 border-stone-900 text-nobel-gold";
                // Activity icon
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;
            }
            updateSystemState();
        });

        gridContainer.appendChild(btn);
    });

    function updateSystemState() {
        // Calculate parity
        const stabCounts = {0: 0, 1: 0, 2: 0, 3: 0};
        activeErrors.forEach(errId => {
            const checks = adjacency[errId];
            if(checks) checks.forEach(sId => stabCounts[sId]++);
        });

        let activeStabilizerCount = 0;
        stabilizers.forEach(s => {
            const el = document.getElementById(`stab-${s.id}`);
            if(stabCounts[s.id] % 2 !== 0) {
                // Odd errors = Detection
                el.className = `absolute w-10 h-10 -ml-5 -mt-5 flex items-center justify-center text-white text-xs font-bold rounded-sm shadow-sm transition-all duration-300 ${s.color} opacity-100 scale-110 ring-4 ring-offset-2 ring-stone-200`;
                activeStabilizerCount++;
            } else {
                el.className = `absolute w-10 h-10 -ml-5 -mt-5 flex items-center justify-center text-white text-xs font-bold rounded-sm shadow-sm transition-all duration-300 bg-stone-300 opacity-40`;
            }
        });

        if (activeErrors.size === 0) {
            statusText.innerText = "System is stable.";
        } else {
            statusText.innerText = `Detected ${activeStabilizerCount} parity violations.`;
        }
    }
}

// --- TRANSFORMER DIAGRAM ---
function initTransformerDiagram() {
    const inputEl = document.getElementById('tf-input');
    const procEl = document.getElementById('tf-proc');
    const cpuIcon = document.getElementById('tf-cpu');
    const outEl = document.getElementById('tf-out');
    const outText = document.getElementById('tf-out-text');
    const arrow1 = document.getElementById('tf-arrow-1');
    const arrow2 = document.getElementById('tf-arrow-2');
    const gridEl = document.getElementById('tf-grid');
    const progressEl = document.getElementById('tf-progress');

    if (!inputEl) return;

    // Generate static grid dots
    for(let i=0; i<9; i++) {
        const dot = document.createElement('div');
        dot.className = "w-2 h-2 rounded-full bg-stone-300";
        dot.id = `tf-dot-${i}`;
        gridEl.appendChild(dot);
    }

    let step = 0;
    
    function updateStep() {
        // Reset state
        inputEl.className = "w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 border-stone-200 bg-stone-50";
        procEl.className = "w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden border-stone-200 bg-stone-50";
        outEl.className = "w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 border-stone-200 bg-stone-50";
        cpuIcon.className = "text-stone-300 transition-colors duration-300";
        arrow1.style.opacity = 0.3;
        arrow2.style.opacity = 0.3;
        arrow1.style.transform = 'translateX(-5px)';
        arrow2.style.transform = 'translateX(-5px)';
        outText.innerText = "?";
        outText.className = "text-2xl font-serif text-stone-300";

        // Progress Dots
        Array.from(progressEl.children).forEach((child, idx) => {
             child.className = `h-1 rounded-full transition-all duration-300 ${idx === step ? 'w-8 bg-nobel-gold' : 'w-2 bg-stone-300'}`;
        });

        // Step Logic
        if (step === 0) {
            // Input Active
            inputEl.className = "w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 border-nobel-gold bg-nobel-gold/10";
            // Randomize grid
            for(let i=0; i<9; i++) {
                document.getElementById(`tf-dot-${i}`).className = `w-2 h-2 rounded-full ${Math.random()>0.7 ? 'bg-stone-800' : 'bg-stone-300'}`;
            }
        } 
        else if (step >= 1) {
            arrow1.style.opacity = 1;
            arrow1.style.transform = 'translateX(0)';
            
            if (step === 1 || step === 2) {
                // Processing Active
                procEl.className = "w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden border-stone-800 bg-stone-900 text-white";
                cpuIcon.className = "text-nobel-gold animate-pulse";
            }
        }

        if (step === 3) {
            arrow2.style.opacity = 1;
            arrow2.style.transform = 'translateX(0)';
            outEl.className = "w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 border-green-500 bg-green-50";
            outText.innerText = "X";
            outText.className = "text-2xl font-serif text-green-600";
        }

        step = (step + 1) % 4;
    }

    setInterval(updateStep, 2000);
    updateStep();
}

// --- PERFORMANCE CHART ---
function initPerformanceChart() {
    const barMwpm = document.getElementById('bar-mwpm');
    const barAlpha = document.getElementById('bar-alpha');
    const valMwpm = document.getElementById('val-mwpm');
    const valAlpha = document.getElementById('val-alpha');
    const buttons = document.querySelectorAll('#perf-controls button');

    if (!barMwpm) return;

    // Data Config
    const data = {
        3: { mwpm: 3.5, alpha: 2.9 },
        5: { mwpm: 3.6, alpha: 2.75 },
        11: { mwpm: 0.0041, alpha: 0.0009 }
    };

    function updateChart(dist) {
        // Reset buttons
        buttons.forEach(btn => {
            if(parseInt(btn.dataset.dist) === dist) {
                btn.className = "px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border bg-nobel-gold text-stone-900 border-nobel-gold";
            } else {
                btn.className = "px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200";
            }
        });

        const current = data[dist];
        const maxVal = Math.max(current.mwpm, current.alpha) * 1.25;

        // Animate Height
        barMwpm.style.height = `${(current.mwpm / maxVal) * 100}%`;
        barAlpha.style.height = `${Math.max(1, (current.alpha / maxVal) * 100)}%`;

        // Update Text
        const fmt = (v) => v < 0.01 ? v.toFixed(4) + '%' : v.toFixed(2) + '%';
        valMwpm.innerText = fmt(current.mwpm);
        valAlpha.innerText = fmt(current.alpha);
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            updateChart(parseInt(btn.dataset.dist));
        });
    });
}