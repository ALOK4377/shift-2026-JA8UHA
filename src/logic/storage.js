import { INITIAL_VEHICLES } from "../data/mockVehicles";
import { runSecurityAssessment, getRemediatedProfile } from "./assessmentEngine";

const STORAGE_KEY_VEHICLES = "cyberride_3w_vehicles";
const STORAGE_KEY_ASSESSMENTS = "cyberride_3w_assessments";
const STORAGE_KEY_REMEDIATION = "cyberride_3w_remediation_progress";

/**
 * Initializes or loads vehicles from localStorage.
 */
export function getVehicles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VEHICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(INITIAL_VEHICLES));
      return INITIAL_VEHICLES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading vehicles from localStorage:", e);
    return INITIAL_VEHICLES;
  }
}

/**
 * Gets a single vehicle by ID.
 */
export function getVehicleById(id) {
  const vehicles = getVehicles();
  return vehicles.find(v => v.id.toLowerCase() === id.toLowerCase()) || null;
}

/**
 * Saves or updates a vehicle in localStorage.
 */
export function saveVehicle(updatedVehicle) {
  try {
    const vehicles = getVehicles();
    const index = vehicles.findIndex(v => v.id.toLowerCase() === updatedVehicle.id.toLowerCase());
    let newVehicles;
    if (index >= 0) {
      newVehicles = [...vehicles];
      newVehicles[index] = updatedVehicle;
    } else {
      newVehicles = [...vehicles, updatedVehicle];
    }
    localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(newVehicles));
    return newVehicles;
  } catch (e) {
    console.error("Failed to save vehicle:", e);
    return getVehicles();
  }
}

/**
 * Resets fleet data back to original hackathon demo state.
 */
export function resetFleetToInitial() {
  localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(INITIAL_VEHICLES));
  localStorage.removeItem(STORAGE_KEY_ASSESSMENTS);
  localStorage.removeItem(STORAGE_KEY_REMEDIATION);
  return INITIAL_VEHICLES;
}

/**
 * Gets the latest assessment result for a vehicle.
 */
export function getAssessmentResult(vehicleId) {
  try {
    const allAssessments = JSON.parse(localStorage.getItem(STORAGE_KEY_ASSESSMENTS) || "{}");
    if (allAssessments[vehicleId]) {
      return allAssessments[vehicleId];
    }
    // If not assessed yet, run initial deterministic assessment
    const vehicle = getVehicleById(vehicleId);
    if (vehicle) {
      const initialResult = runSecurityAssessment(vehicle);
      allAssessments[vehicleId] = {
        current: initialResult,
        initial: initialResult,
        history: [initialResult]
      };
      localStorage.setItem(STORAGE_KEY_ASSESSMENTS, JSON.stringify(allAssessments));
      return allAssessments[vehicleId];
    }
    return null;
  } catch (e) {
    console.error("Error retrieving assessment:", e);
    return null;
  }
}

/**
 * Saves a new assessment result (e.g. after initial run or re-test).
 */
export function saveAssessmentResult(vehicleId, result, isReassessment = false) {
  try {
    const allAssessments = JSON.parse(localStorage.getItem(STORAGE_KEY_ASSESSMENTS) || "{}");
    const existing = allAssessments[vehicleId] || {
      current: result,
      initial: result,
      history: []
    };

    if (!existing.initial) {
      existing.initial = result;
    }

    const updated = {
      initial: existing.initial,
      current: result,
      before: isReassessment ? (existing.before || existing.current) : existing.initial,
      history: [result, ...(existing.history || [])]
    };

    allAssessments[vehicleId] = updated;
    localStorage.setItem(STORAGE_KEY_ASSESSMENTS, JSON.stringify(allAssessments));

    // Update vehicle status in fleet
    const vehicle = getVehicleById(vehicleId);
    if (vehicle) {
      vehicle.status = result.status;
      vehicle.lastAssessed = "Just now";
      saveVehicle(vehicle);
    }

    return updated;
  } catch (e) {
    console.error("Failed to save assessment result:", e);
    return null;
  }
}

/**
 * Gets remediation progress for a vehicle.
 */
export function getRemediationProgress(vehicleId) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY_REMEDIATION) || "{}");
    return all[vehicleId] || { completedActionIds: [], notes: "" };
  } catch (e) {
    return { completedActionIds: [], notes: "" };
  }
}

/**
 * Saves remediation progress and updates vehicle rawProfile.
 */
export function saveRemediationProgress(vehicleId, completedActionIds, notes = "") {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY_REMEDIATION) || "{}");
    all[vehicleId] = {
      completedActionIds,
      notes,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_REMEDIATION, JSON.stringify(all));

    // Update vehicle profile based on remediated items
    const vehicle = getVehicleById(vehicleId);
    if (vehicle) {
      const remediatedProfile = getRemediatedProfile(vehicle.rawProfile, completedActionIds);
      vehicle.rawProfile = remediatedProfile;
      vehicle.isRemediated = completedActionIds.length > 0;
      saveVehicle(vehicle);
    }

    return all[vehicleId];
  } catch (e) {
    console.error("Failed to save remediation progress:", e);
    return { completedActionIds, notes };
  }
}
