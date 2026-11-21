import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import {
  getAllGrades,
  getAllProducts,
  saveAllGrades,
  saveAllProducts,
} from "@/lib/content-store";
import type { PolymerGrade } from "@/data/gradesCatalog";
import type { ProductDetail } from "@/data/productsData";

export const dynamic = "force-dynamic";

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Clean string value from excel cell
function getCellString(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val.trim();
  if (typeof val === "number" || typeof val === "boolean") return String(val).trim();
  if (typeof val === "object") {
    if (val.text) return String(val.text).trim();
    if (val.result) return String(val.result).trim();
    if (val.hyperlink) return String(val.hyperlink).trim();
  }
  return String(val).trim();
}

// Flexible header key matching
function findHeaderIndex(headers: string[], keywords: string[]): number {
  return headers.findIndex((h) => {
    const clean = h.toLowerCase().replace(/[^a-z0-9]/g, "");
    return keywords.some((kw) => clean.includes(kw.toLowerCase().replace(/[^a-z0-9]/g, "")));
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const action = (formData.get("action") as string) || "import"; // "preview" | "import"
    const mode = (formData.get("mode") as string) || "merge"; // "merge" | "replace"
    const targetOverride = (formData.get("target") as string) || "auto"; // "grades" | "products" | "auto"

    if (!file) {
      return NextResponse.json({ message: "No file provided for upload." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = new ExcelJS.Workbook();
    // Support xlsx and csv
    const isCsv = file.name.endsWith(".csv");
    if (isCsv) {
      // For csv, parse via string lines
      const csvText = buffer.toString("utf8");
      // Load csv into workbook or parse lines
      const stream = require("stream");
      const s = new stream.Readable();
      s.push(csvText);
      s.push(null);
      await workbook.csv.read(s);
    } else {
      await workbook.xlsx.load(buffer as any);
    }

    // Determine target sheet
    let worksheet = workbook.worksheets[0];
    if (workbook.worksheets.length > 1) {
      if (targetOverride === "products") {
        const prodSheet = workbook.worksheets.find((w) =>
          w.name.toLowerCase().includes("product")
        );
        if (prodSheet) worksheet = prodSheet;
      } else {
        const gradeSheet = workbook.worksheets.find((w) =>
          w.name.toLowerCase().includes("grade")
        );
        if (gradeSheet) worksheet = gradeSheet;
      }
    }

    if (!worksheet || worksheet.rowCount < 2) {
      return NextResponse.json(
        { message: "The uploaded spreadsheet is empty or has no data rows." },
        { status: 400 }
      );
    }

    // Read headers from row 1
    const rawHeaders: string[] = [];
    const firstRow = worksheet.getRow(1);
    firstRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      rawHeaders[colNumber] = getCellString(cell.value);
    });

    // Auto-detect target
    const isGradesSheet =
      targetOverride === "grades" ||
      findHeaderIndex(rawHeaders, ["grade", "mfi", "brand", "mfr"]) !== -1;

    if (isGradesSheet) {
      // Map column indexes
      const brandIdx = findHeaderIndex(rawHeaders, ["brand", "refiner", "producer", "manufacturer"]);
      const gradeIdx = findHeaderIndex(rawHeaders, ["grade", "gradecode", "code", "sku"]);
      const categoryIdx = findHeaderIndex(rawHeaders, ["category", "polymercategory"]);
      const subCategoryIdx = findHeaderIndex(rawHeaders, ["subcategory", "classification", "subtype"]);
      const originIdx = findHeaderIndex(rawHeaders, ["origin", "country", "origincountry"]);
      const mfiIdx = findHeaderIndex(rawHeaders, ["mfi", "mfr", "meltflow", "meltindex"]);
      const densityIdx = findHeaderIndex(rawHeaders, ["density", "specificgravity"]);
      const appIdx = findHeaderIndex(rawHeaders, ["application", "targetapplication", "usecase"]);
      const availIdx = findHeaderIndex(rawHeaders, ["stock", "availability", "stockavailability"]);
      const tdsIdx = findHeaderIndex(rawHeaders, ["tdslink", "tdsurl", "tds", "datasheet", "pdf"]);
      const notesIdx = findHeaderIndex(rawHeaders, ["notes", "remarks", "technicalnotes"]);
      const featuresIdx = findHeaderIndex(rawHeaders, ["feature", "features", "productfeatures"]);

      const parsedGrades: PolymerGrade[] = [];
      const warnings: string[] = [];

      for (let r = 2; r <= worksheet.rowCount; r++) {
        const row = worksheet.getRow(r);
        const brand = brandIdx !== -1 ? getCellString(row.getCell(brandIdx).value) : "";
        const gradeCode = gradeIdx !== -1 ? getCellString(row.getCell(gradeIdx).value) : "";

        if (!brand && !gradeCode) continue; // skip blank row

        if (!brand || !gradeCode) {
          warnings.push(`Row ${r}: Skipped because Brand or Grade Code is missing.`);
          continue;
        }

        const category = (categoryIdx !== -1 ? getCellString(row.getCell(categoryIdx).value) : "PP") || "PP";
        const subCategory = (subCategoryIdx !== -1 ? getCellString(row.getCell(subCategoryIdx).value) : "General Grade") || "General Grade";
        const origin = (originIdx !== -1 ? getCellString(row.getCell(originIdx).value) : "Global") || "Global";
        const mfi = (mfiIdx !== -1 ? getCellString(row.getCell(mfiIdx).value) : "N/A") || "N/A";
        const density = (densityIdx !== -1 ? getCellString(row.getCell(densityIdx).value) : "N/A") || "N/A";
        const application = (appIdx !== -1 ? getCellString(row.getCell(appIdx).value) : "General Processing") || "General Processing";
        const availability = (availIdx !== -1 ? getCellString(row.getCell(availIdx).value) : "Available on request") || "Available on request";
        
        let tdsUrl = tdsIdx !== -1 ? getCellString(row.getCell(tdsIdx).value) : "";
        if (tdsUrl && !tdsUrl.startsWith("http")) tdsUrl = "";

        const notesVal = notesIdx !== -1 ? getCellString(row.getCell(notesIdx).value) : "";
        const featuresVal = featuresIdx !== -1 ? getCellString(row.getCell(featuresIdx).value) : "";
        const combinedNotes = [notesVal, featuresVal ? `Features: ${featuresVal}` : ""].filter(Boolean).join(" ");

        parsedGrades.push({
          id: `${toSlug(brand)}-${toSlug(gradeCode)}`,
          brand,
          grade: gradeCode,
          category: (category.toUpperCase().includes("PE") && !category.toUpperCase().includes("PP") ? category : category) as any,
          subCategory,
          origin,
          mfi,
          density,
          application,
          availability,
          status: "Verified",
          tdsUrl: tdsUrl || undefined,
          notes: combinedNotes || undefined,
        });
      }

      if (action === "preview") {
        return NextResponse.json({
          ok: true,
          target: "grades",
          totalRows: parsedGrades.length,
          validRows: parsedGrades.length,
          preview: parsedGrades.slice(0, 8),
          warnings,
        });
      }

      // Execute Commit
      const currentGrades = await getAllGrades();
      let finalGrades: PolymerGrade[] = [];
      let added = 0;
      let updated = 0;

      if (mode === "replace") {
        finalGrades = parsedGrades;
        added = parsedGrades.length;
      } else {
        // Merge mode: update if exists, append if new
        const map = new Map<string, PolymerGrade>();
        currentGrades.forEach((g) => map.set(g.id.toLowerCase(), g));

        parsedGrades.forEach((g) => {
          if (map.has(g.id.toLowerCase())) {
            map.set(g.id.toLowerCase(), { ...map.get(g.id.toLowerCase())!, ...g });
            updated++;
          } else {
            map.set(g.id.toLowerCase(), g);
            added++;
          }
        });

        finalGrades = Array.from(map.values());
      }

      await saveAllGrades(finalGrades);

      return NextResponse.json({
        ok: true,
        target: "grades",
        count: parsedGrades.length,
        added,
        updated,
        totalCatalogCount: finalGrades.length,
        message: `Successfully processed ${parsedGrades.length} grades (${added} added, ${updated} updated). Catalog now contains ${finalGrades.length} grades.`,
      });
    }

    // Otherwise Products Sheet
    const nameIdx = findHeaderIndex(rawHeaders, ["name", "product", "productname", "family"]);
    const slugIdx = findHeaderIndex(rawHeaders, ["slug", "urlslug", "code"]);
    const categoryIdx = findHeaderIndex(rawHeaders, ["category", "categorycode"]);
    const taglineIdx = findHeaderIndex(rawHeaders, ["tagline", "positioning"]);
    const descIdx = findHeaderIndex(rawHeaders, ["description", "fulldescription"]);
    const overviewIdx = findHeaderIndex(rawHeaders, ["overview", "features"]);
    const appIdx = findHeaderIndex(rawHeaders, ["application", "applications"]);
    const packIdx = findHeaderIndex(rawHeaders, ["packaging", "package"]);

    const parsedProducts: ProductDetail[] = [];
    const warnings: string[] = [];

    for (let r = 2; r <= worksheet.rowCount; r++) {
      const row = worksheet.getRow(r);
      const name = nameIdx !== -1 ? getCellString(row.getCell(nameIdx).value) : "";
      if (!name) continue;

      const slug = slugIdx !== -1 ? getCellString(row.getCell(slugIdx).value) : toSlug(name);
      const category = categoryIdx !== -1 ? getCellString(row.getCell(categoryIdx).value) : "Commodity Polymers";
      const tagline = taglineIdx !== -1 ? getCellString(row.getCell(taglineIdx).value) : "";
      const description = descIdx !== -1 ? getCellString(row.getCell(descIdx).value) : "";
      
      const rawOverview = overviewIdx !== -1 ? getCellString(row.getCell(overviewIdx).value) : "";
      const overview = rawOverview
        ? rawOverview.split(/[;\n]/).map((s) => s.trim()).filter(Boolean)
        : [];

      const rawApp = appIdx !== -1 ? getCellString(row.getCell(appIdx).value) : "";
      const applications = rawApp
        ? rawApp.split(/[;\n]/).map((s) => s.trim()).filter(Boolean)
        : [];

      const rawPack = packIdx !== -1 ? getCellString(row.getCell(packIdx).value) : "";
      const packaging = rawPack
        ? rawPack.split(/[;\n]/).map((s) => s.trim()).filter(Boolean)
        : ["25 kg PE Valve Bags", "1000 kg Jumbo Bags"];

      parsedProducts.push({
        name,
        slug: slug || toSlug(name),
        category: category || "Polymers",
        tagline: tagline || name,
        description: description || name,
        overview: overview.length > 0 ? overview : ["High mechanical integrity", "Consistent quality"],
        specs: [],
        subTypes: [],
        applications: applications.length > 0 ? applications : ["General Manufacturing"],
        packaging,
        imageUrl: "/images/Product/p1.png",
      });
    }

    if (action === "preview") {
      return NextResponse.json({
        ok: true,
        target: "products",
        totalRows: parsedProducts.length,
        validRows: parsedProducts.length,
        preview: parsedProducts.slice(0, 8),
        warnings,
      });
    }

    const currentProducts = await getAllProducts();
    let finalProducts: ProductDetail[] = [];
    let added = 0;
    let updated = 0;

    if (mode === "replace") {
      finalProducts = parsedProducts;
      added = parsedProducts.length;
    } else {
      const map = new Map<string, ProductDetail>();
      currentProducts.forEach((p) => map.set(p.slug.toLowerCase(), p));

      parsedProducts.forEach((p) => {
        if (map.has(p.slug.toLowerCase())) {
          const old = map.get(p.slug.toLowerCase())!;
          map.set(p.slug.toLowerCase(), {
            ...old,
            ...p,
            specs: old.specs.length > 0 ? old.specs : p.specs,
            subTypes: old.subTypes.length > 0 ? old.subTypes : p.subTypes,
          });
          updated++;
        } else {
          map.set(p.slug.toLowerCase(), p);
          added++;
        }
      });

      finalProducts = Array.from(map.values());
    }

    await saveAllProducts(finalProducts);

    return NextResponse.json({
      ok: true,
      target: "products",
      count: parsedProducts.length,
      added,
      updated,
      totalCatalogCount: finalProducts.length,
      message: `Successfully processed ${parsedProducts.length} product families (${added} added, ${updated} updated).`,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to process bulk upload file.";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
