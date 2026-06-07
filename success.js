/* ================================================================
   success.js — Azzura Success Page Logic
   ================================================================ */

'use strict';

function initSuccess() {
  const params = new URLSearchParams(window.location.search);
  
  const paymentId = params.get('payment_id');
  const orderId = params.get('order_id');
  const amount = params.get('amount');
  const name = params.get('name');
  const email = params.get('email');

  if (!paymentId || !orderId) {
    // If accessed directly without params, redirect to shop
    window.location.href = 'productss.html';
    return;
  }

  // Populate data
  document.getElementById('customer-email').textContent = email || 'your email';
  document.getElementById('order-id').textContent = orderId;
  document.getElementById('payment-id').textContent = paymentId;
  document.getElementById('customer-name').textContent = name || 'Valued Customer';
  document.getElementById('amount-paid').textContent = `₹${Number(amount).toLocaleString('en-IN')}`;

  // Formatted date
  const now = new Date();
  const dateOptions = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  document.getElementById('order-date').textContent = now.toLocaleDateString('en-IN', dateOptions);

  generateConfetti();
  document.body.classList.add('loaded');
}

function generateConfetti() {
  const colors = ['#003674', '#0051d5', '#316bf3', '#15803d', '#ffffff'];
  const wrap = document.getElementById('confetti');
  
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    
    // Randomize
    const left = Math.random() * 100;
    const animDuration = 2 + Math.random() * 3;
    const animDelay = Math.random() * 1.5;
    const bg = colors[Math.floor(Math.random() * colors.length)];
    
    piece.style.left = left + '%';
    piece.style.backgroundColor = bg;
    piece.style.animationDuration = animDuration + 's';
    piece.style.animationDelay = animDelay + 's';
    
    wrap.appendChild(piece);
  }
}

document.addEventListener('DOMContentLoaded', initSuccess);
