import React from "react";

export default function ImageModal({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center transition-all">
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full flex flex-col items-center border border-blue-100 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-3xl font-bold transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Preview"
          className="max-h-[70vh] max-w-full rounded-lg border border-gray-200 shadow"
          style={{ objectFit: "contain" }}
        />
      </div>
      <p> hello there </p>
    </div>
  );
}