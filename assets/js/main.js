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
   ============================================================ */
(function initFadeUp() {
  // Exit if IntersectionObserver is not supported (very old browsers)
  if (!('IntersectionObserver' in window)) {
    // Fallback: make all elements visible immediately
    document.querySelectorAll('.fade-up, .stagger').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once visible, stop watching — no need to un-animate
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,        // Trigger when 12% of the element is visible
    rootMargin: '0px 0px -40px 0px' // Slight bottom offset for a natural feel
  });

  // Watch all fade-up elements and stagger containers
  document.querySelectorAll('.fade-up, .stagger').forEach(function(el) {
    observer.observe(el);
  });
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

    // If all valid, show success message and submit to Supabase
    if (isValid) {
      var success = document.getElementById('form-success');
      var submitBtn = document.getElementById('submit-btn');
      
      var nameVal = name.value.trim();
      var emailVal = email.value.trim();
      var phoneVal = document.getElementById('cf-phone') ? document.getElementById('cf-phone').value.trim() : '';
      var messageVal = message.value.trim();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      var url = (typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : 'https://ilduyhuvpiqhvbnocqxf.supabase.co') + '/rest/v1/contact_messages';
      var key = (typeof SUPABASE_ANON_KEY !== 'undefined' ? SUPABASE_ANON_KEY : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZHV5aHV2cGlxaHZibm9jcXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTMxNTUsImV4cCI6MjA5NjM4OTE1NX0.uuC8dKajsnSSaiTx_wxNeapKPl4EV20s5phcRS-TaZg');

      fetch(url, {
        method: 'POST',
        headers: {
          'apikey':        key,
          'Authorization': 'Bearer ' + key,
          'Content-Type':  'application/json',
          'Prefer':        'return=minimal'
        },
        body: JSON.stringify({
          name:    nameVal,
          email:   emailVal,
          phone:   phoneVal,
          subject: 'General Enquiry',
          message: messageVal
        })
      })
      .then(function(res) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
        if (res.ok) {
          if (success) {
            success.classList.add('show');
            form.reset();
            setTimeout(function() {
              success.classList.remove('show');
            }, 5000);
          }
        } else {
          alert('Failed to send message. Please try again.');
        }
      })
      .catch(function(err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
        alert('Error: ' + err.message);
      });
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
