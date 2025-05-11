
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('overlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        // Add these variables at the top of your script
        const autoSlideInterval = 1500; // 3 seconds between slides (adjust as needed)
        const transitionDuration = '0.8s'; // Animation duration (adjust as needed)
       
       
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

        

        // Active link management
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Back to Top Button
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

        // Initialize Swiper
        const leaders = [
      {
        name: "Kodakala Nagachandu",
        position: "Managing Director",
        bio: "Strategic decision-maker steering the company's vision, partnerships, and overall growth trajectory",
        img: "assets/images/CP/MD.jpg"
      },
      {
        name: "Surakani Gowtham",
        position: "General Manager",
        bio: "Leads cross-functional teams, drives strategic execution, and ensures business operations align with company goals",
        img: "assets/images/CP/GM.jpg"
      },
      {
        name: "Sakamuri Vaishnavi",
        position: "HR Manager",
        bio: "Responsible for recruitment, employee engagement, and organizational development",
        img: "assets/images/CP/HR.jpg"
      },
      {
        name: "Shaik Shamsheed",
        position: "Operational Manager",
        bio: "Oversees day-to-day operations, coordinates departments, and ensures project timelines",
        img: "assets/images/CP/OM.jpg"
      },
      {
        name: "Kiran Kumar Mallela",
        position: "Asst. General Manager",
        bio: "Supports leadership and assists in streamlining internal processes",
        img: "assets/images/CP/AGM.jpg"
      }
    ];

    const container = document.getElementById('sliderContainer');
    const nav = document.getElementById('sliderNav');
    let index = 0;
    let interval;
    const visibleCount = () => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

    function createCard(leader) {
      const card = document.createElement('div');
      card.className = 'leader-card';
      card.innerHTML = `
        <div class="card-inner">
          <div class="leader-image">
            <img src="${leader.img}" alt="${leader.name}">
          </div>
          <h3>${leader.name}</h3>
          <p class="position">${leader.position}</p>
          <p class="bio">${leader.bio}</p>
        </div>`;
      return card;
    }

    function setupSlider() {
      container.innerHTML = '';
      nav.innerHTML = '';

      leaders.forEach(leader => container.appendChild(createCard(leader)));
      // Clone for infinite effect
      for (let i = 0; i < visibleCount(); i++) {
        container.appendChild(createCard(leaders[i]));
      }

      for (let i = 0; i < leaders.length; i++) {
        const bullet = document.createElement('div');
        bullet.className = 'slider-bullet';
        bullet.dataset.index = i;
        bullet.addEventListener('click', () => {
          index = i;
          updateSlider();
        });
        nav.appendChild(bullet);
      }

      updateSlider();
      startAutoSlide();
    }

    // Update the updateSlider function
    function updateSlider() {
      const card = container.querySelector('.leader-card');
      const cardWidth = card.offsetWidth;
      container.style.transition = `transform ${transitionDuration} ease-in-out`;
      container.style.transform = `translateX(-${index * cardWidth}px)`;

      document.querySelectorAll('.slider-bullet').forEach(b => b.classList.remove('active'));
      if (nav.children[index]) nav.children[index].classList.add('active');
    }

    // Modify the startAutoSlide function
    function startAutoSlide() {
      clearInterval(interval);
      interval = setInterval(() => {
          index++;
          if (index > leaders.length) {
              container.style.transition = 'none';
              index = 0;
              container.style.transform = `translateX(0px)`;
              setTimeout(() => {
                  container.style.transition = `transform ${transitionDuration} ease-in-out`;
                  updateSlider();
              }, 50);
          } else {
              updateSlider();
          }
      }, autoSlideInterval); // Use the interval variable here
    }
    const wrapper = document.getElementById('sliderWrapper');
    wrapper.addEventListener('mouseenter', () => clearInterval(interval));
    wrapper.addEventListener('mouseleave', () => startAutoSlide());
    window.addEventListener('resize', setupSlider);

    setupSlider();
    // Scroll Animation Observer
    const animateOnScroll = () => {
              const elements = document.querySelectorAll('.scroll-animate');
              
              const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                      if (entry.isIntersecting) {
                          entry.target.classList.add('animate');
                          observer.unobserve(entry.target);
                      }
                  });
              }, {
                  threshold: 0.1,
                  rootMargin: '0px 0px -0px 0px'
              });
              
              elements.forEach(element => {
                  observer.observe(element);
              });
          };
          
          // Call the function when DOM is loaded
          document.addEventListener('DOMContentLoaded', animateOnScroll);

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
