
# CyberRide 3W
### Security Readiness for Connected E-Rickshaws

**Assess. Explain. Improve. Re-test.**

CyberRide 3W is a lightweight security-readiness assessment prototype designed for small EV workshops and fleet operators. It helps users understand potential wireless security weaknesses in connected e-rickshaw Battery Management System (BMS) configurations, review their possible impact, and follow prioritized remediation guidance.

The goal is to make BMS security findings easier to understand and act upon—without requiring specialized cybersecurity expertise.

---

## Overview

Connected e-rickshaws may use Bluetooth-enabled Battery Management Systems (BMS) for battery-related monitoring and configuration. Weak authentication and inadequate wireless access controls can expose certain BMS functions to unauthorized access.

CyberRide 3W demonstrates how these concerns can be translated into a simple, explainable security-readiness workflow.

### Key Features

- **Security Assessment:** Evaluate predefined BMS security checks using simulated vehicle profiles.
- **Explainable Risk Scoring:** Present risk levels with clear findings and reasons.
- **Prioritized Remediation:** Provide actionable recommendations for identified weaknesses.
- **Simulated Re-assessment:** Compare assessment results before and after simulated remediation.
- **Fleet Security Overview:** Review security-readiness status across multiple demo vehicles.
- **Security Readiness Report:** Generate a print-friendly assessment report.
- **Offline-Friendly Prototype:** Use local demo data without requiring an external API or cloud backend.

---

## How It Works

CyberRide follows a five-stage workflow:

1. **Assess** — Select a simulated e-rickshaw BMS profile **or** complete the workshop intake (`/intake`) and run the assessment.
2. **Explain** — Review findings, risk levels, and potential security implications.
3. **Improve** — Follow the recommended remediation checklist.
4. **Re-test** — Run a new simulated assessment and compare the results.
5. **Report** — Review and print the Security Readiness Report.

Hackathon jury pack:

- **Methodology & Architecture Document (with Mermaid Diagrams)**: [`METHODOLOGY.md`](./METHODOLOGY.md)
- Two-page case study: [`CASE_STUDY.md`](./CASE_STUDY.md)
- Three-minute pitch: [`PITCH.md`](./PITCH.md)

---

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Routing | React Router DOM |
| Backend & API | Node.js + Express (`server/index.js` on port 5001) |
| Assessment Engine | Deterministic 5-stage weighted scoring pipeline |
| Standards Alignment | AIS-156 (Amd 3), AIS-038 (Rev 2), ISO/SAE 21434, UNECE WP.29 R155 |
| State & Dual-Mode | Express API with graceful offline browser fallback |
| Report Export | Browser print functionality + CSV Export |

The prototype uses transparent assessment rules rather than machine learning or an opaque prediction model. It is designed to run locally without backend or external API dependencies.

---

## Demo Scenario

The application includes simulated BMS profiles representing different security configurations.

| Demo Profile | Scenario |
|---|---|
| `CR3W-001` | Secure configuration |
| `CR3W-002` | Misconfigured security controls |
| `CR3W-003` | High-risk configuration |

### Demonstration Flow

1. Open the Dashboard at `/dashboard`.
2. Select the high-risk demo profile, `CR3W-003`.
3. Navigate to `/assessment/CR3W-003` and run the assessment.
4. Review the findings and risk score at `/results/CR3W-003`.
5. Open `/remediation/CR3W-003` and review the recommended actions.
6. Apply the simulated remediation and re-assess the profile.
7. Compare the before-and-after results.
8. Open `/report/CR3W-003` to review and print the report.
9. Visit `/fleet` to review the fleet overview and export the available CSV summary.

**Expected demonstration:** The selected high-risk profile should show its predefined findings, and the simulated remediation workflow should demonstrate an improvement in its assessment result.

Actual scores and results depend on the assessment rules implemented in the application.

---

## Getting Started

### Prerequisites

- Node.js and npm
- Git (optional, for cloning the repository)

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd CyberRide-3W
```

Install the dependencies:

```bash
npm install
```

Start the application:
 
```bash
# Run both Backend API and Frontend UI simultaneously (Recommended):
npm run dev:all

# Or run frontend only (operates in offline browser mode):
npm run dev

# Or run the backend API server standalone:
npm run server
```

Open the local application in your browser:

```text
http://localhost:5173
```

Backend REST API endpoints will be accessible at `http://localhost:5001/api`.

> If you already have the project locally, skip the cloning step and run the installation commands from the project directory.

---

## Prototype Scope & Limitations

CyberRide 3W is a hackathon prototype that demonstrates a simulated security-readiness assessment workflow.

- Assessment results are based on predefined, simulated BMS profiles.
- The application does not perform real-world Bluetooth scanning or hardware penetration testing.
- Remediation actions update the simulated assessment workflow; they do not modify a physical BMS.
- Risk scores represent the prototype's defined assessment rules, not a universal security rating.
- The application does not issue regulatory certification or guarantee that a vehicle is secure.

Real-world deployment would require authorized hardware access, validation against compatible BMS implementations, and further security testing.

---

## Safety & Reference Context

CyberRide 3W is intended to help users understand potential wireless-BMS security concerns and recommended corrective actions. Its assessment approach is informed by relevant EV safety and wireless-security considerations.

**CyberRide 3W is not a Battery Management System, a penetration-testing suite, or a regulatory certification tool.** An assessment result should not be treated as proof that a physical vehicle is safe or free from vulnerabilities.

---

## Project Status

**Status:** Hackathon Prototype  
**Event:** SHIFT Sustainable e-Micromobility Hackathon  
**Focus:** Security readiness for connected electric three-wheelers

---

## Team

**Team DevCrew**

- Tanu Gupta
- Alok Tiwari
- Isha Kumari

---

## Disclaimer

This project is developed as a hackathon prototype for demonstration and educational purposes. It uses simulated BMS profiles and predefined assessment logic. It does not perform real-world hardware testing, provide regulatory certification, or guarantee cybersecurity protection.
#
