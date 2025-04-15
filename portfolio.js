// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // First ensure portfolio container is visible
            const portfolioContainer = document.querySelector('.portfolio-container');
            if (portfolioContainer) {
                portfolioContainer.style.display = 'block';
                portfolioContainer.classList.add('fade-in');
            }

            // Then scroll to the section
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Add visible class to trigger animations
            setTimeout(() => {
                targetSection.classList.add('visible');
            }, 300);

            // Update URL without page reload
            history.pushState(null, '', targetId);
        }
    });
});

// Intersection Observer for section animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all sections
document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
});

// Handle back/forward browser navigation
window.addEventListener('popstate', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    } else {
        // If no hash, show the hero section
        const hero = document.querySelector('.hero');
        const portfolioContainer = document.querySelector('.portfolio-container');
        
        if (hero && portfolioContainer) {
            portfolioContainer.classList.remove('fade-in');
            portfolioContainer.style.display = 'none';
            hero.style.display = 'block';
            hero.classList.remove('fade-out');
        }
    }
});