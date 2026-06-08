/* ============================================================
   AZZURRA PHARMACONUTRITION — SHARED JAVASCRIPT
   Handles: Navbar scroll, mobile drawer, fade-up animations,
            stat counters, smooth scroll, scroll progress bar,
            back-to-top button, about section parallax,
            Why section SVG animation, cart badge, toast
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
      if (!navbar.classList.contains('navbar--solid')) {
        navbar.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn)  closeBtn.addEventListener('click', closeDrawer);
  if (overlay)   overlay.addEventListener('click', closeDrawer);

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
(function () {
  var fadeObserver = null;

  function createObserver() {
    if (!('IntersectionObserver' in window)) return null;
    return new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
  }

  /**
   * Watch all .fade-up and .stagger elements that haven't been
   * observed yet. Safe to call multiple times.
   */
  window.initFadeUp = function initFadeUp() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.fade-up, .stagger').forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    if (!fadeObserver) fadeObserver = createObserver();

    document.querySelectorAll('.fade-up:not(.visible), .stagger:not(.visible)').forEach(function(el) {
      fadeObserver.observe(el);
    });
  };

  window.initFadeUp();
}());


/* ============================================================
   4. STAT COUNTER ANIMATION
   Animates numbers from 0 up to their target on scroll.
   ============================================================ */
(function initCounters() {
  var counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
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
   * Animate a single counter from 0 to data-count-to value.
   * @param {HTMLElement} el
   */
  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-count-to'), 10);
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 2);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }
}());


/* ============================================================
   5. CONTACT FORM VALIDATION
   ============================================================ */
(function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var isValid = true;

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

    setError('cf-name',    'err-name',    !name    || name.value.trim().length < 2);
    var emailOk = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    setError('cf-email',   'err-email',   !emailOk);
    setError('cf-message', 'err-message', !message || message.value.trim().length < 10);

    if (isValid) {
      var success = document.getElementById('form-success');
      if (success) {
        success.classList.add('show');
        form.reset();
        setTimeout(function() { success.classList.remove('show'); }, 5000);
      }
    }
  });

  form.querySelectorAll('.form-input, .form-textarea').forEach(function(field) {
    field.addEventListener('input', function() {
      this.classList.remove('error');
      var errorEl = document.getElementById('err-' + this.id.replace('cf-', ''));
      if (errorEl) errorEl.classList.remove('show');
    });
  });
}());


/* ============================================================
   6. SCROLL PROGRESS BAR
   A thin 3px bar at the very top of the page that fills
   left-to-right as the user scrolls down.
   ============================================================ */
(function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function updateProgress() {
    var scrollTop  = window.scrollY || document.documentElement.scrollTop;
    var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    var pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}());


/* ============================================================
   7. BACK TO TOP BUTTON
   Appears after scrolling 200px; smooth scrolls to top on click.
   ============================================================ */
(function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}());


/* ============================================================
   8. ABOUT SECTION PARALLAX
   The molecule visual scrolls slightly slower than the text.
   ============================================================ */
(function initParallax() {
  var visual = document.getElementById('molecule-visual');
  if (!visual) return;

  function onScroll() {
    /* Get the section's position relative to the viewport */
    var rect    = visual.getBoundingClientRect();
    var viewH   = window.innerHeight;
    /* Only apply parallax when element is visible */
    if (rect.bottom < 0 || rect.top > viewH) return;
    /* Parallax factor 0.15 — subtle drift */
    var offset  = (rect.top - viewH / 2) * 0.15;
    visual.style.transform = 'translateY(' + offset + 'px)';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}());


/* ============================================================
   9. WHY AZZURRA — SVG CIRCLE DRAW ANIMATION
   Triggers stroke-dashoffset animation when cards scroll
   into view, drawing the blue circle around each icon.
   ============================================================ */
(function initWhyIcons() {
  if (!('IntersectionObserver' in window)) return;

  var circles = document.querySelectorAll('.why-icon-circle');
  if (!circles.length) return;

  var iconObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('draw');
        iconObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  circles.forEach(function(c) { iconObserver.observe(c); });
}());


/* ============================================================
   10. STATS BAR PROGRESS LINE
   Triggers the decorative fill animation when the stats
   section scrolls into view.
   ============================================================ */
(function initStatsProgressLine() {
  var line = document.getElementById('stats-progress-line');
  if (!line || !('IntersectionObserver' in window)) return;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        line.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  obs.observe(line);
}());


/* ============================================================
   11. CART BADGE — Reads localStorage and shows item count
   in the navbar cart icon on every page.
   ============================================================ */
/**
 * Update all navbar cart badges across the page.
 * Safe to call anytime after DOM is ready.
 */
function updateCartBadge() {
  try {
    var cart  = JSON.parse(localStorage.getItem('azzurra_cart') || '[]');
    var total = cart.reduce(function(sum, item) { return sum + (item.quantity || 1); }, 0);

    document.querySelectorAll('.navbar__cart-badge').forEach(function(badge) {
      if (total > 0) {
        badge.textContent = total > 99 ? '99+' : total;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  } catch (e) {
    /* localStorage unavailable — silently ignore */
  }
}

/* Run on page load */
document.addEventListener('DOMContentLoaded', updateCartBadge);
window.updateCartBadge = updateCartBadge; /* Expose for shop.js to call after add-to-cart */


/* ============================================================
   12. ADD TO CART — Shared localStorage helper
   Used by shop page, product detail pages, and cart page.
   ============================================================ */
/**
 * Add a product to the cart stored in localStorage.
 * If the product already exists, increments its quantity.
 *
 * @param {Object} product - { id, name, price, image, series }
 * @param {number} quantity - how many to add (default 1)
 */
function azzuraAddToCart(product, quantity) {
  quantity = quantity || 1;
  try {
    var cart  = JSON.parse(localStorage.getItem('azzurra_cart') || '[]');
    var index = cart.findIndex(function(item) { return item.id === product.id; });

    if (index > -1) {
      cart[index].quantity = (cart[index].quantity || 1) + quantity;
    } else {
      cart.push({
        id:       product.id,
        name:     product.name,
        price:    product.price,
        image:    product.image || product.imagePath || '',
        series:   product.series || '',
        quantity: quantity
      });
    }

    localStorage.setItem('azzurra_cart', JSON.stringify(cart));
    updateCartBadge();
    showToast('✓ ' + product.name + ' added to cart');
  } catch (e) {
    /* localStorage unavailable — silently ignore */
  }
}

window.azzuraAddToCart = azzuraAddToCart;


/* ============================================================
   13. TOAST NOTIFICATION
   Shows a slide-in notification at the bottom-right.
   Disappears automatically after 2 seconds.
   ============================================================ */
(function initToast() {
  /* Create the toast element once and reuse it */
  var toast = document.createElement('div');
  toast.id        = 'az-toast';
  toast.className = 'az-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML =
    '<span class="az-toast__icon">🛒</span>' +
    '<span class="az-toast__text" id="az-toast-text"></span>';
  document.body.appendChild(toast);

  var hideTimer = null;

  /**
   * Show a toast message.
   * @param {string} message - the text to display
   */
  window.showToast = function showToast(message) {
    var textEl = document.getElementById('az-toast-text');
    if (textEl) textEl.textContent = message;
    toast.classList.add('show');

    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(function() {
      toast.classList.remove('show');
    }, 2000);
  };
}());
