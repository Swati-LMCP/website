
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
    // Add this JavaScript at the end of body
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
});
document.addEventListener('DOMContentLoaded', () => {
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
});

  // Navbar Scroll Behavior
  let lastScrollPosition = 0;
  const navbar = document.getElementById('main-nav');
  const mobileMenu = document.getElementById('mobileMenu');
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

