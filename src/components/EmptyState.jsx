import React from "react";
import { ShieldAlert, Search, RefreshCw } from "lucide-react";

export function EmptyState({ 
  title = "No vehicles found", 
  description = "Try adjusting your search query or filter criteria.",
  icon: Icon = Search,
  actionLabel,
  onAction
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center my-6">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mt-1">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
