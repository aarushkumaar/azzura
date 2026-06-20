#!/usr/bin/env node
/* ============================================================
   AZZURRA — CLOUDINARY BATCH UPLOAD SCRIPT
   scripts/upload-to-cloudinary.js

   Usage:
     node scripts/upload-to-cloudinary.js
     npm run upload-images

   Reads from: C:\Users\aarus\AARUSH\PHOTOS\AZZURA\photoshoot_1\PRODUCTS_SORTED
   Expected structure:
     PRODUCTS_SORTED/
       [Series Folder]/
         [Product Folder]/
           image1.jpg
           image2.jpg
           ...

   For each image:
     1. Converts to WebP in memory using Sharp (no disk writes)
     2. Uploads to Cloudinary under:
        azzurra/products/[Series]/[Product]/[basename]
     3. Reports progress per file

   Outputs:
     cloudinary-upload-manifest.json  — flat array of all uploaded files
     cloudinary-products-map.json     — nested Series > Product > [urls]
   ============================================================ */

'use strict';

require('dotenv').config();   /* loads CLOUDINARY_URL from .env */

const fs        = require('fs');
const path      = require('path');
const sharp     = require('sharp');
const cloudinary = require('cloudinary').v2;

/* ── Config ──────────────────────────────────────────────── */

const PRODUCTS_ROOT = path.resolve(
  'C:\\Users\\aarus\\AARUSH\\PHOTOS\\AZZURA\\photoshoot_1\\PRODUCTS_SORTED'
);

const PROJECT_ROOT = path.resolve(__dirname, '..');   /* azzura/ */

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']);

const CLOUD_NAME = 'dfiskvjbl';

/* ── Cloudinary auto-configures from CLOUDINARY_URL in .env ─ */
/* cloudinary.config() is called automatically via the env var  */

/* ── Helpers ─────────────────────────────────────────────── */

/**
 * Recursively find all image files under `dir`.
 * Returns an array of absolute file paths.
 */
