
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
mobileMenuClose.addEventListener('click', toggleMobileMenu);

// Close menu when clicking links
document.querySelectorAll('.mobile-links a').forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "flex";
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Job Listings Functionality
let currentExpandedCard = null;

function toBulletList(text) {
    if (!text) return "";
    const items = text.split(".").map(i => i.trim()).filter(Boolean);
    return `<ul>${items.map(i => `<li>${i}.</li>`).join("")}</ul>`;
}

async function fetchJobs() {
    try {
        const response = await fetch("http://localhost:8000/api/jobs");
        const jobs = await response.json();
        const jobsContainer = document.getElementById("jobs-container");
        jobsContainer.innerHTML = '';

        jobs.forEach((job, index) => {
            const jobCard = document.createElement("div");
            jobCard.classList.add("job-card");
            jobCard.style.animationDelay = `${index * 0.1}s`;

            jobCard.innerHTML = `
                <h3><i class="fas fa-user-tie"></i> ${job.roleName}</h3>
                <p><i class="fas fa-tools"></i> <strong>Skills :</strong>&nbsp;${job.skills.join(", ")}</p>
<p><i class="fas fa-business-time"></i> <strong>Experience :</strong>&nbsp;${job.experience} years</p>
<p><i class="fas fa-calendar-day"></i> <strong>Last Date to Apply :</strong>&nbsp;${new Date(job.lastDate).toLocaleDateString()}</p>
<p><i class="fas fa-briefcase"></i> <strong>Work Type :</strong>&nbsp;${job.workType}</p>

                <button class="view-job-btn"><i class="fas fa-eye"></i> View Job</button>
                <div class="job-details">
                    <h4><i class="fas fa-align-left"></i> Description</h4>
                    ${toBulletList(job.description)}
                    <h4><i class="fas fa-tasks"></i> Responsibilities</h4>
                    ${toBulletList(job.responsibilities)}
                    <h4><i class="fas fa-graduation-cap"></i> Qualifications</h4>
                    ${toBulletList(job.qualifications)}
                    <button class="apply-btn" data-id="${job._id}" data-role="${job.roleName}"><i class="fas fa-paper-plane"></i> Apply</button>
                </div>
            `;

            const viewBtn = jobCard.querySelector(".view-job-btn");
            const details = jobCard.querySelector(".job-details");

            viewBtn.addEventListener("click", () => {
                if (currentExpandedCard && currentExpandedCard !== details) {
                    currentExpandedCard.style.display = "none";
                    const prevBtn = currentExpandedCard.parentElement.querySelector('.view-job-btn i');
                    if (prevBtn) prevBtn.className = 'fas fa-eye';
                }
                
                if (details.style.display === "block") {
                    details.style.display = "none";
                    viewBtn.querySelector('i').className = 'fas fa-eye';
                } else {
                    details.style.display = "block";
                    details.style.animation = "slideFromLeft 0.5s ease-out forwards";
                    viewBtn.querySelector('i').className = 'fas fa-eye-slash';
                }
                currentExpandedCard = details.style.display === "block" ? details : null;
            });

            const applyBtn = jobCard.querySelector(".apply-btn");
            applyBtn.addEventListener("click", () => {
                document.querySelector('#applyForm [name="jobId"]').value = job._id;
                document.querySelector('#applyForm [name="roleName"]').value = job.roleName;
                document.getElementById("applyModal").style.display = "flex";
            });

            jobsContainer.appendChild(jobCard);
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
    }
}

function closeModal() {
    document.getElementById("applyModal").style.display = "none";
    document.getElementById("applyForm").reset();
    document.getElementById("responseMessage").textContent = '';
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

function validateForm(formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phoneNo').trim();
    const shortNote = formData.get('shortNote')?.trim() || '';
    const roleName = formData.get('roleName').trim();
    const resume = formData.get('resume');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name || name.length < 3 || name.length > 50) return "Name must be between 3 and 50 characters.";
    if (!email || !emailRegex.test(email)) return "Please enter a valid email address.";
    if (phone && !phoneRegex.test(phone)) return "Phone number must be exactly 10 digits.";
    if (shortNote.length > 200) return "Short note must not exceed 200 characters.";
    if (!resume || resume.size === 0) return "Resume is required.";
    if (resume.size > 4 * 1024 * 1024) return "Resume must be less than 4MB.";
    if (!roleName || roleName.length < 3 || roleName.length > 100) return "Role name is invalid.";
    return null;
}

document.getElementById("applyForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const error = validateForm(formData);
    if (error) {
        showToast(error);
        return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    try {
        const res = await fetch('http://localhost:8000/api/application/apply', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        document.getElementById("responseMessage").textContent = data.message || "Application submitted successfully.";
        document.getElementById("responseMessage").style.color = res.ok ? 'var(--primary-dark)' : 'red';
        if (res.ok) this.reset();
    } catch (err) {
        document.getElementById("responseMessage").textContent = "Failed to submit application.";
        document.getElementById("responseMessage").style.color = 'red';
        console.error(err);
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('applyModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Initialize on load
window.onload = fetchJobs;

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
