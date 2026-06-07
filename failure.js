/* ================================================================
   failure.js — Azzura Failure Page Logic
   ================================================================ */

'use strict';

function initFailure() {
  const params = new URLSearchParams(window.location.search);
  
  const reason = params.get('reason');
  const orderId = params.get('order_id');

  if (reason) {
    document.getElementById('failure-reason').textContent = decodeURIComponent(reason);
  }
  
  if (orderId) {
    document.getElementById('order-id').textContent = orderId;
  }

  document.body.classList.add('loaded');
}

document.addEventListener('DOMContentLoaded', initFailure);