function findImages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findImages(full));
    } else if (IMAGE_EXTS.has(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Derive (series, product, basename) from an absolute image path.
 * Path structure: PRODUCTS_SORTED / [series] / [product] / file.jpg
 */
function parsePath(filePath) {
  const rel  = path.relative(PRODUCTS_ROOT, filePath);  /* series/product/file.jpg */
  const parts = rel.split(path.sep);
  if (parts.length < 3) {
    throw new Error('Unexpected path depth (expected series/product/file): ' + rel);
  }
  const series    = parts[0];
  const product   = parts[1];
  const basename  = path.basename(filePath, path.extname(filePath));
  return { series, product, basename };
}

/**
 * Build the Cloudinary public_id for a given image.
 * All slashes use forward slash (Cloudinary requirement).
 */
function buildPublicId(series, product, basename) {
  /* Sanitise folder names: replace spaces & special chars with hyphens */
  const sanitise = s => s.replace(/[^a-zA-Z0-9.\-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return [
    'azzurra', 'products',
    sanitise(series),
    sanitise(product),
    sanitise(basename)
  ].join('/');
}

/**
 * Build the full Cloudinary delivery URL from a public_id.
 * No transformation params — the frontend applies them at render time.
 */
function buildUrl(publicId) {
  return 'https://res.cloudinary.com/' + CLOUD_NAME + '/image/upload/' + publicId + '.webp';
}

/**
 * Convert an image file to WebP buffer using Sharp (in memory).
 */
async function toWebpBuffer(filePath) {
  return sharp(filePath)
    .webp({ quality: 85 })
    .toBuffer();
}

/**
 * Upload a WebP buffer to Cloudinary via upload_stream.
 */
function uploadBuffer(buffer, publicId) {
  return new Promise(function(resolve, reject) {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id:        publicId,
        resource_type:    'image',
        format:           'webp',
        quality:          'auto:good',
        overwrite:        false,
        use_filename:     false,
        unique_filename:  false
      },
      function(error, result) {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

/* ── Main ─────────────────────────────────────────────────── */

async function main() {
  /* ── Preflight checks ── */
  if (!process.env.CLOUDINARY_URL) {
    console.error('\n✗ CLOUDINARY_URL is not set in your .env file.');
    console.error('  Add: CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name\n');
    process.exit(1);
  }

  if (!fs.existsSync(PRODUCTS_ROOT)) {
    console.error('\n✗ Products folder not found:\n  ' + PRODUCTS_ROOT + '\n');
    process.exit(1);
  }

  console.log('\n════════════════════════════════════════════════════════');
  console.log('  AZZURRA — Cloudinary Batch Upload');
  console.log('  Cloud: ' + CLOUD_NAME);
  console.log('  Source: ' + PRODUCTS_ROOT);
  console.log('════════════════════════════════════════════════════════\n');

  /* ── Discover images ── */
  const imagePaths = findImages(PRODUCTS_ROOT);
  console.log('Found ' + imagePaths.length + ' image(s). Starting upload…\n');

  /* ── Results tracking ── */
  const manifest   = [];   /* flat array for manifest JSON */
  const productsMap = {};  /* nested Series > Product > [url, …] */
  let successCount = 0;
  let failCount    = 0;

  /* ── Process each image sequentially ── */
  for (let i = 0; i < imagePaths.length; i++) {
    const filePath = imagePaths[i];
    const progress = '[' + (i + 1) + '/' + imagePaths.length + ']';

    let series, product, basename;
    try {
      ({ series, product, basename } = parsePath(filePath));
    } catch (err) {
      console.log('  ✗ Skipped (bad path): ' + filePath + ' — ' + err.message);
      failCount++;
      continue;
    }

    const publicId = buildPublicId(series, product, basename);

    try {
      /* Convert → upload */
      const buffer = await toWebpBuffer(filePath);
      await uploadBuffer(buffer, publicId);

      const cloudinaryUrl = buildUrl(publicId);

      console.log('  ✓ ' + progress + ' Uploaded: ' + publicId);

      /* Flat manifest entry */
      manifest.push({
        series:       series,
        product:      product,
        filename:     basename + '.webp',
        publicId:     publicId,
        cloudinaryUrl: cloudinaryUrl
      });

      /* Nested map entry */
      if (!productsMap[series]) productsMap[series] = {};
      if (!productsMap[series][product]) productsMap[series][product] = [];
      productsMap[series][product].push(cloudinaryUrl);

      successCount++;

    } catch (err) {
      /* "already exists" is not a true failure when overwrite: false */
      if (err.http_code === 400 && err.message && err.message.includes('already exists')) {
        const cloudinaryUrl = buildUrl(publicId);
        console.log('  ⟳ ' + progress + ' Already exists (skipped): ' + publicId);

        manifest.push({
          series:       series,
          product:      product,
          filename:     basename + '.webp',
          publicId:     publicId,
          cloudinaryUrl: cloudinaryUrl
        });

        if (!productsMap[series]) productsMap[series] = {};
        if (!productsMap[series][product]) productsMap[series][product] = [];
        productsMap[series][product].push(cloudinaryUrl);

        successCount++;
      } else {
        console.log('  ✗ ' + progress + ' Failed: ' + filePath);
        console.log('       Error: ' + (err.message || err));
        failCount++;
      }
    }
  }

  /* ── Write output JSON files ── */
  const manifestPath   = path.join(PROJECT_ROOT, 'cloudinary-upload-manifest.json');
  const productsMapPath = path.join(PROJECT_ROOT, 'cloudinary-products-map.json');

  fs.writeFileSync(manifestPath,    JSON.stringify(manifest,    null, 2), 'utf8');
  fs.writeFileSync(productsMapPath, JSON.stringify(productsMap, null, 2), 'utf8');

  /* ── Summary ── */
  console.log('\n════════════════════════════════════════════════════════');
  console.log('  Upload complete');
  console.log('  ✓ Succeeded : ' + successCount);
  console.log('  ✗ Failed    : ' + failCount);
  console.log('  Total       : ' + imagePaths.length);
  console.log('');
  console.log('  Written:');
  console.log('    ' + manifestPath);
  console.log('    ' + productsMapPath);
  console.log('════════════════════════════════════════════════════════\n');

  if (failCount > 0) process.exit(1);
}

main().catch(function(err) {
  console.error('\n✗ Fatal error:', err.message || err);
  process.exit(1);
});
