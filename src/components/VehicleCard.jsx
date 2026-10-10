import React from "react";
import { Link } from "react-router-dom";
import { Car, Bluetooth, BatteryCharging, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { RiskBadge } from "./RiskBadge";

export function VehicleCard({ vehicle }) {
  const isHighRisk = vehicle.status === "High Risk";

  return (
    <div className={`bg-white rounded-xl border p-5 transition-all duration-200 shadow-sm flex flex-col justify-between ${
      isHighRisk 
        ? "border-rose-200 hover:border-rose-400 hover:shadow-md" 
        : "border-slate-200 hover:border-slate-300 hover:shadow-md"
    }`}>
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-bold text-slate-900">{vehicle.id}</span>
              <RiskBadge status={vehicle.status} size="sm" />
            </div>
            <h3 className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">{vehicle.model}</h3>
          </div>
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
            <Car className="w-4 h-4" />
          </div>
        </div>

        {/* Specs */}
        <div className="space-y-2 py-2 border-y border-slate-100 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1 text-slate-500">
              <BatteryCharging className="w-3.5 h-3.5 text-blue-500" />
              Battery / BMS:
            </span>
            <span className="font-mono font-medium text-slate-800 text-[11px] truncate max-w-[150px]" title={vehicle.bmsModel}>
              {vehicle.bmsModel}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1 text-slate-500">
              <Bluetooth className="w-3.5 h-3.5 text-indigo-500" />
              Interface:
            </span>
            <span className="font-mono text-[11px] text-slate-700 truncate max-w-[150px]">
              {vehicle.connectionType}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-500">Station / Hub:</span>
            <span className="text-[11px] text-slate-700 font-medium truncate max-w-[150px]">
              {vehicle.workshopStation}
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="mt-4 pt-2 flex items-center justify-between gap-2">
        <Link
          to={`/vehicles/${vehicle.id}`}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          View Details
        </Link>
        <Link
          to={`/assessment/${vehicle.id}`}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
            isHighRisk
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <span>Assess</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
