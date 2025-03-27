// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .glow-on-hover, input, textarea, .project-card, .skill-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.background = 'white';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
        cursorFollower.style.borderColor = 'white';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--primary-color)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'var(--primary-color)';
    });
});

// Typewriter effect for hero subtitle
const typingText = document.querySelector('.typing-text');
const phrases = ["Tech Enthusiast", "Full Stack Developer", "UI/UX Designer", "Content Creator"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isEnd = true;
        setTimeout(() => {
            isDeleting = true;
        }, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const speed = isDeleting ? 100 : isEnd ? 50 : 150;
    setTimeout(typeWriter, speed);
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.querySelector('.close-btn');
    
    sidebar.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        closeBtn.style.animation = 'vibrate 0.3s linear 3';
        setTimeout(() => {
            closeBtn.style.animation = '';
        }, 1000);
    }
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (!sidebar.contains(e.target) && e.target !== menuBtn && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// Dark/Light Mode Toggle
function toggleMode() {
    document.body.classList.toggle('light-mode');
    const icon = document.querySelector('.mode-toggle .icon');
    icon.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    localStorage.setItem('lightMode', document.body.classList.contains('light-mode'));
}

// Check for saved preference
if (localStorage.getItem('lightMode') === 'true') {
    document.body.classList.add('light-mode');
    document.querySelector('.mode-toggle .icon').textContent = '☀️';
}

// Network Background Effect
const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.targetSize = this.size;
        this.pulseSpeed = Math.random() * 0.05 + 0.01;
    }

    update() {
        // Size pulsing effect
        this.size = this.targetSize + Math.sin(Date.now() * this.pulseSpeed) * 1;
        
        // Movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Boundary check with bounce
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );
        gradient.addColorStop(0, document.body.classList.contains('light-mode') ? 'rgba(102, 102, 102, 0.8)' : 'rgba(0, 255, 204, 0.8)');
        gradient.addColorStop(1, document.body.classList.contains('light-mode') ? 'rgba(102, 102, 102, 0)' : 'rgba(0, 255, 204, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = document.body.classList.contains('light-mode') ? 'rgba(102, 102, 102, 0.3)' : 'rgba(0, 255, 204, 0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize Canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Animate stats counting
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(counter);
                stat.textContent = target;
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.id === 'about') {
                animateStats();
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-section').forEach(section => {
    observer.observe(section);
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize all effects
window.addEventListener('load', () => {
    typeWriter();
    
    // Initialize sections as visible if they're already in view
    document.querySelectorAll('.animate-section').forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 150) {
            section.classList.add('visible');
            if (section.id === 'about') {
                animateStats();
            }
        }
    });
});

// Contact Form Submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message
    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            e.target.reset();
        }, 2000);
    }, 1500);
});