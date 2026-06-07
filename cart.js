/* ================================================================
   cart.js — Azzura Cart Logic
   Handles: localStorage cart, INR pricing, coupon codes, UI render
   ================================================================ */

'use strict';

/* ---- Product Catalog (INR prices) ---- */
const CATALOG = {
  "1": {
    id:"1", name:"Luminary Molecular Serum", category:"Molecular Serums", price:15999,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuC1bvDaEd5DGmZuiTT1QmFruSxCSnfEJt7MR68h9PHPDBxtxWakponagCtJSQgOJlQI0HjWoObcVj-YEEfBjSW8VK5TNg3A1QOfMF1lE9D00ayT0ZN7qXda1XSF83XKNQNBEPH9Tg_F9QqZbbM_D6Ue_tMa8e0S5-TxE32eXeEGdQc7B3ngspNaRD_O4wfoGkapds6vEy-j8fu8sxNaTNxdcxkMgyKwOVupXkF8rFVvOF1h2BIaDkGH7uESYNZbcqfYqj6Lind1Zpnf"
  },
  "2": {
    id:"2", name:"CellSync Pulse Device", category:"Bio-Devices", price:41999,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuBWw7ZbjM0N6rllwIT_zAWRnWDFErCKtf57USrnHiMjQMIxTZ4aloSOTmO__SRU-k7hoxNB1ptiFkoFQ8QlRpf3288cpIWQhrV6O10uDcv6ofxps_gyFJ_fCoqQ6AAUOAkMmBBnRQkaeckZxXJMwpT2v4d27vFIjEZC4cN9WY0wmIkMcqLa96kfekidJVILNXsV313Ml7qe0-3QL9jKXB0hpT84RPcqC6OxSUayegokjjRUijTXXdYFiwvvq009_DhZ3UPbs6fZXCkg"
  },
  "3": {
    id:"3", name:"Neuro-Prime Catalyst", category:"Advanced Supplements", price:9999,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuDQASqE32XHSerfpv51PJ-p9p1uLKMCUqPxKj3GJBvRb6LPefq-mermuRJlhm1JhWaMB5ppgswnbThxsMAIzORm9OzF0ssYjycTHT7BBos-bFq7IAZAyjUisCkgJqFHRYIAeANA-gfMRB4M1jQue7MuFoxcxQhGnfk0MB6Q5MESbJceqCj4DLgE3C1mjzVEp6pNMt5jZ6cCdOgEp4httinzk_Agq7XgAxEYw9doDxheZNrx0nU5qtL4ihthDKegLfnSTVsgE99Bpgpi"
  },
  "4": {
    id:"4", name:"The Genesis System", category:"Cellular Kits", price:54999,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuAgiBNvYuEHOc_wkLry4_aIdMm0QD_gv8N9DHfgVGbHttjsb0tKBGpJ-7NlnYfGcqT14GuLpWr4gLov8zbKe6YlbQ-MyyMvGpk00rcEQxIEIBU53wQq73KSsc05PFXdEm73u-4Tug-8tIOOet45ONae25YNEJdaUIUe-3JfLgF8jLiqXja839q4VMCsRc6IMgRZXunCR_qOHRE1K8-nQDNLa6p7nIMdxkQqBRljW4LqzgFssF6ETesipKPLKjb4WU5FSqnafQ2l95V3"
  },
  "5": {
    id:"5", name:"Telomere Elixir", category:"Advanced Supplements", price:17999,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCRmHiqfEVOl_hmwWQLOGetv56jxm-cei6vQ1wdzv9g3Yi3Ysdv9-w4XdhhqPFt7WPDP_jwQeJMSuFehN5e191_RLDBVjpQsrmdc4kSYRr-Gg3LcNdIaJqhjPVOsUXPljyG4T13jQ4MmJ3r2Kgup3ByAWHOI4COoNGzG0P3RlgVOcX9fkZO079CgAz87RSbiz_TvY9_bmC3Zb2tGnsJEHGLXhqEqCj7GVwjNsgYlsGwSYOj65kac0KPX_GXAwjc1SJPKCu3fQbnPq9E"
  },
  "6": {
    id:"6", name:"Azzura Bio-Patch", category:"Bio-Devices", price:7499,
    img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCe5EggS4Z193saSuq7VRqo_32dtNBC_DBUyhO1BFqgoDrqC5bN46Lh0I3TTbqpuvBIebY_jk-Yn8IujM825DrhNYUrr1W-p-RVpNK5WcKmfyMmPNzlvMAtvL3qOFUn8p6Gk2IbzZmCSUAMKBYAY31pivIjtIuNWiblLtEorwEdYUXFiNsVRsycXmuifkDNJnrdMq-s1a8lcdcd1DhEtB900wpsE5ZGYO5FiGHGjjGHvSRNew-_H6Mv0jSGgPJcUjtvPRS5sbsSOuGz"
  }
};

/* ---- Pricing Constants ---- */
const CART_KEY           = 'azzura_cart';
const COUPON_KEY         = 'azzura_coupon';
const SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST      = 199;
const GST_RATE           = 0.18;

