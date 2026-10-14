/**
 * PORTFOLIO JAVASCRIPT - VAIBHAVI SHARAD PATIL
 * Modern, interactive, vanilla JavaScript implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dynamic Typing Effect for Hero Subtitle ---
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Computer Engineering Student",
        "Aspiring Software Developer",
        "Python & Web Developer",
        "Technology Learner"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause before deleting
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // --- 2. Dark / Light Theme Toggle with LocalStorage ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference - default to light
    const savedTheme = localStorage.getItem('vaibhavi_theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('vaibhavi_theme', targetTheme);
            showToast(`Switched to ${targetTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
        });
    }

    // --- 3. Sticky Navigation & Multi-Page Active Link ---
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Multi-page active highlight based on current pathname
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let matchedLink = false;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
            matchedLink = true;
        } else if (href && !href.startsWith('#') && !href.includes(currentPath)) {
            link.classList.remove('active');
        }
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Sticky Navbar styling
        if (scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Only do in-page scroll spy if not on multi-page subpages
        if (!matchedLink || currentPath === 'index.html' || currentPath === '') {
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 120;
                const sectionId = section.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${sectionId}` || link.getAttribute('href') === `index.html#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    });

    // --- 4. Mobile Hamburger Navigation Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // --- 5. Skills Category Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 6. Project Modal Details ---
    const projectDetailsData = {
        nursery: {
            title: "Nursery Plant Management System",
            category: "Full Stack Web Application",
            overview: "A Django-powered database web application developed to modernize nursery operations. It enables plant sellers and enthusiasts to maintain complete inventory records, track care guidelines, and access categorized plant details conveniently.",
            keyFeatures: [
                "Categorized flora database (indoor, outdoor, ornamental, medicinal).",
                "Real-time stock monitoring and price tracking.",
                "Admin dashboard with secure authentication for nursery managers.",
                "Responsive visitor catalog with instant search & filter options.",
                "Clean database models using Django ORM and SQLite3."
            ],
            techStack: ["Python", "Django", "SQLite3", "HTML5", "CSS3", "JavaScript"],
            githubUrl: "https://github.com/vaibhavi-dev01"
        },
        historical: {
            title: "Historical Places Recommendation System",
            category: "Smart Web Exploration Platform",
            overview: "A web platform dedicated to cultural tourism and heritage preservation. Designed to help tourists, students, and travelers discover remarkable historical places such as ancient forts, majestic palaces, sacred heritage sites, and prehistoric caves tailored to individual travel interests.",
            keyFeatures: [
                "Category-driven search by heritage type (Forts, Monuments, Palaces, Caves).",
                "Rich travel details: historical background, architectural era, visiting timings, and coordinates.",
                "Dynamic preference filtering to suggest relevant landmarks based on user interests.",
                "Clean UI with fast responses using Django backend queries.",
                "Scalable schema ready for AI/ML destination ranking integration."
            ],
            techStack: ["Python", "Django", "SQLite3", "HTML5", "CSS3", "JavaScript"],
            githubUrl: "https://github.com/vaibhavi-dev01"
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalBodyContent = document.getElementById('modal-body-content');
    const projectDetailButtons = document.querySelectorAll('.project-details-btn');

    function openProjectModal(projectKey) {
        const data = projectDetailsData[projectKey];
        if (!data || !modal || !modalBodyContent) return;

        modalBodyContent.innerHTML = `
            <div style="margin-bottom: 1.25rem;">
                <span class="tag" style="margin-bottom: 0.5rem; display: inline-block;">${data.category}</span>
                <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-top: 0.3rem;">${data.title}</h2>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--secondary); letter-spacing: 0.05em; margin-bottom: 0.4rem;">Project Overview</h4>
                <p style="color: var(--text-secondary); line-height: 1.65; font-size: 0.95rem;">${data.overview}</p>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--secondary); letter-spacing: 0.05em; margin-bottom: 0.6rem;">Key Highlights & Architecture</h4>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${data.keyFeatures.map(feat => `
                        <li style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9rem; color: var(--text-secondary);">
                            <i class="fa-solid fa-circle-check" style="color: var(--accent-emerald); margin-top: 0.25rem;"></i>
                            <span>${feat}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div style="margin-bottom: 2rem;">
                <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--secondary); letter-spacing: 0.05em; margin-bottom: 0.6rem;">Technologies Applied</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${data.techStack.map(tech => `
                        <span class="tag">${tech}</span>
                    `).join('')}
                </div>
            </div>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                    <i class="fa-brands fa-github"></i> View GitHub Repository
                </a>
                <button class="btn btn-ghost btn-sm close-modal-btn">
                    Close Window
                </button>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const dynamicClose = modalBodyContent.querySelector('.close-modal-btn');
        if (dynamicClose) {
            dynamicClose.addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    projectDetailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            openProjectModal(projectKey);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- 7. Resume Download & Direct Contact Handler ---
    const resumeBtn = document.getElementById('resume-download-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            showToast("Downloading Vaibhavi Patil's Resume PDF...", "success");
        });
    }

    // --- 8. Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('sender-name').value.trim();
            const email = document.getElementById('sender-email').value.trim();
            const subject = document.getElementById('sender-subject').value.trim() || 'Portfolio Inquiry';
            const message = document.getElementById('sender-message').value.trim();

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.textContent = 'Please fill out all required fields.';
                    formStatus.className = 'form-status error';
                }
                return;
            }

            // Button loading animation state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
            submitBtn.disabled = true;

            setTimeout(() => {
                // Open user's default email client prefilled with message details
                const mailtoLink = `mailto:vp388953@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent("Sender: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
                window.location.href = mailtoLink;

                if (formStatus) {
                    formStatus.textContent = `Thank you, ${name}! Your email to vp388953@gmail.com has been prepared. You can also connect directly via LinkedIn.`;
                    formStatus.className = 'form-status success';
                }

                showToast("Message prepared! Thank you for connecting.", "success");
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 900);
        });
    }

    // --- 9. Toast Notification Utility ---
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    let toastTimeout;

    function showToast(msg, type = 'info') {
        if (!toast || !toastMessage) return;

        clearTimeout(toastTimeout);

        toastMessage.textContent = msg;

        if (type === 'success') {
            toastIcon.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i>`;
        } else if (type === 'error') {
            toastIcon.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i>`;
        } else {
            toastIcon.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--secondary);"></i>`;
        }

        toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // --- 10. Update Current Year in Footer ---
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // =========================================================================
    // 11. INTERACTIVE AMBIENT PARTICLE CANVAS
    // =========================================================================
    function initParticleCanvas() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 22), 55);
        let mouseX = -1000;
        let mouseY = -1000;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction - gentle push
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * 1.5;
                    this.y -= Math.sin(angle) * 1.5;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(99, 102, 241, 0.45)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles with subtle lines
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.75;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }
    initParticleCanvas();

    // =========================================================================
    // 12. SCROLL REVEAL STAGGER ANIMATIONS
    // =========================================================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.section-header, .about-card, .pillar-card, .skill-card, .project-card, ' +
            '.timeline-item, .edu-card, .cert-item, .contact-info-panel, .contact-form-panel'
        );

        revealElements.forEach((el, index) => {
            el.classList.add('reveal');
            // Slight stagger delay based on sibling index
            const siblingIndex = Array.from(el.parentNode.children).indexOf(el);
            if (siblingIndex > 0) {
                el.style.transitionDelay = `${(siblingIndex % 4) * 0.1}s`;
            }
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
    initScrollReveal();

    // =========================================================================
    // 13. ANIMATED STAT COUNTERS
    // =========================================================================
    function initStatCounters() {
        const statElements = document.querySelectorAll('.stat-number[data-target]');
        if (!statElements.length) return;

        let hasAnimated = false;
        const statsContainer = document.querySelector('.hero-quick-stats');
        if (!statsContainer) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statElements.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-target'));
                    const suffix = stat.getAttribute('data-suffix') || '';
                    const isDecimal = target % 1 !== 0;
                    const duration = 1500;
                    const startTime = performance.now();

                    function updateNumber(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // EaseOutCubic
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const current = target * easeProgress;

                        if (isDecimal) {
                            stat.textContent = current.toFixed(1) + suffix;
                        } else {
                            stat.textContent = Math.floor(current) + suffix;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateNumber);
                        } else {
                            stat.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
                        }
                    }

                    requestAnimationFrame(updateNumber);
                });
            }
        }, { threshold: 0.5 });

        observer.observe(statsContainer);
    }
    initStatCounters();

    // =========================================================================
    // 14. INTERACTIVE 3D PERSPECTIVE CARD TILT
    // =========================================================================
    function init3DTilt() {
        if (window.innerWidth < 768) return; // Disable tilt on touch devices

        const tiltCards = document.querySelectorAll('.project-card, .edu-card, .internship-award-card, .hero-photo-card');

        tiltCards.forEach(card => {
            card.classList.add('card-tilt-active');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }
    init3DTilt();

    // =========================================================================
    // 15. INTERACTIVE TERMINAL CODE RUNNER
    // =========================================================================
    function initTerminalRunner() {
        const runBtn = document.getElementById('terminal-run-btn');
        const consoleOutput = document.getElementById('terminal-console-output');
        const consoleContent = document.getElementById('console-content');
        const consoleCloseBtn = document.getElementById('console-close-btn');

        if (!runBtn || !consoleOutput || !consoleContent) return;

        let isRunning = false;
        let isExecuted = false;

        runBtn.addEventListener('click', () => {
            if (isRunning) return;

            if (isExecuted) {
                // Reset state
                consoleOutput.classList.remove('active');
                consoleContent.innerHTML = '';
                runBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Run Code</span>`;
                runBtn.classList.remove('running');
                isExecuted = false;
                return;
            }

            isRunning = true;
            runBtn.classList.add('running');
            runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Running...</span>`;
            consoleOutput.classList.add('active');
            consoleContent.innerHTML = '';

            const logs = [
                { text: "> python developer_profile.py", class: "cmd", delay: 200 },
                { text: "[✓] Initializing developer_profile instance...", class: "success", delay: 450 },
                { text: "├── Name: Vaibhavi Sharad Patil (B.Tech Computer Engg)", class: "status", delay: 750 },
                { text: "├── 💼 Internships: SkillCraft Technology & Passion Software (2 Completed)", class: "status", delay: 1050 },
                { text: "├── 🏆 AWARD: 2nd Prize Winner in Project Competition!", class: "award", delay: 1350 },
                { text: "├── ⚡ CODECHEF: @vaibhavi_dev01 (235+ Solved | Silver League | 1003 DSA Rating)", class: "award", delay: 1600 },
                { text: "├── 🇮🇳 NATIONAL: Viksit Bharat Young Leaders Dialogue (VBYLD 2027)", class: "award", delay: 1850 },
                { text: "├── 🌐 COURSEWORK: Computer Networks, DBMS, DSA & OOP", class: "cert", delay: 2100 },
                { text: "└── 📬 Direct Email: vp388953@gmail.com", class: "success", delay: 2350 }
            ];

            logs.forEach(log => {
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.className = `output-line ${log.class}`;
                    line.textContent = log.text;
                    consoleContent.appendChild(line);
                }, log.delay);
            });

            setTimeout(() => {
                isRunning = false;
                isExecuted = true;
                runBtn.classList.remove('running');
                runBtn.innerHTML = `<i class="fa-solid fa-rotate-left"></i> <span>Reset</span>`;
                showToast("Script executed! Profile, internships, awards & CodeChef stats loaded. 🚀", "success");
            }, 2550);
        });

        if (consoleCloseBtn) {
            consoleCloseBtn.addEventListener('click', () => {
                consoleOutput.classList.remove('active');
                if (isExecuted) {
                    runBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Run Code</span>`;
                    isExecuted = false;
                }
            });
        }
    }
    initTerminalRunner();

    // =========================================================================
    // 16. STATIC ANIMATIVE PORTFOLIO CHATBOT ENGINE
    // =========================================================================
    function initChatbot() {
        const triggerBtn = document.getElementById('chatbot-trigger-btn');
        const panel = document.getElementById('chatbot-panel');
        const closeBtn = document.getElementById('chatbot-close-btn');
        const clearBtn = document.getElementById('chatbot-clear-btn');
        const soundToggle = document.getElementById('chatbot-sound-toggle');
        const bubbleHint = document.getElementById('bot-bubble-hint');
        const hintCloseBtn = document.getElementById('hint-close-btn');
        const messagesContainer = document.getElementById('chatbot-messages');
        const chatForm = document.getElementById('chatbot-form');
        const chatInput = document.getElementById('chatbot-input');
        const suggestionChips = document.querySelectorAll('.chat-chip');

        if (!triggerBtn || !panel || !messagesContainer) return;

        let soundEnabled = localStorage.getItem('vaibhavi_bot_sound') !== 'false';
        let isTyping = false;
        let audioCtx = null;

        // Sound Synthesizer via Web Audio API
        function playBotSound(type = 'receive') {
            if (!soundEnabled) return;
            try {
                if (!audioCtx) {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    if (AudioContext) audioCtx = new AudioContext();
                }
                if (!audioCtx) return;

                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }

                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);

                const now = audioCtx.currentTime;

                if (type === 'send') {
                    // Upward tone
                    osc.frequency.setValueAtTime(420, now);
                    osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                    osc.start(now);
                    osc.stop(now + 0.08);
                } else {
                    // Soft welcoming pop
                    osc.frequency.setValueAtTime(620, now);
                    osc.frequency.exponentialRampToValueAtTime(840, now + 0.12);
                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                    osc.start(now);
                    osc.stop(now + 0.12);
                }
            } catch (err) {
                // Audio gracefully optional
            }
        }

        // Sound toggle icon update
        function updateSoundIcon() {
            if (!soundToggle) return;
            if (soundEnabled) {
                soundToggle.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
                soundToggle.classList.remove('muted');
            } else {
                soundToggle.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
                soundToggle.classList.add('muted');
            }
        }
        updateSoundIcon();

        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                soundEnabled = !soundEnabled;
                localStorage.setItem('vaibhavi_bot_sound', soundEnabled);
                updateSoundIcon();
                showToast(soundEnabled ? "Chatbot sound enabled" : "Chatbot sound muted", "info");
            });
        }

        // Hint Bubble dismiss
        if (hintCloseBtn && bubbleHint) {
            hintCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                bubbleHint.style.display = 'none';
            });
        }

        // Toggle Chatbot Panel
        function toggleChatbot(open) {
            const shouldOpen = open !== undefined ? open : !panel.classList.contains('active');
            if (shouldOpen) {
                panel.classList.add('active');
                triggerBtn.classList.add('active');
                if (bubbleHint) bubbleHint.style.display = 'none';
                if (chatInput) chatInput.focus();

                // If chat is empty, send initial greeting
                if (messagesContainer.children.length === 0) {
                    sendBotWelcome();
                }
            } else {
                panel.classList.remove('active');
                triggerBtn.classList.remove('active');
            }
        }

        triggerBtn.addEventListener('click', () => toggleChatbot());
        if (closeBtn) closeBtn.addEventListener('click', () => toggleChatbot(false));

        // Format current time
        function getCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return `${hours}:${minutes} ${ampm}`;
        }

        // Append Message to UI
        function appendMessage(text, sender = 'bot') {
            const msgEl = document.createElement('div');
            msgEl.className = `chat-msg ${sender}-msg`;

            const avatarHtml = sender === 'bot'
                ? `<div class="msg-avatar"><i class="fa-solid fa-comment-dots"></i></div>`
                : `<div class="msg-avatar"><i class="fa-solid fa-user"></i></div>`;

            msgEl.innerHTML = `
                ${avatarHtml}
                <div class="msg-wrapper">
                    <div class="msg-content">${text}</div>
                    <span class="msg-time">${getCurrentTime()}</span>
                </div>
            `;

            messagesContainer.appendChild(msgEl);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            if (sender === 'bot') {
                playBotSound('receive');
            } else {
                playBotSound('send');
            }
        }

        // Show animated typing indicator
        function showTypingIndicator() {
            const typingEl = document.createElement('div');
            typingEl.className = 'chat-msg bot-msg';
            typingEl.id = 'bot-typing-indicator';
            typingEl.innerHTML = `
                <div class="msg-avatar"><i class="fa-solid fa-comment-dots"></i></div>
                <div class="typing-bubble">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            messagesContainer.appendChild(typingEl);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function removeTypingIndicator() {
            const typingEl = document.getElementById('bot-typing-indicator');
            if (typingEl) typingEl.remove();
        }

        // Bot Welcome Greeting
        function sendBotWelcome() {
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                appendMessage(
                    `👋 <strong>Hello! I'm Vaibhavi's AI Portfolio Assistant.</strong><br><br>` +
                    `I'm here to give you instant insights into her background, including her <strong class="award-highlight">⚡ CodeChef Milestones (235+ Solved, Silver League)</strong>, her <strong class="award-highlight">🏆 2nd Prize in Project Competition</strong>, her <strong class="award-highlight">🎓 93.29% Diploma Distinction</strong>, internships, and technical stack.<br><br>` +
                    `Click any question below or type your question!`,
                    'bot'
                );
            }, 600);
        }

        // Clear Chat History
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                messagesContainer.innerHTML = '';
                sendBotWelcome();
                showToast("Chat history reset.", "info");
            });
        }

        // Intelligent Knowledge Matcher
        function getBotResponse(query) {
            const q = query.toLowerCase().trim();

            // 1. Award / 2nd Prize in Project Competition
            if (q.includes('2nd') || q.includes('prize') || q.includes('award') || q.includes('competition') || q.includes('price')) {
                return `🏆 <strong class="award-highlight">2nd Prize in Project Competition Milestone!</strong><br><br>` +
                    `During her Web Development Internship at <strong>Passion Software Solutions, Jalgaon</strong>, Vaibhavi competed in the final intern project competition and won <strong>2nd Prize</strong>!<br><br>` +
                    `<strong>What Made Her Project Stand Out:</strong><br>` +
                    `• Built the comprehensive <em>Nursery Plant Management System</em><br>` +
                    `• Robust full-stack architecture using <strong>Python, Django, SQLite3, and React</strong><br>` +
                    `• Clean database schema and intuitive visitor & admin experience.<br><br>` +
                    `Mentors and technical evaluators praised her clean coding standards and real-world system execution!`;
            }

            // 1b. CodeChef Problem Solving & Competitive Programming
            if (q.includes('codechef') || q.includes('dsa') || q.includes('problem solving') || q.includes('competitive programming') || q.includes('rating') || q.includes('silver league')) {
                return `⚡ <strong>CodeChef Competitive Programming & DSA</strong><br><br>` +
                    `Vaibhavi is an active algorithmic problem solver on <strong>CodeChef</strong> (<code>@vaibhavi_dev01</code>)!<br><br>` +
                    `<strong>Milestones & Stats:</strong><br>` +
                    `• <strong>235+ Problems Solved</strong> spanning Data Structures & Algorithms across C, Java, and Python<br>` +
                    `• <strong>1003 DSA Rating</strong> in active competitive contests<br>` +
                    `• <strong>🥈 Silver League Tier</strong> milestone<br>` +
                    `• <strong>25-Day Daily Streak Silver Badge</strong> & <strong>Problem Solver Bronze Badge</strong><br><br>` +
                    `🔗 <a href="https://www.codechef.com/users/vaibhavi_dev01" target="_blank" style="color: #38bdf8; font-weight: 700; text-decoration: underline;">View Vaibhavi's Official CodeChef Profile</a>`;
            }

            // 2. Academic Coursework & Networks
            if (q.includes('network') || q.includes('coursework') || q.includes('subject') || q.includes('study') || q.includes('studies')) {
                return `🌐 <strong>Key Academic Coursework & Computer Networks</strong><br><br>` +
                    `Vaibhavi's core Computer Engineering curriculum includes:<br><br>` +
                    `• <strong>Computer Networks:</strong> Network models, OSI and TCP/IP architectures, data transmission, framing, error detection, error correction, and protocols.<br>` +
                    `• <strong>Data Structures & Algorithms:</strong> Arrays, lists, stacks, trees, searching & sorting.<br>` +
                    `• <strong>Database Management Systems:</strong> SQL, SQLite3, entity modeling, normalization.<br>` +
                    `• <strong>Object-Oriented Programming:</strong> Java, C++, encapsulation, inheritance.<br>` +
                    `• <strong>Web Engineering:</strong> Client-server models, RESTful patterns, responsive design.`;
            }

            // 3. SkillCraft Technology Internship
            if (q.includes('skillcraft') || q.includes('skill craft')) {
                return `💼 <strong>Web Development Internship at SkillCraft Technology</strong><br><br>` +
                    `Vaibhavi recently completed an intensive Web Development Internship at <strong>SkillCraft Technology</strong>.<br><br>` +
                    `<strong>Key Contributions:</strong><br>` +
                    `• Built and styled responsive web user interfaces using <strong>HTML5, CSS3, and JavaScript (ES6+)</strong><br>` +
                    `• Implemented dynamic DOM interactions and component styling<br>` +
                    `• Conducted cross-browser compatibility testing and code optimization<br>` +
                    `• Maintained Git version control workflows for structured feature delivery.`;
            }

            // 4. Viksit Bharat Young Leaders Dialogue (VBYLD 2027) Quiz
            if (q.includes('viksit') || q.includes('bharat') || q.includes('vbyld') || q.includes('mybharat') || q.includes('young leaders')) {
                return `🇮🇳 <strong>Viksit Bharat Young Leaders Dialogue (VBYLD) 2027</strong><br><br>` +
                    `Vaibhavi successfully participated in the prestigious national-level online dialogue quiz on <strong>Viksit Bharat Young Leaders Dialogue (VBYLD) 2027</strong> conducted by <strong>MYBharat</strong> (Ministry of Youth Affairs and Sports, Government of India).<br><br>` +
                    `This initiative tests youth perspectives, technological vision, and proactive leadership for building a developed, innovative nation!`;
            }

            // 5. Internship Experience (Both Internships)
            if (q.includes('intern') || q.includes('experience') || q.includes('work background')) {
                return `💼 <strong>Web Development Internship Milestones (2 Completed)</strong><br><br>` +
                    `Vaibhavi has gained hands-on engineering exposure across two internships:<br><br>` +
                    `<strong>1. SkillCraft Technology:</strong> Web Development Intern<br>` +
                    `• Engineered responsive UI components, cross-browser layouts, and JavaScript interactions.<br><br>` +
                    `<strong>2. Passion Software Solutions, Jalgaon:</strong> Web Development Intern (3 Months)<br>` +
                    `• Built full-stack web applications with Python, Django, React, and SQLite3<br>` +
                    `• Architected the <em>Nursery Plant Management System</em><br>` +
                    `• <strong class="award-highlight">Won 2nd Prize in the Internship Project Competition!</strong> 🏆`;
            }

            // 6. Direct Email & Contact
            if (q.includes('email') || q.includes('mail') || q.includes('vp388953') || q.includes('reach')) {
                return `📬 <strong>Direct Email Contact</strong><br><br>` +
                    `You can reach Vaibhavi directly at her official email:<br>` +
                    `✉️ <a href="mailto:vp388953@gmail.com" style="color: #38bdf8; font-weight: 700; text-decoration: underline;">vp388953@gmail.com</a><br><br>` +
                    `She is actively open to internships, software developer opportunities, and tech collaborations!`;
            }

            // 7. Professional Photo Option
            if (q.includes('photo') || q.includes('picture') || q.includes('image') || q.includes('avatar')) {
                return `📸 <strong>Professional Photo Option</strong><br><br>` +
                    `Vaibhavi's professional portrait is integrated into the <strong>Hero Section</strong> and the <strong>About Me</strong> card!<br><br>` +
                    `<strong>How to customize with your own photo:</strong><br>` +
                    `Place your image file as <code>assets/profile.jpg</code> in the project folder, and the website will automatically load your customized portrait!`;
            }

            // 8. Projects
            if (q.includes('project') || q.includes('nursery') || q.includes('historical') || q.includes('heritage') || q.includes('plant')) {
                return `💻 <strong>Featured Projects Engineered by Vaibhavi</strong><br><br>` +
                    `🌱 <strong>1. Nursery Plant Management System</strong><br>` +
                    `• Stack: Python, Django, SQLite3, JavaScript, HTML5/CSS3<br>` +
                    `• Features: Live stock tracking, plant categorization, admin dashboard<br>` +
                    `• <em>Milestone: Won 2nd Prize in Internship Project Competition!</em> 🏆<br><br>` +
                    `🏰 <strong>2. Historical Places Recommendation System</strong><br>` +
                    `• Stack: Django, Python, SQLite3, Interactive UI<br>` +
                    `• Features: Category-based heritage discovery (forts, palaces, caves), smart preference filters.<br><br>` +
                    `View the code repositories on <a href="https://github.com/vaibhavi-dev01" target="_blank" style="color: #38bdf8; text-decoration: underline;">GitHub (@vaibhavi-dev01)</a>!`;
            }

            // 9. Skills & Tech Stack
            if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('python') || q.includes('django') || q.includes('react')) {
                return `🛠️ <strong>Technical Skills & Tools</strong><br><br>` +
                    `• <strong>Languages:</strong> C, C++, Python, Java, JavaScript<br>` +
                    `• <strong>Web & Frameworks:</strong> HTML5, CSS3, JavaScript, Django, React.js<br>` +
                    `• <strong>Databases:</strong> SQLite3, MongoDB<br>` +
                    `• <strong>Tools:</strong> Git, GitHub, Visual Studio Code<br>` +
                    `• <strong>Core & AI Interest:</strong> Computer Networks, DBMS, OOP, DSA, foundational interest in AI/ML.`;
            }

            // 10. Education & Academic Background
            if (q.includes('education') || q.includes('college') || q.includes('polytechnic') || q.includes('b.tech') || q.includes('btech') || q.includes('diploma') || q.includes('score') || q.includes('mark') || q.includes('percent') || q.includes('93')) {
                return `🎓 <strong>Educational Milestones</strong><br><br>` +
                    `• <strong>B.Tech in Computer Engineering</strong> (Direct Second Year)<br>` +
                    `  <em>R. C. Patel Institute of Technology, Shirpur</em> — Currently Pursuing<br><br>` +
                    `• <strong>Diploma in Computer Engineering</strong> (2026)<br>` +
                    `  <em>S.M.D.R. Government Polytechnic, Dhule</em> — <strong>93.29% First Class Distinction</strong> 🌟<br><br>` +
                    `• <strong>SSC (High School)</strong><br>` +
                    `  <em>Muktangan Education Campus School, Borkund</em> — <strong>94.00%</strong>`;
            }

            // 11. Contact / Hire / Resume
            if (q.includes('contact') || q.includes('hire') || q.includes('linkedin') || q.includes('resume') || q.includes('message')) {
                return `📬 <strong>Get in Touch with Vaibhavi</strong><br><br>` +
                    `Vaibhavi is open to internships, software developer roles, and tech collaborations!<br><br>` +
                    `• <strong>Email:</strong> <a href="mailto:vp388953@gmail.com" style="color: #38bdf8; font-weight: 700; text-decoration: underline;">vp388953@gmail.com</a><br>` +
                    `• <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/vaibhavi-patil-27b2b7423/" target="_blank" style="color: #38bdf8; text-decoration: underline;">vaibhavi-patil-27b2b7423</a><br>` +
                    `• <strong>GitHub:</strong> <a href="https://github.com/vaibhavi-dev01" target="_blank" style="color: #38bdf8; text-decoration: underline;">github.com/vaibhavi-dev01</a><br>` +
                    `• <strong>Location:</strong> Maharashtra, India<br>` +
                    `• You can also use the message form in the <strong>Contact Section</strong> below on this page!`;
            }

            // 8. Greetings / Chit-chat
            if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings') || q.includes('sup')) {
                return `👋 Hello there! It's a pleasure to connect with you.<br><br>` +
                    `I can help answer questions about Vaibhavi's <strong>2nd Prize Project Competition award</strong>, her <strong>93.29% diploma distinction</strong>, her <strong>web development internships</strong>, or her <strong>projects</strong>. What would you like to explore?`;
            }

            if (q.includes('who are you') || q.includes('your name') || q.includes('what are you')) {
                return `🤖 I am <strong>Vaibhavi's AI Portfolio Assistant</strong>!<br><br>` +
                    `I'm a fast, interactive, static AI guide created to help recruiters, fellow developers, and visitors explore Vaibhavi's portfolio and accomplishments effortlessly.`;
            }

            if (q.includes('thank') || q.includes('awesome') || q.includes('great') || q.includes('cool')) {
                return `✨ You're very welcome! If there's anything else you'd like to check out regarding Vaibhavi's work or contact details, just let me know!`;
            }

            // Fallback response with helpful suggestions
            return `I'm happy to help you explore Vaibhavi's portfolio! Here are popular topics you can ask me about:<br><br>` +
                `• <strong>⚡ CodeChef Problem Solving (235+ Solved, Silver League, 1003 DSA Rating)</strong><br>` +
                `• <strong>🏆 2nd Prize in Project Competition</strong> (Web Development Internship)<br>` +
                `• <strong>🎓 Education & 93.29% Diploma Score</strong><br>` +
                `• <strong>💼 Internship Experience at Passion Software Solutions & SkillCraft</strong><br>` +
                `• <strong>🌱 Featured Projects & Source Code</strong><br>` +
                `• <strong>🌐 Computer Networks & Key Coursework</strong><br>` +
                `• <strong>📬 How to Contact or Connect on LinkedIn</strong>`;
        }

        // Form Submit Handler
        function handleUserMessage(queryText) {
            const text = (queryText || (chatInput ? chatInput.value : '')).trim();
            if (!text || isTyping) return;

            if (chatInput) chatInput.value = '';

            // 1. Append user message
            appendMessage(escapeHtml(text), 'user');

            // 2. Show typing indicator
            isTyping = true;
            showTypingIndicator();

            // 3. Dynamic slight delay for animated realism (550ms - 850ms)
            const delay = Math.floor(Math.random() * 300) + 550;

            setTimeout(() => {
                removeTypingIndicator();
                isTyping = false;
                const responseHtml = getBotResponse(text);
                appendMessage(responseHtml, 'bot');
            }, delay);
        }

        if (chatForm) {
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleUserMessage();
            });
        }

        // Suggestion Chips Click Handler
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.getAttribute('data-query');
                if (query) {
                    handleUserMessage(query);
                }
            });
        });

        // Basic HTML escape helper for user input
        function escapeHtml(string) {
            const div = document.createElement('div');
            div.textContent = string;
            return div.innerHTML;
        }
    }
    initChatbot();
});

