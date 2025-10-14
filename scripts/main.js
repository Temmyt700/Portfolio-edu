document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navContent = document.querySelector('.navbar-content-flex');
    const nav = document.querySelector('nav');
    const navBar = document.querySelector('.navbar');

    // Hamburger menu functionality
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navContent.classList.toggle('active');
    });

    // Scroll functionality
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 30) { // Start shrinking after 100px scroll
            nav.classList.add('nav-scrolled');
            navBar.classList.add('navbar-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
            navBar.classList.remove('navbar-scrolled');
        }
        
        lastScroll = currentScroll;
    });
});
