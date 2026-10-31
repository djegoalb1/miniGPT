import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImagePreviewModalProps {
  src: string | null;
  onClose: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ src, onClose }) => {
  if (!src) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <ZoomIn className="w-4 h-4 text-indigo-400" />
            <span>Foto Compito / Esercizio</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-2 overflow-auto flex items-center justify-center bg-black/40">
          <img
            src={src}
            alt="Compito allegato"
            className="max-h-[80vh] w-auto object-contain rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};
