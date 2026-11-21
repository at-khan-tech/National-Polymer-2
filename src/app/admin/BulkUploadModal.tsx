"use client";

import React from "react";
import { Check, Boxes, Layers, FileSpreadsheet, Upload, X } from "lucide-react";

export type BulkNotice = { type: "success" | "error"; message: string } | null;

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: "grades" | "products";
  onTargetChange: (target: "grades" | "products") => void;
  mode: "merge" | "replace";
  onModeChange: (mode: "merge" | "replace") => void;
  file: File | null;
  onFileSelect: (file: File) => void;
  preview: any[] | null;
  summary: { totalRows: number; validRows: number; target: string } | null;
  loading: boolean;
  notice: BulkNotice;
  onSubmit: () => void | Promise<void>;
}

export function BulkUploadModal({
  isOpen,
  onClose,
  target,
  onTargetChange,
  mode,
  onModeChange,
  file,
  onFileSelect,
  preview,
  summary,
  loading,
  notice,
  onSubmit,
}: BulkUploadModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-6 backdrop-blur-xs">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <FileSpreadsheet size={22} />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Bulk Catalog Upload (.xlsx / .csv)
              </h2>
              <p className="text-xs text-slate-500">
                Upload multiple products or technical grades at once with automatic validation.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
            aria-label="Close bulk upload modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {notice && (
            <div
              className={`rounded-lg p-3 text-xs font-semibold ${
                notice.type === "success"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {notice.message}
            </div>
          )}

          {/* Target Selector Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Select Upload Target
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onTargetChange("grades")}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition cursor-pointer ${
                  target === "grades"
                    ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold shadow-xs"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <Layers className={target === "grades" ? "text-indigo-600" : "text-slate-400"} size={22} />
                <div>
                  <div className="text-sm font-bold">Polymer Grades & TDS</div>
                  <div className="text-xs text-slate-500">MFI, Density, Application, Official TDS link</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onTargetChange("products")}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition cursor-pointer ${
                  target === "products"
                    ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold shadow-xs"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <Boxes className={target === "products" ? "text-indigo-600" : "text-slate-400"} size={22} />
                <div>
                  <div className="text-sm font-bold">Product Families</div>
                  <div className="text-xs text-slate-500">Polymer descriptions, categories, specifications</div>
                </div>
              </button>
            </div>
          </div>

          {/* Sample Template & Help Box */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Download Recommended Excel Template
              </h4>
              <p className="text-xs text-blue-700 mt-0.5">
                Use our standardized Excel template with sample data and column headers to prevent errors.
              </p>
            </div>
            <a
              href={`/api/admin/bulk-upload/template?type=${target}`}
              download={`National_Polymers_${target}_template.xlsx`}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition"
            >
              <FileSpreadsheet size={15} />
              Download {target === "grades" ? "Grades" : "Products"} Template (.xlsx)
            </a>
          </div>

          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. Choose Import Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                  mode === "merge"
                    ? "border-emerald-600 bg-emerald-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="bulkMode"
                  value="merge"
                  checked={mode === "merge"}
                  onChange={() => onModeChange("merge")}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-1">
                    Recommended
                  </span>
                  <div className="text-sm font-semibold text-slate-900">Merge / Update Existing</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Updates existing records matching grade code or product name, and adds new items. Existing items not in file remain safe.
                  </div>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                  mode === "replace"
                    ? "border-red-500 bg-red-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="bulkMode"
                  value="replace"
                  checked={mode === "replace"}
                  onChange={() => onModeChange("replace")}
                  className="mt-1 text-red-600 focus:ring-red-500"
                />
                <div>
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full inline-block mb-1">
                    Overwrite
                  </span>
                  <div className="text-sm font-semibold text-slate-900">Replace Entire Catalog</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Deletes current {target} catalog and replaces completely with items in this file.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* File Upload Zone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              3. Select File (.xlsx, .xls, .csv)
            </label>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-6 text-center hover:border-indigo-400 hover:bg-indigo-50/20 transition">
              <Upload className="h-9 w-9 text-indigo-500 mb-2" />
              <p className="text-sm font-semibold text-slate-800">
                {file ? file.name : "Choose an Excel or CSV file"}
              </p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                {file
                  ? `${(file.size / 1024).toFixed(1)} KB — ready to validate`
                  : "Supports Microsoft Excel (.xlsx, .xls) and Comma-Separated Values (.csv)"}
              </p>
              <label className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-white border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition">
                <span>Browse File</span>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (selected) {
                      onFileSelect(selected);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Live Preview & Summary Table */}
          {preview && summary && (
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between bg-slate-100 px-4 py-2.5 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Check className="text-emerald-600" size={16} />
                  <span>Validation passed: {summary.validRows} valid items ready (from {summary.totalRows} rows)</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Showing first {preview.length} items preview
                </span>
              </div>
              <div className="overflow-x-auto max-h-56">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    {target === "grades" ? (
                      <tr>
                        <th className="p-2.5">Grade</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5">Manufacturer</th>
                        <th className="p-2.5">MFI</th>
                        <th className="p-2.5">Density</th>
                        <th className="p-2.5">Applications</th>
                        <th className="p-2.5">TDS Link</th>
                      </tr>
                    ) : (
                      <tr>
                        <th className="p-2.5">Product Name</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5">Subtypes</th>
                        <th className="p-2.5">Applications</th>
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {preview.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        {target === "grades" ? (
                          <>
                            <td className="p-2.5 font-bold text-slate-900">{item.grade}</td>
                            <td className="p-2.5 text-slate-600">{item.category}</td>
                            <td className="p-2.5 text-slate-600">{item.origin || item.manufacturer}</td>
                            <td className="p-2.5 text-slate-600">{item.mfi || "—"}</td>
                            <td className="p-2.5 text-slate-600">{item.density || "—"}</td>
                            <td className="p-2.5 text-slate-600 max-w-xs truncate">{item.application || "—"}</td>
                            <td className="p-2.5">
                              {item.tdsUrl ? (
                                <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                                  <Check size={12} /> Yes
                                </span>
                              ) : (
                                <span className="text-slate-400">None</span>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="p-2.5 font-bold text-slate-900">{item.name}</td>
                            <td className="p-2.5 text-slate-600">{item.category}</td>
                            <td className="p-2.5 text-slate-600">{Array.isArray(item.subtypes) ? item.subtypes.length : "—"} types</td>
                            <td className="p-2.5 text-slate-600 max-w-xs truncate">
                              {Array.isArray(item.applications) ? item.applications.join(", ") : "—"}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            disabled={loading || !summary || summary.validRows === 0}
            onClick={() => void onSubmit()}
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold text-white shadow-xs transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              mode === "replace"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Processing Import...</span>
              </>
            ) : (
              <>
                <Upload size={15} />
                <span>
                  {summary
                    ? `Import ${summary.validRows} ${target === "grades" ? "Grades" : "Products"} (${mode === "replace" ? "Overwrite" : "Merge"})`
                    : "Import into Database"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
