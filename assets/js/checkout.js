/* ============================================================
   AZZURRA — CHECKOUT JAVASCRIPT
   checkout.js — Form validation, cart display, Supabase order save.
   Supports Razorpay and Cash on Delivery payments.
   Supports Coupon Code lifecycle management.
   ============================================================ */

/* ── Supabase credentials ─────────────────────────────────── */
var _CHECKOUT_SUPABASE_URL      = 'https://ilduyhuvpiqhvbnocqxf.supabase.co';
var _CHECKOUT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZHV5aHV2cGlxaHZibm9jcXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTMxNTUsImV4cCI6MjA5NjM4OTE1NX0.uuC8dKajsnSSaiTx_wxNeapKPl4EV20s5phcRS-TaZg';

/* ── Coupon States ── */
var appliedCoupon = null;
var discountAmount = 0;

/* ── Cart helpers (work with both cart key naming conventions) ─ */
function getCartFromStorage() {
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
  if (totalEl) {
    var finalTotal = total - discountAmount;
    if (finalTotal < 0) finalTotal = 0;
    totalEl.textContent = CURRENCY_SYMBOL + finalTotal.toLocaleString('en-IN');
  }
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
   ============================================================ */
async function saveOrderToSupabase(formData, paymentMethod, couponCode, discountAmt, userId) {
  var cart  = getCartFromStorage();
  var subtotal = getCartTotal(cart);
  var total = subtotal - (discountAmt || 0);
  if (total < 0) total = 0;

  var fullAddress = [
    formData.address,
    formData.city,
    formData.state,
    formData.pincode
  ].filter(Boolean).join(', ');

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
    customer_name:   formData.name,
    customer_email:  formData.email,
    customer_phone:  formData.phone,
    address:         fullAddress,
    items:           JSON.stringify(items),
    total_amount:    total,
    status:          'pending',
    payment_method:  paymentMethod || 'razorpay',
    coupon_code:     couponCode || null,
    discount_amount: discountAmt || 0,
    customer_user_id: userId || null
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
  return Array.isArray(data) ? data[0] : data;
}

/* ── Record Coupon Usage in DB ── */
async function recordCouponUsage(coupon, orderId, email, userId) {
  try {
    // 1. Increment usage count
    await fetch(_CHECKOUT_SUPABASE_URL + '/rest/v1/coupons?id=eq.' + coupon.id, {
      method: 'PATCH',
      headers: {
        'apikey':        _CHECKOUT_SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + _CHECKOUT_SUPABASE_ANON_KEY,
        'Content-Type':  'application/json'
      },
      body: JSON.stringify({ used_count: (coupon.used_count || 0) + 1 })
    });

    // 2. Insert record
    await fetch(_CHECKOUT_SUPABASE_URL + '/rest/v1/coupon_usage', {
      method: 'POST',
      headers: {
        'apikey':        _CHECKOUT_SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + _CHECKOUT_SUPABASE_ANON_KEY,
        'Content-Type':  'application/json'
      },
      body: JSON.stringify({
        coupon_id:      coupon.id,
        coupon_code:    coupon.code,
        order_id:       orderId,
        customer_email: email,
        user_id:        userId
      })
    });
  } catch(e) {
    console.warn('[Azzurra] Coupon usage recording failed:', e);
  }
}

/* ============================================================
   COUPON CODES LOGIC
   ============================================================ */
async function applyCoupon(code) {
  var msgEl = document.getElementById('coupon-message');
  var codeInput = document.getElementById('coupon-code-input');
  var subtotal = getCartTotal(getCartFromStorage());

  if (!code) {
    if (msgEl) { msgEl.textContent = 'Please enter a coupon code.'; msgEl.style.color = '#FC8181'; }
    return;
  }
  
  if (msgEl) { msgEl.textContent = 'Checking...'; msgEl.style.color = 'inherit'; }
  
  try {
    var res = await fetch(_CHECKOUT_SUPABASE_URL + '/rest/v1/coupons?code=eq.' + encodeURIComponent(code.toUpperCase().trim()) + '&is_active=eq.true', {
      headers: {
        'apikey':        _CHECKOUT_SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + _CHECKOUT_SUPABASE_ANON_KEY,
        'Accept':        'application/json'
      }
    });
    
    if (!res.ok) throw new Error('Validation failed');
    var data = await res.json();
    var coupon = data && data.length ? data[0] : null;
    
    if (!coupon) {
      if (msgEl) { msgEl.textContent = 'Invalid or inactive coupon.'; msgEl.style.color = '#FC8181'; }
      return;
    }
    
    if (coupon.expiry_date) {
      var expiry = new Date(coupon.expiry_date);
      var today = new Date();
      today.setHours(0,0,0,0);
      if (expiry < today) {
        if (msgEl) { msgEl.textContent = 'Coupon has expired.'; msgEl.style.color = '#FC8181'; }
        return;
      }
    }
    
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      if (msgEl) { msgEl.textContent = 'Coupon usage limit reached.'; msgEl.style.color = '#FC8181'; }
      return;
    }
    
    var minVal = Number(coupon.min_order_value) || 0;
    if (subtotal < minVal) {
      if (msgEl) { msgEl.textContent = 'Min. order for this coupon is ₹' + minVal.toLocaleString('en-IN') + '.'; msgEl.style.color = '#FC8181'; }
      return;
    }

    if (coupon.per_customer) {
      var session = window.getCustomerSession ? await window.getCustomerSession() : null;
      var email = '';
      if (session && session.user) email = session.user.email;
      else {
        var emailEl = document.getElementById('ch-email');
        if (emailEl) email = emailEl.value.trim();
      }
      if (email) {
        var usageRes = await fetch(_CHECKOUT_SUPABASE_URL + '/rest/v1/coupon_usage?coupon_id=eq.' + coupon.id + '&customer_email=eq.' + encodeURIComponent(email), {
          headers: {
            'apikey':        _CHECKOUT_SUPABASE_ANON_KEY,
            'Authorization': 'Bearer ' + _CHECKOUT_SUPABASE_ANON_KEY,
            'Accept':        'application/json'
          }
        });
        if (usageRes.ok) {
          var usageData = await usageRes.json();
          if (usageData && usageData.length > 0) {
            if (msgEl) { msgEl.textContent = 'You have already used this coupon.'; msgEl.style.color = '#FC8181'; }
            return;
          }
        }
      }
    }
    
    appliedCoupon = coupon;
    if (coupon.discount_type === 'percentage') {
      discountAmount = Math.round(subtotal * (Number(coupon.discount_value) / 100));
    } else {
      discountAmount = Number(coupon.discount_value) || 0;
    }
    
    if (discountAmount > subtotal) discountAmount = subtotal;
    
    var discRow = document.getElementById('summary-discount-row');
    var discCode = document.getElementById('summary-discount-code');
    var discAmt = document.getElementById('summary-discount-amount');
    var totalEl = document.getElementById('summary-total');
    
    if (discRow && discCode && discAmt && totalEl) {
      discCode.textContent = coupon.code;
      discAmt.textContent = '-₹' + discountAmount.toLocaleString('en-IN');
      discRow.style.display = 'flex';
      
      var newTotal = subtotal - discountAmount;
      totalEl.textContent = CURRENCY_SYMBOL + newTotal.toLocaleString('en-IN');
    }
    
    if (msgEl) { msgEl.textContent = 'Coupon applied successfully!'; msgEl.style.color = '#48BB78'; }
    if (codeInput) codeInput.disabled = true;
    var applyBtn = document.getElementById('coupon-apply-btn');
    if (applyBtn) {
      applyBtn.textContent = 'Remove';
      applyBtn.style.background = '#FC8181';
      applyBtn.onclick = function() { removeCoupon(); };
    }
  } catch(err) {
    if (msgEl) { msgEl.textContent = 'Error applying coupon.'; msgEl.style.color = '#FC8181'; }
  }
}

