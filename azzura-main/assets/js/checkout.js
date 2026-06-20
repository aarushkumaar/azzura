/* ============================================================
   AZZURRA — CHECKOUT JAVASCRIPT
   checkout.js — Form validation, order creation, Razorpay modal.
   Depends on: config.js, shop.js (getCart, SITE_CONFIG, SUPABASE_URL,
               SUPABASE_ANON_KEY, RAZORPAY_KEY_ID)
   ============================================================ */

/* ============================================================
   RENDER ORDER SUMMARY (right column)
   ============================================================ */
function renderOrderSummary() {
  const cart = getCart();

  // Redirect to shop if cart is empty
  if (cart.length === 0) {
    window.location.href = 'productss.html';
    return;
  }

  const itemsEl    = document.getElementById('summary-items');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl    = document.getElementById('summary-total');

  if (itemsEl) {
    itemsEl.innerHTML = cart.map(function(item) {
      return `
        <div class="summary-item">
          <img
            class="summary-item__img"
            src="${item.image_url}"
            alt="${item.name}"
            onerror="this.style.visibility='hidden';"
          />
          <span class="summary-item__name">${item.name}</span>
          <span class="summary-item__qty">×${item.quantity}</span>
          <span class="summary-item__price">
            ${SITE_CONFIG.currencySymbol}${(item.price * item.quantity).toLocaleString('en-IN')}
          </span>
        </div>`;
    }).join('');
  }

  const total = getCartTotal();
  if (subtotalEl) subtotalEl.textContent = `${SITE_CONFIG.currencySymbol}${total.toLocaleString('en-IN')}`;
  if (totalEl)    totalEl.textContent    = `${SITE_CONFIG.currencySymbol}${total.toLocaleString('en-IN')}`;
}

/* ============================================================
   FORM VALIDATION
   ============================================================ */
function validateCheckoutForm(data) {
  let valid = true;

  function setErr(inputId, errId, condition, msg) {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errId);
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
   STEP 1 — Create order in Supabase via Edge Function
   Edge Function URL: SUPABASE_URL + /functions/v1/createOrder
   ============================================================ */
async function createOrder(formData) {
  const cart = getCart();

  const payload = {
    cart: cart.map(function(item) {
      return {
        product_id: item.id,
        quantity:   item.quantity,
        unit_price: item.price,
        subtotal:   item.price * item.quantity
      };
    }),
    total_amount:     getCartTotal(),
    shipping_address: formData,
    currency:         SITE_CONFIG.currency
  };

  const res = await fetch(`${SUPABASE_URL}/functions/v1/createOrder`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Order creation failed: ${errText}`);
  }

  return res.json();
  // Returns: { orderId, razorpayOrderId, amount, currency, keyId }
}

/* ============================================================
   STEP 2 — Open Razorpay checkout modal
   ============================================================ */
function openRazorpay(orderData, formData) {
  const options = {
    key:      orderData.keyId || RAZORPAY_KEY_ID,
    amount:   orderData.amount,           // In paise (₹1 = 100 paise)
    currency: orderData.currency || 'INR',
    name:     'Azzurra Pharmaconutrition',
    description: 'Biotech Wellness Products',
    order_id: orderData.razorpayOrderId,

    prefill: {
      name:    formData.name,
      email:   formData.email,
      contact: formData.phone
    },

    theme: {
      color: '#1A5FA8'  /* Azzurra primary blue */
    },

    modal: {
      ondismiss: function() {
        showCheckoutError('Payment was cancelled. Your order has not been processed.');
        setSubmitLoading(false);
      }
    },

    handler: function(response) {
      /* Payment succeeded in Razorpay modal.
         Now verify the payment signature via our Edge Function. */
      verifyPayment({
        razorpay_payment_id:  response.razorpay_payment_id,
        razorpay_order_id:    response.razorpay_order_id,
        razorpay_signature:   response.razorpay_signature,
        orderId:              orderData.orderId
      });
    }
  };

  const rzp = new Razorpay(options);
  rzp.on('payment.failed', function(response) {
    showCheckoutError(`Payment failed: ${response.error.description}. Please try again.`);
    setSubmitLoading(false);
  });

  rzp.open();
}

/* ============================================================
   STEP 3 — Verify payment signature via Edge Function
   ============================================================ */
async function verifyPayment(verifyData) {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/verifyPayment`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(verifyData)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Verification failed: ${errText}`);
    }

    const result = await res.json();

    if (result.success) {
      // Clear cart and redirect to confirmation
      localStorage.removeItem('azzurra_cart_v1');
      window.location.href = `order-confirmation.html?orderId=${result.orderId}`;
    } else {
      throw new Error('Payment verification returned false.');
    }
  } catch (err) {
    showCheckoutError(`Payment verification failed: ${err.message}. Please contact support.`);
    setSubmitLoading(false);
  }
}

/* ============================================================
   UI HELPERS
   ============================================================ */
function showCheckoutError(msg) {
  const errEl = document.getElementById('checkout-error');
  if (!errEl) return;
  errEl.textContent = msg;
  errEl.classList.add('show');
  errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideCheckoutError() {
  const errEl = document.getElementById('checkout-error');
  if (errEl) errEl.classList.remove('show');
}

function setSubmitLoading(isLoading) {
  const btn = document.getElementById('checkout-submit-btn');
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

  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    hideCheckoutError();

    const formData = {
      name:     document.getElementById('ch-name')?.value.trim()    || '',
      phone:    document.getElementById('ch-phone')?.value.trim()   || '',
      email:    document.getElementById('ch-email')?.value.trim()   || '',
      address:  document.getElementById('ch-address')?.value.trim() || '',
      city:     document.getElementById('ch-city')?.value.trim()    || '',
      state:    document.getElementById('ch-state')?.value.trim()   || '',
      pincode:  document.getElementById('ch-pincode')?.value.trim() || ''
    };

    if (!validateCheckoutForm(formData)) return;

    setSubmitLoading(true);

    try {
      // Step 1: Create order + Razorpay order via Edge Function
      const orderData = await createOrder(formData);

      // Step 2: Open Razorpay modal
      openRazorpay(orderData, formData);

    } catch (err) {
      showCheckoutError(`Could not initiate checkout: ${err.message}`);
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
