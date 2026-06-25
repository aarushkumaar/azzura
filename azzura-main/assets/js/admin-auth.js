// ============================================================
// AZZURRA — Admin Auth Guard
// assets/js/admin-auth.js
//
// Usage (on every protected admin page):
//
//   import { checkIsAdmin, signOut } from '../assets/js/admin-auth.js';
//
//   // At the very top of your init(), before rendering anything:
//   const { user } = await checkIsAdmin();
//   // If the user is not an admin, this function redirects and never returns.
//
// ============================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ── Supabase client (single instance shared across the admin) ──
const SUPABASE_URL      = 'https://ilduyhuvpiqhvbnocqxf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZHV5aHV2cGlxaHZibm9jcXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTMxNTUsImV4cCI6MjA5NjM4OTE1NX0.uuC8dKajsnSSaiTx_wxNeapKPl4EV20s5phcRS-TaZg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Use PKCE flow — required for OAuth in static/SPA apps
    flowType: 'pkce',
    // Persist session in localStorage so it survives page refreshes
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Also expose on window for any legacy non-module inline scripts
window.supabaseClient = supabase;


// ============================================================
// showAuthLoading / hideAuthLoading
// Renders a full-screen loading overlay so admin content is
// never visible before the auth check completes.
// ============================================================
function showAuthLoading() {
  // Create overlay if it doesn't already exist
  if (document.getElementById('auth-loading-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'auth-loading-overlay';
  overlay.innerHTML = `
    <div class="auth-loading-inner">
      <div class="auth-loading-logo">AZZURRA</div>
      <div class="auth-loading-spinner"></div>
      <div class="auth-loading-text">Verifying access…</div>
    </div>
  `;

  // Inject inline styles so this works without admin.css being loaded yet
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .auth-loading-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .auth-loading-logo {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: #60a5fa;
    }
    .auth-loading-spinner {
      width: 36px;
      height: 36px;
      border: 3px solid rgba(96,165,250,0.2);
      border-top-color: #60a5fa;
      border-radius: 50%;
      animation: auth-spin 0.8s linear infinite;
    }
    .auth-loading-text {
      font-size: 13px;
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.05em;
    }
    @keyframes auth-spin {
      to { transform: rotate(360deg); }
    }
  `;

  document.head.appendChild(styleEl);
  // Prepend so it covers everything
  document.body.prepend(overlay);
}

function hideAuthLoading() {
  const overlay = document.getElementById('auth-loading-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.2s ease';
    setTimeout(() => overlay.remove(), 220);
  }
}


// ============================================================
// checkIsAdmin()
//
// 1. Shows a full-screen loading overlay immediately.
// 2. Calls supabase.auth.getUser() — returns null if not logged in.
// 3. Queries admin_users WHERE email = user.email.
// 4. If NOT logged in OR NOT in admin_users → redirects to login page.
// 5. If IS admin → hides overlay and returns { user }.
//
// Call this at the very start of every protected page's init().
// It will never resolve if the user is not an admin — the page
// redirects before any content can be shown.
// ============================================================
export async function checkIsAdmin({ loginPage = 'index.html' } = {}) {
  // Show the blocking overlay IMMEDIATELY — before any await
  showAuthLoading();

  try {
    // Step 1: Get authenticated user from Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      // Not logged in → go to login
      window.location.replace(loginPage);
      return new Promise(() => {}); // Never resolves
    }

    // Step 2: Check if this user's email is in admin_users
    const { data: adminRow, error: adminError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', user.email)
      .maybeSingle();

    if (adminError || !adminRow) {
      // Authenticated but NOT an admin → sign out and go home
      await supabase.auth.signOut();
      window.location.replace('../index.html');
      return new Promise(() => {}); // Never resolves
    }

    // ✅ Confirmed admin — remove the loading overlay
    hideAuthLoading();
    return { user };

  } catch (err) {
    // Network error or unexpected failure → fail safe, go to login
    console.error('[admin-auth] Unexpected error:', err);
    window.location.replace(loginPage);
    return new Promise(() => {}); // Never resolves
  }
}


// ============================================================
// signOut()
// Signs out the current user and redirects to login.
// ============================================================
export async function signOut({ loginPage = 'index.html' } = {}) {
  await supabase.auth.signOut();
  window.location.replace(loginPage);
}
