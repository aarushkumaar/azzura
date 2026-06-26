/* ============================================================
   AZZURRA — CHECKOUT JAVASCRIPT
   checkout.js — Form validation, cart display, Supabase order save.
   Saves orders directly to Supabase `orders` table.
   ============================================================ */

/* ── Supabase credentials ─────────────────────────────────── */
var _CHECKOUT_SUPABASE_URL      = 'https://ilduyhuvpiqhvbnocqxf.supabase.co';
var _CHECKOUT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZHV5aHV2cGlxaHZibm9jcXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTMxNTUsImV4cCI6MjA5NjM4OTE1NX0.uuC8dKajsnSSaiTx_wxNeapKPl4EV20s5phcRS-TaZg';

/* ── Cart helpers (work with both cart key naming conventions) ─ */
function getCartFromStorage() {
  // Try both cart key names used across the codebase
  var raw = localStorage.getItem('azzurra_cart') || localStorage.getItem('azzurra_cart_v1');
  if (!raw) return [];
  try { return JSON.parse(raw) || []; } catch(_) { return []; }
}

function getCartTotal(cart) {
  return cart.reduce(function(sum, item) {
    return sum + (Number(item.price || item.unit_price || 0) * Number(item.quantity || item.qty || 1));
  }, 0);
}

function clearCart() {
  localStorage.removeItem('azzurra_cart');
  localStorage.removeItem('azzurra_cart_v1');
}

/* ── Currency symbol ──────────────────────────────────────── */
var CURRENCY_SYMBOL = '₹';
if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.currencySymbol) {
  CURRENCY_SYMBOL = SITE_CONFIG.currencySymbol;
}

/* ============================================================
   RENDER ORDER SUMMARY (right column)
   ============================================================ */
function renderOrderSummary() {
  var cart = getCartFromStorage();

  // Redirect to shop if cart is empty
  if (cart.length === 0) {
    window.location.href = 'productss.html';
    return;
  }

  var itemsEl    = document.getElementById('summary-items');
  var subtotalEl = document.getElementById('summary-subtotal');
  var totalEl    = document.getElementById('summary-total');

  if (itemsEl) {
    itemsEl.innerHTML = cart.map(function(item) {
      var price = Number(item.price || item.unit_price || 0);
      var qty   = Number(item.quantity || item.qty || 1);
      return '<div class="summary-item">'
        + '<img class="summary-item__img" src="' + (item.image_url || item.imagePath || '') + '" alt="' + (item.name || '') + '" onerror="this.style.visibility=\'hidden\';" />'
        + '<span class="summary-item__name">' + (item.name || 'Product') + '</span>'
        + '<span class="summary-item__qty">&times;' + qty + '</span>'
        + '<span class="summary-item__price">' + CURRENCY_SYMBOL + (price * qty).toLocaleString('en-IN') + '</span>'
        + '</div>';
    }).join('');
  }

  var total = getCartTotal(cart);
  if (subtotalEl) subtotalEl.textContent = CURRENCY_SYMBOL + total.toLocaleString('en-IN');
  if (totalEl)    totalEl.textContent    = CURRENCY_SYMBOL + total.toLocaleString('en-IN');
}

/* ============================================================
   FORM VALIDATION
   ============================================================ */
function validateCheckoutForm(data) {
  var valid = true;

  function setErr(inputId, errId, condition, msg) {
    var input = document.getElementById(inputId);
    var err   = document.getElementById(errId);
    if (!input || !err) return;
    if (condition) {
      input.classList.add('error');
      err.textContent = msg;
      err.classList.add('show');
      valid = false;
    } else {
      input.classList.remove('error');
      err.classList.remove('show');
    }
  }

  setErr('ch-name',    'err-name',    !data.name || data.name.trim().length < 2,
         'Please enter your full name (at least 2 characters).');
  setErr('ch-phone',   'err-phone',   !data.phone || !/^[0-9+\s\-]{7,15}$/.test(data.phone.trim()),
         'Please enter a valid phone number.');
  setErr('ch-email',   'err-email',   !data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()),
         'Please enter a valid email address.');
  setErr('ch-address', 'err-address', !data.address || data.address.trim().length < 5,
         'Please enter your full address.');
  setErr('ch-city',    'err-city',    !data.city || data.city.trim().length < 2,
         'Please enter your city.');
  setErr('ch-pincode', 'err-pincode', !data.pincode || !/^[0-9]{6}$/.test(data.pincode.trim()),
         'Please enter a valid 6-digit PIN code.');

  return valid;
}

/* ============================================================
   SAVE ORDER TO SUPABASE
   Inserts directly into the orders table via the REST API.
   ============================================================ */
