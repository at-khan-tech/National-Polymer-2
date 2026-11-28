"use client";

import React, { useState } from "react";
import { Download, FileText, Check, Loader2 } from "lucide-react";
import type { PolymerGrade } from "@/data/gradesCatalog";
import { trackTdsDownload, trackTdsRequest } from "@/lib/analytics";

interface TdsDownloadButtonProps {
  grade: PolymerGrade;
  variant?: "primary" | "secondary" | "outline";
}

export const TdsDownloadButton: React.FC<TdsDownloadButtonProps> = ({
  grade,
  variant = "outline",
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    // If a direct TDS file exists, open it
    if (grade.tdsUrl && (grade.tdsUrl.startsWith("http") || grade.tdsUrl.endsWith(".pdf"))) {
      trackTdsDownload(grade.grade, grade.brand, grade.category, grade.tdsUrl);
      window.open(grade.tdsUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // If enquiry lead, route to enquiry form
    if (grade.tdsStatus === "request" || grade.tdsStatus === "pending") {
      trackTdsRequest(grade.grade, grade.brand, grade.category);
      const enquiryUrl = `/enquiry?product=${grade.category.toLowerCase()}&grade=${encodeURIComponent(
        grade.grade
      )}&brand=${encodeURIComponent(grade.brand)}&origin=${encodeURIComponent(
        grade.origin
      )}&action=request-tds`;
      window.location.href = enquiryUrl;
      return;
    }

    // Otherwise, generate a printable Technical Data Sheet in a new window
    setIsGenerating(true);

    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Please allow popups to download/print the Technical Data Sheet.");
        setIsGenerating(false);
        return;
      }

      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const tdsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TDS - ${grade.brand} ${grade.grade} - National Polymers FZ LLC</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      padding: 24px;
      margin: 0;
      background: #fff;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 3px solid #E95220;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .brand-sub {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 2px;
    }
    .doc-badge {
      text-align: right;
    }
    .badge-pill {
      background: #f1f5f9;
      color: #0f172a;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .doc-date {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 4px;
    }
    .title-section {
      margin-bottom: 24px;
    }
    .grade-name {
      font-size: 26px;
      font-weight: 900;
      color: #E95220;
      margin: 0;
    }
    .grade-meta {
      font-size: 13px;
      color: #475569;
      margin-top: 4px;
      font-weight: 600;
    }
    .section-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px 14px;
      text-align: left;
      font-size: 12px;
    }
    th {
      background: #f8fafc;
      color: #475569;
      font-weight: 700;
      border-bottom: 1px solid #cbd5e1;
    }
    td {
      border-bottom: 1px solid #f1f5f9;
    }
    td.val {
      font-family: ui-monospace, Menlo, Consolas, monospace;
      font-weight: 700;
      color: #0f172a;
    }
    .app-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px;
      font-size: 12px;
      color: #334155;
      line-height: 1.6;
    }
    .footer {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #94a3b8;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand-title">NATIONAL POLYMERS LLC FZ</div>
      <div class="brand-sub">Petrochemical &amp; Polymer Raw Materials Distribution</div>
    </div>
    <div class="doc-badge">
      <div class="badge-pill">Technical Data Sheet (TDS)</div>
      <div class="doc-date">Generated on: ${currentDate}</div>
    </div>
  </div>

  <div class="title-section">
    <h1 class="grade-name">${grade.brand} ${grade.grade}</h1>
    <div class="grade-meta">${grade.category} Resin · ${grade.subCategory} · Origin: ${grade.origin}</div>
  </div>

  <div class="section-title">Physical &amp; Rheological Specifications</div>
  <table>
    <thead>
      <tr>
        <th>Property Description</th>
        <th>Test Condition / Standard</th>
        <th>Nominal Value</th>
        <th>Unit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Melt Flow Index (MFI / MFR)</strong></td>
        <td>ISO 1133 / ASTM D1238</td>
        <td class="val">${grade.mfi}</td>
        <td>g / 10 min</td>
      </tr>
      <tr>
        <td><strong>Polymer Density</strong></td>
        <td>ISO 1183 / ASTM D1505</td>
        <td class="val">${grade.density}</td>
        <td>g / cm³</td>
      </tr>
      <tr>
        <td><strong>Polymer Classification</strong></td>
        <td>Petrochemical Specification</td>
        <td class="val">${grade.category}</td>
        <td>Family</td>
      </tr>
      <tr>
        <td><strong>Subtype / Polymer Form</strong></td>
        <td>Extrusion / Injection</td>
        <td class="val">${grade.subCategory}</td>
        <td>Type</td>
      </tr>
      <tr>
        <td><strong>Manufacturer &amp; Origin</strong></td>
        <td>Producer Allocation</td>
        <td class="val">${grade.brand}</td>
        <td>${grade.origin}</td>
      </tr>
      <tr>
        <td><strong>Quality Certification Status</strong></td>
        <td>Batch Inspection</td>
        <td class="val" style="color:#059669;">${grade.status}</td>
        <td>COA / Refiner Cert</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">Target Processing &amp; Applications</div>
  <div class="app-box">
    <strong>Recommended Applications:</strong> ${grade.application}.
    ${grade.notes ? `<br><br><strong>Technical &amp; Processing Note:</strong> ${grade.notes}` : ""}
    <br><br>
    <strong>Packaging &amp; Supply Mode:</strong> Standard 25 kg multi-layer valve bags, 1000 kg FIBC jumbo sacks, or bulk container liners. Exported via maritime containerized shipments directly to destination ports worldwide.
  </div>

  <div class="section-title">Quality Assurance &amp; Notice</div>
  <p style="font-size: 11px; color: #64748b; line-height: 1.5;">
    The values presented in this Technical Data Sheet reflect nominal laboratory test parameters provided by the manufacturer refinery. Actual processing results may vary depending upon converter machinery, mould configurations, and temperature profiles. National Polymers LLC FZ guarantees refinery-sealed batches with full batch-specific Certificates of Analysis (COA).
  </p>

  <div class="footer">
    <div><strong>National Polymers LLC FZ</strong> · Dubai, United Arab Emirates · info@nationalpolymersfz.com</div>
    <div>Page 1 of 1</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>
      `;

      printWindow.document.write(tdsHtml);
      printWindow.document.close();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error("Error opening TDS window:", err);
      alert("Unable to generate TDS. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const buttonClasses =
    variant === "primary"
      ? "bg-primary hover:bg-primary-darker text-white shadow-sm"
      : variant === "secondary"
      ? "bg-navy hover:bg-navy-dark text-white shadow-sm"
      : "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white";

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer ${buttonClasses}`}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Generating TDS...</span>
        </>
      ) : downloaded ? (
        <>
          <Check className="w-4 h-4 text-emerald-500" />
          <span>TDS Opened</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>
            {grade.tdsStatus === "available"
              ? "Download TDS (PDF)"
              : grade.tdsStatus === "pending"
              ? "Verification Pending"
              : "Request TDS Document"}
          </span>
        </>
      )}
    </button>
  );
};
