/**
 * NIKA // GEAR 5 CINEMATIC RUNTIME ENGINE
 * Premium Architecture - Production Quality - Zero Dependencies
 */

document.addEventListener("DOMContentLoaded", () => {
    const Engine = {
        init() {
            initLoader();
            initScrollEngine();
            initParallaxEngine();
            initRippleEffects();
            initCardGlowEffects();
            initAdvancedCanvasEngine();
            initAudioEngine();
        }
    };
    Engine.init();
});

// --- LOADER ---
function initLoader() {
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.transform = "scale(1.03)";
            setTimeout(() => loader.remove(), 600);
        }, 1000);
    });
}

// --- CORE SCROLL CONFIGURATIONS ---
function initScrollEngine() {
    const navbar = document.getElementById("navbar");
    const progress = document.getElementById("scrollProgress");
    const navLinks = document.querySelectorAll(".nav-link");
    const scrollSections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            progress.style.width = `${(window.pageYOffset / totalHeight) * 100}%`;
        }

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        let activeId = "";
        scrollSections.forEach(section => {
            const top = section.offsetTop - 180;
            if (window.scrollY >= top) {
                activeId = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${activeId}`) {
                link.classList.add("active");
            }
        });
    }, { passive: true });

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                if (entry.target.id === "stats") triggerCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal-on-scroll").forEach(el => scrollObserver.observe(el));
}

// --- STATS VALUE ANIMATION ---
function triggerCounters() {
    document.querySelectorAll(".counter-value").forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"));
        const prefix = counter.getAttribute("data-prefix") || "";
        const suffix = counter.getAttribute("data-suffix") || "";
        const totalFrames = 120; // 60fps * 2s
        let currentFrame = 0;

        const updateCount = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const easeValue = Math.round(target * (progress * (2 - progress))); // Ease out Quad
            
            counter.innerText = prefix + easeValue + suffix;

            if (currentFrame < totalFrames) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = prefix + target + suffix;
            }
        };
        requestAnimationFrame(updateCount);
    });
}

// --- INTERACTIVE PARALLAX ---
function initParallaxEngine() {
    const cursor = document.getElementById("customCursor");
    const elements = document.querySelectorAll(".parallax-element");

    window.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        elements.forEach(el => {
            const speed = parseFloat(el.getAttribute("data-speed")) || 1;
            const x = (window.innerWidth - e.clientX * speed) / 100;
            const y = (window.innerHeight - e.clientY * speed) / 100;
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }, { passive: true });
}

// --- COMPONENT INTERACTION MIXINS ---
function initRippleEffects() {
    document.querySelectorAll(".ripple-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 550);
        });
    });
}

function initCardGlowEffects() {
    document.querySelectorAll(".feature-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
            card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
        }, { passive: true });
    });
}

// --- PREMIUM PROCEDURAL WEB AUDIO SYNTHESIZER (DRUMS OF LIBERATION) ---
let audioCtx = null;
function initAudioEngine() {
    const toggle = document.getElementById("audioToggle");
    let playing = false;
    let intervalId = null;

    function playHeartbeat() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        const now = audioCtx.currentTime;
        // Double Thump Sequence Simulation (Drums of Liberation rhythm)
        triggerThump(now);
        triggerThump(now + 0.18);
    }

    function triggerThump(time) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(55, time); // Low sub bass thump
        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);
        
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + 0.3);
    }

    toggle.addEventListener("click", () => {
        if (!playing) {
            if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
            intervalId = setInterval(playHeartbeat, 650); // ~92 dynamic double thumps/min
            toggle.querySelector(".audio-icon").innerText = "🔇";
            playing = true;
        } else {
            clearInterval(intervalId);
            toggle.querySelector(".audio-icon").innerText = "🔊";
            playing = false;
        }
    });
}

// --- CANVAS GRAPHICS, SVG LIGHTNING, & PERFORMANCE OBJECT POOL ENGINE ---
function initAdvancedCanvasEngine() {
    const canvas = document.getElementById("revealCanvas");
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("revealContainer");
    const lightningPath = document.getElementById("lightningPath");
    const lightningSvg = document.getElementById("lightningSvg");

    let width, height;
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        // FIX: Replaced duplicate scaling memory leak with matrix transform reset
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let mouse = { x: width / 2, y: height / 2, active: false };
    let targetRevealRadius = 0;
    let currentRevealRadius = 0;
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    // PROCEDURAL ILLUSTRATION TEXTURES (No asset requests)
    const baseImg = document.createElement("canvas");
    const gear5Img = document.createElement("canvas");
    generateArtworkAssets(baseImg, gear5Img);

    // FIX: Highly Performant Object Pool Pattern Strategy
    const PARTICLE_POOL_MAX = 250;
    const particlePool = [];
    for(let i=0; i<PARTICLE_POOL_MAX; i++) {
        particlePool.push({ x: 0, y: 0, radius: 0, vx: 0, vy: 0, alpha: 0, decay: 0, color: '', active: false });
    }

    function spawnParticle(x, y, color) {
        const p = particlePool.find(item => !item.active);
        if (!p) return; // Pool completely saturated, safe ignore
        p.active = true;
        p.x = x + (Math.random() - 0.5) * 15;
        p.y = y + (Math.random() - 0.5) * 15;
        p.radius = Math.random() * 3.5 + 1.5;
        p.vx = (Math.random() - 0.5) * 2.5;
        p.vy = -Math.random() * 2 - 0.8;
        p.alpha = 1.0;
        p.decay = Math.random() * 0.02 + 0.015;
        p.color = color;
    }

    function triggerSvgLightning() {
        let pathStr = `M ${Math.random()*40 + 30} 0 `;
        let currX = Math.random()*40 + 30;
        let currY = 0;
        
        while(currY < 100) {
            currX += (Math.random() - 0.5) * 15;
            currY += Math.random() * 15 + 5;
            pathStr += `L ${currX} ${currY} `;
        }
        lightningPath.setAttribute("d", pathStr);
        lightningSvg.style.opacity = "0.85";
        
        setTimeout(() => { lightningSvg.style.opacity = "0"; }, 70);
        setTimeout(() => {
            lightningSvg.style.opacity = "0.4";
            setTimeout(() => { lightningSvg.style.opacity = "0"; }, 50);
        }, 120);
    }

    container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        if(mouse.active) {
            document.body.style.setProperty('--shake-intensity', `${(Math.random() - 0.5) * 2.5}px`);
        }
    }, { passive: true });

    container.addEventListener("mouseenter", () => {
        mouse.active = true;
        targetRevealRadius = Math.max(width, height) * 0.38;
        triggerSvgLightning();
    });

    container.addEventListener("mouseleave", () => {
        mouse.active = false;
        targetRevealRadius = 0;
        document.body.style.setProperty('--shake-intensity', '0px');
    });

    // Touch Support
    container.addEventListener("touchmove", (e) => {
        if(e.touches.length > 0) {
            mouse.active = true;
            targetRevealRadius = Math.max(width, height) * 0.42;
            const rect = container.getBoundingClientRect();
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
        }
    }, { passive: true });

    container.addEventListener("touchend", () => { mouse.active = false; targetRevealRadius = 0; });

    // Render Pipeline Loop
    function renderLoop() {
        ctx.clearRect(0, 0, width, height);

        // Render Base Layer Artwork
        ctx.drawImage(baseImg, 0, 0, width, height);

        currentRevealRadius = lerp(currentRevealRadius, targetRevealRadius, 0.12);

        if (currentRevealRadius > 1) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, currentRevealRadius, 0, Math.PI * 2);
            ctx.clip();

            // Render Awakened Face Layer Artwork
            ctx.drawImage(gear5Img, 0, 0, width, height);
            ctx.restore();

            // Premium Aura Edge Glowing Ring
            ctx.save();
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, currentRevealRadius, 0, Math.PI * 2);
            ctx.lineWidth = 3.5;
            ctx.strokeStyle = "rgba(255,255,255,0.95)";
            ctx.shadowBlur = 18;
            ctx.shadowColor = "#9d4edd";
            ctx.stroke();
            ctx.restore();

            if (mouse.active && Math.random() > 0.15) {
                const angle = Math.random() * Math.PI * 2;
                const px = mouse.x + Math.cos(angle) * currentRevealRadius;
                const py = mouse.y + Math.sin(angle) * currentRevealRadius;
                spawnParticle(px, py, Math.random() > 0.35 ? '#ffffff' : '#9d4edd');
            }
        }

        // Particle System Processing over Object Pool
        particlePool.forEach(p => {
            if (!p.active) return;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;
            
            if(p.alpha <= 0) {
                p.active = false;
            } else {
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        });

        requestAnimationFrame(renderLoop);
    }

    // ADVANCED PROCEDURAL PREMIUM VECTOR LAYER DESIGN
    function generateArtworkAssets(bCanvas, gCanvas) {
        const sz = 600;
        bCanvas.width = sz; bCanvas.height = sz;
        gCanvas.width = sz; gCanvas.height = sz;

        const bCtx = bCanvas.getContext("2d");
        const gCtx = gCanvas.getContext("2d");

        // 1. BASE CANVAS ARTWORK: Grim Silhouette & Crimson Aura Threads
        let bg1 = bCtx.createRadialGradient(sz/2, sz/2, 40, sz/2, sz/2, sz/2);
        bg1.addColorStop(0, '#140e22'); bg1.addColorStop(1, '#050309');
        bCtx.fillStyle = bg1; bCtx.fillRect(0,0,sz,sz);

        // Abstract straw hat shape vector sketch
        bCtx.fillStyle = "rgba(20, 15, 30, 0.7)";
        bCtx.beginPath();
        bCtx.arc(sz/2, sz/2 + 20, 140, 0, Math.PI, true);
        bCtx.fill();
        // Crimson eyes glow
        bCtx.fillStyle = "#ff0055";
        bCtx.shadowColor = "#ff0055"; bCtx.shadowBlur = 15;
        bCtx.beginPath();
        bCtx.arc(sz/2 - 45, sz/2 + 10, 8, 0, Math.PI*2);
        bCtx.arc(sz/2 + 45, sz/2 + 10, 8, 0, Math.PI*2);
        bCtx.fill();

        // 2. GEAR 5 ARTWORK: Sun God Divine Iconography (Face Contour & Clouds)
        bCtx.shadowBlur = 0; // Reset
        let bg2 = gCtx.createRadialGradient(sz/2, sz/2, 30, sz/2, sz/2, sz/2);
        bg2.addColorStop(0, '#ffffff'); bg2.addColorStop(0.3, '#f3ebff');
        bg2.addColorStop(0.8, '#5a189a'); bg2.addColorStop(1, '#0c051c');
        gCtx.fillStyle = bg2; gCtx.fillRect(0,0,sz,sz);

        // Sun Crest / Flame Halo Patterns behind head
        gCtx.fillStyle = "rgba(255, 255, 255, 0.25)";
        gCtx.shadowColor = "#ffffff"; gCtx.shadowBlur = 20;
        for(let i=0; i<8; i++) {
            gCtx.save();
            gCtx.translate(sz/2, sz/2);
            gCtx.rotate((Math.PI / 4) * i);
            gCtx.beginPath();
            gCtx.arc(0, -150, 45, 0, Math.PI * 2);
            gCtx.fill();
            gCtx.restore();
        }

        // Divine Joyous Closed-Eye Arc & Iconic Grin Outline
        gCtx.strokeStyle = "#3c096c";
        gCtx.lineWidth = 6;
        gCtx.lineCap = "round";
        gCtx.shadowBlur = 0;

        // Left eye loop
        gCtx.beginPath(); gCtx.arc(sz/2 - 50, sz/2 - 10, 20, 0, Math.PI, true); gCtx.stroke();
        // Right eye loop
        gCtx.beginPath(); gCtx.arc(sz/2 + 50, sz/2 - 10, 20, 0, Math.PI, true); gCtx.stroke();
        // Dynamic Nika Grin
        gCtx.beginPath();
        gCtx.arc(sz/2, sz/2 + 30, 40, 0, Math.PI, false);
        gCtx.closePath();
        gCtx.fillStyle = "#ffffff";
        gCtx.fill();
        gCtx.stroke();
    }

    setTimeout(renderLoop, 400);
}
