/* ============================================================
   AZZURRA — Customer Authentication (customer-auth.js)
   Handles customer sign-up, sign-in, sign-out, session mgmt.
   Uses Supabase Auth — same project as admin but separate flow.
   Customer session stored in Supabase's default localStorage keys.
   ============================================================ */
'use strict';

(function () {
  var SUPABASE_URL      = 'https://ilduyhuvpiqhvbnocqxf.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZHV5aHV2cGlxaHZibm9jcXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTMxNTUsImV4cCI6MjA5NjM4OTE1NX0.uuC8dKajsnSSaiTx_wxNeapKPl4EV20s5phcRS-TaZg';

  /* ── Supabase client for customers ── */
  var _sbClient = null;
  function getClient() {
    if (!_sbClient) {
      if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        _sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: { storageKey: 'azzurra_customer_auth' }
        });
      }
    }
    return _sbClient;
  }

  /* ── Get current session ── */
  window.getCustomerSession = async function () {
    var sb = getClient();
    if (!sb) return null;
    try {
      var res = await sb.auth.getSession();
      return res.data && res.data.session ? res.data.session : null;
    } catch (_) { return null; }
  };

  /* ── Get current user (lightweight check) ── */
  window.getCurrentCustomer = async function () {
    var session = await window.getCustomerSession();
    return session ? session.user : null;
  };

  /* ── Sign Up ── */
  window.customerSignUp = async function (email, password, fullName) {
    var sb = getClient();
    if (!sb) throw new Error('Auth not available');
    var res = await sb.auth.signUp({
      email: email,
      password: password,
      options: { data: { full_name: fullName || '' } }
    });
    if (res.error) throw res.error;
    /* Create a customer_profiles row immediately */
    if (res.data && res.data.user) {
      await sb.from('customer_profiles').upsert({
        user_id:   res.data.user.id,
        full_name: fullName || '',
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id', ignoreDuplicates: false }).then(function(){});
    }
    return res.data;
  };

  /* ── Sign In ── */
  window.customerSignIn = async function (email, password) {
    var sb = getClient();
    if (!sb) throw new Error('Auth not available');
    var res = await sb.auth.signInWithPassword({ email: email, password: password });
    if (res.error) throw res.error;
    /* Ensure profile row exists */
    if (res.data && res.data.user) {
      var name = (res.data.user.user_metadata && res.data.user.user_metadata.full_name) || '';
      await sb.from('customer_profiles').upsert({
        user_id:    res.data.user.id,
        full_name:  name,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id', ignoreDuplicates: false }).then(function(){});
    }
    return res.data;
  };

  /* ── Sign Out ── */
  window.customerSignOut = async function () {
    var sb = getClient();
    if (!sb) return;
    await sb.auth.signOut();
  };

  /* ── Forgot Password ── */
  window.customerForgotPassword = async function (email) {
    var sb = getClient();
    if (!sb) throw new Error('Auth not available');
    var redirectUrl = window.location.origin + '/customer-auth.html?mode=reset';
    var res = await sb.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
    if (res.error) throw res.error;
    return true;
  };

  /* ── Update Password (after reset link click) ── */
  window.customerUpdatePassword = async function (newPassword) {
    var sb = getClient();
    if (!sb) throw new Error('Auth not available');
    var res = await sb.auth.updateUser({ password: newPassword });
    if (res.error) throw res.error;
    return true;
  };

  /* ── Expose the Supabase client for dashboard use ── */
  window.getCustomerSupabase = getClient;

  /* ── Update account nav icon on all pages ── */
  async function updateAccountNav() {
    var accountLinks = document.querySelectorAll('.navbar__account-link, .navbar__account-btn');
    if (!accountLinks.length) return;
    var user = await window.getCurrentCustomer();
    accountLinks.forEach(function (el) {
      if (user) {
        var name = (user.user_metadata && user.user_metadata.full_name) ? user.user_metadata.full_name : user.email;
        var initials = name.trim().split(' ').map(function(w){ return w[0]; }).join('').toUpperCase().slice(0, 2);
        el.setAttribute('href', 'customer-dashboard.html');
        el.setAttribute('title', 'My Account — ' + name);
        el.setAttribute('aria-label', 'My Account');
        /* Replace icon with initials badge */
        var existing = el.querySelector('.navbar__account-initials');
        if (!existing) {
          el.innerHTML = '<span class="navbar__account-initials" aria-hidden="true">' + initials + '</span>';
        } else {
          existing.textContent = initials;
        }
      } else {
        var returnTo = encodeURIComponent(window.location.href);
        el.setAttribute('href', 'customer-auth.html?returnTo=' + returnTo);
        el.setAttribute('title', 'Sign In / Create Account');
        el.setAttribute('aria-label', 'Sign In');
        el.innerHTML = '<span aria-hidden="true">&#128100;</span>';
      }
    });
  }

  /* Run on every page that includes this script */
  document.addEventListener('DOMContentLoaded', function () {
    updateAccountNav();
  });

})();
