/* ================================================================
   checkout.js — Azzura Checkout Logic
   ================================================================ */

'use strict';

let paymentInProgress = false;
let currentTotal = 0;

function initCheckout() {
  if (typeof AzzuraCart === 'undefined') {
    showError("Cart system not loaded.");
    return;
  }

  const cart = AzzuraCart.getCart();
  if (!cart || cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  renderCheckoutSummary();
  document.body.classList.add('loaded');
}

function renderCheckoutSummary() {
  const cart = AzzuraCart.getCart();
  const coupon = localStorage.getItem('azzura_coupon') || '';
  const pricing = AzzuraCart.calcPricing(cart, coupon);
  
  currentTotal = pricing.total;

  const summaryItems = document.getElementById('summary-items');
  summaryItems.innerHTML = cart.map(item => {
    const p = AzzuraCart.CATALOG[item.id];
    if (!p) return '';
    return `
    <div class="summary-item">
      <img src="${p.img}" alt="${p.name}" class="summary-item__img"/>
      <div class="summary-item__details">
        <div class="summary-item__name">${p.name}</div>
        <div class="summary-item__qty">Qty: ${item.qty}</div>
      </div>
      <div class="summary-item__price">${AzzuraCart.fmt(p.price * item.qty)}</div>
    </div>`;
  }).join('');

  const breakdown = document.getElementById('pricing-breakdown');
  let html = `
    <div class="pricing-row"><span>Subtotal</span><span>${AzzuraCart.fmt(pricing.subtotal)}</span></div>`;
  
  if (pricing.discount > 0) {
    const c = AzzuraCart.COUPONS[coupon.toUpperCase()];
    html += `<div class="pricing-row discount"><span>Discount (${c ? c.label : ''})</span><span>−${AzzuraCart.fmt(pricing.discount)}</span></div>`;
  }

  html += `<div class="pricing-row ${pricing.shipping === 0 ? 'shipping-free' : ''}">
    <span>Shipping</span>
    <span>${pricing.shipping === 0 ? 'FREE' : AzzuraCart.fmt(pricing.shipping)}</span>
  </div>`;
  
  html += `<div class="pricing-row"><span>GST (18%)</span><span>${AzzuraCart.fmt(pricing.gst)}</span></div>`;
  html += `<div class="pricing-row total"><span>Total to Pay</span><span>${AzzuraCart.fmt(pricing.total)}</span></div>`;

  breakdown.innerHTML = html;
  document.getElementById('btn-total-amt').textContent = AzzuraCart.fmt(pricing.total);
}

function showError(msg) {
  const alert = document.getElementById('error-alert');
  const msgEl = document.getElementById('error-msg');
  msgEl.textContent = msg;
  alert.classList.add('visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearError() {
  document.getElementById('error-alert').classList.remove('visible');
}

function setFieldError(id, show) {
  const input = document.getElementById(id);
  const err = document.getElementById(`err-${id}`);
  if (show) {
    input.classList.add('error');
    if (err) err.classList.add('visible');
  } else {
    input.classList.remove('error');
    if (err) err.classList.remove('visible');
  }
}

function validateForm() {
  let valid = true;
  clearError();

  const fields = ['email', 'phone', 'fname', 'lname', 'address', 'city', 'state', 'pincode'];
  const values = {};

  fields.forEach(f => {
    const el = document.getElementById(f);
    values[f] = el.value.trim();
    setFieldError(f, false);

    if (!values[f]) {
      setFieldError(f, true);
      valid = false;
    }
  });

  // Email validation
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    setFieldError('email', true);
    valid = false;
  }

  // Phone validation (10 digits)
  if (values.phone && !/^\d{10}$/.test(values.phone)) {
    setFieldError('phone', true);
    valid = false;
  }
  
  // Pincode validation (6 digits)
  if (values.pincode && !/^\d{6}$/.test(values.pincode)) {
    setFieldError('pincode', true);
    valid = false;
  }

  if (!valid) {
    showError("Please correct the highlighted errors before proceeding.");
    return null;
  }

  return values;
}

function showProcessing(title, sub) {
  const overlay = document.getElementById('processing-overlay');
  document.getElementById('processing-title').textContent = title;
  document.getElementById('processing-sub').textContent = sub;
  overlay.classList.add('visible');
}

function hideProcessing() {
  document.getElementById('processing-overlay').classList.remove('visible');
}

async function initiatePayment() {
  if (paymentInProgress) return;
  
  const formData = validateForm();
  if (!formData) return;

  paymentInProgress = true;
  document.getElementById('pay-btn').disabled = true;
  
  // 1. Show processing
  showProcessing("Initializing Payment...", "Securely connecting to Razorpay");

  try {
    const cart = AzzuraCart.getCart();
    
    // In a real scenario, this fetches from the backend
    // For standalone frontend testing, we'll try to fetch, if it fails, we simulate
    let orderData;
    try {
      const response = await fetch('http://localhost:3000/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, customer: formData, coupon: localStorage.getItem('azzura_coupon') })
      });
      if (!response.ok) throw new Error("Backend error");
      orderData = await response.json();
    } catch (e) {
      console.warn("Backend not available, falling back to simulated Razorpay response for UI testing.");
      // Simulated response
      orderData = {
        orderId: 'order_test_' + Date.now(),
        amount: currentTotal * 100, // INR paise
        currency: 'INR',
        keyId: 'rzp_test_mock_key'
      };
    }

    // 2. Open Razorpay
    hideProcessing();
    
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Azzura Healthcare",
      description: "Wellness Products",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRmHiqfEVOl_hmwWQLOGetv56jxm-cei6vQ1wdzv9g3Yi3Ysdv9-w4XdhhqPFt7WPDP_jwQeJMSuFehN5e191_RLDBVjpQsrmdc4kSYRr-Gg3LcNdIaJqhjPVOsUXPljyG4T13jQ4MmJ3r2Kgup3ByAWHOI4COoNGzG0P3RlgVOcX9fkZO079CgAz87RSbiz_TvY9_bmC3Zb2tGnsJEHGLXhqEqCj7GVwjNsgYlsGwSYOj65kac0KPX_GXAwjc1SJPKCu3fQbnPq9E", // placeholder logo
      order_id: orderData.orderId.startsWith('order_test_') ? undefined : orderData.orderId,
      handler: async function (response) {
        showProcessing("Verifying Payment...", "Please wait while we confirm your order");
        
        // Try backend verify
        try {
          if (!orderData.orderId.startsWith('order_test_')) {
            const verifyRes = await fetch('http://localhost:3000/api/orders/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            });
            if (!verifyRes.ok) throw new Error("Verification failed");
          }
          
          // Clear cart on success
          AzzuraCart.clearCart();
          
          // Redirect to success
          const params = new URLSearchParams({
            payment_id: response.razorpay_payment_id || 'pay_mock_' + Date.now(),
            order_id: response.razorpay_order_id || orderData.orderId,
            amount: currentTotal,
            name: `${formData.fname} ${formData.lname}`,
            email: formData.email
          });
          window.location.href = `success.html?${params.toString()}`;
          
        } catch (err) {
          hideProcessing();
          showError("Payment verification failed. If money was deducted, it will be refunded.");
          paymentInProgress = false;
          document.getElementById('pay-btn').disabled = false;
        }
      },
      prefill: {
        name: `${formData.fname} ${formData.lname}`,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: "#003674"
      },
      modal: {
        ondismiss: function() {
          paymentInProgress = false;
          document.getElementById('pay-btn').disabled = false;
        }
      }
    };
    
    // Since we might be mocking, fake handler if mock key
    if (options.key === 'rzp_test_mock_key') {
      setTimeout(() => {
        const fakeResp = { razorpay_payment_id: 'pay_mock_' + Date.now(), razorpay_order_id: orderData.orderId };
        options.handler(fakeResp);
      }, 1500);
      return;
    }

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response){
        const params = new URLSearchParams({
          reason: response.error.description,
          order_id: response.error.metadata.order_id || orderData.orderId
        });
        window.location.href = `failure.html?${params.toString()}`;
    });
    
    rzp.open();

  } catch (err) {
    hideProcessing();
    showError("Could not initialize payment. Please try again later.");
    paymentInProgress = false;
    document.getElementById('pay-btn').disabled = false;
  }
}

// Format input fields live
document.getElementById('phone')?.addEventListener('input', function(e) {
  this.value = this.value.replace(/\D/g, '').slice(0, 10);
});
document.getElementById('pincode')?.addEventListener('input', function(e) {
  this.value = this.value.replace(/\D/g, '').slice(0, 6);
});

document.addEventListener('DOMContentLoaded', initCheckout);
