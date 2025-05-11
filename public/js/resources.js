
    const backToTopButton = document.getElementById("backToTop");

    window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "flex";
    } else {
        backToTopButton.style.display = "none";
    }
    };

    backToTopButton.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation || 'fadeInUp';
                const delay = element.dataset.delay || '0';
                
                element.style.animationDelay = delay;
                element.classList.add('animated', animation);
                element.style.opacity = '1';
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('[data-animation]').forEach(element => {
        observer.observe(element);
    });

    // Observe cards with staggered delays
    document.querySelectorAll('.content-card').forEach((card, index) => {
        card.setAttribute('data-animation', 'fadeInUp');
        card.setAttribute('data-delay', `${index * 0.2}s`);
        observer.observe(card);
    });

    // Observe testimonials
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.setAttribute('data-animation', 'slideInLeft');
        observer.observe(card);
    });

    // Observe section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.setAttribute('data-animation', 'slideInRight');
        observer.observe(header);
    });
        // Mobile Menu Functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('overlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.style.display = 'block';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.style.display = 'none';
        });

        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.style.display = 'none';
        });

        // Navbar Scroll Behavior
    let lastScrollPosition = 0;
    const navbar = document.getElementById('main-nav');

    const navbarHeight = navbar.offsetHeight;
    
    // Adjust body padding to account for fixed navbar
    document.body.style.paddingTop = navbarHeight + 'px';
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Don't hide navbar if mobile menu is open
        if (mobileMenu.classList.contains('active')) return;
        
        if (currentScrollPosition > lastScrollPosition) {
            // Scrolling down - hide navbar
            if (currentScrollPosition > navbarHeight) {
                navbar.style.transform = 'translateY(-100%)';
            }
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        // Special case: if at top of page, ensure navbar is visible
        if (currentScrollPosition <= 0) {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollPosition = currentScrollPosition;
    });
 