function removeCoupon() {
  appliedCoupon = null;
  discountAmount = 0;
  
  var discRow = document.getElementById('summary-discount-row');
  var codeInput = document.getElementById('coupon-code-input');
  var msgEl = document.getElementById('coupon-message');
  var applyBtn = document.getElementById('coupon-apply-btn');
  var totalEl = document.getElementById('summary-total');
  var subtotal = getCartTotal(getCartFromStorage());
  
  if (discRow) discRow.style.display = 'none';
  if (codeInput) { codeInput.value = ''; codeInput.disabled = false; }
  if (msgEl) msgEl.textContent = '';
  if (totalEl) totalEl.textContent = CURRENCY_SYMBOL + subtotal.toLocaleString('en-IN');
  if (applyBtn) {
    applyBtn.textContent = 'Apply';
    applyBtn.style.background = 'var(--color-primary)';
    applyBtn.onclick = function() {
      var val = codeInput ? codeInput.value : '';
      applyCoupon(val);
    };
  }
}

/* ============================================================
   UPSERT CUSTOMER (best-effort, non-blocking)
   ============================================================ */
function upsertCustomer(formData) {
  if (typeof window.upsertCustomerInSupabase === 'function') {
    window.upsertCustomerInSupabase({
      name:  formData.name,
      email: formData.email,
      phone: formData.phone
    });
    return;
  }

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
  
  var radioCod = document.getElementById('pay-cod');
  var isCod = radioCod && radioCod.checked;
  
  if (isLoading) {
    btn.textContent = 'Processing…';
  } else {
    btn.textContent = isCod ? 'Place Order (COD)' : 'Place Order & Pay';
  }
}

