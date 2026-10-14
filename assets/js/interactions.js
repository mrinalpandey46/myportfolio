/**
 * Mrinal Pandey Portfolio - Interactive Micro-Systems
 * Spotlight Tracking, Scroll Reveal, Role Rotator, 3D Tilt, Decryptor, Counters
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Toast Notification Utility
  // =========================================================================
  window.showToast = function (message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconSvg = type === 'success' 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff9d" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  };

  // =========================================================================
  // 2. Cursor Spotlight Tracking for Cards (Linear/Vercel effect)
  // =========================================================================
  const spotlightCards = document.querySelectorAll('.glass-card, .skill-card, .project-card, .honor-card, .hobby-card, .timeline-content, .sih-spotlight-card, .project-featured-card');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // =========================================================================
  // 3. Scroll Reveal Observer
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-item');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // =========================================================================
  // 4. Kinetic Role Rotator on Hero
  // =========================================================================
  const roleElement = document.getElementById('hero-role-text');
  if (roleElement) {
    const roles = [
      "B.Tech CSE Core Undergrad",
      "Java & Algorithms Enthusiast",
      "SIH Prelims Top 15 Finalist",
      "Full-Stack Web Aspirant",
      "Problem Solver & Builder"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeRole, typeSpeed);
    }

    typeRole();
  }

  // =========================================================================
  // 5. 3D Card Hover Perspective Tilt
  // =========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // =========================================================================
  // 6. Animated Number Roll-up Counters
  // =========================================================================
  const counters = document.querySelectorAll('[data-counter]');

  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute('data-counter'), 10);
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * endValue);
            target.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = endValue;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(target);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
  }

  // =========================================================================
  // 7. Phone Number Cyber Decryptor Interaction
  // =========================================================================
  const decryptTrigger = document.getElementById('btn-decrypt-phone');
  const phoneDisplay = document.getElementById('phone-display-text');
  const copyBtn = document.getElementById('btn-copy-phone');
  const decryptTag = document.getElementById('decrypt-status-tag');

  if (decryptTrigger && phoneDisplay) {
    const REAL_PHONE = "+91 8521528645";
    const CHARS = "0123456789ABCDEF!@#$%^&*<>[]{}";
    let isDecrypted = false;

    decryptTrigger.addEventListener('click', () => {
      if (isDecrypted) return;

      decryptTrigger.disabled = true;
      decryptTrigger.style.opacity = "0.75";
      if (decryptTag) {
        decryptTag.innerHTML = `
          <span style="color: #ffb703; animation: blinkCursor 0.5s infinite;">●</span> DECRYPTING CIPHER...
        `;
      }

      let iteration = 0;
      const interval = setInterval(() => {
        phoneDisplay.innerText = REAL_PHONE
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return REAL_PHONE[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        if (iteration >= REAL_PHONE.length) {
          clearInterval(interval);
          isDecrypted = true;
          phoneDisplay.innerText = REAL_PHONE;
          decryptTrigger.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Decrypted Successfully
          `;
          decryptTrigger.style.background = 'rgba(0, 255, 157, 0.12)';
          decryptTrigger.style.borderColor = 'var(--emerald-core)';
          decryptTrigger.style.color = '#fff';

          if (decryptTag) {
            decryptTag.innerHTML = `
              <span style="color: #00ff9d;">●</span> DECRYPTED // DIRECT ACCESS
            `;
          }
          if (copyBtn) {
            copyBtn.style.display = 'inline-flex';
          }
          window.showToast("Contact deciphered: +91 8521528645", "success");
        }

        iteration += 1 / 2;
      }, 35);
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText("8521528645").then(() => {
          window.showToast("Copied 8521528645 to clipboard!", "success");
        }).catch(() => {
          window.showToast("Phone number: 8521528645", "info");
        });
      });
    }
  }

  // =========================================================================
  // 8. Live Jaipur Real-Time Clock (IST)
  // =========================================================================
  const jaipurClock = document.getElementById('live-jaipur-clock');
  if (jaipurClock) {
    function updateClock() {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const now = new Intl.DateTimeFormat('en-US', options).format(new Date());
      jaipurClock.innerHTML = `
        <span style="color: var(--emerald-core); font-size: 0.85rem;">●</span> ${now} IST
      `;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // =========================================================================
  // 9. Skills Category Filter
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card[data-category]');

  if (filterBtns.length > 0 && skillCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        skillCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // =========================================================================
  // 10. Skill Progress Fill Trigger
  // =========================================================================
  const progressBars = document.querySelectorAll('.skill-progress-fill');
  if (progressBars.length > 0) {
    const progressObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width') || '80%';
          bar.style.width = targetWidth;
          obs.unobserve(bar);
        }
      });
    }, { threshold: 0.1 });

    progressBars.forEach(bar => progressObserver.observe(bar));
  }

  // =========================================================================
  // 11. Contact Form Futuristic Submission
  // =========================================================================
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      const name = contactForm.querySelector('#sender-name').value.trim();
      const email = contactForm.querySelector('#sender-email').value.trim();
      const message = contactForm.querySelector('#sender-message').value.trim();

      if (!name || !email || !message) {
        window.showToast("Please fill in all required fields.", "info");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
        Encrypting & Transmitting...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        window.showToast("Transmission received! Mrinal will respond shortly.", "success");
      }, 1300);
    });
  }

});
