
// Mobile menu functionality
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

    // Back to top button
    const backToTopButton = document.getElementById("backToTop");

    window.onscroll = function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
        
        // Trigger scroll animations
        animateOnScroll();
    };

    backToTopButton.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Initialize animations
    setTimeout(() => {
        document.getElementById('contactCard').classList.add('animate');
        
        // Animate form groups with delay
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            setTimeout(() => {
                group.classList.add('animate');
            }, 100 * (index + 1));
        });
    }, 300);
});

// Scroll animation function
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementPosition < windowHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Initialize scroll animations on page load
window.addEventListener('load', animateOnScroll);


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
        
        // Form validation logic
        const form = document.getElementById('contactForm');
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
                    const phoneRegex = /^\d{10}$/;
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

           

            // Submit form if valid
            const formData = {
                firstName: fields.firstName.input.value.trim(),
                lastName: fields.lastName.input.value.trim(),
                email: fields.email.input.value.trim(),
                phone: fields.phone.input.value.trim(),
                message: fields.message.input.value.trim()
            };


            function showToast(message, type = "success", duration = 3000) {
                const toast = document.getElementById("toast");
                toast.textContent = message;
                
                // Reset positioning classes
                toast.className = `toast ${type} show`;
                
                // Add mobile class if needed
                if(window.innerWidth <= 768) {
                    toast.classList.add('mobile');
                }
            
                setTimeout(() => {
                    toast.classList.remove("show");
                    toast.classList.add("hidden");
                }, duration);
            }
            
            
            try {
                const response = await fetch("http://localhost:8000/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
            
                if (response.ok) {
                    showToast("Message sent successfully!", "success");
                    form.reset();
                    Object.values(fields).forEach(clearError);
                } else {
                    const error = await response.json();
                    showToast("Error: " + error.message, "error");
                }
            } catch (error) {
                showToast("Error: " + error.message, "error");
            }
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

    window.addEventListener('load', () => {
        const section = document.querySelector('.contact-section');
        if (section) {
          section.classList.add('loaded');
        }
      });
      