const COUPONS = {
  'AZZURA10':   { type:'percent', value:10,  label:'10% off' },
  'WELLNESS20': { type:'percent', value:20,  label:'20% off' },
  'FIRST500':   { type:'flat',    value:500, label:'₹500 off' }
};

/* ---- Cart CRUD ---- */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateNavBadge();
}
function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === String(id));
  if (existing) { existing.qty = Math.min(existing.qty + qty, 10); }
  else { cart.push({ id: String(id), qty }); }
  saveCart(cart);
}
function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== String(id)));
}
function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === String(id));
  if (item) { item.qty = Math.max(1, Math.min(qty, 10)); }
  saveCart(cart);
}
function clearCart() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(COUPON_KEY);
  updateNavBadge();
}
function getCartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}

/* ---- Pricing ---- */
function calcPricing(cartItems, couponCode) {
  const subtotal = cartItems.reduce((s, item) => {
    const p = CATALOG[item.id];
    return s + (p ? p.price * item.qty : 0);
  }, 0);

  let discount = 0;
  const coupon = couponCode ? COUPONS[couponCode.toUpperCase()] : null;
  if (coupon) {
    discount = coupon.type === 'percent'
      ? Math.round(subtotal * coupon.value / 100)
      : coupon.value;
    discount = Math.min(discount, subtotal);
  }

  const afterDiscount = subtotal - discount;
  const shipping      = afterDiscount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const gst           = Math.round(afterDiscount * GST_RATE);
  const total         = afterDiscount + shipping + gst;

  return { subtotal, discount, afterDiscount, shipping, gst, total };
}

/* ---- Format currency ---- */
function fmt(n) {
  return '₹' + n.toLocaleString('en-IN');
}

/* ---- Navbar badge ---- */
function updateNavBadge() {
  const el = document.getElementById('nav-cart-count');
  if (!el) return;
  const count = getCartCount();
  el.textContent = count;
  el.style.display = count > 0 ? 'flex' : 'none';
}