/* ============================================================
   FORM SUBMIT HANDLER
   ============================================================ */
function initCheckout() {
  renderOrderSummary();

  // 1. Pre-fill address if logged in
  if (window.getCustomerSession) {
    window.getCustomerSession().then(async function(session) {
      if (session && session.user) {
        var user = session.user;
        var sb = window.getCustomerSupabase();
        
        var pr = await sb.from('customer_profiles').select('*').eq('user_id', user.id).single();
        var profile = pr.data || {};
        
        var addrRes = await sb.from('customer_addresses').select('*').eq('user_id', user.id).eq('is_default', true).single();
        var addr = addrRes.data || {};

        var nameEl    = document.getElementById('ch-name');
        var phoneEl   = document.getElementById('ch-phone');
        var emailEl   = document.getElementById('ch-email');
        var addressEl = document.getElementById('ch-address');
        var cityEl    = document.getElementById('ch-city');
        var stateEl   = document.getElementById('ch-state');
        var pincodeEl = document.getElementById('ch-pincode');

        if (emailEl) emailEl.value = user.email || '';
        if (nameEl && !nameEl.value)   nameEl.value = profile.full_name || (user.user_metadata && user.user_metadata.full_name) || '';
        if (phoneEl && !phoneEl.value) phoneEl.value = profile.phone || addr.phone || '';
        if (addressEl && !addressEl.value) addressEl.value = addr.address_line || '';
        if (cityEl && !cityEl.value) cityEl.value = addr.city || '';
        if (stateEl && !stateEl.value) stateEl.value = addr.state || '';
        if (pincodeEl && !pincodeEl.value) pincodeEl.value = addr.pincode || '';
      }
    });
  }

  // 2. Wire Payment Option selection highlights
  var radioPay = document.getElementById('pay-razorpay');
  var radioCod = document.getElementById('pay-cod');
  var labelPay = document.getElementById('label-pay-razorpay');
  var labelCod = document.getElementById('label-pay-cod');
  var submitBtn = document.getElementById('checkout-submit-btn');

  function updatePaymentOptionUI() {
    if (radioPay && radioPay.checked) {
      if (labelPay) labelPay.classList.add('payment-option--active');
      if (labelCod) labelCod.classList.remove('payment-option--active');
      if (submitBtn) submitBtn.textContent = 'Place Order & Pay';
    } else if (radioCod && radioCod.checked) {
      if (labelCod) labelCod.classList.add('payment-option--active');
      if (labelPay) labelPay.classList.remove('payment-option--active');
      if (submitBtn) submitBtn.textContent = 'Place Order (COD)';
    }
  }

  if (radioPay) radioPay.addEventListener('change', updatePaymentOptionUI);
  if (radioCod) radioCod.addEventListener('change', updatePaymentOptionUI);

  // 3. Wire Coupon Code Apply Button
  var applyBtn = document.getElementById('coupon-apply-btn');
  var codeInput = document.getElementById('coupon-code-input');
  if (applyBtn) {
    applyBtn.onclick = function() {
      var val = codeInput ? codeInput.value : '';
      applyCoupon(val);
    };
  }

  // 4. Form Submit
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

    var gateway = 'razorpay';
    var radioCodEl = document.getElementById('pay-cod');
    if (radioCodEl && radioCodEl.checked) gateway = 'cod';

    setSubmitLoading(true);

    var session = window.getCustomerSession ? await window.getCustomerSession() : null;
    var userId = session && session.user ? session.user.id : null;

    try {
      if (gateway === 'cod') {
        var order = await saveOrderToSupabase(formData, 'cod', appliedCoupon ? appliedCoupon.code : null, discountAmount, userId);
        if (appliedCoupon) {
          await recordCouponUsage(appliedCoupon, order.id, formData.email, userId);
        }
        upsertCustomer(formData);
        clearCart();
        showOrderConfirmation(order.id || '');
      } else {
        // Razorpay checkout flow
        var order = await saveOrderToSupabase(formData, 'razorpay', appliedCoupon ? appliedCoupon.code : null, discountAmount, userId);
        var finalAmount = getCartTotal(getCartFromStorage()) - discountAmount;
        if (finalAmount < 0) finalAmount = 0;

        var options = {
          "key": (typeof RAZORPAY_KEY_ID !== 'undefined' && RAZORPAY_KEY_ID !== 'rzp_test_REPLACE_ME') ? RAZORPAY_KEY_ID : 'rzp_test_REPLACE_ME',
          "amount": finalAmount * 100,
          "currency": "INR",
          "name": "Azzurra",
          "description": "Payment for Order #" + order.id,
          "handler": async function (response) {
            try {
              // Update order status to 'confirmed' and save transaction id
              await fetch(_CHECKOUT_SUPABASE_URL + '/rest/v1/orders?id=eq.' + order.id, {
                method: 'PATCH',
                headers: {
                  'apikey':        _CHECKOUT_SUPABASE_ANON_KEY,
                  'Authorization': 'Bearer ' + _CHECKOUT_SUPABASE_ANON_KEY,
                  'Content-Type':  'application/json'
                },
                body: JSON.stringify({ status: 'confirmed', transaction_id: response.razorpay_payment_id })
              });
              if (appliedCoupon) {
                await recordCouponUsage(appliedCoupon, order.id, formData.email, userId);
              }
              upsertCustomer(formData);
              clearCart();
              showOrderConfirmation(order.id);
            } catch(err) {
              alert('Payment succeeded but order confirmation failed. Please contact support. Ref: ' + response.razorpay_payment_id);
            }
          },
          "prefill": {
            "name": formData.name,
            "email": formData.email,
            "contact": formData.phone
          },
          "theme": {
            "color": "#1A5FA8"
          },
          "modal": {
            "ondismiss": function() {
              setSubmitLoading(false);
            }
          }
        };
        var rzp = new Razorpay(options);
        rzp.open();
      }
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
