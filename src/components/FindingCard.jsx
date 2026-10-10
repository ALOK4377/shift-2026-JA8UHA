import React from "react";
import { AlertCircle, AlertOctagon, AlertTriangle, ShieldCheck } from "lucide-react";

export function FindingCard({ finding, index }) {
  let Icon = AlertTriangle;
  let borderClass = "border-amber-200 bg-amber-50/40";
  let titleColor = "text-amber-900";
  let badgeColor = "bg-amber-100 text-amber-800";

  if (finding.severity === "CRITICAL" || finding.severity === "HIGH") {
    Icon = AlertOctagon;
    borderClass = "border-rose-200 bg-rose-50/40";
    titleColor = "text-rose-900";
    badgeColor = "bg-rose-100 text-rose-800";
  } else if (finding.severity === "LOW") {
    Icon = ShieldCheck;
    borderClass = "border-emerald-200 bg-emerald-50/40";
    titleColor = "text-emerald-900";
    badgeColor = "bg-emerald-100 text-emerald-800";
  }

  return (
    <div className={`p-4 rounded-xl border ${borderClass} shadow-sm transition-all`}>
      <div className="flex items-start space-x-3">
        <div className="p-1.5 rounded-lg bg-white shadow-xs shrink-0 mt-0.5">
          <Icon className="w-4 h-4 text-slate-700" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <h4 className={`text-sm font-bold ${titleColor}`}>
              {index !== undefined ? `${index + 1}. ` : ""}{finding.title}
            </h4>
            <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${badgeColor}`}>
              {finding.severity}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{finding.description}</p>
        </div>
      </div>
    </div>
  );
}
