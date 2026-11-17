import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import { createClient } from "@supabase/supabase-js";
import { PRODUCTS_DATA, type ProductDetail } from "../src/data/productsData";
import { CANDIDATE_GRADES, MAJOR_BRANDS, type PolymerGrade } from "../src/data/gradesCatalog";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

async function loadGrades(): Promise<PolymerGrade[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from("uploads")
        .download("catalog/grades.json");

      if (!error && data) {
        const text = await data.text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log(`Loaded ${parsed.length} grades from Supabase Storage (catalog/grades.json)`);
          return parsed as PolymerGrade[];
        }
      }
    } catch (err) {
      console.warn("Could not load from storage, using local CANDIDATE_GRADES fallback:", err);
    }
  }
  console.log(`Using fallback CANDIDATE_GRADES (${CANDIDATE_GRADES.length} grades)`);
  return CANDIDATE_GRADES;
}

async function loadProducts(): Promise<ProductDetail[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from("uploads")
        .download("catalog/products.json");

      if (!error && data) {
        const text = await data.text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log(`Loaded ${parsed.length} products from Supabase Storage (catalog/products.json)`);
          return parsed as ProductDetail[];
        }
      }
    } catch (err) {
      console.warn("Could not load products from storage, using local PRODUCTS_DATA fallback:", err);
    }
  }
  console.log(`Using fallback PRODUCTS_DATA (${PRODUCTS_DATA.length} products)`);
  return PRODUCTS_DATA;
}

