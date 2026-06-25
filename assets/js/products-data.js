/* ============================================================
   AZZURRA PHARMACONUTRITION — PRODUCT DATA
   Auto-generated from cloudinary-products-map.json
   ============================================================
   Total products : 24
   Series found   : Essential Series, Others
   Date generated : 2026-06-20
   ============================================================

   DO NOT EDIT image URLs or product keys manually — run the
   upload script to regenerate from Cloudinary:
     npm run upload-images

   Prices (price_inr) are set to 0 — update manually.
   ============================================================ */

'use strict';

/* ── Helper: convert raw folder key → human-readable title ── */
/**
 * formatFolderName("ESSENTIAL_BLCD_CHOCOLATE_350") → "Essential Blcd Chocolate 350"
 * formatFolderName("MICROEG-ALL-GUMMIES_30_ROSE")  → "Microeg All Gummies 30 Rose"
 */
function formatFolderName(raw) {
  return raw
    .replace(/[_\-\.]+/g, ' ')   /* underscores, hyphens, dots → space */
    .replace(/\s+/g, ' ')        /* collapse multiple spaces        */
    .trim()
    .split(' ')
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/* ── Helper: folder key → URL-safe id ───────────────────── */
/**
 * "ESSENTIAL_2.25_VANILLA" → "essential-2-25-vanilla"
 */
function folderId(raw) {
  return raw
    .toLowerCase()
    .replace(/[._]+/g, '-')   /* dots & underscores → dash */
    .replace(/-+/g, '-')      /* collapse dashes            */
    .replace(/^-|-$/g, '');   /* trim leading/trailing dash */
}

/* ── Helper: ensure f_auto,q_auto is in a Cloudinary URL ── */
/**
 * Inserts f_auto,q_auto after /image/upload/ if not already present.
 */
function withAuto(url) {
  if (!url) return url;
  if (url.indexOf('f_auto') !== -1) return url;   /* already has transforms */
  return url.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
}

/* ── Helper: apply a size transform to an auto-URL ───────── */
/**
 * withSize(url, 400) → …/f_auto,q_auto,w_400/…
 */
function withSize(url, w) {
  if (!url) return url;
  var base = withAuto(url);
  return base.replace('f_auto,q_auto/', 'f_auto,q_auto,w_' + w + '/');
}

/* ============================================================
   PRODUCTS ARRAY
   Every entry is derived from cloudinary-products-map.json.
   ============================================================ */
var PRODUCTS = [

  /* ══════════════════════════════════════════════════════════
     SERIES: ESENTIAL_SERIES  →  "Essential Series"
     18 products
     ══════════════════════════════════════════════════════════ */

  {
    id:               'essential-2-25-vanilla',
    name:             'Essential 2 25 Vanilla',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_2.25_VANILLA',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-150.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-152.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-153.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-154.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-155.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-344.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-345.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-346.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-347.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-348.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-349.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-350.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-351.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-352.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-353.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-354.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-355.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_2.25_VANILLA/AZZURA_PRODUCTS-356.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       true,   /* first in series */
    detailPage:       'product-detail.html?id=essential-2-25-vanilla'
  },

  {
    id:               'essential-blcd-chocolate-350',
    name:             'Essential Blcd Chocolate 350',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_BLCD_CHOCOLATE_350',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-269.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-270.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-271.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-272.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-273.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-274.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-275.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-276.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-277.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-31.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-32.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-33.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-34.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_CHOCOLATE_350/AZZURA_PRODUCTS-35.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Chocolate', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-blcd-chocolate-350'
  },

  {
    id:               'essential-blcd-mango-350g-yellow',
    name:             'Essential Blcd Mango 350G Yellow',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_BLCD_MANGO_350G_YELLOW',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-13.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-14.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-15.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-17.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-229.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-231.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-232.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-233.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-234.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-235.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_MANGO_350G_YELLOW/AZZURA_PRODUCTS-236.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Mango', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-blcd-mango-350g-yellow'
  },

  {
    id:               'essential-blcd-vanilla-350-pink',
    name:             'Essential Blcd Vanilla 350 Pink',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_BLCD_VANILLA_350_PINK',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-263.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-264.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-265.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-266.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-267.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-268.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-44.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-45.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-46.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-47.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-48.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_BLCD_VANILLA_350_PINK/AZZURA_PRODUCTS-49.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-blcd-vanilla-350-pink'
  },

  {
    id:               'essential-dm-1kg-vanilla',
    name:             'Essential Dm 1Kg Vanilla',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_DM_1KG_VANILLA',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-135.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-137.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-138.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-139.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-140.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-226.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-227.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-228.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-336.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-337.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-338.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-339.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-340.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-342.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_DM_1KG_VANILLA/AZZURA_PRODUCTS-343.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-dm-1kg-vanilla'
  },

  {
    id:               'essential-plus-vanilla-yellow',
    name:             'Essential Plus Vanilla Yellow',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_PLUS_VANILLA_YELLOW',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-18.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-20.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-211.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-212.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-213.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-214.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-215.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-217.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-22.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_PLUS_VANILLA_YELLOW/AZZURA_PRODUCTS-24.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-plus-vanilla-yellow'
  },

  {
    id:               'essential-vanilla-blue',
    name:             'Essential Vanilla Blue',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_VANILLA_BLUE',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-205.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-207.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-208.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-209.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-210.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-38.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-39.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-41.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-42.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BLUE/AZZURA_PRODUCTS-43.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-vanilla-blue'
  },

  {
    id:               'essential-vanilla-brown',
    name:             'Essential Vanilla Brown',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_VANILLA_BROWN',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-165.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-166.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-167.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-168.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-170.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-171.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-84.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-86.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-87.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-89.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-90.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_BROWN/AZZURA_PRODUCTS-91.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-vanilla-brown'
  },

  {
    id:               'essential-vanilla-cyan',
    name:             'Essential Vanilla Cyan',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_VANILLA_CYAN',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-1.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-199.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-2.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-200.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-202.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-203.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-204.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-3.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-4.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-5.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_CYAN/AZZURA_PRODUCTS-6.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-vanilla-cyan'
  },

  {
    id:               'essential-vanilla-dark-blue',
    name:             'Essential Vanilla Dark Blue',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_VANILLA_DARK_BLUE',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_BLUE/AZZURA_PRODUCTS-101.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_BLUE/AZZURA_PRODUCTS-102.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_BLUE/AZZURA_PRODUCTS-218.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_BLUE/AZZURA_PRODUCTS-219.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_BLUE/AZZURA_PRODUCTS-220.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_BLUE/AZZURA_PRODUCTS-221.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_BLUE/AZZURA_PRODUCTS-222.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_BLUE/AZZURA_PRODUCTS-223.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_BLUE/AZZURA_PRODUCTS-99.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-vanilla-dark-blue'
  },

  {
    id:               'essential-vanilla-dark-green',
    name:             'Essential Vanilla Dark Green',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_VANILLA_DARK_GREEN',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-141.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-142.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-143.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-145.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-146.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-147.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-148.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-326.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-327.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-328.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-329.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-330.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-331.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-332.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-333.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_DARK_GREEN/AZZURA_PRODUCTS-334.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-vanilla-dark-green'
  },

  {
    id:               'essential-vanilla-green',
    name:             'Essential Vanilla Green',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_VANILLA_GREEN',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-10.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-11.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-12.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-186.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-187.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-188.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-189.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-190.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-191.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-7.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-8.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_GREEN/AZZURA_PRODUCTS-9.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-vanilla-green'
  },

  {
    id:               'essential-vanilla-pink',
    name:             'Essential Vanilla Pink',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_VANILLA_PINK',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-192.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-193.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-194.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-195.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-196.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-197.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-198.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-92.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-93.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-94.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-95.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-96.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_PINK/AZZURA_PRODUCTS-97.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-vanilla-pink'
  },

  {
    id:               'essential-vanilla-red',
    name:             'Essential Vanilla Red',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_VANILLA_RED',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-172.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-173.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-174.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-175.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-176.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-177.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-58.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-59.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-61.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-62.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-64.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_RED/AZZURA_PRODUCTS-65.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-vanilla-red'
  },

  {
    id:               'essential-vanilla-yellow',
    name:             'Essential Vanilla Yellow',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'ESSENTIAL_VANILLA_YELLOW',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-121.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-122.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-123.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-125.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-126.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-127.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-128.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-156.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-157.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-158.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-161.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-162.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-163.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/ESSENTIAL_VANILLA_YELLOW/AZZURA_PRODUCTS-164.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Vanilla', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=essential-vanilla-yellow'
  },

  {
    id:               'fibero-essential-tf',
    name:             'Fibero Essential Tf',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'FIBERO_ESSENTIAL_TF',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-178.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-179.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-180.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-181.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-182.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-183.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-184.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-50.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-52.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-53.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/FIBERO_ESSENTIAL_TF/AZZURA_PRODUCTS-55.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Fibero', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=fibero-essential-tf'
  },

  {
    id:               'micro-essential-all-60cap',
    name:             'Micro Essential All 60Cap',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'MICRO_ESSENTIAL_ALL_60CAP',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-287.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-288.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-289.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-290.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-291.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-292.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-293.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-294.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-295.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_ALL_60CAP/AZZURA_PRODUCTS-82.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Micro', 'Capsules', 'Essential Series'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=micro-essential-all-60cap'
  },

  {
    id:               'micro-essential-b12-60cap',
    name:             'Micro Essential B12 60Cap',
    series:           'Essential Series',
    seriesKey:        'ESENTIAL_SERIES',
    productKey:       'MICRO_ESSENTIAL_B12_60CAP',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-278.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-279.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-280.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-281.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-282.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-283.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-284.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-285.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-286.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-71.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-74.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/ESENTIAL_SERIES/MICRO_ESSENTIAL_B12_60CAP/AZZURA_PRODUCTS-78.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Essential Series',
    tags:             ['Micro', 'B12', 'Capsules'],
    category:         'Essential Series',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=micro-essential-b12-60cap'
  },

  /* ══════════════════════════════════════════════════════════
     SERIES: OTHERS
     6 products
     ══════════════════════════════════════════════════════════ */

  {
    id:               'abc-protein-10x32g',
    name:             'Abc Protein 10X32G',
    series:           'Others',
    seriesKey:        'OTHERS',
    productKey:       'ABC_PROTEIN_10x32G',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/ABC_PROTEIN_10x32G/AZZURA_PRODUCTS-131.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/ABC_PROTEIN_10x32G/AZZURA_PRODUCTS-134.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/ABC_PROTEIN_10x32G/AZZURA_PRODUCTS-318.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/ABC_PROTEIN_10x32G/AZZURA_PRODUCTS-320.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/ABC_PROTEIN_10x32G/AZZURA_PRODUCTS-321.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/ABC_PROTEIN_10x32G/AZZURA_PRODUCTS-322.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/ABC_PROTEIN_10x32G/AZZURA_PRODUCTS-324.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Others',
    tags:             ['Protein', 'Others'],
    category:         'Others',
    inStock:          true,
    isFeatured:       true,   /* first in series */
    detailPage:       'product-detail.html?id=abc-protein-10x32g'
  },

  {
    id:               'eg-immune-gummies-30-mango',
    name:             'Eg Immune Gummies 30 Mango',
    series:           'Others',
    seriesKey:        'OTHERS',
    productKey:       'EG_IMMUNE_GUMMIES_30_MANGO',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-114.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-115.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-116.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-117.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-119.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-296.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-297.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-298.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-299.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-300.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-301.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-302.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-303.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-304.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_IMMUNE_GUMMIES_30_MANGO/AZZURA_PRODUCTS-305.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Others',
    tags:             ['Gummies', 'Mango', 'Immune'],
    category:         'Others',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=eg-immune-gummies-30-mango'
  },

  {
    id:               'eg-sleep-rose-30gummies',
    name:             'Eg Sleep Rose 30Gummies',
    series:           'Others',
    seriesKey:        'OTHERS',
    productKey:       'EG_SLEEP_ROSE_30GUMMIES',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-109.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-110.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-112.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-113.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-248.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-249.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-250.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-251.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-252.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-253.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/EG_SLEEP_ROSE_30GUMMIES/AZZURA_PRODUCTS-254.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Others',
    tags:             ['Gummies', 'Rose', 'Sleep'],
    category:         'Others',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=eg-sleep-rose-30gummies'
  },

  {
    id:               'glutamax-el-10x15gm-orange',
    name:             'Glutamax El 10X15Gm Orange',
    series:           'Others',
    seriesKey:        'OTHERS',
    productKey:       'GLUTAMAX_EL_10x15GM_ORANGE',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-25.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-255.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-256.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-257.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-259.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-260.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-261.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-262.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-27.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-28.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-29.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/GLUTAMAX_EL_10x15GM_ORANGE/AZZURA_PRODUCTS-30.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Others',
    tags:             ['Glutamax', 'Orange', 'Others'],
    category:         'Others',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=glutamax-el-10x15gm-orange'
  },

  {
    id:               'microeg-all-gummies-30-rose',
    name:             'Microeg All Gummies 30 Rose',
    series:           'Others',
    seriesKey:        'OTHERS',
    productKey:       'MICROEG-ALL-GUMMIES_30_ROSE',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-104.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-105.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-106.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-107.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-108.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-306.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-307.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-308.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-309.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-310.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-311.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-312.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-313.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-314.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-315.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-316.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/MICROEG-ALL-GUMMIES_30_ROSE/AZZURA_PRODUCTS-317.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Others',
    tags:             ['Gummies', 'Rose', 'Others'],
    category:         'Others',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=microeg-all-gummies-30-rose'
  },

  {
    id:               'thioeg-gummies-guava-flavour',
    name:             'Thioeg Gummies Guava Flavour',
    series:           'Others',
    seriesKey:        'OTHERS',
    productKey:       'THIOEG_GUMMIES_GUAVA_FLAVOUR',
    images: [
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-237.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-238.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-239.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-240.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-241.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-242.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-243.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-244.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-245.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-246.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-247.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-67.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-69.webp'),
      withAuto('https://res.cloudinary.com/dfiskvjbl/image/upload/azzurra/products/OTHERS/THIOEG_GUMMIES_GUAVA_FLAVOUR/AZZURA_PRODUCTS-70.webp')
    ],
    get imagePath() { return this.images[0]; },
    price_inr:        0,
    shortDescription: 'Clinical nutrition supplement — Others',
    tags:             ['Gummies', 'Guava', 'Others'],
    category:         'Others',
    inStock:          true,
    isFeatured:       false,
    detailPage:       'product-detail.html?id=thioeg-gummies-guava-flavour'
  }

];
/* ============================================================
   END OF PRODUCTS — 24 products total
   ============================================================ */

/* ── Expose size-transform helper so pages can use it ─────── */
/* withSize(url, 400)  → thumbnail  (shop card)               */
/* withSize(url, 600)  → featured   (homepage)                */
/* withSize(url, 800)  → gallery    (detail page)             */
/* withSize(url, 1600) → lightbox   (fullscreen)              */
var AzzurraImageHelpers = { withAuto: withAuto, withSize: withSize };

/* ── Developer verification log ──────────────────────────── */
var _seriesSet = {};
PRODUCTS.forEach(function(p) { _seriesSet[p.series] = true; });
console.log(
  'Azzurra Products Loaded: ' + PRODUCTS.length +
  ' products across ' + Object.keys(_seriesSet).length + ' series' +
  ' (' + Object.keys(_seriesSet).join(', ') + ')'
);
