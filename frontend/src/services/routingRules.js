/**
 * Campus360 - Rule-Based Smart Routing Engine (Mock Service)
 * 
 * NOTE FOR SAMARTH (INTELLIGENCE ENGINE):
 * This module defines the deterministic baseline routing rules for campus requests.
 * Samarth's Intelligence Engine can replace or augment `determineRouting()` with dynamic
 * ML/policy-based routing, automated authority resolution, and anomaly detection.
 */

export const REQUEST_CATEGORIES = {
  HACKATHON: 'Hackathon Permission',
  INTERNSHIP: 'Internship Permission',
  LEAVE: 'Leave Request',
  BONAFIDE: 'Bonafide Certificate',
  REIMBURSEMENT: 'Reimbursement',
  ATTENDANCE: 'Attendance Correction',
  OTHER: 'Other',
};

export const ROUTING_RULES = {
  [REQUEST_CATEGORIES.HACKATHON]: {
    category: 'Hackathon Permission',
    description: 'Event participation, travel clearance, and academic attendance exemption.',
    recommendedPath: 'Faculty Advisor → HOD → Administration',
    requiredDocuments: 'Event Invitation / Shortlisted Team Details',
    expectedSlaHours: 48,
    estimatedResolution: 'Within 48 hours',
    stages: [
      {
        id: 'STUDENT',
        label: 'Student Submission',
        authority: 'Applicant (Student)',
        role: 'STUDENT',
        roleName: 'Student',
      },
      {
        id: 'FACULTY',
        label: 'Faculty Verification',
        authority: 'Faculty Class Advisor',
        role: 'FACULTY',
        roleName: 'Dr. Radhika Menon (Class Advisor)',
      },
      {
        id: 'HOD',
        label: 'HOD Approval',
        authority: 'Head of Department',
        role: 'HOD',
        roleName: 'Prof. K. S. Ramanathan (HOD CSE)',
      },
      {
        id: 'ADMIN',
        label: 'Administration Clearance',
        authority: 'Academic Administration & Registrar',
        role: 'ADMIN',
        roleName: 'Registrar Office',
      },
    ],
  },
  [REQUEST_CATEGORIES.INTERNSHIP]: {
    category: 'Internship Permission',
    description: 'Off-campus internship NOC, industry training, and semester leave credit.',
    recommendedPath: 'Faculty Advisor → HOD → Dean / Administration',
    requiredDocuments: 'Official Internship Offer Letter / Company MoU',
    expectedSlaHours: 72,
    estimatedResolution: 'Within 72 hours',
    stages: [
      {
        id: 'STUDENT',
        label: 'Student Submission',
        authority: 'Applicant (Student)',
        role: 'STUDENT',
        roleName: 'Student',
      },
      {
        id: 'FACULTY',
        label: 'Faculty Verification',
        authority: 'Faculty Class Advisor',
        role: 'FACULTY',
        roleName: 'Dr. Radhika Menon (Class Advisor)',
      },
      {
        id: 'HOD',
        label: 'HOD Approval',
        authority: 'Head of Department',
        role: 'HOD',
        roleName: 'Prof. K. S. Ramanathan (HOD CSE)',
      },
      {
        id: 'ADMIN',
        label: 'Administration Clearance',
        authority: 'Dean of Academics & Registrar',
        role: 'ADMIN',
        roleName: 'Dean Office',
      },
    ],
  },
  [REQUEST_CATEGORIES.LEAVE]: {
    category: 'Leave Request',
    description: 'Medical leave, personal leave, or hostel gate clearance.',
    recommendedPath: 'Faculty Advisor → HOD Endorsement',
    requiredDocuments: 'Doctor Prescription / Medical Certificate',
    expectedSlaHours: 24,
    estimatedResolution: 'Within 24 hours',
    stages: [
      {
        id: 'STUDENT',
        label: 'Student Submission',
        authority: 'Applicant (Student)',
        role: 'STUDENT',
        roleName: 'Student',
      },
      {
        id: 'FACULTY',
        label: 'Faculty Advisor',
        authority: 'Faculty Class Advisor',
        role: 'FACULTY',
        roleName: 'Dr. Radhika Menon (Class Advisor)',
      },
      {
        id: 'HOD',
        label: 'HOD Endorsement',
        authority: 'Head of Department',
        role: 'HOD',
        roleName: 'Prof. K. S. Ramanathan (HOD CSE)',
      },
    ],
  },
  [REQUEST_CATEGORIES.BONAFIDE]: {
    category: 'Bonafide Certificate',
    description: 'Official student status certificate for visas, loans, passports, and exams.',
    recommendedPath: 'Department Coordinator → Registrar Office',
    requiredDocuments: 'Fee Receipt / Student ID Copy',
    expectedSlaHours: 24,
    estimatedResolution: 'Within 24 hours',
    stages: [
      {
        id: 'STUDENT',
        label: 'Student Submission',
        authority: 'Applicant (Student)',
        role: 'STUDENT',
        roleName: 'Student',
      },
      {
        id: 'DEPARTMENT',
        label: 'Department Verification',
        authority: 'Department Coordinator',
        role: 'HOD',
        roleName: 'CSE Academic Coordinator',
      },
      {
        id: 'ADMIN',
        label: 'Registrar / Administration',
        authority: 'Registrar Office',
        role: 'ADMIN',
        roleName: 'Registrar Office Admin',
      },
    ],
  },
  [REQUEST_CATEGORIES.REIMBURSEMENT]: {
    category: 'Reimbursement',
    description: 'Hackathon expenses, conference registrations, travel claims, or club funds.',
    recommendedPath: 'HOD Recommendation → Accounts → Finance Director',
    requiredDocuments: 'Original Bills / Receipts / Event Certificate',
    expectedSlaHours: 96,
    estimatedResolution: 'Within 96 hours',
    stages: [
      {
        id: 'STUDENT',
        label: 'Student Submission',
        authority: 'Applicant (Student)',
        role: 'STUDENT',
        roleName: 'Student',
      },
      {
        id: 'DEPARTMENT',
        label: 'Department Recommendation',
        authority: 'Head of Department',
        role: 'HOD',
        roleName: 'Prof. K. S. Ramanathan (HOD CSE)',
      },
      {
        id: 'ACCOUNTS',
        label: 'Accounts Clearance',
        authority: 'Finance & Accounts Office',
        role: 'ADMIN',
        roleName: 'Campus Accounts Officer',
      },
      {
        id: 'ADMIN',
        label: 'Administration Sanction',
        authority: 'Registrar & Finance Director',
        role: 'ADMIN',
        roleName: 'Finance Director',
      },
    ],
  },
  [REQUEST_CATEGORIES.ATTENDANCE]: {
    category: 'Attendance Correction',
    description: 'Attendance reconciliation for approved campus activities and medical absence.',
    recommendedPath: 'Subject Faculty → Head of Department',
    requiredDocuments: 'Faculty Endorsement Slip / Duty Certificate',
    expectedSlaHours: 48,
    estimatedResolution: 'Within 48 hours',
    stages: [
      {
        id: 'STUDENT',
        label: 'Student Submission',
        authority: 'Applicant (Student)',
        role: 'STUDENT',
        roleName: 'Student',
      },
      {
        id: 'FACULTY',
        label: 'Subject / Course Faculty',
        authority: 'Course Instructor',
        role: 'FACULTY',
        roleName: 'Course Instructor',
      },
      {
        id: 'HOD',
        label: 'Department / HOD',
        authority: 'Head of Department',
        role: 'HOD',
        roleName: 'Prof. K. S. Ramanathan (HOD CSE)',
      },
    ],
  },
  [REQUEST_CATEGORIES.OTHER]: {
    category: 'Other',
    description: 'General administrative requests, lab facilities, and special permissions.',
    recommendedPath: 'Department Coordinator → Academic Administration',
    requiredDocuments: 'Supporting Application / Proof Document',
    expectedSlaHours: 48,
    estimatedResolution: 'Within 48 hours',
    stages: [
      {
        id: 'STUDENT',
        label: 'Student Submission',
        authority: 'Applicant (Student)',
        role: 'STUDENT',
        roleName: 'Student',
      },
      {
        id: 'DEPARTMENT',
        label: 'Department Review',
        authority: 'Department Coordinator',
        role: 'HOD',
        roleName: 'CSE Academic Coordinator',
      },
      {
        id: 'ADMIN',
        label: 'Administration Clearance',
        authority: 'Academic Administration',
        role: 'ADMIN',
        roleName: 'Academic Office',
      },
    ],
  },
};

