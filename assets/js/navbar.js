document.addEventListener('DOMContentLoaded', function() {



    const header = document.querySelector('.header'); 
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', function(){
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Dropdown toggles for mobile
    const navItems = document.querySelectorAll('.nav-item > .nav-link');
    navItems.forEach(link => {
        link.addEventListener('click', function(e){
            if(window.innerWidth <= 768){
                const dropdown = this.nextElementSibling;
                if(dropdown){
                    e.preventDefault();
                    dropdown.classList.toggle('open');
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Close mobile menu for any link
            if(navMenu.classList.contains('active')){
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Smooth scroll only for internal anchors
            if(href && href.startsWith('#')){
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if(targetSection){
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
            // Else normal navigation will happen for page links
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease';
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

});