async function saveOrderToSupabase(formData) {
  var cart  = getCartFromStorage();
  var total = getCartTotal(cart);

  // Build the full address string
  var fullAddress = [
    formData.address,
    formData.city,
    formData.state,
    formData.pincode
  ].filter(Boolean).join(', ');

  // Map cart items to a consistent shape
  var items = cart.map(function(item) {
    return {
      id:           item.id,
      name:         item.name || 'Product',
      quantity:     Number(item.quantity || item.qty || 1),
      price:        Number(item.price || item.unit_price || 0),
      image_url:    item.image_url || item.imagePath || ''
    };
  });

  var payload = {
    customer_name:  formData.name,
    customer_email: formData.email,
    customer_phone: formData.phone,
    address:        fullAddress,
    items:          JSON.stringify(items),
    total_amount:   total,
    status:         'pending'
  };

  var res = await fetch(_CHECKOUT_SUPABASE_URL + '/rest/v1/orders', {
    method:  'POST',
    headers: {
      'apikey':        _CHECKOUT_SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + _CHECKOUT_SUPABASE_ANON_KEY,
      'Content-Type':  'application/json',
      'Accept':        'application/json',
      'Prefer':        'return=representation'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    var errText = await res.text();
    throw new Error('Order save failed (' + res.status + '): ' + errText);
  }

  var data = await res.json();
  // Supabase returns an array when Prefer:return=representation is set
  return Array.isArray(data) ? data[0] : data;
}

/* ============================================================
   UPSERT CUSTOMER (best-effort, non-blocking)
   ============================================================ */
function upsertCustomer(formData) {
  // If supabase-products.js already exposed this helper, use it
  if (typeof window.upsertCustomerInSupabase === 'function') {
    window.upsertCustomerInSupabase({
      name:  formData.name,
      email: formData.email,
      phone: formData.phone
    });
    return;
  }

  // Fallback: direct REST call
  fetch(_CHECKOUT_SUPABASE_URL + '/rest/v1/customers', {
    method:  'POST',
    headers: {
      'apikey':        _CHECKOUT_SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + _CHECKOUT_SUPABASE_ANON_KEY,
      'Content-Type':  'application/json',
      'Accept':        'application/json',
      'Prefer':        'resolution=merge-duplicates'
    },
    body: JSON.stringify({
      name:          formData.name,
      email:         formData.email,
      phone:         formData.phone,
      last_activity: new Date().toISOString()
    })
  }).catch(function() { /* non-critical */ });
}

/* ============================================================
   SHOW ORDER CONFIRMATION
   ============================================================ */
function showOrderConfirmation(orderId) {
  var formSection = document.querySelector('.checkout-form-section');
  var summary     = document.querySelector('.checkout-summary');
  var heading     = document.querySelector('.checkout-heading');
  var sub         = document.querySelector('.checkout-sub');

  if (heading) heading.textContent  = '✅ Order Placed Successfully!';
  if (sub)     sub.textContent      = 'Thank you for your order. We will contact you shortly.';

  if (formSection) {
    formSection.innerHTML =
      '<div style="text-align:center;padding:40px 20px;">'
      + '<div style="font-size:64px;margin-bottom:16px;">🎉</div>'
      + '<h2 style="font-size:22px;font-weight:700;color:#1A1A2E;margin-bottom:8px;">Order Confirmed!</h2>'
      + '<p style="color:#6B7280;margin-bottom:24px;">Your order ID is:</p>'
      + '<div style="background:#E8F1FB;border-radius:12px;padding:16px 24px;display:inline-block;margin-bottom:24px;">'
      + '<span style="font-family:monospace;font-size:18px;font-weight:700;color:#1A5FA8;">#' + String(orderId).padStart(6, '0') + '</span>'
      + '</div>'
      + '<p style="color:#6B7280;margin-bottom:32px;">We have received your order and will process it shortly. Our team will call you to confirm delivery details.</p>'
      + '<a href="productss.html" style="display:inline-block;background:#1A5FA8;color:#fff;padding:12px 28px;border-radius:100px;text-decoration:none;font-weight:700;">Continue Shopping</a>'
      + '</div>';
  }

  if (summary) summary.style.display = 'none';
}

/* ============================================================
   UI HELPERS
   ============================================================ */
function showCheckoutError(msg) {
  var errEl = document.getElementById('checkout-error');
  if (!errEl) return;
  errEl.textContent = msg;
  errEl.classList.add('show');
  errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideCheckoutError() {
  var errEl = document.getElementById('checkout-error');
  if (errEl) errEl.classList.remove('show');
}

function setSubmitLoading(isLoading) {
  var btn = document.getElementById('checkout-submit-btn');
  if (!btn) return;
  btn.disabled = isLoading;
  btn.classList.toggle('loading', isLoading);
  btn.textContent = isLoading ? 'Processing…' : 'Place Order & Pay';
}

/* ============================================================
   FORM SUBMIT HANDLER
   ============================================================ */
function initCheckout() {
  renderOrderSummary();

  var form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    hideCheckoutError();

    var nameEl    = document.getElementById('ch-name');
    var phoneEl   = document.getElementById('ch-phone');
    var emailEl   = document.getElementById('ch-email');
    var addressEl = document.getElementById('ch-address');
    var cityEl    = document.getElementById('ch-city');
    var stateEl   = document.getElementById('ch-state');
    var pincodeEl = document.getElementById('ch-pincode');

    var formData = {
      name:    nameEl    ? nameEl.value.trim()    : '',
      phone:   phoneEl   ? phoneEl.value.trim()   : '',
      email:   emailEl   ? emailEl.value.trim()   : '',
      address: addressEl ? addressEl.value.trim() : '',
      city:    cityEl    ? cityEl.value.trim()    : '',
      state:   stateEl   ? stateEl.value.trim()   : '',
      pincode: pincodeEl ? pincodeEl.value.trim() : ''
    };

    if (!validateCheckoutForm(formData)) return;

    setSubmitLoading(true);

    try {
      // Save order to Supabase
      var order = await saveOrderToSupabase(formData);

      // Best-effort: upsert customer record
      upsertCustomer(formData);

      // Clear cart from localStorage
      clearCart();

      // Show confirmation
      showOrderConfirmation(order.id || '');

    } catch (err) {
      showCheckoutError('Could not place order: ' + err.message + '. Please try again or contact us.');
      setSubmitLoading(false);
    }
  });

  // Clear field errors on input
  form.querySelectorAll('.form-input').forEach(function(input) {
    input.addEventListener('input', function() {
      this.classList.remove('error');
    });
  });
}

document.addEventListener('DOMContentLoaded', initCheckout);