/**
 * Determine smart routing sequence for a given category.
 * Easily augmented by Samarth's AI/Intelligence Engine response.
 *
 * Contract:
 * {
 *   category: string,
 *   route / recommendedPath: string,
 *   requiredDocuments: string,
 *   estimatedResolution: string,
 *   confidence?: number | null
 * }
 */
export function determineRouting(category, aiPayload = null) {
  const rule = ROUTING_RULES[category] || ROUTING_RULES[REQUEST_CATEGORIES.OTHER];

  return {
    category: aiPayload?.category || rule.category,
    description: aiPayload?.description || rule.description,
    recommendedPath: aiPayload?.route || aiPayload?.recommendedPath || rule.recommendedPath,
    requiredDocuments: aiPayload?.requiredDocuments || rule.requiredDocuments,
    expectedSlaHours: aiPayload?.expectedSlaHours || rule.expectedSlaHours,
    estimatedResolution: aiPayload?.estimatedResolution || rule.estimatedResolution || `Within ${rule.expectedSlaHours} hours`,
    confidence: typeof aiPayload?.confidence === 'number' ? aiPayload.confidence : null,
    isAiAugmented: Boolean(aiPayload && typeof aiPayload.confidence === 'number'),
    stages: (aiPayload?.stages || rule.stages).map((stage, idx) => ({
      ...stage,
      stepNumber: idx + 1,
      isInitial: idx === 0,
    })),
  };
}
