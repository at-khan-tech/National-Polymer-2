/**
 * Google Analytics 4 (GA4) & Google Tag Manager (GTM) Tracking Utility
 * National Polymers FZ LLC
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

// Declare window properties for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track route / page changes
 */
export function pageview(url: string, title?: string) {
  if (typeof window === "undefined") return;

  // 1. Google Analytics (gtag.js)
  if (GA_MEASUREMENT_ID && typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }

  // 2. Google Tag Manager (dataLayer)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "page_view",
      page_path: url,
      page_title: title || document.title,
    });
  }
}

/**
 * Generic event tracker for GA4 & GTM
 */
export function trackEvent(
  action: string,
  params: Record<string, string | number | boolean | undefined | null> = {}
) {
  if (typeof window === "undefined") return;

  // Clean undefined / null params
  const cleanParams: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      cleanParams[key] = value;
    }
  }

  // 1. Google Analytics (gtag.js)
  if (typeof window.gtag === "function") {
    window.gtag("event", action, cleanParams);
  }

  // 2. Google Tag Manager (dataLayer)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: action,
      ...cleanParams,
    });
  }
}

/**
 * Specific Business Tracking Actions
 */

// 1. TDS Exact PDF Download
export function trackTdsDownload(grade: string, brand: string, category: string, tdsUrl?: string) {
  trackEvent("tds_download", {
    grade_code: grade,
    brand_name: brand,
    polymer_category: category,
    document_url: tdsUrl || "",
    event_category: "Downloads",
    event_label: `${brand} ${grade} TDS`,
  });
}

// 2. TDS Request Lead (When direct PDF is not available)
export function trackTdsRequest(grade: string, brand: string, category: string) {
  trackEvent("tds_request", {
    grade_code: grade,
    brand_name: brand,
    polymer_category: category,
    event_category: "Leads",
    event_label: `Request TDS - ${brand} ${grade}`,
  });
}

// 3. Request Quotation / Container Rate Click
export function trackQuoteRequest(product: string, grade?: string, brand?: string, destination?: string) {
  trackEvent("quote_click", {
    product_slug: product,
    grade_code: grade || "",
    brand_name: brand || "",
    destination_port: destination || "",
    event_category: "Conversions",
    event_label: `Quote Click - ${brand || ""} ${grade || product}`.trim(),
  });
}

// 4. Full Enquiry Form Submission
export function trackEnquirySubmit(data: {
  product: string;
  grade?: string;
  brand?: string;
  volume?: string;
  destinationPort?: string;
  country?: string;
}) {
  trackEvent("generate_lead", {
    product_slug: data.product,
    grade_code: data.grade || "",
    brand_name: data.brand || "",
    order_volume: data.volume || "",
    destination_port: data.destinationPort || "",
    destination_country: data.country || "",
    event_category: "Enquiries",
    event_label: `Enquiry Lead - ${data.brand || ""} ${data.grade || data.product}`.trim(),
  });
}

// 5. Brand Selection in Catalog
export function trackBrandFilter(brand: string) {
  trackEvent("select_brand", {
    brand_name: brand,
    event_category: "Catalog Navigation",
    event_label: `Brand Filter - ${brand}`,
  });
}

// 6. Grade Specs Detailed View
export function trackGradeView(grade: string, brand: string, category?: string) {
  trackEvent("view_item", {
    item_id: `${brand.toLowerCase()}-${grade.toLowerCase()}`,
    item_name: `${brand} ${grade}`,
    item_category: category || "Polymer",
    brand: brand,
    event_category: "Catalog Engagement",
  });
}

// 7. Contact / WhatsApp / Phone / Email Click
export function trackContactClick(
  channel: "whatsapp" | "email" | "phone" | "form",
  label?: string
) {
  trackEvent("contact_click", {
    contact_channel: channel,
    event_category: "Contact & Communication",
    event_label: label || `Contact via ${channel}`,
  });
}

// 8. Catalog Search Query
export function trackSearch(query: string, resultsCount?: number) {
  if (!query || query.trim().length === 0) return;
  trackEvent("search", {
    search_term: query.trim(),
    results_count: resultsCount !== undefined ? resultsCount : -1,
    event_category: "Catalog Search",
  });
}
