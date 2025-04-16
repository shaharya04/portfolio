// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = document.querySelector('.portfolio-nav').offsetHeight; // Get nav height
            const targetPosition = targetSection.offsetTop - navHeight; // Adjust for nav height

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Intersection Observer for sections with different thresholds
const observerOptions = {
    threshold: [0.2, 0.5, 0.8],
    rootMargin: '0px 0px -100px 0px'
};

// Create observers for different sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special handling for skills section
            if (entry.target.id === 'skills') {
                const skillItems = entry.target.querySelectorAll('.group');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section, #skills').forEach((section) => {
    sectionObserver.observe(section);
    
    // Initialize skills items
    if (section.id === 'skills') {
        const skillItems = section.querySelectorAll('.group');
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s ease-out';
        });
    }
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

// Navigation handling
document.querySelectorAll('.portfolio-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        navigateToPage(targetId);
    });
});

function navigateToPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.portfolio-page').forEach(page => {
        page.classList.remove('active');
        setTimeout(() => {
            page.style.display = 'none';
        }, 500);
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        setTimeout(() => {
            targetPage.style.display = 'block';
            // Force reflow
            void targetPage.offsetWidth;
            
            targetPage.classList.add('active');
            
            // Special handling for skills section
            if (pageId === 'skills') {
                const skillGroups = targetPage.querySelectorAll('.group');
                skillGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.style.opacity = '1';
                        group.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }, 500);

        // Update active nav link
        document.querySelectorAll('.portfolio-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            }
        });

        // Update URL without reload
        history.pushState(null, '', `#${pageId}`);
    }
}

// Handle initial page load and browser navigation
function handleInitialNavigation() {
    let hash = window.location.hash.substring(1);
    if (!hash) hash = 'about'; // Default to about page
    navigateToPage(hash);
}

// Initialize page state
handleInitialNavigation();

// Handle browser back/forward
window.addEventListener('popstate', handleInitialNavigation);