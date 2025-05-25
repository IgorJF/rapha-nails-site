document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a WhatsApp link or external link
            if (this.getAttribute('href').includes('wa.me') || 
                this.getAttribute('href').includes('://') ||
                this.getAttribute('target') === '_blank') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Calculate scroll position considering fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll with more control
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800; // milliseconds
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                // Easing function for smooth animation
                function ease(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                }
                
                requestAnimationFrame(animation);
                
                // Update URL
                history.pushState(null, null, targetId);
            }
        });
    });

    // Add shadow to header on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.classList.add('shadow-md');
                header.classList.remove('shadow-sm');
            } else {
                header.classList.remove('shadow-md');
                header.classList.add('shadow-sm');
            }
        });
        
        // Initialize header shadow state
        header.classList.toggle('shadow-md', window.scrollY > 10);
        header.classList.toggle('shadow-sm', window.scrollY <= 10);
    }
});