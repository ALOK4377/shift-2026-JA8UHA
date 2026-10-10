import React from "react";
import { Info, ShieldAlert } from "lucide-react";

export function DemoBanner({ className = "" }) {
  return (
    <div className={`bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 no-print ${className}`}>
      <div className="flex items-center space-x-2">
        <span className="bg-amber-400/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider flex items-center gap-1 border border-amber-400/30">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          DEMO — Simulated BMS Data
        </span>
        <span className="text-slate-300 hidden md:inline">
          Lightweight security-readiness assessment for connected e-rickshaws.
        </span>
      </div>

      <div className="flex items-center space-x-3 text-[11px] text-slate-400">
        <span className="hidden lg:inline">
          Informed by wireless-BMS security considerations for Indian EV safety (AIS-156 context).
        </span>
        <span className="text-slate-500 font-mono">Prototype v0.9</span>
      </div>
    </div>
  );
}
