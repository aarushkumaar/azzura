/* ============================================================
   AZZURRA PHARMACONUTRITION — SHARED PRODUCT DATA
   ============================================================
   HOW TO ADD A NEW PRODUCT:
   1. Copy one of the objects below (starting with { id: ... })
   2. Paste it after the last product entry (before the closing ];)
   3. Add a comma after the previous product's closing brace }
   4. Fill in all the fields:
      - id          : a unique number (increment from the last one)
      - name        : the full product name as it should appear on the site
      - shortDesc   : one short sentence describing what it does
      - tags        : array of filter tags (e.g. ["protein", "essential", "recovery"])
      - price       : price in Indian Rupees as a number (e.g. 1800)
      - imagePath   : path to the product image from the root of the site
                      (e.g. "assets/products/My Product/images/1.jpg")
      - detailPage  : path to the product detail HTML page
                      (e.g. "product-my-product.html")
      - series      : which product series this belongs to (e.g. "Essential Series")
      - inStock     : true if available, false if out of stock
   5. Save the file — the product will automatically appear on both
      the homepage (featured section) and the shop page.
   ============================================================ */

const PRODUCTS = [

  /* ──────────────────────────────────────────────────────────
     PRODUCT 1 — Essential BLCD Chocolate
     Essential Balanced Low Calorie Diet, Chocolate flavour
  ────────────────────────────────────────────────────────── */
  {
    id: 1,
    name: "Essential BLCD Chocolate",
    shortDesc: "Balanced low-calorie diet formula enriched with essential vitamins and minerals — chocolate flavour.",
    tags: ["essential", "low-calorie", "multivitamin", "chocolate", "diabetes-friendly"],
    price: 1250,
    imagePath: "assets/products/essential blcd chocolate/IMAGES/1.jpg",
    detailPage: "product-detail.html?id=1",
    series: "Essential Series",
    inStock: true
  },

  /* ──────────────────────────────────────────────────────────
     PRODUCT 2 — Essential Peptide 400g
     Pre-digested elemental nutrition, Vanilla flavour
  ────────────────────────────────────────────────────────── */
  {
    id: 2,
    name: "Essential Peptide 400g",
    shortDesc: "Pre-digested peptide & MCT formula for GI dysfunction — complete elemental nutrition in vanilla.",
    tags: ["essential", "peptide", "protein", "MCT", "elemental", "vanilla", "GI-support"],
    price: 1800,
    imagePath: "assets/products/Essential Peptide 400g/images/1.jpg",
    detailPage: "product-detail.html?id=2",
    series: "Essential Series",
    inStock: true
  },

  /* ──────────────────────────────────────────────────────────
     PRODUCT 3 — Glutamax-EL
     Glutamine + Zinc + Selenium immune & recovery formula
  ────────────────────────────────────────────────────────── */
  {
    id: 3,
    name: "Glutamax-EL",
    shortDesc: "Glutamine supplement with zinc and selenium — supports immunity, protein synthesis, and muscle recovery.",
    tags: ["essential", "glutamine", "immune", "recovery", "zinc", "selenium", "orange"],
    price: 980,
    imagePath: "assets/products/Glutamax-EL/images/1.jpg",
    detailPage: "product-detail.html?id=3",
    series: "Essential Series",
    inStock: true
  },

  /* ──────────────────────────────────────────────────────────
     PRODUCT 4 — Essential Immuno-Plus
     Concentrated immune nutrition for hospitalised patients
     NOTE: Placeholder product — update imagePath and detailPage
           when the product folder is added to assets/products/
  ────────────────────────────────────────────────────────── */
  {
    id: 4,
    name: "Essential Immuno-Plus",
    shortDesc: "High-dose immune nutrition with arginine, omega-3, and nucleotides — designed for pre/post-surgical recovery.",
    tags: ["essential", "immune", "arginine", "omega-3", "surgical", "critical-care"],
    price: 2200,
    imagePath: "assets/products/essential blcd chocolate/IMAGES/1.jpg", /* Update when folder is added */
    detailPage: "product-essential-immuno-plus.html",
    series: "Essential Series",
    inStock: true
  },

  /* ──────────────────────────────────────────────────────────
     PRODUCT 5 — Essential RenaProtein
     Low-phosphorus, low-potassium protein for renal patients
     NOTE: Placeholder product — update imagePath and detailPage
           when the product folder is added to assets/products/
  ────────────────────────────────────────────────────────── */
  {
    id: 5,
    name: "Essential RenaProtein",
    shortDesc: "Renal-specific protein formula with restricted phosphorus and potassium — clinically designed for CKD management.",
    tags: ["essential", "renal", "CKD", "protein", "low-phosphorus", "kidney-care"],
    price: 1650,
    imagePath: "assets/products/Essential Peptide 400g/images/1.jpg", /* Update when folder is added */
    detailPage: "product-essential-renaprotein.html",
    series: "Essential Series",
    inStock: true
  }

];
/* ============================================================
   END OF PRODUCTS ARRAY — Add new products above this line
   ============================================================ */
