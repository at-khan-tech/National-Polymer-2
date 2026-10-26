"use client";

import React, { useState } from "react";
import { Icon } from "./Icons";

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "971568512508";
  const defaultMessage = encodeURIComponent(
    "Hello National Polymers FZ LLC, I am interested in polymer resin quotation and specifications."
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip Popup on Hover */}
      {showTooltip && (
        <div
          role="tooltip"
          className="hidden sm:flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 shadow-xl border border-gray-100 text-xs text-gray-800 animate-news-fade"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Chat with Polymer Trading Desk</span>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-emerald-400/40 cursor-pointer"
        aria-label="Direct WhatsApp Contact with National Polymers"
      >
        {/* Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 opacity-75 animate-ping pointer-events-none group-hover:opacity-100" />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.905.534 3.684 1.455 5.214L2 22l4.894-1.428A10.01 10.01 0 0 0 12.031 22c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm5.836 14.183c-.244.686-1.42 1.258-1.968 1.338-.517.075-1.19.106-3.415-.815-2.846-1.176-4.68-4.072-4.823-4.261-.142-.19-1.155-1.536-1.155-2.929 0-1.393.73-2.078.988-2.364.258-.286.563-.357.751-.357.188 0 .376.002.54.01.174.009.406-.066.635.485.235.564.8 1.954.87 2.096.07.142.117.31.024.498-.094.188-.141.305-.282.47-.141.165-.296.368-.423.494-.141.141-.288.294-.124.575.165.282.73 1.206 1.567 1.951 1.076.958 1.983 1.255 2.265 1.396.282.141.447.118.612-.07.165-.188.706-.823.894-1.106.188-.282.376-.235.635-.141.259.094 1.647.776 1.929.917.282.141.47.212.54.33.07.117.07.682-.174 1.368z" />
        </svg>

        {/* Live Badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
          1
        </span>
      </a>
    </aside>
  );
};
