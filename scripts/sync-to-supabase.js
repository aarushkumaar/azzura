'use strict';
// ── Load env first ───────────────────────────────────────────────────────────
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

/**
 * scripts/sync-to-supabase.js
 *
 * Reads cloudinary-products-map.json and upserts all products into
 * the Supabase `products` table.
 *
 * Usage:  node scripts/sync-to-supabase.js
 *         npm run sync-products
 *         npm run upload-and-sync  (upload + sync in one command)
 */

const fs   = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL      = process.env.SUPABASE_URL      || 'https://ilduyhuvpiqhvbnocqxf.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

// Use service role key if available (bypasses RLS for server-side writes)
// Falls back to anon key — works fine because the products RLS policy allows
// authenticated writes, and we're not in a browser context here.
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

const ROOT   = path.join(__dirname, '..');
const MAP_PATH = path.join(ROOT, 'cloudinary-products-map.json');

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatName(str) {
  return String(str || '')
    .replace(/[_\-\.]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[\s_\.]+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '') || 'product';
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('');
  console.log('════════════════════════════════════════════════════════════');
  console.log(' Azzurra → Supabase Product Sync');
  console.log('════════════════════════════════════════════════════════════');

  // 1. Validate env
  if (!SUPABASE_URL) {
    console.error('✗ SUPABASE_URL is not set in .env');
    process.exit(1);
  }
  if (!SUPABASE_KEY) {
    console.error('✗ Neither SUPABASE_SERVICE_ROLE_KEY nor SUPABASE_ANON_KEY is set in .env');
    process.exit(1);
  }
  console.log('  Supabase URL:', SUPABASE_URL);
  console.log('  Key type    :', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'service_role' : 'anon');

  // 2. Read cloudinary-products-map.json
  if (!fs.existsSync(MAP_PATH)) {
    console.error('✗ cloudinary-products-map.json not found at:', MAP_PATH);
    console.error('  Run: npm run upload-new-images  first.');
    process.exit(1);
  }
  let map;
  try {
    map = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
  } catch (err) {
    console.error('✗ Failed to parse cloudinary-products-map.json:', err.message);
    process.exit(1);
  }

  // 3. Build product rows
  const rows = [];
  for (const [seriesKey, productsObj] of Object.entries(map)) {
    for (const [productKey, urlArray] of Object.entries(productsObj)) {
      rows.push({
        name:              formatName(productKey),
        series:            formatName(seriesKey),
        image_folder:      `${seriesKey}/${productKey}`,
        images:            JSON.stringify(urlArray),
        price_inr:         0,
        short_description: `Clinical nutrition supplement — ${formatName(seriesKey)}`,
        tags:              '',
        benefits:          '',
        ingredients:       '',
        how_to_use:        '',
        nutrition_facts:   '',
        warnings:          '',
        flavour:           '',
        in_stock:          true,
        is_featured:       false,
      });
    }
  }

  if (rows.length === 0) {
    console.error('✗ No products found in cloudinary-products-map.json — nothing to sync.');
    process.exit(1);
  }

  console.log(`\n  Products to sync: ${rows.length}`);
  for (const row of rows) {
    console.log(`    • ${row.series} / ${row.name}`);
  }
  console.log('');

  // 4. Initialize Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // 5. Upsert in batches of 50
  //    Conflict target: `name` (must be UNIQUE in the table — or use image_folder)
  //    We use image_folder as it is more stable than name
  const BATCH_SIZE = 50;
  let   totalSynced = 0;
  let   totalErrors = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);

    // Try upsert on `name` first; if that fails (e.g. no unique constraint yet)
    // fall back to plain insert with ignoreDuplicates
    const { data, error } = await supabase
      .from('products')
      .upsert(batch, {
        onConflict:       'name',
        ignoreDuplicates: false,   // update existing rows with new image URLs
      });

    if (error) {
      // If the upsert fails because `name` has no unique index, try insert
      // with ignoreDuplicates so at least new products get added
      console.warn(`  ⚠️  Upsert failed (${error.message}), trying insert…`);
      const { data: iData, error: iError } = await supabase
        .from('products')
        .insert(batch, { ignoreDuplicates: true });

      if (iError) {
        console.error(`  ✗ Batch ${Math.floor(i / BATCH_SIZE) + 1} insert failed: ${iError.message}`);
        totalErrors += batch.length;
        continue;
      }
    }

    totalSynced += batch.length;
    const done = Math.min(i + BATCH_SIZE, rows.length);
    console.log(`  ✓ Batch ${Math.floor(i / BATCH_SIZE) + 1}: synced ${done}/${rows.length}`);
  }

  // 6. Summary
  console.log('');
  console.log('════════════════════════════════════════════════════════════');
  console.log(' Sync Complete');
  console.log(`  ✓ Synced : ${totalSynced} products`);
  if (totalErrors > 0) {
    console.log(`  ✗ Errors : ${totalErrors} products`);
    console.log('    Check the error messages above.');
  }
  console.log('════════════════════════════════════════════════════════════');
  console.log('');
  console.log('Next steps:');
  console.log('  1.  npx serve . -p 3000');
  console.log('  2.  http://localhost:3000/productss.html  — shop shows Supabase products');
  console.log('  3.  http://localhost:3000/admin-login.html — admin panel');
  console.log('');
}

main().catch(err => {
  console.error('\nFATAL:', err.message || err);
  process.exit(1);
});
