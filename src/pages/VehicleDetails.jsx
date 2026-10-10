import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Car, 
  BatteryCharging, 
  Bluetooth, 
  Shield, 
  Wrench, 
  ArrowLeft, 
  Activity, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon,
  KeyRound,
  Radio,
  Sliders,
  Cpu
} from "lucide-react";
import { getVehicleById, getAssessmentResult } from "../logic/storage";
import { RiskBadge } from "../components/RiskBadge";
import { RiskScore } from "../components/RiskScore";
import { EmptyState } from "../components/EmptyState";

export function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);

  useEffect(() => {
    const v = getVehicleById(id);
    setVehicle(v);
    if (v) {
      const assess = getAssessmentResult(v.id);
      setAssessmentData(assess);
    }
  }, [id]);

  if (!vehicle) {
    return (
      <EmptyState
        title="Vehicle Not Found"
        description={`No vehicle profile found for ID "${id}".`}
        actionLabel="Return to Fleet"
        onAction={() => navigate("/vehicles")}
      />
    );
  }

  const latestAssessment = assessmentData?.current;
  const isHighRisk = vehicle.status === "High Risk";

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/vehicles"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet</span>
        </Link>
        <span className="text-xs font-mono text-slate-400">ID: {vehicle.id}</span>
      </div>

      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
            <Car className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center space-x-3 flex-wrap gap-y-1">
              <h2 className="text-xl font-black text-slate-900 font-mono">{vehicle.id}</h2>
              <RiskBadge status={vehicle.status} size="md" />
              {vehicle.isRemediated && (
                <span className="px-2.5 py-0.5 text-xs font-bold font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg">
                  Remediated
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-700 mt-1">{vehicle.model}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Registration: <span className="font-mono font-medium">{vehicle.regNumber}</span> • Driver: {vehicle.driverName}
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <Link
            to={`/assessment/${vehicle.id}`}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5 ${
              isHighRisk
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Run Security Assessment</span>
          </Link>

          <Link
            to={`/remediation/${vehicle.id}`}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-all flex items-center gap-1.5"
          >
            <Wrench className="w-4 h-4" />
            <span>Remediation</span>
          </Link>

          <Link
            to={`/report/${vehicle.id}`}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold border border-slate-300 transition-all flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>View Report</span>
          </Link>
        </div>
      </div>

      {/* Grid Specs and Current Posture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hardware & Battery Specs */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Vehicle & Battery Specs
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Vehicle Type:</span>
              <span className="font-medium text-slate-800">Electric 3-Wheeler (L5M / E-Rickshaw)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">BMS Model:</span>
              <span className="font-mono font-bold text-slate-800">{vehicle.bmsModel}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Battery Chemistry:</span>
              <span className="font-mono text-slate-800">{vehicle.batterySpec}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Wireless Link:</span>
              <span className="font-mono text-slate-800">{vehicle.connectionType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Assigned Hub:</span>
              <span className="text-slate-800">{vehicle.workshopStation}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Last Assessed:</span>
              <span className="font-mono text-slate-800">{vehicle.lastAssessed || "Not yet"}</span>
            </div>
          </div>
        </div>

        {/* Simulated Wireless BMS Profile Parameters */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Simulated Wireless BMS Parameters
            </h3>
            <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Simulated GATT Inspection
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <Radio className="w-3.5 h-3.5 text-blue-500" />
                Wireless Interface
              </div>
              <p className="font-mono text-slate-800 text-[11px] font-medium leading-tight">
                {vehicle.rawProfile.wirelessInterface}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                Authentication
              </div>
              <p className="font-mono text-slate-800 text-[11px] font-medium leading-tight">
                {vehicle.rawProfile.authentication}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <Shield className="w-3.5 h-3.5 text-indigo-500" />
                Access Control
              </div>
              <p className="font-mono text-slate-800 text-[11px] font-medium leading-tight">
                {vehicle.rawProfile.unauthorizedAccess}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <Sliders className="w-3.5 h-3.5 text-rose-500" />
                Safety Commands
              </div>
              <p className="font-mono text-slate-800 text-[11px] font-medium leading-tight">
                {vehicle.rawProfile.safetyCommands}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <Sliders className="w-3.5 h-3.5 text-purple-500" />
                Config Protection
              </div>
              <p className="font-mono text-slate-800 text-[11px] font-medium leading-tight">
                {vehicle.rawProfile.configProtection}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                Firmware / OTA
              </div>
              <p className="font-mono text-slate-800 text-[11px] font-medium leading-tight">
                {vehicle.rawProfile.firmwareAccess}
              </p>
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
            <span className="text-blue-900">
              Want to see detailed security check evaluations and explainable risks?
            </span>
            <Link
              to={`/assessment/${vehicle.id}`}
              className="text-blue-700 font-bold hover:underline shrink-0"
            >
              Run Assessment →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
