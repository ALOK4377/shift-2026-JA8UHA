import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { 
  Wrench, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2,
  Info,
  Car,
  TrendingDown
} from "lucide-react";
import { getVehicleById, getRemediationProgress, saveRemediationProgress, saveAssessmentResult, getAssessmentResult } from "../logic/storage";
import { runSecurityAssessment } from "../logic/assessmentEngine";
import { RemediationChecklist } from "../components/RemediationChecklist";
import { RiskBadge } from "../components/RiskBadge";
import { useToast } from "../context/ToastContext";
import { EmptyState } from "../components/EmptyState";

export function Remediation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [vehicle, setVehicle] = useState(null);
  const [completedActionIds, setCompletedActionIds] = useState([]);
  const [isReassessing, setIsReassessing] = useState(false);
  const [failedCheckIds, setFailedCheckIds] = useState([]);

  useEffect(() => {
    const v = getVehicleById(id);
    setVehicle(v);
    if (v) {
      const prog = getRemediationProgress(v.id);
      setCompletedActionIds(prog.completedActionIds || []);

      const assessment = getAssessmentResult(v.id);
      if (assessment && assessment.current) {
        const fails = assessment.current.checks
          .filter(c => c.status === "FAIL" || c.status === "WARNING")
          .map(c => c.id);
        setFailedCheckIds(fails);
      }
    }
  }, [id]);

  const handleToggleAction = (actionId) => {
    let next;
    if (completedActionIds.includes(actionId)) {
      next = completedActionIds.filter(a => a !== actionId);
    } else {
      next = [...completedActionIds, actionId];
      addToast("Remediation step marked as completed.", "info");
    }
    setCompletedActionIds(next);
    if (vehicle) {
      saveRemediationProgress(vehicle.id, next);
      const updatedV = getVehicleById(vehicle.id);
      setVehicle(updatedV);
    }
  };

  const handleApplyAll = () => {
    const allActionIds = [
      "rem_auth_pairing",
      "rem_access_control",
      "rem_safety_interlock",
      "rem_config_lock",
      "rem_beacon_timeout",
      "rem_firmware_signed"
    ];
    setCompletedActionIds(allActionIds);
    if (vehicle) {
      saveRemediationProgress(vehicle.id, allActionIds);
      const updatedV = getVehicleById(vehicle.id);
      setVehicle(updatedV);
      addToast("All recommended simulated fixes applied!", "success");
    }
  };

  const handleReassess = () => {
    if (!vehicle) return;
    setIsReassessing(true);

    // Short simulated re-test animation
    setTimeout(() => {
      // Save current progress & reload vehicle profile
      saveRemediationProgress(vehicle.id, completedActionIds);
      const updatedVehicle = getVehicleById(vehicle.id);
      
      // Run new assessment
      const newAssessmentResult = runSecurityAssessment(updatedVehicle);
      saveAssessmentResult(updatedVehicle.id, newAssessmentResult, true);

      setIsReassessing(false);
      addToast("Vehicle successfully re-assessed. Security posture improved!", "success");

      // Celebrate improvement
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // canvas-confetti fallback
      }

      navigate(`/results/${vehicle.id}`);
    }, 1200);
  };

  if (!vehicle) {
    return (
      <EmptyState
        title="Vehicle Not Found"
        description={`No vehicle found for ID "${id}".`}
        actionLabel="Back to Fleet"
        onAction={() => navigate("/vehicles")}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to={`/results/${vehicle.id}`}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Results</span>
        </Link>
        <span className="text-xs font-mono text-slate-400">Workshop Remediation Simulation</span>
      </div>

      {/* Target Vehicle Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm font-bold text-slate-900">{vehicle.id}</span>
            <RiskBadge status={vehicle.status} size="sm" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">{vehicle.model}</h2>
          <p className="text-xs text-slate-500">
            BMS: <span className="font-mono text-slate-700">{vehicle.bmsModel}</span> • Station: {vehicle.workshopStation}
          </p>
        </div>

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 max-w-sm">
          <p className="font-bold flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            Simulated Remediation Note
          </p>
          <p className="text-[11px] text-amber-800 mt-0.5">
            This module simulates firmware configuration lock-down and access control policies for EV mechanics. No live hardware changes are performed.
          </p>
        </div>
      </div>

      {/* Interactive Checklist Component */}
      <RemediationChecklist
        failedCheckIds={failedCheckIds}
        completedActionIds={completedActionIds}
        onToggleAction={handleToggleAction}
        onApplyAll={handleApplyAll}
        onReassess={handleReassess}
        isReassessing={isReassessing}
      />
    </div>
  );
}
