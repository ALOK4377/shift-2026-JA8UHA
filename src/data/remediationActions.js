export const REMEDIATION_STEPS = [
  {
    id: "rem_auth_pairing",
    checkId: "authentication",
    relatedCheckIds: ["wireless_interface", "authentication"],
    title: "Enable Strong Authentication & Replace Default PIN",
    category: "Authentication",
    estimatedMinutes: 5,
    description: "Replace the factory-default broadcast PIN with a unique, cryptographically derived master technician key.",
    workshopSteps: [
      "Connect certified workshop diagnostic tool via USB/direct harness",
      "Enter supervisor master token to enter BMS Configuration Mode",
      "Generate unique 128-bit cryptographic pairing key",
      "Revoke default factory passkeys ('000000' and '123456')",
      "Verify that pairing prompt requires the new authorized key"
    ],
    riskReduction: "High (Prevents brute-force session takeover)"
  },
  {
    id: "rem_access_control",
    checkId: "unauthorized_access",
    relatedCheckIds: ["unauthorized_access"],
    title: "Restrict Access to Whitelisted Workshop Diagnostic Devices",
    category: "Access Control",
    estimatedMinutes: 4,
    description: "Enforce MAC whitelisting and mutual identity verification so unauthorized phones cannot establish a GATT connection.",
    workshopSteps: [
      "Register the workshop diagnostic tablet's public identity key in BMS EEPROM",
      "Toggle 'Enforce Whitelist Only' flag in BMS wireless settings",
      "Attempt connection from an unbonded phone to confirm dropped handshake",
      "Validate authorized workshop tablet connection"
    ],
    riskReduction: "High (Stops arbitrary scanner attachments)"
  },
  {
    id: "rem_safety_interlock",
    checkId: "safety_commands",
    relatedCheckIds: ["safety_commands"],
    title: "Lock Safety-Critical Commands Behind Physical Hardware Interlock",
    category: "Vehicle Safety",
    estimatedMinutes: 8,
    description: "Ensure that discharge cut-off and MOSFET shut-off commands cannot be executed over wireless while the ignition/vehicle is active.",
    workshopSteps: [
      "Inspect BMS speed sensor & ignition sense wire continuity",
      "Enable 'Vehicle Motion Protection Lock' in BMS firmware register 0x4B",
      "Confirm remote MOSFET cut-off returns '0x03 Command Blocked - Vehicle Active'",
      "Test emergency stop functionality with physical key ignition only"
    ],
    riskReduction: "Critical (Prevents dangerous abrupt vehicle stall on public road)"
  },
  {
    id: "rem_config_lock",
    checkId: "config_protection",
    relatedCheckIds: ["config_protection"],
    title: "Lock Cell Voltage Thresholds & Write-Protect Calibration",
    category: "Configuration Integrity",
    estimatedMinutes: 6,
    description: "Write-protect the safety threshold parameters (OVP, UVP, OTP, Charge Current Limit) using cryptographic seal.",
    workshopSteps: [
      "Verify cell overvoltage cutoff is locked at manufacturer safety threshold (3.65V for LFP)",
      "Set undervoltage protection threshold to 2.50V per cell",
      "Enable EEPROM write-protect fuse on BMS configuration register",
      "Sign configuration checksum with workshop private key"
    ],
    riskReduction: "High (Prevents battery overcharging and thermal damage)"
  },
  {
    id: "rem_beacon_timeout",
    checkId: "wireless_access_control",
    relatedCheckIds: ["wireless_access_control"],
    title: "Configure 60-Second Wireless Pairing Timeout & Auto-Sleep",
    category: "Session Management",
    estimatedMinutes: 3,
    description: "Disable continuous Bluetooth advertisement so the BMS enters stealth mode after initial startup.",
    workshopSteps: [
      "Set BLE Advertisement Duration to 60 seconds after ignition start",
      "Enable 'Stealth Mode on Drive' trigger in BMS power profile",
      "Verify that Bluetooth scanner no longer sees BMS broadcast after timeout",
      "Verify pairing mode only wakes on deliberate key cycle sequence"
    ],
    riskReduction: "Medium (Eliminates public tracking and continuous probing)"
  },
  {
    id: "rem_firmware_signed",
    checkId: "firmware_access",
    relatedCheckIds: ["firmware_access"],
    title: "Enforce Cryptographically Signed OTA & Lock Bootloader",
    category: "Firmware Security",
    estimatedMinutes: 7,
    description: "Prevent unauthorized firmware flashes over Bluetooth by requiring valid RSA/ECDSA OEM signatures.",
    workshopSteps: [
      "Flash updated secure bootloader (v2.8.4+)",
      "Install OEM Root Certificate in secure storage partition",
      "Test upload of unsigned mock binary and verify rejection (Error code 0x81)",
      "Lock JTAG/SWD debugging ports on the physical BMS board"
    ],
    riskReduction: "High (Guarantees authentic BMS control logic)"
  }
];
