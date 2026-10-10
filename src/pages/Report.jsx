import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  ShieldAlert, 
  Car, 
  BatteryCharging, 
  Bluetooth, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calendar, 
  FileCheck,
  Award,
  TrendingDown
} from "lucide-react";
import { getVehicleById, getAssessmentResult, getRemediationProgress } from "../logic/storage";
import { RiskBadge } from "../components/RiskBadge";
import { RiskScore } from "../components/RiskScore";
import { EmptyState } from "../components/EmptyState";

export function Report() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [remediationProgress, setRemediationProgress] = useState(null);

  useEffect(() => {
    const v = getVehicleById(id);
    setVehicle(v);
    if (v) {
      const data = getAssessmentResult(v.id);
      setAssessmentData(data);
      setRemediationProgress(getRemediationProgress(v.id));
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!vehicle || !assessmentData) {
    return (
      <EmptyState
        title="Report Not Available"
        description={`No assessment records found to generate a report for "${id}".`}
        actionLabel="Go to Fleet"
        onAction={() => navigate("/vehicles")}
      />
    );
  }

  const current = assessmentData.current;
  const before = assessmentData.before;
  const initial = assessmentData.initial;
  const hasImproved = before && before.normalizedRiskScore > current.normalizedRiskScore;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Navigation and Print Action Bar (Hidden on print) */}
      <div className="flex items-center justify-between no-print">
        <Link
          to={`/results/${vehicle.id}`}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Results</span>
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Download / Print Report</span>
        </button>
      </div>

      {/* Official Report Document Container */}
      <div className="bg-white rounded-2xl border border-slate-300 p-8 sm:p-12 shadow-sm space-y-8 print:border-none print:p-0 print:shadow-none">
        {/* Report Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md print:border print:border-slate-400">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">CyberRide 3W</h1>
                <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                  READINESS AUDIT
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600">
                Connected E-Rickshaw Wireless BMS Security Readiness Report
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs font-mono text-slate-500 space-y-0.5">
            <p>Report ID: <strong className="text-slate-800">CR3W-RPT-{vehicle.id}</strong></p>
            <p>Generated: <strong className="text-slate-800">{current.assessedAt}</strong></p>
            <p>Standard: <span className="text-blue-700 font-medium">AIS-156 Aligned Evaluation</span></p>
          </div>
        </div>

        {/* Target Vehicle Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] font-bold">Vehicle ID</span>
            <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{vehicle.id}</p>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] font-bold">Model / Reg</span>
            <p className="font-semibold text-slate-900 text-xs mt-0.5">{vehicle.model}</p>
            <p className="font-mono text-slate-500 text-[11px]">{vehicle.regNumber}</p>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] font-bold">BMS Hardware</span>
            <p className="font-mono font-semibold text-slate-900 text-xs mt-0.5">{vehicle.bmsModel}</p>
            <p className="font-mono text-slate-500 text-[11px]">{vehicle.batterySpec}</p>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-mono text-[10px] font-bold">Workshop Hub</span>
            <p className="font-semibold text-slate-900 text-xs mt-0.5">{vehicle.workshopStation}</p>
            <p className="text-slate-500 text-[11px]">Tech: {vehicle.driverName}</p>
          </div>
        </div>

        {/* Readiness Overview Scorecard */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 print:bg-slate-100 print:text-slate-900 print:border-slate-300">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 print:text-blue-700">
              AUDIT VERDICT
            </span>
            <h2 className="text-2xl font-black font-mono tracking-tight flex items-center justify-center sm:justify-start gap-3">
              <span>{current.status}</span>
              <RiskBadge status={current.status} size="md" />
            </h2>
            <p className="text-xs text-slate-300 print:text-slate-600 max-w-md leading-relaxed">
              {current.overallRisk === "LOW"
                ? "The vehicle's wireless BMS interfaces meet baseline readiness requirements for workshop operations."
                : "Critical wireless access exposures detected. Safety-critical command isolation required."}
            </p>
          </div>

          <div className="flex items-center space-x-6 shrink-0">
            <div className="text-center font-mono">
              <span className="text-[10px] text-slate-400 uppercase">Risk Index</span>
              <p className="text-3xl font-black text-white print:text-slate-900">{current.normalizedRiskScore}/10</p>
            </div>
            <div className="text-center font-mono">
              <span className="text-[10px] text-slate-400 uppercase">Readiness</span>
              <p className="text-3xl font-black text-blue-400 print:text-blue-700">{current.readinessPercentage}%</p>
            </div>
          </div>
        </div>

        {/* Before / After Progression if remediated */}
        {hasImproved && (
          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 flex items-center justify-between text-xs print:border-slate-300">
            <div className="flex items-center space-x-3">
              <TrendingDown className="w-5 h-5 text-emerald-700" />
              <div>
                <p className="font-bold text-emerald-950">Remediation Validation Completed</p>
                <p className="text-emerald-800">
                  Initial Scan: <strong>{before.normalizedRiskScore}/10 ({before.overallRisk} RISK)</strong> → Post-Remediation: <strong>{current.normalizedRiskScore}/10 ({current.overallRisk} RISK)</strong>
                </p>
              </div>
            </div>
            <span className="font-mono font-bold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded text-[11px]">
              VERIFIED
            </span>
          </div>
        )}

        {/* Security Checks Audit Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
            1. Security Checks Evaluation
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-mono text-slate-500 uppercase text-[11px]">
                  <th className="py-2.5 px-3 font-bold">#</th>
                  <th className="py-2.5 px-3 font-bold">Security Check Category</th>
                  <th className="py-2.5 px-3 font-bold">Detected Configuration</th>
                  <th className="py-2.5 px-3 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                {current.checks.map((check, idx) => (
                  <tr key={check.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-mono text-slate-400 font-bold">{idx + 1}</td>
                    <td className="py-2.5 px-3">
                      <p className="font-bold text-slate-900">{check.name}</p>
                      <p className="text-[11px] text-slate-500">{check.category}</p>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px]">
                      {check.detected}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <RiskBadge status={check.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Findings and Remediation Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
              2. Key Audit Findings
            </h3>
            <div className="space-y-2">
              {current.keyFindings.map((finding, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                  <p className="font-bold text-slate-900 mb-0.5">{idx + 1}. {finding.title}</p>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{finding.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
              3. Recommended Technical Procedures
            </h3>
            <div className="space-y-2">
              {current.recommendedActions.length > 0 ? (
                current.recommendedActions.map((rec, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-blue-100 bg-blue-50/40 text-xs">
                    <p className="font-bold text-blue-950 mb-0.5">{rec.priority}: {rec.title}</p>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{rec.action}</p>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-medium">
                  Baseline security verification passed. No open vulnerabilities logged.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technician Sign-off block */}
        <div className="border-t border-slate-200 pt-6 grid grid-cols-2 gap-8 text-xs font-mono">
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold">Assessing Workshop Technician</span>
            <p className="font-bold text-slate-800 mt-1">Rajesh Kumar (Lead EV Tech - Hub 1)</p>
            <div className="border-b border-slate-300 mt-6 w-48" />
            <p className="text-[10px] text-slate-400 mt-1">Technician Signature & Stamp</p>
          </div>

          <div className="text-right">
            <span className="text-slate-400 uppercase text-[10px] font-bold">Security Verification Status</span>
            <p className="font-bold text-slate-800 mt-1">Readiness Validated ({current.assessedAt})</p>
            <div className="border-b border-slate-300 mt-6 w-48 ml-auto" />
            <p className="text-[10px] text-slate-400 mt-1">Fleet Operations Lead Approval</p>
          </div>
        </div>

        {/* Mandatory Hackathon Prototype Disclaimer Footer */}
        <div className="border-t-2 border-slate-200 pt-4 text-center text-[10px] text-slate-500 font-mono space-y-1">
          <p className="font-bold text-slate-700">
            PROTOTYPE DISCLAIMER
          </p>
          <p>
            Prototype assessment using simulated BMS security profiles. Real-world validation requires authorized access to compatible BMS hardware.
          </p>
          <p className="text-slate-400">
            CyberRide 3W is an assessment readiness workflow tool and does not constitute regulatory certification, government approval, or guaranteed penetration test results.
          </p>
        </div>
      </div>
    </div>
  );
}
