/**
 * Mrinal Pandey Portfolio - Global Framework Scripts
 * Navigation, Custom Cursor, Smooth Transitions & Active State
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Mobile Menu Toggle
  // =========================================================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================================
  // 2. Sticky Header Scroll Reaction
  // =========================================================================
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });
  }

  // =========================================================================
  // 3. Highlight Active Navigation Item
  // =========================================================================
  const currentPath = window.location.pathname;
  const pageFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageFile || (pageFile === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // =========================================================================
  // 4. Custom Glowing Cursor
  // =========================================================================
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorOutline = document.querySelector('.custom-cursor-outline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Move dot instantly
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth lerp loop for the outer ring
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover expansions on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .glass-card, .hobby-card, .skill-card, .project-card, .btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // =========================================================================
  // 5. Smooth Page Transition Veil
  // =========================================================================
  const veil = document.querySelector('.page-transition-veil');
  if (veil) {
    // Fade out veil on initial load
    setTimeout(() => {
      veil.style.opacity = '0';
      veil.style.pointerEvents = 'none';
    }, 150);

    // Fade in veil on internal link navigation
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      // Only internal pages
      if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        link.addEventListener('click', (e) => {
          // If not holding cmd/ctrl/shift
          if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            veil.style.pointerEvents = 'all';
            veil.style.opacity = '1';
            setTimeout(() => {
              window.location.href = href;
            }, 200);
          }
        });
      }
    });
  }

});
