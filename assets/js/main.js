/* ============================================================
   AZZURRA PHARMACONUTRITION — SHARED JAVASCRIPT
   Handles: Navbar scroll, mobile drawer, fade-up animations,
            stat counters, and smooth scroll
   ============================================================ */

/* ============================================================
   1. NAVBAR SCROLL BEHAVIOUR
   When the page scrolls past 60px, add a "scrolled" class
   to the navbar which gives it a white background + shadow.
   ============================================================ */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      // Only remove if it's not a solid-by-default navbar (inner pages)
      if (!navbar.classList.contains('navbar--solid')) {
        navbar.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load to set correct state
}());


/* ============================================================
   2. MOBILE HAMBURGER MENU + DRAWER
   Opens/closes a slide-in drawer from the right on mobile.
   ============================================================ */
(function initMobileMenu() {
  const hamburger = document.getElementById('navbar-hamburger');
  const drawer    = document.getElementById('navbar-drawer');
  const overlay   = document.getElementById('navbar-overlay');
  const closeBtn  = document.getElementById('drawer-close');

  if (!hamburger || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn)  closeBtn.addEventListener('click', closeDrawer);
  if (overlay)   overlay.addEventListener('click', closeDrawer);

  // Close drawer if a link is clicked
  drawer.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeDrawer);
  });
}());


/* ============================================================
   3. FADE-UP SCROLL ANIMATION
   Uses IntersectionObserver to watch elements with the
   class "fade-up" or "stagger". When they enter the viewport,
   "visible" is added which triggers the CSS transition.

   initFadeUp() is exposed on window so that shop.js can call
   it again after dynamically injecting product cards into the DOM.
   ============================================================ */
(function () {
  // Shared observer — reused across multiple initFadeUp() calls
  var fadeObserver = null;

  function createObserver() {
    if (!('IntersectionObserver' in window)) return null;
    return new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, stop watching — no need to un-animate
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,         // Trigger when 12% of the element is visible
      rootMargin: '0px 0px -40px 0px' // Slight bottom offset for a natural feel
    });
  }

  /**
   * Watch all .fade-up and .stagger elements that haven't been
   * observed yet. Safe to call multiple times (e.g. after dynamic
   * content is injected by shop.js).
   */
  window.initFadeUp = function initFadeUp() {
    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.fade-up, .stagger').forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    // Create the observer once
    if (!fadeObserver) fadeObserver = createObserver();

    // Observe any new elements that don't yet have .visible
    document.querySelectorAll('.fade-up:not(.visible), .stagger:not(.visible)').forEach(function(el) {
      fadeObserver.observe(el);
    });
  };

  // Run on initial page load
  window.initFadeUp();
}());


/* ============================================================
   4. STAT COUNTER ANIMATION
   Finds all elements with [data-count-to] attribute.
   When they scroll into view, animates the number from 0
   up to the target value over ~1.5 seconds.
   ============================================================ */
(function initCounters() {
  var counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show final numbers
    counters.forEach(function(el) {
      el.textContent = el.getAttribute('data-count-to') + (el.getAttribute('data-suffix') || '');
    });
    return;
  }

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(el) {
    counterObserver.observe(el);
  });

  /**
   * Animate a single counter element from 0 to its data-count-to value.
   * @param {HTMLElement} el — the element to animate
   */
  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-count-to'), 10);
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 1500; // Animation duration in milliseconds
    var start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);

      // Use easeOutQuad for a natural deceleration effect
      var eased = 1 - Math.pow(1 - progress, 2);
      var current = Math.floor(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix; // Ensure exact final value
      }
    }

    requestAnimationFrame(step);
  }
}());


/* ============================================================
   5. CONTACT FORM VALIDATION
   Basic client-side validation for the contact form.
   Prevents empty submission; shows inline error messages.
   ============================================================ */
(function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Always prevent actual submission (no backend)

    var isValid = true;

    // Helper: show or hide an error message
    function setError(inputId, errorId, condition) {
      var input = document.getElementById(inputId);
      var error = document.getElementById(errorId);
      if (!input || !error) return;

      if (condition) {
        input.classList.add('error');
        error.classList.add('show');
        isValid = false;
      } else {
        input.classList.remove('error');
        error.classList.remove('show');
      }
    }

    var name    = document.getElementById('cf-name');
    var email   = document.getElementById('cf-email');
    var message = document.getElementById('cf-message');

    // Validate name
    setError('cf-name', 'err-name', !name || name.value.trim().length < 2);

    // Validate email format using a simple regex
    var emailOk = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    setError('cf-email', 'err-email', !emailOk);

    // Validate message
    setError('cf-message', 'err-message', !message || message.value.trim().length < 10);

    // If all valid, show success message
    if (isValid) {
      var success = document.getElementById('form-success');
      if (success) {
        success.classList.add('show');
        form.reset();
        // Hide success after 5 seconds
        setTimeout(function() {
          success.classList.remove('show');
        }, 5000);
      }
    }
  });

  // Clear error state when user starts typing
  form.querySelectorAll('.form-input, .form-textarea').forEach(function(field) {
    field.addEventListener('input', function() {
      this.classList.remove('error');
      var errorEl = document.getElementById('err-' + this.id.replace('cf-', ''));
      if (errorEl) errorEl.classList.remove('show');
    });
  });
}());
