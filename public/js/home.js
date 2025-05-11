
// [Previous JavaScript remains unchanged until the end]

// Add this new animation script at the end
// Simple scroll animation function
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  elements.forEach(element => {
    observer.observe(element);
  });
}

// Page load animations
function initPageLoadAnimations() {
  document.body.classList.add('loaded');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initPageLoadAnimations();
  initScrollAnimations();
  
  
});

// Handle scroll events for header







// Updated smooth scroll handling
document.addEventListener('DOMContentLoaded', function() {
// Handle anchor links for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Allow regular links to work normally
document.querySelectorAll('.nav-links a:not([href^="#"]), .mobile-links a:not([href^="#"])').forEach(link => {
    link.addEventListener('click', function(e) {
        // Allow default link behavior for external pages
        if (!this.getAttribute('href').startsWith('#')) {
            return true;
        }
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
});









// Fallback for broken service images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section.services-section img').forEach(img => {
        img.onerror = function() {
            this.onerror = null;
            this.src = 'https://via.placeholder.com/600x400?text=Image+Unavailable';
        };
    });
});
  

var grid = document.querySelector('.grid');
var iso = new Isotope(grid, {
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    transitionDuration: '0.6s'
});

var filterButtons = document.querySelectorAll('.gridFilter button');
filterButtons.forEach(function(button) {
 button.addEventListener('click', function() {
    document.querySelector('.gridFilter .active')?.classList.remove('active');
    this.classList.add('active');
    var filterValue = this.getAttribute('data-filter');
    iso.arrange({ filter: filterValue });
  });
});


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


// Testimonial Slider Script
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slides');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    // home first set of cards and append to end for infinite loop
    const firstThreeCards = Array.from(cards).slice(0, 3);
    firstThreeCards.forEach(card => {
        const home = card.homeNode(true);
        slides.appendChild(home);
    });
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // width + margin
    const totalSlides = Math.ceil(cards.length / 3); // original slides before cloning
    let autoSlideInterval;
    
    function updateSlider() {
        slides.style.transform = `translateX(-${currentIndex * (cardWidth * 3)}px)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === (currentIndex % totalSlides));
        });
        
        // Reset position if at homed slides for infinite effect
        if (currentIndex >= totalSlides) {
            setTimeout(() => {
                slides.style.transition = 'none';
                currentIndex = 0;
                slides.style.transform = `translateX(0)`;
                setTimeout(() => slides.style.transition = 'transform 0.6s ease-in-out');
            }, 600);
        }
    }
    
    function nextSlide() {
        currentIndex++;
        slides.style.transition = 'transform 0.6s ease-in-out';
        updateSlider();
    }
    
    function prevSlide() {
        if (currentIndex <= 0) {
            // Jump to homed slides at the beginning
            slides.style.transition = 'none';
            currentIndex = totalSlides;
            slides.style.transform = `translateX(-${currentIndex * (cardWidth * 3)}px)`;
            setTimeout(() => {
                slides.style.transition = 'transform 0.6s ease-in-out';
                currentIndex--;
                updateSlider();
            }, 20);
        } else {
            currentIndex--;
            updateSlider();
        }
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }
    
    // Initialize
    updateSlider();
    startAutoSlide();
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        startAutoSlide();
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            currentIndex = parseInt(dot.dataset.index);
            slides.style.transition = 'transform 0.6s ease-in-out';
            updateSlider();
            startAutoSlide();
        });
    });
    
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardWidth = cards[0].offsetWidth + 20;
        if (newCardWidth !== cardWidth) {
            updateSlider();
        }
    });
});

 // Add click handler to scroll icon
document.querySelector('.scroll-icon').addEventListener('click', function() {
    const servicesSection = document.getElementById('services');
    const navHeight = document.getElementById('main-nav').offsetHeight;
    const targetPosition = servicesSection.offsetTop - navHeight;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});
 
// Optional: Add keyboard accessibility
document.querySelector('.scroll-icon').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const servicesSection = document.getElementById('services');
        const navHeight = document.getElementById('main-nav').offsetHeight;
        const targetPosition = servicesSection.offsetTop - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});

// Initialize scroll animations on page load
window.addEventListener('load', animateOnScroll);

// Form validation and submission
const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('.submit-btn');
const submitText = document.getElementById('submitText');
const successMessage = document.getElementById('successMessage');
const closeSuccessMessage = document.getElementById('closeSuccessMessage');

const fields = {
    firstName: {
        input: document.getElementById('firstName'),
        error: document.getElementById('firstNameError'),
        validate: () => {
            const value = fields.firstName.input.value.trim();
            if (!value) return 'First name is required';
            if (value.length < 2) return 'Minimum 2 characters required';
            return null;
        }
    },
    lastName: {
        input: document.getElementById('lastName'),
        error: document.getElementById('lastNameError'),
        validate: () => {
            const value = fields.lastName.input.value.trim();
            
            return null;
        }
    },
    email: {
        input: document.getElementById('email'),
        error: document.getElementById('emailError'),
        validate: () => {
            const value = fields.email.input.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) return 'Email is required';
            if (!emailRegex.test(value)) return 'Invalid email format';
            return null;
        }
    },
    phone: {
        input: document.getElementById('phone'),
        error: document.getElementById('phoneError'),
        validate: () => {
            const value = fields.phone.input.value.trim();
            const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/;
            if (value && !phoneRegex.test(value)) return 'Invalid phone number format';
            return null;
        }
    },
    message: {
        input: document.getElementById('message'),
        error: document.getElementById('messageError'),
        validate: () => {
            const value = fields.message.input.value.trim();
            if (!value) return 'Message is required';
            if (value.length < 20) return 'Minimum 20 characters required';
            return null;
        }
    }
};

// Real-time validation
Object.values(fields).forEach(field => {
    field.input.addEventListener('input', () => {
        const error = field.validate();
        if (error) {
            showError(field, error);
        } else {
            clearError(field);
        }
    });
});

// Form submission handler
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let isValid = true;

    // Validate all fields
    Object.values(fields).forEach(field => {
        const error = field.validate();
        if (error) {
            showError(field, error);
            isValid = false;
        } else {
            clearError(field);
        }
    });

    if (!isValid) return;

    // Show loading state
    submitBtn.classList.add('loading');
    submitText.textContent = 'Sending...';

    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitText.textContent = 'Message Sent!';
        
        // Show success animation
        setTimeout(() => {
            showSuccessMessage();
            form.reset();
            submitText.textContent = 'Send Message';
        }, 800);
    }, 1500);
    });

    function showError(field, message) {
    field.input.classList.add('error');
    field.input.classList.remove('success');
    field.error.textContent = message;
    field.error.style.display = 'block';
    }

    function clearError(field) {
    field.input.classList.remove('error');
    field.input.classList.add('success');
    field.error.textContent = '';
    field.error.style.display = 'none';
    }

    function showSuccessMessage() {
    successMessage.classList.add('show');

    // Close success message after 5 seconds
    setTimeout(() => {
    if (successMessage.classList.contains('show')) {
        successMessage.classList.remove('show');
    }
    }, 5000);
    }

    closeSuccessMessage.addEventListener('click', () => {
    successMessage.classList.remove('show');
    });



// Add this function to update body padding dynamically
function updateBodyPadding() {
const header = document.getElementById('main-nav');
const headerHeight = header.offsetHeight;
document.body.style.paddingTop = headerHeight + 'px';
}



// Mobile Menu JavaScript
 const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const  mobileMenuClose = document.getElementById('mobileMenuClose');

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






