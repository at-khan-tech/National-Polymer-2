"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Calendar, MapPin, Sparkles, Award } from "lucide-react";
import type { TradeShowEvent } from "@/data/exhibitionsData";
import { ImageUploadField } from "@/components/ImageUploadField";

type Notice = { type: "success" | "error"; message: string } | null;

const initialForm = {
  title: "",
  year: new Date().getFullYear().toString(),
  location: "",
  category: "International Exhibition",
  description: "",
  imageUrl: "",
  standNumber: "",
  featured: false,
};

export function ExhibitionsManager() {
  const [exhibitions, setExhibitions] = useState<TradeShowEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TradeShowEvent | null>(null);
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState<Notice>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadExhibitions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/exhibitions", { cache: "no-store" });
      const data = await res.json();
      if (res.ok && Array.isArray(data.exhibitions)) {
        setExhibitions(data.exhibitions);
      }
    } catch {
      setNotice({ type: "error", message: "Failed to load exhibitions." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadExhibitions();
  }, []);

  const openCreate = () => {
    setEditingItem(null);
    setForm(initialForm);
    setNotice(null);
    setDrawerOpen(true);
  };

  const openEdit = (item: TradeShowEvent) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      year: item.year,
      location: item.location,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      standNumber: item.standNumber || "",
      featured: Boolean(item.featured),
    });
    setNotice(null);
    setDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setNotice({ type: "error", message: "Please provide an event title." });
      return;
    }
    if (!form.imageUrl.trim()) {
      setNotice({ type: "error", message: "Please upload or provide an event photograph." });
      return;
    }

    setSaving(true);
    setNotice(null);

    try {
      if (editingItem) {
        const res = await fetch(`/api/admin/exhibitions/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update exhibition.");
        setNotice({ type: "success", message: "Exhibition photo updated successfully!" });
      } else {
        const res = await fetch("/api/admin/exhibitions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to add exhibition.");
        setNotice({ type: "success", message: "Exhibition photo added successfully!" });
      }

      await loadExhibitions();
      setTimeout(() => {
        setDrawerOpen(false);
      }, 700);
    } catch (err) {
      setNotice({
        type: "error",
        message: err instanceof Error ? err.message : "Error saving exhibition.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/exhibitions/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete.");
      setExhibitions((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete exhibition.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Public Presence &amp; Credibility
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Trade Shows &amp; Exhibitions Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload photographs and event details from international trade fairs shown on the Homepage and About Us.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Exhibition Photo</span>
        </button>
      </div>

      {/* Notice Banner */}
      {notice && !drawerOpen && (
        <div
          className={`rounded-xl p-3.5 text-xs font-semibold ${
            notice.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notice.message}
        </div>
      )}

      {/* Main Content Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-3 border-indigo-600 border-t-transparent" />
          <p className="mt-3 text-xs text-slate-500 font-medium">Loading trade show gallery...</p>
        </div>
      ) : exhibitions.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center bg-white">
          <Award className="mx-auto h-12 w-12 text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Exhibition Photos Added Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Upload pictures from trade summits like ArabPlast, PlastIndia, or K-Show to demonstrate industry credibility.
          </p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition cursor-pointer"
          >
            <Plus size={15} />
            <span>Add First Photo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {exhibitions.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div>
                {/* Photo Preview */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                      <Calendar size={11} className="text-indigo-400" />
                      <span>{item.year}</span>
                    </span>
                    {item.standNumber && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600/90 px-2 py-0.5 text-[10px] font-bold text-white">
                        <Sparkles size={10} />
                        <span>{item.standNumber}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                    {item.category || "Exhibition"}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin size={13} className="text-orange-500 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 pt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-slate-100 px-4 py-3 bg-slate-50/50 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">
                  ID: {item.id.slice(0, 12)}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <Pencil size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === item.id}
                    onClick={() => void handleDelete(item.id, item.title)}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── ADD / EDIT DRAWER MODAL ─── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-6 backdrop-blur-xs">
          <div className="relative flex flex-col w-full max-w-2xl max-h-[92vh] rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                  <Award size={22} />
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {editingItem ? "Edit Exhibition Photo" : "Add Exhibition Photo"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Upload pictures with event name and year for the public gallery.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {notice && (
                <div
                  className={`rounded-lg p-3 text-xs font-semibold ${
                    notice.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {notice.message}
                </div>
              )}

              {/* Event Title */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Event Name / Exhibition Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ArabPlast Dubai, PlastIndia, or K-Show Düsseldorf"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              {/* Year & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Year (e.g. 2024, 2023) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2024"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Category / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Middle East Flagship Exhibition"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              {/* Location & Stand Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dubai World Trade Centre, UAE"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Stand / Booth Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hall 4, Stand B22"
                    value={form.standNumber}
                    onChange={(e) => setForm({ ...form, standNumber: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Event Highlights &amp; Activities
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe meetings with refiners, converters, trade delegations, or product lines showcased..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              {/* Image Upload Component */}
              <div>
                <ImageUploadField
                  label="Exhibition Photograph *"
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                  folder="general"
                  aspectRatio="16:9"
                  recommendedDimensions="1200 x 800 px"
                  helperText="Upload official exhibition booth or event photo (JPG, PNG, WEBP max 5MB)"
                  required
                />
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingItem ? "Save Changes" : "Publish Exhibition Photo"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
