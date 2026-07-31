// ============================================================
// AZZURRA — Site Configuration
// All credentials are loaded from assets/js/env-config.js
// which is gitignored. Copy env-config.example.js → env-config.js
// and fill in your real values.
// ============================================================

// Keys are loaded from assets/js/env-config.js (gitignored)
// Copy env-config.example.js to env-config.js and fill in your values.
const SUPABASE_URL      = (window.__ENV__ && window.__ENV__.SUPABASE_URL)      || '';
const SUPABASE_ANON_KEY = (window.__ENV__ && window.__ENV__.SUPABASE_ANON_KEY) || '';
const RAZORPAY_KEY_ID   = (window.__ENV__ && window.__ENV__.RAZORPAY_KEY_ID)   || '';

const SITE_CONFIG = {
  currency:       'INR',
  currencySymbol: '₹',
  checkoutUrl:    'checkout.html',
  siteName:       'Azzurra Pharmaconutrition',
};
