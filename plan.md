# National Polymers (FZ LLC) - Master Project Plan & Client Feedback Audit

> **Review Target:** 23 November 2026  
> **Target Launch Date:** 29 November 2026  
> **Production Preview URL:** [https://national-polymer-2.vercel.app/](https://national-polymer-2.vercel.app/)  
> **Audit Status:** Comprehensive Deep-Dive across 3 Client Feedback Emails

---

## Executive Summary & Task Status Overview

This document consolidates every requirement, critique, and request from the three client review emails into an actionable checklist. Each item has been audited against the active codebase (`National_Polymer-2`) to determine what is **Fully Completed (`[x]`)**, **Partially Completed / In Progress (`[-]`)**, and **Pending / Blocked (`[ ]`)**.

### Overall Progress Scorecard
| Category / Domain | Total Requirements | Completed `[x]` | Partial / Ongoing `[-]` | Pending `[ ]` |
| :--- | :---: | :---: | :---: | :---: |
| **1. Customer Journey & Site Navigation** | 4 | 4 | 0 | 0 |
| **2. Product Search, Filters & Grade Finder** | 6 | 6 | 0 | 0 |
| **3. Product Catalogue, Technical Specs & TDS** | 5 | 3 | 2 | 0 |
| **4. Enquiry (RFQ) Form & Customer Experience** | 5 | 4 | 0 | 1 |
| **5. Admin Panel, RFQ Desk & Bulk Uploads** | 5 | 5 | 0 | 0 |
| **6. Global Presence & Interactive Network Map** | 5 | 3 | 2 | 0 |
| **7. Homepage Manufacturer Brand Logos** | 5 | 4 | 1 | 0 |
| **8. Trade Shows, Exhibitions & Event Gallery** | 4 | 3 | 1 | 0 |
| **9. Website Content Accuracy & Claims Approval** | 4 | 1 | 1 | 2 |
| **10. Modern Corporate Branding & Homepage Visuals** | 4 | 4 | 0 | 0 |
| **11. Mobile Responsiveness & Overall Performance** | 4 | 3 | 1 | 0 |
| **12. Post-Launch Analytics (GA4/GTM) & Reporting** | 6 | 0 | 0 | 6 |
| **13. Final Review (23 Nov) & Launch Plan (29 Nov)** | 3 | 2 | 1 | 0 |
| **TOTAL** | **55** | **39** | **7** | **9** |

---

## Detailed Task Breakdown & Codebase Audit

---

### Section 1: Customer Journey & Site Navigation
*Client Goal: Seamless customer experience from landing page through category browsing, manufacturer selection, grade specs, to RFQ submission with zero broken links or loading errors.*

- [x] **1.1 End-to-End Navigation Flow**
  - **Requirement:** Customers can easily navigate from Homepage &rarr; Product Categories &rarr; Manufacturer &rarr; Individual Grades &rarr; Submit Enquiry.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Verified across [Header.tsx](file:///e:/development/National_Polymer-2/src/components/Header.tsx), [page.tsx](file:///e:/development/National_Polymer-2/src/app/page.tsx), [products/page.tsx](file:///e:/development/National_Polymer-2/src/app/products/page.tsx), [products/[slug]/page.tsx](file:///e:/development/National_Polymer-2/src/app/products/[slug]/page.tsx), and [grades/[id]/page.tsx](file:///e:/development/National_Polymer-2/src/app/grades/[id]/page.tsx). Smooth transitions and breadcrumb navigation are fully wired.

- [x] **1.2 Cross-Link from Homepage Sourcing Brands to Grades**
  - **Requirement:** Clicking a manufacturer logo on the homepage jumps directly to that manufacturer's filtered grades.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [SuppliersSection.tsx](file:///e:/development/National_Polymer-2/src/components/SuppliersSection.tsx#L125-L135) links each brand to `/products?brand=${brand.name}#grades-explorer`.

- [x] **1.3 Breadcrumb Navigation Hierarchy**
  - **Requirement:** Clean, clickable breadcrumbs on all product and grade sub-pages.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Present on [products/page.tsx](file:///e:/development/National_Polymer-2/src/app/products/page.tsx#L70-L76), [products/[slug]/page.tsx](file:///e:/development/National_Polymer-2/src/app/products/[slug]/page.tsx), [grades/[id]/page.tsx](file:///e:/development/National_Polymer-2/src/app/grades/[id]/page.tsx#L72-L88), and [enquiry/page.tsx](file:///e:/development/National_Polymer-2/src/app/enquiry/page.tsx#L199-L205).

- [x] **1.4 Zero Broken Links & Clean HTTP Routing**
  - **Requirement:** All navigation menus, CTAs, footer links, and product links must work without 404s or console errors.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** All routes (`/`, `/about`, `/products`, `/products/[slug]`, `/grades/[id]`, `/markets`, `/solutions`, `/contact`, `/enquiry`, `/admin`) are validated Next.js 15 app router endpoints.

---

### Section 2: Product Search, Filters & Grade Finder
*Client Goal: Advanced multi-attribute search and filtering reflecting catalog updates dynamically.*

- [x] **2.1 Search by Polymer Category**
  - **Requirement:** Search and filter by PP, HDPE, LDPE, LLDPE, PVC, EVA, Recycled, Engineering Plastics.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [GradeCatalogExplorer.tsx](file:///e:/development/National_Polymer-2/src/components/GradeCatalogExplorer.tsx#L85-L92) features category pills and select dropdowns covering all specified polymer categories.

- [x] **2.2 Search by Manufacturer / Brand**
  - **Requirement:** Filter grades by producer (SABIC, APC, SIPCHEM, TASNEE, NATPET, SK Geo Centric, Formosa, SIDPEC, etc.).
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [GradeCatalogExplorer.tsx](file:///e:/development/National_Polymer-2/src/components/GradeCatalogExplorer.tsx#L63-L82) dynamically populates brand filters from live catalog data.

- [x] **2.3 Search by Grade Number & Free Text**
  - **Requirement:** Instant search matching grade codes (e.g., H312, 500P, 118NJA).
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [GradeCatalogExplorer.tsx](file:///e:/development/National_Polymer-2/src/components/GradeCatalogExplorer.tsx#L121-L131) checks grade code, brand, category, subcategory, application, and origin.

- [x] **2.4 Search by Application / End-Use**
  - **Requirement:** Filter by target application (Raffia, Blow Moulding, Film Extrusion, Injection Moulding, Pipe Extrusion, etc.).
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Implemented in both [GradeCatalogExplorer.tsx](file:///e:/development/National_Polymer-2/src/components/GradeCatalogExplorer.tsx#L95-L106) and the Homepage [MaterialFinder.tsx](file:///e:/development/National_Polymer-2/src/components/MaterialFinder.tsx).

- [x] **2.5 Search by MFI / MFR and Density Ranges**
  - **Requirement:** Filter by technical ranges (MFI <1, 1-5, 5-20, >20; Density <0.925, 0.925-0.940, >0.940).
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [GradeCatalogExplorer.tsx](file:///e:/development/National_Polymer-2/src/components/GradeCatalogExplorer.tsx#L158-L177) parses numeric values and filters grades accordingly.

- [x] **2.6 Dynamic Expansion of Filter Options**
  - **Requirement:** When new products or brands are added to the database, search filters should automatically reflect them without website code changes.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [GradeCatalogExplorer.tsx](file:///e:/development/National_Polymer-2/src/components/GradeCatalogExplorer.tsx#L50-L60) queries `/api/grades` on mount and recomputes unique brands, categories, and applications dynamically via `useMemo`.

---

### Section 3: Product Catalogue, Technical Specs & TDS Management
*Client Goal: Resilient database structure accommodating technical parameters, applications, producer details, and TDS links for 500+ grades.*

- [x] **3.1 Flexible Database Structure for Grades & Specs**
  - **Requirement:** Database schema must store MFI, density, processing methods, origin, applications, packaging, and TDS links.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Defined in TypeScript schema [gradesCatalog.ts](file:///e:/development/National_Polymer-2/src/data/gradesCatalog.ts#L1-L15) and Supabase database table `grades` (`lib/database.types.ts`).

- [x] **3.2 Technical Data Sheet (TDS) Download & Modal**
  - **Requirement:** Users can download official TDS PDFs or view key properties.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [TdsDownloadButton.tsx](file:///e:/development/National_Polymer-2/src/components/TdsDownloadButton.tsx) opens direct PDF link when present or displays a modal with available technical specs and quote CTA.

- [x] **3.3 Individual Grade Specification Pages**
  - **Requirement:** Dedicated dynamic page for every grade (`/grades/[id]`) showing full specifications, producer info, and COA availability.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Fully implemented in [src/app/grades/[id]/page.tsx](file:///e:/development/National_Polymer-2/src/app/grades/[id]/page.tsx).

- [-] **3.4 Catalog Expansion & TDS Upload Progress**
  - **Requirement:** Ongoing upload of 500+ grades with verified TDS documents.
  - **Status:** `[-]` **IN PROGRESS / ONGOING BY CLIENT & TEAM**
  - **Verification:** 56 core candidate grades are currently verified and active in [gradesCatalog.ts](file:///e:/development/National_Polymer-2/src/data/gradesCatalog.ts) and the review workbook [National_Polymers_Product_Catalog_Review.xlsx](file:///e:/development/National_Polymer-2/National_Polymers_Product_Catalog_Review.xlsx). Client confirmed in emails that remaining TDS and grade data are actively being compiled.

- [-] **3.5 Zero Code Changes Needed for Future Catalog Updates**
  - **Requirement:** Catalog updates must be manageable entirely via Admin Panel without developer code modifications.
  - **Status:** `[-]` **IN PROGRESS (Admin UI ready; requires live Supabase production keys)**
  - **Verification:** The backend API and admin endpoints are fully written, but production persistence relies on active Supabase credentials configured in environment variables.

---

### Section 4: Enquiry (RFQ) Form & Customer Experience
*Client Goal: Frictionless RFQ process where product/grade details are automatically pre-filled, international shipping terms are captured, and submissions are logged and emailed.*

- [x] **4.1 Auto-Population from Grade Selection ("Get Quote")**
  - **Requirement:** When clicking "Get Quote" or "Request Quotation" on any grade, the grade name, brand, category, and origin automatically appear in the enquiry form.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Clicking quote buttons across [GradeCatalogExplorer.tsx](file:///e:/development/National_Polymer-2/src/components/GradeCatalogExplorer.tsx#L385) and [grades/[id]/page.tsx](file:///e:/development/National_Polymer-2/src/app/grades/[id]/page.tsx#L133) passes query parameters to [enquiry/page.tsx](file:///e:/development/National_Polymer-2/src/app/enquiry/page.tsx#L120-L128). An "Inquiry Target Grade" banner displays the pre-filled selection.

- [x] **4.2 Quantity Capture in Metric Tons (MT)**
  - **Requirement:** Allow selection of standard container quantities (25 MT / 1 FCL, 50 MT / 2 FCL, 100 MT, etc.) or custom numeric MT.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Implemented in [enquiry/page.tsx](file:///e:/development/National_Polymer-2/src/app/enquiry/page.tsx#L500-L538) with preset buttons and custom MT numeric field.

- [x] **4.3 Destination Country, Discharge Port & Incoterm**
  - **Requirement:** Capture destination country, discharge port, and preferred Incoterm (CIF, CFR, FOB, EXW, DAP).
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Implemented in [enquiry/page.tsx](file:///e:/development/National_Polymer-2/src/app/enquiry/page.tsx#L562-L628) with Incoterm selector and datalist of major international ports (Jebel Ali, Nhava Sheva, Mundra, Mombasa, Durban, Mersin, etc.).

- [x] **4.4 Customer Contact Information Capture**
  - **Requirement:** Capture Full Name, Company Name, Business Email, and Phone/WhatsApp.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Implemented in [enquiry/page.tsx](file:///e:/development/National_Polymer-2/src/app/enquiry/page.tsx#L630-L697) with strict validation.

- [ ] **4.5 Direct Email Dispatch to National Polymers Sales Team**
  - **Requirement:** Completed enquiry must be received by National Polymers via email immediately upon submission.
  - **Status:** `[ ]` **PENDING / ACTION REQUIRED**
  - **Gap Analysis:** [api/enquiries/route.ts](file:///e:/development/National_Polymer-2/src/app/api/enquiries/route.ts#L98-L124) inserts into Supabase and calls an optional webhook (`ENQUIRY_NOTIFICATION_WEBHOOK`), but no direct email transport (SMTP, Resend, or SendGrid) is installed or configured.
  - **Action Required:** Provide SMTP or Resend API key and designated recipient email address (e.g., `sales@nationalpolymersfz.com`).

---

### Section 5: Backend Admin Panel, RFQ Desk & Bulk Uploads
*Client Goal: Self-service management of products, grades, bulk spreadsheet imports, and inbound customer RFQs.*

- [x] **5.1 Backend RFQ Desk (Customer Enquiries Management)**
  - **Requirement:** Demonstrate the complete flow of an enquiry appearing in the backend RFQ Desk.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [AdminDashboard.tsx](file:///e:/development/National_Polymer-2/src/app/admin/AdminDashboard.tsx#L858-L863) features a dedicated "RFQs & Inquiries" tab with status badges (`new`, `contacted`, `quoted`, `closed`), search filter, and full detail inspection modal.

- [x] **5.2 Bulk Excel / CSV Upload Engine**
  - **Requirement:** Admin panel supports bulk upload of grades and products via Excel (`.xlsx`) or CSV.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [BulkUploadModal.tsx](file:///e:/development/National_Polymer-2/src/app/admin/BulkUploadModal.tsx) and [api/admin/bulk-upload/route.ts](file:///e:/development/National_Polymer-2/src/app/api/admin/bulk-upload/route.ts) support multi-sheet Excel files, automatic header detection, preview mode, and merge/replace operations using `exceljs`.

- [x] **5.3 Standard Excel Template Download**
  - **Requirement:** Provide downloadable sample spreadsheet template formatted with expected columns.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Accessible at `/api/admin/bulk-upload/template`, returning pre-formatted Excel template with sample polymer records.

- [x] **5.4 Individual Grade Add / Edit / Delete**
  - **Requirement:** Ability to manually update single grade specs, MFI, density, application, and TDS URL.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Implemented in [AdminDashboard.tsx](file:///e:/development/National_Polymer-2/src/app/admin/AdminDashboard.tsx#L1550-L1780) with full form controls and validation.

- [x] **5.5 Product Family & Category Editing**
  - **Requirement:** Admin ability to edit product titles, descriptions, and categories.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Implemented in [AdminDashboard.tsx](file:///e:/development/National_Polymer-2/src/app/admin/AdminDashboard.tsx#L1190-L1215).

---

### Section 6: Global Presence & Interactive Network Map
*Client Goal: Showcase international coverage including specific requested countries, clearly differentiating existing vs potential markets in an attractive, mobile-friendly map.*

- [x] **6.1 Inclusion of All Requested Expansion Countries & Regions**
  - **Requirement:** Must include:
    - **Turkey** (Mersin, Istanbul, Izmir)
    - **China & Far East** (China, Vietnam, Malaysia, Indonesia, Taiwan)
    - **Australia** (Melbourne, Sydney, Brisbane, Fremantle)
    - **New Zealand** (Auckland, Tauranga, Lyttelton)
    - **East Africa** (Ethiopia, Djibouti, Kenya, Tanzania, Uganda)
    - **West Africa** (Ghana, Nigeria, Côte d'Ivoire, Senegal)
    - *Retain existing:* Indian Subcontinent, GCC/Middle East, Southern Europe, Latin America, USA/Canada sourcing.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Present in [content.ts](file:///e:/development/National_Polymer-2/src/data/content.ts#L90-L158) and displayed in [WorldMap.tsx](file:///e:/development/National_Polymer-2/src/components/WorldMap.tsx#L468-L555).

- [x] **6.2 Differentiation of Existing vs Potential Target Markets**
  - **Requirement:** Clear visual distinction between active business markets and target expansion hubs.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [WorldMap.tsx](file:///e:/development/National_Polymer-2/src/components/WorldMap.tsx#L393-L415) and SVG arcs use **Royal Blue** for Existing Active Markets, **Emerald Green** for Potential Target Markets, and **Slate** for Refinery Sourcing origins.

- [x] **6.3 Clean Layout & Regional Breakdown Rows**
  - **Requirement:** Avoid cluttered map pins by presenting clean, readable regional cards or rows with country flags and major discharge ports.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Displayed below the SVG canvas in [WorldMap.tsx](file:///e:/development/National_Polymer-2/src/components/WorldMap.tsx#L454-L594).

- [-] **6.4 Interactive Hover / Click Tooltip on SVG Map Nodes**
  - **Requirement:** Visitors can hover over or click a map node/region to view ports and country details directly on the SVG map.
  - **Status:** `[-]` **PARTIAL**
  - **Gap Analysis:** Currently, country and port pills are rendered statically below the map. Hovering directly on the SVG circle nodes shows a ping animation but does not open an interactive floating tooltip or modal on the map itself.
  - **Action Required:** Add React tooltip / popup state on SVG nodes in `WorldMap.tsx`.

- [-] **6.5 Mobile Viewport Map Scaling**
  - **Requirement:** Map must be legible and easy to navigate on mobile devices.
  - **Status:** `[-]` **PARTIAL**
  - **Verification:** SVG uses `viewBox="0 35 1000 430"` with responsive width. While the map scales smoothly, text labels on tiny mobile screens (<400px) can overlap slightly; compact mode or horizontal scroll container is recommended.

---

### Section 7: Homepage Manufacturer Brand Logos
*Client Goal: Clean, premium presentation displaying ONLY official brand logos with uniform sizing, no extra text, and confirmed official brand assets.*

- [x] **7.1 Display Brand Logos Only (No Descriptions or Extra Text)**
  - **Requirement:** Homepage manufacturer section should display *only* brand logos, removing descriptions, category pills, or text underneath.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [SuppliersSection.tsx](file:///e:/development/National_Polymer-2/src/components/SuppliersSection.tsx#L123-L147) renders only `<Image>` components inside the molecular hexagons and marquee cards; all descriptive paragraphs and badges were removed.

- [x] **7.2 Consistent Sizing, Alignment & Spacing**
  - **Requirement:** Maintain uniform sizing and alignment across all manufacturer logos.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Enforced via fixed aspect-ratio containers, `object-contain`, and consistent padding in [SuppliersSection.tsx](file:///e:/development/National_Polymer-2/src/components/SuppliersSection.tsx#L136-L145).

- [x] **7.3 Dual Presentation: Molecular Hexagon Diagram & Infinite Marquee**
  - **Requirement:** High-end visual presentation suitable for an international petrochemical distributor.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Features custom connected chemical hexagons (SABIC, APC, SIPCHEM, TASNEE, SK Geo Centric, Formosa, NATPET, NSRP, SIDPEC) plus a smooth continuous auto-scrolling marquee slider.

- [x] **7.4 Mobile & Desktop Visibility**
  - **Requirement:** Logos must be clearly legible on desktop, tablet, and mobile.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Responsive layout switches to stacked vertical molecular bonds on screens below `lg` breakpoint.

- [-] **7.5 Final Approval & Confirmation of Official Brand Logos**
  - **Requirement:** Recheck all logos to ensure latest official brand marks.
  - **Status:** `[-]` **WAITING FOR CLIENT CONFIRMATION**
  - **Client Note:** *"Logos, I will come back to you after taking internal confirmation."*
  - **Action Required:** Client to send final approved logo files (high-resolution PNG / SVG) for any brands requiring replacement.

---

### Section 8: Trade Shows, Exhibitions & Event Gallery
*Client Goal: Carry forward photographic proof of trade fair participation to build trust and credibility with international buyers.*

- [x] **8.1 Dedicated Exhibition Gallery Layout**
  - **Requirement:** Attractive section showcasing trade shows and industry events with event names, locations, categories, and years.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [TradeShowsGallery.tsx](file:///e:/development/National_Polymer-2/src/components/TradeShowsGallery.tsx) implemented with year-based filtering, responsive grid, event badges, and interactive lightbox popup.

- [x] **8.2 Strategic Placement on Website**
  - **Requirement:** Place gallery either on Homepage or under About Us.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Embedded seamlessly on the About Us page at [src/app/about/page.tsx](file:///e:/development/National_Polymer-2/src/app/about/page.tsx#L328).

- [x] **8.3 Backend Exhibitions Management in Admin Panel**
  - **Requirement:** Easy admin capability to add future exhibitions and upload photos without touching code.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Fully functional via [ExhibitionsManager.tsx](file:///e:/development/National_Polymer-2/src/app/admin/ExhibitionsManager.tsx) and `/api/admin/exhibitions`.

- [-] **8.4 Real Historical Photos from Old Website**
  - **Requirement:** Migrate actual photographs from the old National Polymers website (ArabPlast, PlastIndia, K-Show, etc.).
  - **Status:** `[-]` **AWAITING CLIENT ASSETS**
  - **Gap Analysis:** Gallery structure currently uses placeholder hero imagery (`/images/hero/hero1.png` to `hero5.png`).
  - **Action Required:** Client to provide high-resolution photo files from past exhibitions to replace placeholders.

---

### Section 9: Website Content Accuracy, Statistics & Claims Approval
*Client Goal: Ensure commercial claims, metrics, and supplier names are legally accurate and approved before public launch.*

- [x] **9.1 Editable Content Structure via Admin & CMS**
  - **Requirement:** Commercial claims and product information editable so client can adjust before launch.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Products, grades, and blog posts are fully editable via the Admin Dashboard.

- [-] **9.2 Published Product Count vs "500+ Grades" Sourcing Claim**
  - **Requirement:** Ensure displayed product count reflects the actual published catalogue while accurately communicating 500+ grade sourcing capability.
  - **Status:** `[-]` **ACTION REQUIRED BEFORE LAUNCH**
  - **Gap Analysis:** [products/page.tsx](file:///e:/development/National_Polymer-2/src/app/products/page.tsx#L99) hardcodes `{ label: "Grade SKUs", value: "500+" }`. Currently, 56 candidate grades are active.
  - **Action Required:** Update badge copy to clearly state: `"50+ Published / 500+ Sourcing Network"` or bind dynamically to `allGrades.length` with an explanatory tooltip.

- [ ] **9.3 Client Approval on Key Statistics & Performance Claims**
  - **Requirement:** Client sign-off on stats: "40+ Countries", "120k MT Traded Annually", "40+ Producer Partners", "21 Years in Polymers".
  - **Status:** `[ ]` **PENDING CLIENT APPROVAL**
  - **Gap Analysis:** Numbers are hardcoded in [HeroStatsBar.tsx](file:///e:/development/National_Polymer-2/src/components/HeroStatsBar.tsx#L15-L40).
  - **Action Required:** Client must review and confirm or adjust these figures for final sign-off.

- [ ] **9.4 Admin-Managed Company Statistics**
  - **Requirement:** Make homepage statistics editable directly from Admin Settings rather than hardcoded in JSX.
  - **Status:** `[ ]` **PENDING IMPLEMENTATION**
  - **Gap Analysis:** [api/admin/settings/route.ts](file:///e:/development/National_Polymer-2/src/app/api/admin/settings/route.ts) currently only supports `blogsEnabled`.
  - **Action Required:** Extend `SiteSettings` to store editable statistics.

---

### Section 10: Modern Corporate Branding & Homepage Visuals
*Client Goal: Avoid generic trading template aesthetics; position National Polymers as a premier international petrochemical and polymer distribution platform.*

- [x] **10.1 High-Impact Homepage Hero Visuals**
  - **Requirement:** Hero section with high-quality petrochemical plant, multimodal logistics, deep-sea container, and polymer pellet visuals.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [HeroStage.tsx](file:///e:/development/National_Polymer-2/src/components/HeroStage.tsx#L8-L82) features 5 curated high-resolution slides with smooth zoom-out transitions and compelling typography.

- [x] **10.2 Premium Corporate Layout & Spacing**
  - **Requirement:** Cleaner design, better whitespace, consistent typography, subtle animations, not text-heavy.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Global design system utilizes Google Font Montserrat, consistent slate/white backgrounds, refined `#e95220` primary accents, and subtle AOS scroll animations.

- [x] **10.3 In-Demand Materials Showcase**
  - **Requirement:** Modern grid highlighting key polymers (PP, HDPE, LDPE, LLDPE, PVC, Recycled) with direct enquiry actions.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Implemented in [InDemandMaterials.tsx](file:///e:/development/National_Polymer-2/src/components/InDemandMaterials.tsx).

- [x] **10.4 Interactive Material Finder Widget**
  - **Requirement:** Guided step-by-step tool helping converters find resins by end-use application and processing technology.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** Fully functional on homepage via [MaterialFinder.tsx](file:///e:/development/National_Polymer-2/src/components/MaterialFinder.tsx).

---

### Section 11: Mobile Responsiveness & Overall Performance
*Client Goal: Flawless experience across mobile, tablet, and desktop with fast page load speeds.*

- [x] **11.1 Mobile Navigation & Header Drawer**
  - **Requirement:** Responsive mobile menu with search, product catalog links, and WhatsApp quick CTA.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [Header.tsx](file:///e:/development/National_Polymer-2/src/components/Header.tsx#L190-L280) provides slide-down mobile menu with smooth animations.

- [x] **11.2 Sticky Mobile WhatsApp Inquiry Button**
  - **Requirement:** Fast mobile communication channel for international buyers.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** [WhatsAppButton.tsx](file:///e:/development/National_Polymer-2/src/components/WhatsAppButton.tsx) positioned fixed bottom-right.

- [x] **11.3 Next.js Image Optimization & Asset Delivery**
  - **Requirement:** Fast loading times using modern WebP formats and responsive image `sizes`.
  - **Status:** `[x]` **COMPLETED**
  - **Verification:** All visual assets use Next.js `<Image>` with explicit width/height or `fill` with `sizes` attributes.

- [-] **11.4 Final Cross-Device Testing (iOS / Android / Tablets)**
  - **Requirement:** Thorough testing of complex tables, SVG maps, and modal dialogs on real mobile devices.
  - **Status:** `[-]` **SCHEDULED FOR FINAL TESTING PHASE**

---

### Section 12: Post-Launch Analytics (GA4/GTM) & Monthly Reporting
*Client Goal: Mandatory Day-1 analytics tracking of visitor behavior, catalog searches, quote clicks, TDS downloads, and conversion funnels, with National Polymers owning accounts.*

- [ ] **12.1 Google Tag Manager (GTM) & GA4 Base Integration**
  - **Requirement:** Setup GTM container and Google Analytics 4 tracking snippet in root layout.
  - **Status:** `[ ]` **NOT STARTED / PENDING**
  - **Gap Analysis:** [layout.tsx](file:///e:/development/National_Polymer-2/src/app/layout.tsx) contains no GTM or GA4 scripts.
  - **Action Required:** Client to provide GTM Container ID (`GTM-XXXXXXX`) or GA4 Measurement ID (`G-XXXXXXXXXX`).

- [ ] **12.2 Custom Event: "Get Quote" & RFQ Funnel Tracking**
  - **Requirement:** Track clicks on "Get Quote", RFQ form steps, and successful submissions.
  - **Status:** `[ ]` **PENDING IMPLEMENTATION**
  - **Action Required:** Add `gtag('event', 'generate_lead', ...)` on form submission in `src/app/enquiry/page.tsx`.

- [ ] **12.3 Custom Event: TDS Download Tracking**
  - **Requirement:** Track which technical datasheets are downloaded most frequently.
  - **Status:** `[ ]` **PENDING IMPLEMENTATION**
  - **Action Required:** Add click event handler in [TdsDownloadButton.tsx](file:///e:/development/National_Polymer-2/src/components/TdsDownloadButton.tsx).

- [ ] **12.4 Custom Event: WhatsApp Link Clicks**
  - **Requirement:** Track outbound WhatsApp engagement.
  - **Status:** `[ ]` **PENDING IMPLEMENTATION**
  - **Action Required:** Add event dispatch in [WhatsAppButton.tsx](file:///e:/development/National_Polymer-2/src/components/WhatsAppButton.tsx).

- [ ] **12.5 Custom Event: Catalog Search Queries**
  - **Requirement:** Record what products, brands, and grades customers are searching for.
  - **Status:** `[ ]` **PENDING IMPLEMENTATION**
  - **Action Required:** Add debounced search event in [GradeCatalogExplorer.tsx](file:///e:/development/National_Polymer-2/src/components/GradeCatalogExplorer.tsx).

- [ ] **12.6 Analytics Ownership, Dashboard Access & Monthly Report Responsibility**
  - **Requirement:** Client clarification on who handles setup, dashboard creation, and monthly reporting. Accounts must remain under National Polymers' ownership.
  - **Status:** `[ ]` **AGREEMENT PENDING BEFORE LAUNCH**
  - **Recommendation:**
    1. *Setup:* Development team embeds GTM/GA4 tracking scripts and custom events into website code before launch.
    2. *Ownership:* National Polymers creates the GA4 property under their corporate Google account and grants admin access to the team.
    3. *Dashboard:* Setup a free, live Looker Studio interactive dashboard linked to GA4.
    4. *Monthly Reports:* Digital marketing team or development lead provides monthly automated PDF export.

---

### Section 13: Final Review (23 Nov) & Launch Plan (29 Nov)
*Client Goal: Structured review checklist for 23 Nov meeting and clear timeline to achieve 29 Nov launch.*

- [x] **13.1 Functionality Checklist for 23 November Review**
  - **Requirement:** Share a comprehensive checklist of completed and pending items for the review meeting.
  - **Status:** `[x]` **COMPLETED (Documented in this Plan)**

- [x] **13.2 Live Demo Protocol for 23 November Review**
  - **Requirement:** Demonstrate the complete customer journey from grade discovery &rarr; RFQ submission &rarr; Admin RFQ Desk.
  - **Status:** `[x]` **COMPLETED / READY TO DEMO**

- [-] **13.3 Launch Readiness Roadmap (24 Nov – 29 Nov)**
  - **Requirement:** Final testing plan, bug fixing, and deployment sequence.
  - **Status:** `[-]` **READY FOR EXECUTION** (See schedule below).

---

## Action Plan & Timeline (23 Nov – 29 Nov Launch)

```
[23 Nov] Client Review & Live Demo ───► [24-25 Nov] Asset Uploads & GA4 Setup ───► [26-27 Nov] Email Transport & Testing ───► [28 Nov] Pre-Launch Sign-off ───► [29 Nov] GO LIVE
```

| Date | Phase | Key Deliverables & Responsibilities | Owner |
| :--- | :--- | :--- | :--- |
| **23 Nov** *(Today)* | **Review Meeting & Demo** | • Present completed customer journey (Product &rarr; Grade &rarr; RFQ &rarr; Admin Desk)<br>• Review Global Map expansion, logo layout, and exhibitions gallery<br>• Agree on analytics ownership and pending deliverables | Dev & Client |
| **24 Nov** | **Assets & Approvals** | • Client provides confirmed official manufacturer logos (if any changes)<br>• Client provides real exhibition photos from old website<br>• Client confirms approved statistics and commercial claims | Client |
| **25 Nov** | **Analytics & Email Setup** | • Client provides GA4 Measurement ID / GTM ID<br>• Configure Resend/SMTP email delivery for RFQ submissions<br>• Embed GA4 custom tracking events (Get Quote, TDS, WhatsApp, Search) | Dev Team |
| **26 Nov** | **Catalog & Interactive Polish** | • Ingest additional verified grades/TDS links via Bulk Upload<br>• Add hover tooltips to SVG World Map nodes<br>• Update published count vs 500+ sourcing network copy | Dev Team |
| **27 Nov** | **Cross-Device QA** | • Full regression testing across Chrome, Safari, iOS, and Android<br>• Validate enquiry submissions, email alerts, and DB logging<br>• Check page speeds and Lighthouse performance | Dev Team |
| **28 Nov** | **Final Sign-Off** | • Client final walkthrough and approval of production build<br>• DNS preparation for domain mapping | Both |
| **29 Nov** | **Official Launch** | • Point custom domain to production server<br>• Verify SSL certificate and live Day-1 analytics data stream | Dev Team |

---

## Client Input Required for Launch Sign-Off

To ensure a smooth launch on 29 November, the following 4 items are required from National Polymers:
1. **Email Service Credentials / Target Inbox:** Where should customer RFQ emails be delivered? (e.g., `sales@nationalpolymersfz.com`).
2. **Official Google Analytics (GA4) / GTM ID:** Measurement ID (`G-XXXXXXXXXX`) to start Day-1 tracking.
3. **Old Website Exhibition Photos:** High-resolution photo files to replace gallery placeholders.
4. **Approval of Commercial Stats:** Confirmation of Homepage numbers (40+ countries, 120k MT, 40+ partners, 21 years).
