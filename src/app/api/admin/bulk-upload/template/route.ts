import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "grades";

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "National Polymers LLC FZ";
    workbook.created = new Date();

    const navyFill: ExcelJS.Fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0F172A" },
    };
    const headerFont: Partial<ExcelJS.Font> = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    const zebraFill: ExcelJS.Fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF8FAFC" },
    };
    const borderThin: Partial<ExcelJS.Borders> = {
      top: { style: "thin", color: { argb: "FFE2E8F0" } },
      left: { style: "thin", color: { argb: "FFE2E8F0" } },
      bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
      right: { style: "thin", color: { argb: "FFE2E8F0" } },
    };

    if (type === "products") {
      const sheet = workbook.addWorksheet("Products Template");
      sheet.columns = [
        { header: "Product Family Name", key: "name", width: 28 },
        { header: "URL Slug", key: "slug", width: 18 },
        { header: "Category Code", key: "category", width: 24 },
        { header: "Market Positioning Tagline", key: "tagline", width: 40 },
        { header: "Full Detailed Technical Description", key: "description", width: 50 },
        { header: "Key Features (semicolon separated ;)", key: "overview", width: 45 },
        { header: "Key Applications (semicolon separated ;)", key: "applications", width: 40 },
        { header: "Standard Packaging (semicolon separated ;)", key: "packaging", width: 35 },
      ];

      // Example rows
      sheet.addRow({
        name: "Polypropylene (PP)",
        slug: "pp",
        category: "Commodity Thermoplastics",
        tagline: "Prime, Near-Prime & Off-Grade PP Homopolymer, Copolymer & Random Copolymer",
        description: "Polypropylene is a versatile thermoplastic polymer offering superior chemical resistance...",
        overview: "Homo Polymer (PP Homo): High stiffness; Block Copolymer: High impact; Random Copolymer: High clarity",
        applications: "Woven sacks; Packaging films; Injection moulding; Automotive components",
        packaging: "25 kg PP Valve Bags; 1000 kg FIBC Jumbo Bags; Bulk Container Liners",
      });

      const headerRow = sheet.getRow(1);
      headerRow.height = 26;
      headerRow.eachCell((cell) => {
        cell.fill = navyFill;
        cell.font = headerFont;
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });

      sheet.views = [{ state: "frozen", ySplit: 1, showGridLines: true }];

      const buffer = await workbook.xlsx.writeBuffer();
      return new Response(buffer as any, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": 'attachment; filename="National_Polymers_Products_Upload_Template.xlsx"',
        },
      });
    }

    // Default: Grades Template
    const sheet = workbook.addWorksheet("Grades Upload Template");
    sheet.columns = [
      { header: "Brand / Refiner", key: "brand", width: 20 },
      { header: "Grade Code", key: "grade", width: 18 },
      { header: "Polymer Category", key: "category", width: 18 },
      { header: "Subcategory / Classification", key: "subCategory", width: 26 },
      { header: "Origin Country", key: "origin", width: 18 },
      { header: "MFI / MFR (g/10min)", key: "mfi", width: 20 },
      { header: "Density", key: "density", width: 18 },
      { header: "Key Target Applications", key: "application", width: 36 },
      { header: "Stock Availability", key: "availability", width: 22 },
      { header: "Technical Notes / Remarks", key: "notes", width: 40 },
      { header: "Product Features", key: "features", width: 40 },
      { header: "TDS Link (URL)", key: "tdsUrl", width: 45 },
    ];

    // Example sample rows
    sheet.addRow({
      brand: "APC",
      grade: "H312",
      category: "PP",
      subCategory: "PP Homopolymer",
      origin: "Saudi Arabia",
      mfi: "3.4 g/10 min",
      density: "0.905 g/cm³",
      application: "Raffia / Monofilaments / Strapping",
      availability: "Available on request",
      notes: "Low Water Carry-Over, Good Processability",
      features: "Controlled flowability, high tensile strength",
      tdsUrl: "https://advancedpetrochem.com/wp-content/uploads/2026/05/Advanced-TDS-PP-H312.pdf",
    });

    sheet.addRow({
      brand: "SABIC",
      grade: "500P",
      category: "PP",
      subCategory: "PP Homopolymer",
      origin: "Saudi Arabia",
      mfi: "3.0 g/10 min",
      density: "0.905 g/cm³",
      application: "Woven Sacks / Tape / Strapping",
      availability: "Available on request",
      notes: "General purpose Raffia and strapping",
      features: "High tenacity, optimum molecular weight distribution",
      tdsUrl: "https://www.chemdo.com/uploads/SABIC%C2%AE-PP_500P_Asia_Technical_Data_Sheet.pdf",
    });

    sheet.addRow({
      brand: "Formosa Plastics USA",
      grade: "1102L",
      category: "PP",
      subCategory: "PP Homopolymer",
      origin: "USA",
      mfi: "5.0 g/10 min",
      density: "0.900 g/cm³",
      application: "Injection moulding / Extrusion",
      availability: "Available on request",
      notes: "Stiff injection moulded parts, strapping tape",
      features: "High rigidity, fast cycle time",
      tdsUrl: "",
    });

    const headerRow = sheet.getRow(1);
    headerRow.height = 26;
    headerRow.eachCell((cell) => {
      cell.fill = navyFill;
      cell.font = headerFont;
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    sheet.views = [{ state: "frozen", ySplit: 1, showGridLines: true }];

    const buffer = await workbook.xlsx.writeBuffer();
    return new Response(buffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="National_Polymers_Grades_Upload_Template.xlsx"',
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unable to generate template.";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
