// ============================================================
// AZZURRA — Site Configuration (public credentials)
// The Supabase anon key is safe to expose — RLS protects data.
// Replace RAZORPAY_KEY_ID with your live/test key for checkout.
// ============================================================

const SUPABASE_URL      = 'https://ilduyhuvpiqhvbnocqxf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZHV5aHV2cGlxaHZibm9jcXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTMxNTUsImV4cCI6MjA5NjM4OTE1NX0.uuC8dKajsnSSaiTx_wxNeapKPl4EV20s5phcRS-TaZg';

// Public Razorpay Key ID (not the secret). Required for checkout.
const RAZORPAY_KEY_ID   = 'rzp_test_REPLACE_ME';

const SITE_CONFIG = {
  currency:       'INR',
  currencySymbol: '₹',
  checkoutUrl:    'checkout.html',
  siteName:       'Azzurra Pharmaconutrition',
};
