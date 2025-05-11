
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


    // Mobile Menu JavaScript
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('overlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

        function toggleMobileMenu() {
            mobileMenu.classList.toggle('active');
            overlay.style.display = mobileMenu.classList.contains('active') ? 'block' : 'none';
        }

        // Event Listeners
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
        overlay.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking links
        document.querySelectorAll('.mobile-links a').forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });

        // Handle ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
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
