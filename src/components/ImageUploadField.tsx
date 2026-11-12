"use client";

import React, { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, Trash2, Loader2, Link as LinkIcon, AlertCircle, CheckCircle2 } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: "products" | "blogs" | "general";
  aspectRatio: "4:3" | "16:9" | "1:1";
  recommendedDimensions: string;
  maxSizeMB?: number;
  helperText?: string;
  required?: boolean;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  folder,
  aspectRatio,
  recommendedDimensions,
  maxSizeMB = 5,
  helperText,
  required = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(null);

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Invalid file type. Please upload a JPG, PNG, WEBP, or SVG image.");
      return;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setUploadError(`File is too large (${sizeMB} MB). Maximum allowed size is ${maxSizeMB} MB.`);
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload image.");
      }

      onChange(data.url);
      setUploadSuccess(`Uploaded "${file.name}" (${(file.size / 1024).toFixed(0)} KB) successfully!`);
      setTimeout(() => setUploadSuccess(null), 4000);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Error uploading image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void handleFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      void handleFile(file);
    }
  };

  const handleRemoveImage = () => {
    onChange("");
    setUploadError(null);
    setUploadSuccess(null);
  };

  return (
    <div className="space-y-2">
      {/* Label and Specification Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>

        {/* Requirements Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
            Ratio {aspectRatio}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
            {recommendedDimensions}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
            Max {maxSizeMB} MB
          </span>
        </div>
      </div>

      {/* Tabs: Direct Upload vs Paste URL */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-1.5 text-xs">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
            mode === "upload"
              ? "bg-indigo-50 text-indigo-700 font-semibold"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <UploadCloud size={14} />
          <span>Direct Upload</span>
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
            mode === "url"
              ? "bg-indigo-50 text-indigo-700 font-semibold"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <LinkIcon size={14} />
          <span>Paste Image URL</span>
        </button>
      </div>

      {/* Existing Preview (if value exists) */}
      {value ? (
        <div className="relative rounded-xl border border-slate-200 bg-slate-50/70 p-3 flex flex-col sm:flex-row items-center gap-4">
          <div
            className={`relative rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0 w-36 sm:w-44 ${
              aspectRatio === "4:3"
                ? "aspect-[4/3]"
                : aspectRatio === "16:9"
                ? "aspect-[16/9]"
                : "aspect-square"
            }`}
          >
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
              sizes="200px"
              unoptimized={value.startsWith("data:") || value.startsWith("blob:")}
            />
          </div>

          <div className="min-w-0 flex-1 space-y-1.5 text-left w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <span>Image active &amp; ready</span>
            </div>
            <p className="text-xs text-slate-500 truncate font-mono bg-white px-2 py-1 rounded border border-slate-200">
              {value}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs"
              >
                <UploadCloud size={13} />
                <span>Replace file</span>
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isUploading}
                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50/60 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100/70 transition shadow-2xs"
              >
                <Trash2 size={13} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mode 1: Direct File Dropzone */}
      {mode === "upload" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed p-5 text-center transition-all ${
            isDragging
              ? "border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-200"
              : "border-slate-200 bg-slate-50/50 hover:border-indigo-400 hover:bg-slate-50"
          } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-xs border border-slate-100 text-indigo-600">
              {isUploading ? <Loader2 size={22} className="animate-spin" /> : <UploadCloud size={22} />}
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-800">
                {isUploading ? "Uploading to Cloud Storage..." : "Click to upload or drag & drop image"}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                PNG, JPG, WEBP or SVG (Recommended: {recommendedDimensions}, Aspect Ratio {aspectRatio}, Max {maxSizeMB}MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Paste Direct URL */}
      {mode === "url" && (
        <div>
          <div className="relative">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Paste a direct HTTPS image URL. Recommended ratio: <strong className="text-slate-700">{aspectRatio}</strong> ({recommendedDimensions}).
          </p>
        </div>
      )}

      {/* Error Notice */}
      {uploadError && (
        <div className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700">
          <AlertCircle size={14} className="shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Success Notice */}
      {uploadSuccess && (
        <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-700">
          <CheckCircle2 size={14} className="shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {helperText && <p className="text-[11px] text-slate-400">{helperText}</p>}
    </div>
  );
};
