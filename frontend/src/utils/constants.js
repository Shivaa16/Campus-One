export const APP_CONFIG = {
  APP_NAME: 'CampusOne',
  APP_TAGLINE: 'From Fragmented to Connected',
  VERSION: '1.0.0-alpha',
  CAMPUS_ID: 'INST-2026',
};

export const ROLES = {
  STUDENT: 'STUDENT',
  FACULTY: 'FACULTY',
  HOD: 'HOD',
  ADMIN: 'ADMIN',
};

export const ROLE_LABELS = {
  [ROLES.STUDENT]: 'Student Portal',
  [ROLES.FACULTY]: 'Faculty Advisor Portal',
  [ROLES.HOD]: 'Head of Department Portal',
  [ROLES.ADMIN]: 'Administrative Authority',
};

export const REQUEST_STATUS = {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const STAGES = {
  SUBMITTED: 'SUBMITTED',
  FACULTY: 'FACULTY',
  HOD: 'HOD',
  ADMIN: 'ADMIN',
  COMPLETED: 'COMPLETED',
};

export const STAGE_LABELS = {
  [STAGES.SUBMITTED]: 'Submission Received',
  [STAGES.FACULTY]: 'Faculty Verification',
  [STAGES.HOD]: 'HOD Endorsement',
  [STAGES.ADMIN]: 'Administrative Clearance',
  [STAGES.COMPLETED]: 'Completed & Issued',
};

export const PRIORITIES = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};

export const CATEGORIES = [
  'Hackathon / Event Permission',
  'Internship NOC & Leave',
  'Bonafide / Official Certificate',
  'Fee / Expense Reimbursement',
  'Hostel / Campus Leave',
  'Lab & Equipment Access',
];

export const NAV_LINKS = {
  [ROLES.STUDENT]: [
    { label: 'Overview', path: '/student/dashboard', icon: 'LayoutDashboard' },
    { label: 'Submit Request', path: '/student/requests/new', icon: 'PlusCircle' },
    { label: 'Track Requests', path: '/student/requests', icon: 'ListOrdered' },
  ],
  [ROLES.FACULTY]: [
    { label: 'Pending Approvals', path: '/faculty/dashboard', icon: 'CheckSquare' },
  ],
  [ROLES.HOD]: [
    { label: 'Department Approvals', path: '/hod/dashboard', icon: 'ShieldCheck' },
  ],
  [ROLES.ADMIN]: [
    { label: 'Campus Administration', path: '/admin/dashboard', icon: 'Sliders' },
  ],
};
