// Function to animate counting
const animateValue = (element, start, end, duration) => {
    const targetText = element.dataset.target;
    const hasPlus = targetText.includes('+');
    const endNumber = parseInt(targetText);
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentNumber = Math.floor(progress * (endNumber - start) + start);
        element.textContent = currentNumber + (hasPlus ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navContent = document.querySelector('.navbar-content-flex');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a[href^="#"], a[href^="#projects"]' );

    // Smooth scroll function
    const scrollToSection = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 840) {
                hamburger.classList.remove('active');
                navContent.classList.remove('active');
            }
        }
    };

    // Add click event to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    // Initialize animations
    const initializeAnimations = () => {
        // Add reveal class to sections except hero
        document.querySelectorAll('section:not(#hero)').forEach(section => {
            section.classList.add('reveal');
        });

        // Add reveal to all timeline items
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.classList.add('reveal');
            item.style.transitionDelay = `${index * 0.2}s`;
        });

        // Add reveal to experience and project items
        document.querySelectorAll('.experience-item, .project-item').forEach((item, index) => {
            item.classList.add('reveal');
            item.style.transitionDelay = `${index * 0.1}s`;
        });

        // Add reveal to skill tags
        document.querySelectorAll('.skill-tag').forEach((tag, index) => {
            tag.classList.add('reveal');
            tag.style.transitionDelay = `${index * 0.05}s`;
        });

        // Add reveal to stat items
        document.querySelectorAll('.stat-item').forEach((stat, index) => {
            stat.classList.add('reveal');
            stat.style.transitionDelay = `${index * 0.1}s`;
            
            // Get the target number from the h3 text
            const h3 = stat.querySelector('h3');
            const originalText = h3.textContent;
            h3.textContent = '0'; // Start from 0
            
            // Store the original text as a data attribute
            h3.dataset.target = originalText;
        });
    };

    // Hamburger menu functionality
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navContent.classList.toggle('active');
    });

    // Check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight - 100;
    };

    // Handle scroll events
    const handleScroll = () => {
        // Navbar scroll effect
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        // Check and reveal elements
        document.querySelectorAll('.reveal:not(.active)').forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
                
                // If this is a stat item, animate the number
                if (element.classList.contains('stat-item')) {
                    const h3 = element.querySelector('h3');
                    if (h3 && h3.dataset.target && !h3.dataset.animated) {
                        animateValue(h3, 0, parseInt(h3.dataset.target), 2000);
                        h3.dataset.animated = 'true';
                    }
                }
            }
        });
    };

    // Initialize animations
    initializeAnimations();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Initial check for visible elements
    setTimeout(handleScroll, 100);
});