/* ---- Toast ---- */
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  toast.innerHTML = `<span class="material-symbols-outlined text-base" style="font-variation-settings:'FILL' 1">${icon}</span>${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

/* ---- Active coupon state ---- */
let activeCoupon = localStorage.getItem(COUPON_KEY) || '';

/* ---- Render cart items ---- */
function renderCartItems() {
  const cart     = getCart();
  const list     = document.getElementById('cart-items-list');
  const content  = document.getElementById('cart-content');
  const empty    = document.getElementById('empty-cart');
  const skeleton = document.getElementById('skeleton-loader');
  const badge    = document.getElementById('item-count-badge');

  skeleton.style.display = 'none';

  if (!cart.length) {
    content.style.display = 'none';
    empty.classList.add('visible');
    if (badge) badge.textContent = '';
    return;
  }

  empty.classList.remove('visible');
  content.style.display = 'grid';
  if (badge) badge.textContent = `(${getCartCount()} item${getCartCount() > 1 ? 's' : ''})`;

  list.innerHTML = cart.map(item => {
    const p = CATALOG[item.id];
    if (!p) return '';
    const lineTotal = p.price * item.qty;
    return `
    <div class="cart-item" id="cart-item-${p.id}">
      <img class="cart-item__img" src="${p.img}" alt="${p.name}" loading="lazy"/>
      <div class="min-w-0">
        <span class="inline-block px-2 py-0.5 rounded-full bg-surface-container text-primary text-[10px] font-semibold tracking-widest uppercase mb-1">${p.category}</span>
        <h3 class="font-title-md text-primary text-base leading-tight mb-1">${p.name}</h3>
        <p class="text-secondary font-semibold text-sm">${fmt(p.price)} <span class="text-on-surface-variant font-normal">/ unit</span></p>
      </div>
      <div class="cart-item__actions flex flex-col items-end gap-3">
        <button class="remove-btn" onclick="handleRemove('${p.id}')" title="Remove item">
          <span class="material-symbols-outlined text-xl">delete_outline</span>
        </button>
        <div class="qty-control">
          <button class="qty-btn" onclick="handleQty('${p.id}', ${item.qty - 1})" ${item.qty <= 1 ? 'disabled' : ''}>
            <span class="material-symbols-outlined text-lg">remove</span>
          </button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="handleQty('${p.id}', ${item.qty + 1})" ${item.qty >= 10 ? 'disabled' : ''}>
            <span class="material-symbols-outlined text-lg">add</span>
          </button>
        </div>
        <span class="font-title-md text-primary font-bold text-base">${fmt(lineTotal)}</span>
      </div>
    </div>`;
  }).join('');

  renderSummary();
}

/* ---- Render order summary ---- */
function renderSummary() {
  const cart    = getCart();
  const pricing = calcPricing(cart, activeCoupon);

  // Mini items list
  const summaryItems = document.getElementById('summary-items');
  summaryItems.innerHTML = cart.map(item => {
    const p = CATALOG[item.id];
    if (!p) return '';
    return `
    <div class="flex items-center gap-2">
      <img class="w-10 h-10 rounded-lg object-cover bg-surface-container flex-shrink-0" src="${p.img}" alt="${p.name}"/>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-semibold text-primary truncate font-headline-lg">${p.name}</p>
        <p class="text-[11px] text-on-surface-variant">Qty: ${item.qty}</p>
      </div>
      <span class="text-xs font-bold text-primary font-headline-lg whitespace-nowrap">${fmt(p.price * item.qty)}</span>
    </div>`;
  }).join('');

  // Pricing breakdown
  const breakdown = document.getElementById('pricing-breakdown');
  let html = `
    <div class="summary-row"><span>Subtotal</span><span>${fmt(pricing.subtotal)}</span></div>`;

  if (pricing.discount > 0) {
    const c = COUPONS[activeCoupon.toUpperCase()];
    html += `<div class="summary-row discount"><span>Discount (${c ? c.label : ''})</span><span>−${fmt(pricing.discount)}</span></div>`;
  }

  html += `<div class="summary-row ${pricing.shipping === 0 ? 'free-shipping' : ''}">
    <span>${pricing.shipping === 0 ? '🎉 Shipping' : 'Shipping'}</span>
    <span>${pricing.shipping === 0 ? 'FREE' : fmt(pricing.shipping)}</span>
  </div>`;

  html += `<div class="summary-row"><span>GST (18%)</span><span>${fmt(pricing.gst)}</span></div>`;
  html += `<div class="summary-row total"><span>Total</span><span>${fmt(pricing.total)}</span></div>`;

  breakdown.innerHTML = html;

  // Shipping message
  const shippingMsg = document.getElementById('shipping-msg');
  if (pricing.shipping === 0) {
    shippingMsg.innerHTML = '<span style="color:#15803d">✓ Free shipping applied!</span>';
  } else {
    const needed = SHIPPING_THRESHOLD - pricing.afterDiscount;
    shippingMsg.textContent = needed > 0
      ? `Add ${fmt(needed)} more for free shipping`
      : 'Free shipping on orders above ₹5,000';
  }
}

/* ---- Handlers ---- */
function handleRemove(id) {
  const el = document.getElementById(`cart-item-${id}`);
  if (el) {
    el.classList.add('removing');
    setTimeout(() => {
      removeFromCart(id);
      renderCartItems();
      showToast('Item removed from cart', 'info');
    }, 350);
  }
}

function handleQty(id, newQty) {
  if (newQty < 1) return;
  updateQty(id, newQty);
  renderCartItems();
}

/* ---- Coupon ---- */
function applyCoupon() {
  const input  = document.getElementById('coupon-input');
  const msg    = document.getElementById('coupon-msg');
  const code   = input.value.trim().toUpperCase();

  input.classList.remove('error', 'success');
  msg.className = 'coupon-msg';

  if (!code) {
    input.classList.add('error');
    msg.className = 'coupon-msg error';
    msg.textContent = 'Please enter a coupon code.';
    return;
  }

  if (COUPONS[code]) {
    activeCoupon = code;
    localStorage.setItem(COUPON_KEY, code);
    input.classList.add('success');
    msg.className = 'coupon-msg success';
    msg.textContent = `✓ Coupon "${code}" applied — ${COUPONS[code].label}!`;
    renderSummary();
    showToast(`Coupon ${code} applied!`, 'success');
  } else {
    activeCoupon = '';
    localStorage.removeItem(COUPON_KEY);
    input.classList.add('error');
    msg.className = 'coupon-msg error';
    msg.textContent = 'Invalid coupon code. Try AZZURA10, WELLNESS20, or FIRST500.';
    showToast('Invalid coupon code', 'error');
  }
}

function tryCode(code) {
  document.getElementById('coupon-input').value = code;
  applyCoupon();
}

/* ---- Checkout ---- */
function proceedToCheckout() {
  const cart = getCart();
  if (!cart.length) { showToast('Your cart is empty!', 'error'); return; }
  window.location.href = 'checkout.html';
}

/* ---- Coupon input Enter key ---- */
document.addEventListener('DOMContentLoaded', () => {
  // Restore coupon
  const savedCoupon = localStorage.getItem(COUPON_KEY);
  if (savedCoupon && COUPONS[savedCoupon]) {
    activeCoupon = savedCoupon;
    const input = document.getElementById('coupon-input');
    const msg   = document.getElementById('coupon-msg');
    if (input) {
      input.value = savedCoupon;
      input.classList.add('success');
      msg.className = 'coupon-msg success';
      msg.textContent = `✓ Coupon "${savedCoupon}" applied — ${COUPONS[savedCoupon].label}!`;
    }
  }

  document.getElementById('coupon-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') applyCoupon();
  });

  updateNavBadge();
  renderCartItems();
  document.body.classList.add('loaded');
});

/* ---- Expose for other pages ---- */
window.AzzuraCart = { addToCart, removeFromCart, getCart, clearCart, getCartCount, CATALOG, fmt, calcPricing, SHIPPING_THRESHOLD, SHIPPING_COST, GST_RATE, COUPONS };
