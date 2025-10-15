document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navContent = document.querySelector('.navbar-content-flex');
    const nav = document.querySelector('nav');

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