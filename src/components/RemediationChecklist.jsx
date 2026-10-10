import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Wrench, 
  Clock, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { REMEDIATION_STEPS } from "../data/remediationActions";

export function RemediationChecklist({
  failedCheckIds = [],
  completedActionIds = [],
  onToggleAction,
  onApplyAll,
  onReassess,
  isReassessing = false
}) {
  const [expandedActionId, setExpandedActionId] = useState(null);

  // Filter steps relevant to the vehicle's weaknesses or show all
  const relevantSteps = REMEDIATION_STEPS.filter(step => 
    failedCheckIds.length === 0 || 
    failedCheckIds.includes(step.checkId) || 
    step.relatedCheckIds.some(rc => failedCheckIds.includes(rc))
  );

  const stepsToDisplay = relevantSteps.length > 0 ? relevantSteps : REMEDIATION_STEPS;
  const allCompleted = stepsToDisplay.every(step => completedActionIds.includes(step.id));
  const completedCount = stepsToDisplay.filter(step => completedActionIds.includes(step.id)).length;

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-cyber-400" />
            <h3 className="text-base font-bold">Simulated Remediation Checklist</h3>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Simulate workshop firmware hardening and access control lock-down.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <span className="text-xs font-mono text-cyber-300 font-semibold">
              {completedCount} of {stepsToDisplay.length} Fixes Applied
            </span>
            <div className="w-28 bg-slate-800 rounded-full h-2 mt-1 overflow-hidden">
              <div
                className="bg-cyber-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(completedCount / stepsToDisplay.length) * 100}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onApplyAll}
            className="px-3 py-1.5 bg-cyber-600 hover:bg-cyber-500 text-white text-xs font-semibold rounded-lg shadow transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Apply All Fixes
          </button>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {stepsToDisplay.map((step, idx) => {
          const isDone = completedActionIds.includes(step.id);
          const isExpanded = expandedActionId === step.id;

          return (
            <div
              key={step.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isDone 
                  ? "bg-emerald-50/40 border-emerald-300" 
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="p-4 flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onToggleAction(step.id)}
                  className="flex items-start space-x-3 text-left flex-1 focus:outline-none"
                >
                  <div className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-400">STEP {idx + 1}</span>
                      <h4 className={`text-sm font-semibold ${isDone ? "text-emerald-950 line-through decoration-emerald-500/50" : "text-slate-900"}`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{step.description}</p>

                    <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        ~{step.estimatedMinutes} mins
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-cyber-700 font-medium">{step.riskReduction}</span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedActionId(isExpanded ? null : step.id)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Toggle step details"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expandable workshop execution steps */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/70 text-xs">
                  <p className="font-semibold text-slate-800 mb-2">Simulated Technician Procedure:</p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                    {step.workshopSteps.map((ws, i) => (
                      <li key={i} className="leading-relaxed">
                        <span className="font-medium text-slate-800">{ws}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action CTA */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50/60 p-4 rounded-xl border border-blue-100">
        <div className="text-xs text-blue-900">
          <p className="font-semibold">Ready to test improvements?</p>
          <p className="text-blue-700">Simulate re-assessment to generate the updated security posture.</p>
        </div>

        <button
          type="button"
          onClick={onReassess}
          disabled={isReassessing}
          className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          {isReassessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Re-assessing BMS...</span>
            </>
          ) : (
            <>
              <span>Re-assess Vehicle</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
