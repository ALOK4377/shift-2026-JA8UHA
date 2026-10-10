import React, { useState } from "react";
import { 
  Radio, 
  KeyRound, 
  ShieldAlert, 
  ZapOff, 
  Sliders, 
  WifiOff, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Wrench,
  AlertCircle
} from "lucide-react";
import { RiskBadge } from "./RiskBadge";

const ICON_MAP = {
  Radio,
  KeyRound,
  ShieldAlert,
  ZapOff,
  Sliders,
  WifiOff,
  Cpu
};

export function AssessmentCheck({ check, index, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const CheckIcon = ICON_MAP[check.iconName] || AlertCircle;

  let statusBg = "border-slate-200 bg-white";
  let statusIconColor = "text-slate-400";
  let StatusIcon = CheckCircle2;

  if (check.status === "PASS") {
    statusBg = "border-emerald-200 bg-emerald-50/30";
    statusIconColor = "text-emerald-600";
    StatusIcon = CheckCircle2;
  } else if (check.status === "WARNING") {
    statusBg = "border-amber-200 bg-amber-50/30";
    statusIconColor = "text-amber-600";
    StatusIcon = AlertTriangle;
  } else if (check.status === "FAIL") {
    statusBg = "border-rose-200 bg-rose-50/30";
    statusIconColor = "text-rose-600";
    StatusIcon = XCircle;
  }

  return (
    <div className={`rounded-xl border transition-all duration-200 shadow-sm ${statusBg} mb-3 overflow-hidden`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3.5 min-w-0 pr-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <CheckIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="text-xs font-mono font-bold text-slate-400">CHECK {index + 1}</span>
              <h4 className="text-sm font-semibold text-slate-900 truncate">{check.name}</h4>
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {check.category}
              </span>
            </div>
            <p className="text-xs text-slate-600 truncate mt-0.5 font-mono">
              Detected: {check.detected}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <RiskBadge status={check.status} size="sm" />
          <div className="text-slate-400">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 bg-white/80 text-xs">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
              Why this matters to workshop & vehicle safety:
            </p>
            <p className="text-slate-600 leading-relaxed">{check.explanation}</p>
          </div>

          <div className="bg-blue-50/70 rounded-lg p-3 border border-blue-100 flex items-start gap-2">
            <Wrench className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">Recommended Workshop Action:</p>
              <p className="text-blue-800 mt-0.5">{check.remediation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