async function generateCatalogExcel() {
  console.log("Fetching live catalog data...");
  const grades = await loadGrades();
  const products = await loadProducts();

  console.log(`\nCompiling Excel workbook for ${grades.length} grades and ${products.length} product families...`);

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "National Polymers LLC FZ";
  workbook.lastModifiedBy = "National Polymers Management";
  workbook.created = new Date();
  workbook.modified = new Date();

  // Color schemes
  const navyFill: ExcelJS.Fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF0F172A" }, // Slate-900 / Deep Navy
  };
  const blueFill: ExcelJS.Fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E3A8A" }, // Indigo / Navy
  };
  const orangeFill: ExcelJS.Fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE95220" }, // National Polymers Orange
  };
  const headerFontWhite: Partial<ExcelJS.Font> = {
    name: "Calibri",
    size: 11,
    bold: true,
    color: { argb: "FFFFFFFF" },
  };
  const borderThin: Partial<ExcelJS.Borders> = {
    top: { style: "thin", color: { argb: "FFE2E8F0" } },
    left: { style: "thin", color: { argb: "FFE2E8F0" } },
    bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
    right: { style: "thin", color: { argb: "FFE2E8F0" } },
  };
  const zebraFill: ExcelJS.Fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFF8FAFC" },
  };

  // Helper to format table sheet
  function applyTableStyling(sheet: ExcelJS.Worksheet, headerRowNumber: number = 1) {
    sheet.views = [{ state: "frozen", ySplit: headerRowNumber, showGridLines: true }];

    const headerRow = sheet.getRow(headerRowNumber);
    headerRow.height = 28;
    headerRow.eachCell((cell) => {
      cell.fill = navyFill;
      cell.font = headerFontWhite;
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      cell.border = borderThin;
    });

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber <= headerRowNumber) return;
      row.height = 24;
      const isEven = (rowNumber - headerRowNumber) % 2 === 0;

      row.eachCell({ includeEmpty: true }, (cell) => {
        if (isEven && !cell.fill) {
          cell.fill = zebraFill;
        }
        cell.border = borderThin;
        if (!cell.alignment) {
          cell.alignment = { vertical: "middle", horizontal: "left" };
        }
      });
    });

    // Auto-fit column widths with safety limits
    sheet.columns.forEach((column) => {
      let maxLen = 10;
      if (column && column.eachCell) {
        column.eachCell({ includeEmpty: false }, (cell) => {
          const val = cell.value ? String(cell.value) : "";
          if (val.length > maxLen) {
            maxLen = Math.min(val.length, 65);
          }
        });
      }
      column.width = Math.max(maxLen + 4, 12);
    });
  }

  // ════════════════════════════════════════════════════════════════════════
  // SHEET 1: Polymer Grades Catalog (All Technical Grades & TDS)
  // ════════════════════════════════════════════════════════════════════════
  const gradesSheet = workbook.addWorksheet("Polymer Grades Catalog");

  gradesSheet.columns = [
    { header: "S.No", key: "sno", width: 8 },
    { header: "Brand / Refiner", key: "brand", width: 18 },
    { header: "Grade Code", key: "grade", width: 16 },
    { header: "Polymer Category", key: "category", width: 16 },
    { header: "Subcategory / Classification", key: "subCategory", width: 28 },
    { header: "Origin Country", key: "origin", width: 18 },
    { header: "MFI / MFR (g/10min)", key: "mfi", width: 18 },
    { header: "Density (g/cm³)", key: "density", width: 16 },
    { header: "Key Target Applications", key: "application", width: 42 },
    { header: "Stock Availability", key: "availability", width: 24 },
    { header: "Verification Status", key: "status", width: 18 },
    { header: "Technical Datasheet (TDS)", key: "tdsUrl", width: 34 },
    { header: "TDS Available?", key: "hasTds", width: 15 },
    { header: "Technical Notes / Remarks", key: "notes", width: 40 },
  ];

  grades.forEach((g, idx) => {
    const row = gradesSheet.addRow({
      sno: idx + 1,
      brand: g.brand,
      grade: g.grade,
      category: g.category,
      subCategory: g.subCategory,
      origin: g.origin,
      mfi: g.mfi || "—",
      density: g.density || "—",
      application: g.application,
      availability: g.availability || "Available on request",
      status: g.status || "Verified",
      tdsUrl: g.tdsUrl || "Pending Upload",
      hasTds: g.tdsUrl ? "YES" : "NO",
      notes: g.notes || "Standard refinery export prime packing: 25kg Valve Bags / 1000kg FIBC jumbo sacks.",
    });

    row.getCell("sno").alignment = { vertical: "middle", horizontal: "center" };

    // Grade Code monospace bold
    const gradeCell = row.getCell("grade");
    gradeCell.font = { name: "Consolas", bold: true, size: 10, color: { argb: "FF0F172A" } };
    gradeCell.alignment = { vertical: "middle", horizontal: "center" };

    // Category centered
    row.getCell("category").alignment = { vertical: "middle", horizontal: "center" };

    // MFI & Density centered
    row.getCell("mfi").alignment = { vertical: "middle", horizontal: "center" };
    row.getCell("density").alignment = { vertical: "middle", horizontal: "center" };

    // Status formatting
    const statusCell = row.getCell("status");
    statusCell.alignment = { vertical: "middle", horizontal: "center" };
    if (g.status === "Verified") {
      statusCell.font = { bold: true, color: { argb: "FF047857" } };
      statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFECFDF5" } };
    } else {
      statusCell.font = { bold: true, color: { argb: "FFB45309" } };
      statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFBEB" } };
    }

    // Has TDS
    const hasTdsCell = row.getCell("hasTds");
    hasTdsCell.alignment = { vertical: "middle", horizontal: "center" };
    if (g.tdsUrl) {
      hasTdsCell.font = { bold: true, color: { argb: "FF047857" } };
      hasTdsCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFECFDF5" } };
    } else {
      hasTdsCell.font = { color: { argb: "FF94A3B8" } };
    }

    // TDS Link styling (clickable in Excel)
    if (g.tdsUrl && g.tdsUrl.startsWith("http")) {
      const linkCell = row.getCell("tdsUrl");
      linkCell.value = {
        text: `Download ${g.brand} ${g.grade} TDS`,
        hyperlink: g.tdsUrl,
      };
      linkCell.font = { color: { argb: "FF2563EB" }, underline: true, bold: true };
    }
  });

  applyTableStyling(gradesSheet, 1);
  gradesSheet.autoFilter = { from: "A1", to: "N1" };

  // ════════════════════════════════════════════════════════════════════════
  // SHEET 2: Core Product Families Overview
  // ════════════════════════════════════════════════════════════════════════
  const productsSheet = workbook.addWorksheet("Product Families Overview");

  productsSheet.columns = [
    { header: "S.No", key: "sno", width: 8 },
    { header: "Product Family Name", key: "name", width: 30 },
    { header: "URL Slug", key: "slug", width: 14 },
    { header: "Category Code", key: "category", width: 16 },
    { header: "Market Positioning Tagline", key: "tagline", width: 38 },
    { header: "Standard Grades Available", key: "gradeCount", width: 18 },
    { header: "Product Image Path", key: "imageUrl", width: 28 },
    { header: "Key Features & Commercial Strengths", key: "overview", width: 55 },
    { header: "Full Detailed Technical Description", key: "description", width: 65 },
  ];

  products.forEach((p, idx) => {
    const overviewBullets = Array.isArray(p.overview) ? p.overview.map((pt) => `• ${pt}`).join("\n") : "";

    const row = productsSheet.addRow({
      sno: idx + 1,
      name: p.name,
      slug: p.slug,
      category: p.category,
      tagline: p.tagline,
      gradeCount: p.subTypes ? p.subTypes.length : 0,
      imageUrl: p.imageUrl,
      overview: overviewBullets,
      description: p.description,
    });

    row.getCell("sno").alignment = { vertical: "middle", horizontal: "center" };
    row.getCell("slug").alignment = { vertical: "middle", horizontal: "center" };
    row.getCell("category").alignment = { vertical: "middle", horizontal: "center" };
    row.getCell("gradeCount").alignment = { vertical: "middle", horizontal: "center" };
    row.getCell("overview").alignment = { vertical: "top", horizontal: "left", wrapText: true };
    row.getCell("description").alignment = { vertical: "top", horizontal: "left", wrapText: true };
    row.height = 75;
  });

  applyTableStyling(productsSheet, 1);
  productsSheet.autoFilter = { from: "A1", to: "I1" };

  // ════════════════════════════════════════════════════════════════════════
  // SHEET 3: Standard Processing Specifications
  // ════════════════════════════════════════════════════════════════════════
  const specsSheet = workbook.addWorksheet("Standard Processing Specs");

  specsSheet.columns = [
    { header: "S.No", key: "sno", width: 8 },
    { header: "Polymer Family", key: "family", width: 26 },
    { header: "Grade Classification", key: "name", width: 32 },
    { header: "MFI / MFR Spec (g/10 min)", key: "mfi", width: 22 },
    { header: "Density Spec (g/cm³)", key: "density", width: 20 },
    { header: "Target Application & Processing Guidance", key: "useCase", width: 50 },
  ];

  let specIdx = 1;
  products.forEach((p) => {
    if (Array.isArray(p.subTypes)) {
      p.subTypes.forEach((sub) => {
        const row = specsSheet.addRow({
          sno: specIdx++,
          family: p.name,
          name: sub.name,
          mfi: sub.mfi,
          density: sub.density,
          useCase: sub.useCase,
        });
        row.getCell("sno").alignment = { vertical: "middle", horizontal: "center" };
        row.getCell("mfi").alignment = { vertical: "middle", horizontal: "center" };
        row.getCell("density").alignment = { vertical: "middle", horizontal: "center" };
      });
    }
  });

  applyTableStyling(specsSheet, 1);
  specsSheet.autoFilter = { from: "A1", to: "F1" };

  // ════════════════════════════════════════════════════════════════════════
  // SHEET 4: Physical & Chemical Test Specifications
  // ════════════════════════════════════════════════════════════════════════
  const testSheet = workbook.addWorksheet("Physical & Chemical Specs");

  testSheet.columns = [
    { header: "S.No", key: "sno", width: 8 },
    { header: "Polymer Family", key: "family", width: 26 },
    { header: "Test Property / Parameter", key: "property", width: 34 },
    { header: "Standard Value / Compliance Specification", key: "value", width: 50 },
  ];

  let testIdx = 1;
  products.forEach((p) => {
    if (Array.isArray(p.specs)) {
      p.specs.forEach((sp) => {
        const row = testSheet.addRow({
          sno: testIdx++,
          family: p.name,
          property: sp.property,
          value: sp.value,
        });
        row.getCell("sno").alignment = { vertical: "middle", horizontal: "center" };
      });
    }
  });

  applyTableStyling(testSheet, 1);
  testSheet.autoFilter = { from: "A1", to: "D1" };

  // ════════════════════════════════════════════════════════════════════════
  // SHEET 5: Executive Dashboard & Summary
  // ════════════════════════════════════════════════════════════════════════
  const summarySheet = workbook.addWorksheet("Catalog Executive Summary");
  summarySheet.views = [{ showGridLines: true }];

  // Title Banner
  summarySheet.mergeCells("A1:E1");
  const titleCell = summarySheet.getCell("A1");
  titleCell.value = "NATIONAL POLYMERS LLC FZ — TECHNICAL PRODUCT CATALOG SUMMARY";
  titleCell.font = { name: "Calibri", size: 13, bold: true, color: { argb: "FFFFFFFF" } };
  titleCell.fill = blueFill;
  titleCell.alignment = { vertical: "middle", horizontal: "center" };
  summarySheet.getRow(1).height = 36;

  // Subtitle
  summarySheet.mergeCells("A2:E2");
  const subCell = summarySheet.getCell("A2");
  subCell.value = `Export Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} | Prepared for Executive Review & QA Audit`;
  subCell.font = { name: "Calibri", size: 10, italic: true, color: { argb: "FF475569" } };
  subCell.alignment = { vertical: "middle", horizontal: "center" };
  summarySheet.getRow(2).height = 22;

  // Metric KPI Cards (Row 4-5)
  const totalGrades = grades.length;
  const totalFamilies = products.length;
  const gradesWithTds = grades.filter((g) => Boolean(g.tdsUrl)).length;
  const verifiedGrades = grades.filter((g) => g.status === "Verified").length;

  const kpis = [
    { label: "Total Technical Grades", val: totalGrades, col: "A" },
    { label: "Polymer Families", val: totalFamilies, col: "B" },
    { label: "Verified Allocations", val: verifiedGrades, col: "C" },
    { label: "Grades with Direct TDS", val: gradesWithTds, col: "D" },
    { label: "Refinery Producers", val: MAJOR_BRANDS.length, col: "E" },
  ];

  summarySheet.getRow(4).height = 20;
  summarySheet.getRow(5).height = 32;

  kpis.forEach((kpi) => {
    const lblCell = summarySheet.getCell(`${kpi.col}4`);
    lblCell.value = kpi.label;
    lblCell.font = { size: 9, bold: true, color: { argb: "FF64748B" } };
    lblCell.alignment = { vertical: "middle", horizontal: "center" };
    lblCell.fill = zebraFill;
    lblCell.border = borderThin;

    const valCell = summarySheet.getCell(`${kpi.col}5`);
    valCell.value = kpi.val;
    valCell.font = { size: 18, bold: true, color: { argb: "FF0F172A" } };
    valCell.alignment = { vertical: "middle", horizontal: "center" };
    valCell.fill = zebraFill;
    valCell.border = borderThin;
  });

  // Table 1: Category Breakdown (Row 7)
  const categoryCounts: Record<string, number> = {};
  grades.forEach((g) => {
    const cat = g.category || "Other";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  summarySheet.mergeCells("A7:B7");
  const catHeader = summarySheet.getCell("A7");
  catHeader.value = "Polymer Family Distribution";
  catHeader.font = headerFontWhite;
  catHeader.fill = navyFill;
  catHeader.alignment = { vertical: "middle", horizontal: "left" };
  summarySheet.getRow(7).height = 24;

  let catRowIdx = 8;
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      summarySheet.getCell(`A${catRowIdx}`).value = cat;
      summarySheet.getCell(`A${catRowIdx}`).border = borderThin;
      summarySheet.getCell(`A${catRowIdx}`).font = { bold: true };

      summarySheet.getCell(`B${catRowIdx}`).value = `${count} grades (${((count / totalGrades) * 100).toFixed(1)}%)`;
      summarySheet.getCell(`B${catRowIdx}`).border = borderThin;
      summarySheet.getCell(`B${catRowIdx}`).alignment = { horizontal: "right" };
      summarySheet.getRow(catRowIdx).height = 20;
      catRowIdx++;
    });

  // Table 2: Manufacturer Refiners Breakdown (Row 7, Col D-E)
  const brandCounts: Record<string, number> = {};
  grades.forEach((g) => {
    const b = g.brand || "Other";
    brandCounts[b] = (brandCounts[b] || 0) + 1;
  });

  summarySheet.mergeCells("D7:E7");
  const brandHeader = summarySheet.getCell("D7");
  brandHeader.value = "Manufacturer / Refiner Allocations";
  brandHeader.font = headerFontWhite;
  brandHeader.fill = navyFill;
  brandHeader.alignment = { vertical: "middle", horizontal: "left" };

  let brandRowIdx = 8;
  Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([b, count]) => {
      summarySheet.getCell(`D${brandRowIdx}`).value = b;
      summarySheet.getCell(`D${brandRowIdx}`).border = borderThin;
      summarySheet.getCell(`D${brandRowIdx}`).font = { bold: true };

      summarySheet.getCell(`E${brandRowIdx}`).value = `${count} grades (${((count / totalGrades) * 100).toFixed(1)}%)`;
      summarySheet.getCell(`E${brandRowIdx}`).border = borderThin;
      summarySheet.getCell(`E${brandRowIdx}`).alignment = { horizontal: "right" };
      summarySheet.getRow(brandRowIdx).height = 20;
      brandRowIdx++;
    });

  summarySheet.columns = [
    { width: 28 },
    { width: 22 },
    { width: 8 },
    { width: 28 },
    { width: 24 },
  ];

  // Save to file in project root
  const outputPath = path.resolve(process.cwd(), "National_Polymers_Product_Catalog_Review.xlsx");
  await workbook.xlsx.writeFile(outputPath);
  console.log(`\nWorkbook successfully created at:\n${outputPath}`);

  // Also write a copy to public/ so that it can be downloaded directly from the browser if needed
  const publicDir = path.resolve(process.cwd(), "public");
  if (fs.existsSync(publicDir)) {
    const publicPath = path.resolve(publicDir, "National_Polymers_Product_Catalog_Review.xlsx");
    fs.copyFileSync(outputPath, publicPath);
    console.log(`Copied for direct download to: ${publicPath}`);
  }
}

generateCatalogExcel().catch((err) => {
  console.error("Failed to generate Excel:", err);
  process.exit(1);
});
