import React from "react";

export function RiskScore({ score, max = 10, size = "md", showLabel = true }) {
  const safeScore = Math.min(max, Math.max(0, Number(score) || 0));
  const percentage = (safeScore / max) * 100;

  // Determine colors based on risk severity
  let strokeColor = "#10b981"; // Green (Low risk)
  let bgColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
  let interpretation = "Strong Security Readiness";

  if (safeScore >= 6) {
    strokeColor = "#f43f5e"; // Rose Red (High risk)
    bgColor = "bg-rose-50 text-rose-800 border-rose-200";
    interpretation = "High Exposure - Fix Required";
  } else if (safeScore >= 3) {
    strokeColor = "#f59e0b"; // Amber (Medium risk)
    bgColor = "bg-amber-50 text-amber-800 border-amber-200";
    interpretation = "Medium Exposure - Review Needed";
  }

  if (size === "compact") {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-16 bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full transition-all duration-500 rounded-full"
            style={{ width: `${percentage}%`, backgroundColor: strokeColor }}
          />
        </div>
        <span className="font-mono text-xs font-bold text-slate-700">
          {safeScore}/{max}
        </span>
      </div>
    );
  }

  // Circular gauge for Results & Reports
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Risk progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
            {safeScore}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            / {max} Risk
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={`mt-2 px-2.5 py-0.5 text-xs font-medium rounded-full border ${bgColor}`}>
          {interpretation}
        </span>
      )}
    </div>
  );
}
