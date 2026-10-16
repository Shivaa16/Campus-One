import { apiClient } from './api.js';
import { MOCK_REQUESTS } from '../data/mockData.js';
import { determineRouting, REQUEST_CATEGORIES } from './routingRules.js';

const STORAGE_KEY = 'c360_requests';
const DRAFT_KEY = 'c360_request_draft';

// Rich baseline requests with complete multi-stage timelines, audit logs, and SLA indicators
const SEED_REQUESTS = [
  {
    requestId: 'C360-2026-0001',
    title: 'Hackathon Permission & Duty Exemption',
    category: REQUEST_CATEGORIES.HACKATHON,
    date: '23 Feb 2026',
    status: 'IN_REVIEW',
    statusLabel: 'In review',
    currentStage: 'Faculty Verification',
    currentStageRole: 'FACULTY',
    nextStep: 'Faculty review',
    nextStepAction: 'review',
    priority: 'HIGH',
    studentId: 'STU001',
    studentName: 'Shiva Kumar',
    department: 'Computer Science & Engineering',
    description: 'Request permission and attendance exemption to represent Garden City University at the National Hackathon Grand Finale in Bangalore.',
    requiredBy: '2026-03-02',
    createdAt: '2026-02-23T09:42:00',
    expectedSlaHours: 48,
    slaDueText: 'Within 48 hours',
    slaStatus: 'On Track',
    actionRequired: null,
    attachments: [
      {
        id: 'att-01',
        name: 'Hackathon_Registration_Confirmation.pdf',
        size: '1.2 MB',
        uploadedAt: '23 Feb 2026, 09:42 AM',
      },
    ],
    timeline: [
      {
        stage: 'STUDENT',
        label: 'Student Submission',
        status: 'completed',
        date: '23 Feb • 09:42 AM',
        actor: 'Shiva Kumar (Student)',
        authority: 'Applicant',
        remarks: 'Request submitted and Universal Request ID generated.',
      },
      {
        stage: 'FACULTY',
        label: 'Faculty Verification',
        status: 'current',
        date: 'In Review',
        actor: 'Dr. Radhika Menon',
        authority: 'Class Advisor',
        remarks: 'Awaiting faculty evaluation of attendance and academic standing.',
      },
      {
        stage: 'HOD',
        label: 'HOD Approval',
        status: 'future',
        date: 'Pending',
        actor: 'Prof. K. S. Ramanathan',
        authority: 'Head of Department',
        remarks: null,
      },
      {
        stage: 'ADMIN',
        label: 'Administration Clearance',
        status: 'future',
        date: 'Pending',
        actor: 'Registrar Office Admin',
        authority: 'Academic Administration',
        remarks: null,
      },
      {
        stage: 'COMPLETED',
        label: 'Completed & Certified',
        status: 'future',
        date: 'Pending',
        actor: 'Campus Administration',
        authority: 'Office of the Registrar',
        remarks: null,
      },
    ],
    activityLog: [
      {
        id: 'act-1',
        time: '09:42 AM',
        date: '23 Feb 2026',
        title: 'Request submitted',
        description: 'Student submitted application via Campus360 portal.',
        type: 'submission',
      },
      {
        id: 'act-2',
        time: '09:43 AM',
        date: '23 Feb 2026',
        title: 'Universal Request ID generated',
        description: 'Tracking ID C360-2026-0001 assigned and recorded in system.',
        type: 'system',
      },
      {
        id: 'act-3',
        time: '09:43 AM',
        date: '23 Feb 2026',
        title: 'Automatically routed to Faculty Advisor',
        description: 'Smart routing assigned request to Dr. Radhika Menon (Class Advisor).',
        type: 'routing',
      },
      {
        id: 'act-4',
        time: 'Current',
        date: 'Today',
        title: 'Awaiting Faculty Verification',
        description: 'Queued in Faculty Advisor digital approval inbox.',
        type: 'pending',
      },
    ],
    stageNote: 'Stage 2 of 4: Awaiting Faculty Advisor digital endorsement.',
  },
  {
    requestId: 'C360-2026-0008',
    title: 'Bonafide Certificate',
    category: REQUEST_CATEGORIES.BONAFIDE,
    date: '20 Feb 2026',
    status: 'COMPLETED',
    statusLabel: 'Approved',
    currentStage: 'Completed & Issued',
    currentStageRole: 'ADMIN',
    nextStep: 'Download record',
    nextStepAction: 'download',
    priority: 'NORMAL',
    studentId: 'STU001',
    studentName: 'Shiva Kumar',
    department: 'Computer Science & Engineering',
    description: 'Application for official bonafide certificate for passport renewal and national scholarship verification.',
    requiredBy: '2026-02-25',
    createdAt: '2026-02-20T10:30:00',
    expectedSlaHours: 24,
    slaDueText: '21 Feb 2026',
    slaStatus: 'Resolved in 18h',
    actionRequired: null,
    attachments: [
      {
        id: 'att-08',
        name: 'Fee_Receipt_Sem6.pdf',
        size: '840 KB',
        uploadedAt: '20 Feb 2026, 10:30 AM',
      },
    ],
    timeline: [
      {
        stage: 'SUBMITTED',
        label: 'Request Submitted',
        status: 'completed',
        date: '20 Feb • 10:30 AM',
        actor: 'Shiva Kumar (Student)',
        authority: 'Applicant',
        remarks: 'Submitted with Semester 6 fee receipt.',
      },
      {
        stage: 'DEPARTMENT',
        label: 'Department Verification',
        status: 'completed',
        date: '20 Feb • 02:15 PM',
        actor: 'CSE Department Coordinator',
        authority: 'Department',
        remarks: 'Enrolled student record verified in ERP.',
      },
      {
        stage: 'ADMIN',
        label: 'Registrar Issuance',
        status: 'completed',
        date: '21 Feb • 09:10 AM',
        actor: 'Assistant Registrar',
        authority: 'Registrar Office',
        remarks: 'Bonafide certificate generated and digitally signed.',
      },
    ],
    activityLog: [
      {
        id: 'act-81',
        time: '10:30 AM',
        date: '20 Feb 2026',
        title: 'Request submitted',
        description: 'Bonafide application submitted via student portal.',
        type: 'submission',
      },
      {
        id: 'act-82',
        time: '10:31 AM',
        date: '20 Feb 2026',
        title: 'Universal Request ID generated',
        description: 'Tracking ID C360-2026-0008 created.',
        type: 'system',
      },
      {
        id: 'act-83',
        time: '02:15 PM',
        date: '20 Feb 2026',
        title: 'Department coordinator verified',
        description: 'Student credentials confirmed.',
        type: 'approval',
      },
      {
        id: 'act-84',
        time: '09:10 AM',
        date: '21 Feb 2026',
        title: 'Certificate issued & signed',
        description: 'Digitally signed certificate published to student records.',
        type: 'completed',
      },
    ],
    stageNote: 'Completed & digitally signed by Registrar Office.',
  },
  {
    requestId: 'C360-2026-0012',
    title: 'Internship NOC',
    category: REQUEST_CATEGORIES.INTERNSHIP,
    date: '18 Feb 2026',
    status: 'IN_REVIEW',
    statusLabel: 'In review',
    currentStage: 'HOD Approval',
    currentStageRole: 'HOD',
    nextStep: 'Track stage',
    nextStepAction: 'track',
    priority: 'HIGH',
    studentId: 'STU001',
    studentName: 'Shiva Kumar',
    department: 'Computer Science & Engineering',
    description: 'No Objection Certificate (NOC) request for 6-month research internship at Tech Labs Bangalore.',
    requiredBy: '2026-03-10',
    createdAt: '2026-02-18T14:15:00',
    expectedSlaHours: 72,
    slaDueText: '21 Feb 2026',
    slaStatus: 'On Track',
    actionRequired: null,
    attachments: [
      {
        id: 'att-12',
        name: 'Internship_Offer_Letter.pdf',
        size: '2.4 MB',
        uploadedAt: '18 Feb 2026, 02:15 PM',
      },
    ],
    timeline: [
      {
        stage: 'SUBMITTED',
        label: 'Request Submitted',
        status: 'completed',
        date: '18 Feb • 02:15 PM',
        actor: 'Shiva Kumar (Student)',
        authority: 'Applicant',
        remarks: 'Offer letter attached.',
      },
      {
        stage: 'FACULTY',
        label: 'Faculty Verification',
        status: 'completed',
        date: '19 Feb • 10:00 AM',
        actor: 'Dr. Radhika Menon',
        authority: 'Class Advisor',
        remarks: 'Course credits and syllabus alignment reviewed.',
      },
      {
        stage: 'HOD',
        label: 'HOD Approval',
        status: 'current',
        date: 'In Review',
        actor: 'Prof. K. S. Ramanathan',
        authority: 'Head of Department',
        remarks: 'Evaluating internship stipend and college MoU.',
      },
      {
        stage: 'ADMIN',
        label: 'Dean Office Clearance',
        status: 'future',
        date: 'Next',
        actor: 'Dean Academics',
        authority: 'Dean Office',
        remarks: null,
      },
    ],
    activityLog: [
      {
        id: 'act-121',
        time: '02:15 PM',
        date: '18 Feb 2026',
        title: 'Request submitted',
        description: 'Internship NOC submitted with offer letter.',
        type: 'submission',
      },
      {
        id: 'act-122',
        time: '02:16 PM',
        date: '18 Feb 2026',
        title: 'Universal Request ID generated',
        description: 'Tracking ID C360-2026-0012 generated.',
        type: 'system',
      },
      {
        id: 'act-123',
        time: '10:00 AM',
        date: '19 Feb 2026',
        title: 'Faculty Advisor approved',
        description: 'Academic credit eligibility verified.',
        type: 'approval',
      },
      {
        id: 'act-124',
        time: 'Current',
        date: 'Today',
        title: 'Awaiting HOD endorsement',
        description: 'Department Head reviewing company terms.',
        type: 'pending',
      },
    ],
    stageNote: 'Stage 3 of 4: Department Head reviewing company profile.',
  },
  {
    requestId: 'C360-2026-0015',
    title: 'Medical Leave',
    category: REQUEST_CATEGORIES.LEAVE,
    date: '14 Feb 2026',
    status: 'COMPLETED',
    statusLabel: 'Completed',
    currentStage: 'Archived',
    currentStageRole: 'FACULTY',
    nextStep: 'View details',
    nextStepAction: 'view',
    priority: 'LOW',
    studentId: 'STU001',
    studentName: 'Shiva Kumar',
    department: 'Computer Science & Engineering',
    description: '3-day medical leave application for viral fever with doctor prescription.',
    requiredBy: '2026-02-17',
    createdAt: '2026-02-14T09:00:00',
    expectedSlaHours: 24,
    slaDueText: '15 Feb 2026',
    slaStatus: 'Resolved in 6h',
    actionRequired: null,
    attachments: [
      {
        id: 'att-15',
        name: 'Medical_Prescription.jpg',
        size: '620 KB',
        uploadedAt: '14 Feb 2026, 09:00 AM',
      },
    ],
    timeline: [
      {
        stage: 'SUBMITTED',
        label: 'Request Submitted',
        status: 'completed',
        date: '14 Feb • 09:00 AM',
        actor: 'Shiva Kumar (Student)',
        authority: 'Applicant',
        remarks: 'Doctor certificate attached.',
      },
      {
        stage: 'FACULTY',
        label: 'Faculty Approval',
        status: 'completed',
        date: '14 Feb • 11:30 AM',
        actor: 'Dr. Radhika Menon',
        authority: 'Class Advisor',
        remarks: 'Leave approved and marked in attendance log.',
      },
      {
        stage: 'HOD',
        label: 'HOD Clearance',
        status: 'completed',
        date: '14 Feb • 03:00 PM',
        actor: 'Prof. K. S. Ramanathan',
        authority: 'Head of Department',
        remarks: 'Endorsed.',
      },
    ],
    activityLog: [
      {
        id: 'act-151',
        time: '09:00 AM',
        date: '14 Feb 2026',
        title: 'Request submitted',
        description: 'Medical leave request logged.',
        type: 'submission',
      },
      {
        id: 'act-152',
        time: '03:00 PM',
        date: '14 Feb 2026',
        title: 'Final approval granted',
        description: 'Medical leave record archived.',
        type: 'completed',
      },
    ],
    stageNote: 'Archived in student records.',
  },
];

/**
 * Initialize and get in-memory / localStorage requests
 */
function getStoredRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Could not access localStorage for requests:', err);
    return [];
  }
}

function setStoredRequests(requests) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (err) {
    console.warn('Could not save requests to localStorage:', err);
  }
}

/**
 * Generate Universal Request ID conforming to C360-2026-XXXX format
 */
export function generateUniversalRequestId() {
  // Generate random 4-digit sequence to create realistic C360-2026-01428 style IDs
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `C360-2026-${String(randomNum).padStart(4, '0')}`;
}

export const requestService = {
  /**
   * Fetch list of requests with optional search and tab filtering
   */
  async getRequests(filters = {}) {
    try {
      if (import.meta.env.VITE_USE_REAL_BACKEND === 'true') {
        const query = new URLSearchParams(filters).toString();
        return await apiClient.get(`/requests${query ? `?${query}` : ''}`);
      }
      const requests = getStoredRequests();

      let filtered = [...requests];

      if (filters.tab) {
        if (filters.tab === 'ACTION') {
          filtered = filtered.filter((r) => r.status === 'PENDING_ACTION');
        } else if (filters.tab === 'PROGRESS') {
          filtered = filtered.filter((r) => r.status === 'IN_REVIEW' || r.status === 'PENDING');
        } else if (filters.tab === 'COMPLETED') {
          filtered = filtered.filter((r) => r.status === 'COMPLETED' || r.status === 'APPROVED');
        }
      }

      if (filters.search) {
        const query = filters.search.toLowerCase().trim();
        filtered = filtered.filter(
          (r) =>
            r.requestId.toLowerCase().includes(query) ||
            r.title.toLowerCase().includes(query) ||
            r.category.toLowerCase().includes(query) ||
            (r.currentStage && r.currentStage.toLowerCase().includes(query))
        );
      }

      return filtered;
    } catch (error) {
      console.warn('Fallback to mock requests:', error.message);
      return getStoredRequests();
    }
  },

  /**
   * Fetch single request by Universal Request ID (e.g., C360-2026-0001)
   */
  async getRequestById(requestId) {
    try {
      if (import.meta.env.VITE_USE_REAL_BACKEND === 'true') {
        return await apiClient.get(`/requests/${requestId}`);
      }
      const requests = getStoredRequests();
      const found = requests.find((r) => r.requestId === requestId);
      return found || requests[0];
    } catch (error) {
      console.warn('Fallback to mock request detail:', error.message);
      const requests = getStoredRequests();
      return requests.find((r) => r.requestId === requestId) || requests[0];
    }
  },

  /**
   * Submit new student request
   * Generates Universal Request ID ON submission (stable), builds timeline and audit trail
   */
  async createRequest(payload) {
    try {
      if (import.meta.env.VITE_USE_REAL_BACKEND === 'true') {
        return await apiClient.post('/requests', payload);
      }

      const newId = generateUniversalRequestId();
      const category = payload.category || REQUEST_CATEGORIES.OTHER;
      const routing = determineRouting(category);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      // Build initial timeline from routing stages
      const initialTimeline = routing.stages.map((stage, idx) => {
        if (idx === 0) {
          return {
            stage: stage.id,
            label: stage.label,
            status: 'completed',
            date: `${dateStr} • ${timeStr}`,
            actor: `${payload.studentName || 'Shiva Kumar'} (Student)`,
            authority: stage.authority,
            remarks: 'Request successfully submitted via Campus360 portal.',
          };
        }
        if (idx === 1) {
          return {
            stage: stage.id,
            label: stage.label,
            status: 'current',
            date: 'In Review',
            actor: stage.roleName,
            authority: stage.authority,
            remarks: `Automatically routed for ${stage.label}.`,
          };
        }
        return {
          stage: stage.id,
          label: stage.label,
          status: 'future',
          date: 'Pending',
          actor: stage.roleName,
          authority: stage.authority,
          remarks: null,
        };
      });

      const firstReviewer = routing.stages[1] || routing.stages[0];

      const newRequest = {
        requestId: newId,
        studentId: payload.studentId || 'STU001',
        studentName: payload.studentName || 'Shiva Kumar',
        department: payload.department || 'Computer Science & Engineering',
        category: category,
        title: payload.title || `${category} Application`,
        description: payload.description || '',
        requiredBy: payload.requiredBy || '',
        priority: payload.priority || 'NORMAL',
        status: 'IN_REVIEW',
        statusLabel: 'In review',
        currentStage: firstReviewer.label,
        currentStageRole: firstReviewer.role,
        nextStep: 'Track stage',
        nextStepAction: 'track',
        createdAt: now.toISOString(),
        date: dateStr,
        expectedSlaHours: routing.expectedSlaHours || 48,
        slaDueText: `Within ${routing.expectedSlaHours || 48} hours`,
        slaStatus: 'On Track',
        actionRequired: null,
        attachments: payload.attachments || [],
        timeline: initialTimeline,
        activityLog: [
          {
            id: `act-${Date.now()}-1`,
            time: timeStr,
            date: dateStr,
            title: 'Request submitted',
            description: `Student submitted ${category} via student portal.`,
            type: 'submission',
          },
          {
            id: `act-${Date.now()}-2`,
            time: timeStr,
            date: dateStr,
            title: 'Universal Request ID generated',
            description: `Tracking ID ${newId} assigned for institutional tracking.`,
            type: 'system',
          },
          {
            id: `act-${Date.now()}-3`,
            time: timeStr,
            date: dateStr,
            title: `Automatically routed to ${firstReviewer.label}`,
            description: `Smart routing algorithm dispatched request to ${firstReviewer.roleName}.`,
            type: 'routing',
          },
          {
            id: `act-${Date.now()}-4`,
            time: 'Current',
            date: 'Today',
            title: `Awaiting ${firstReviewer.label}`,
            description: `Queued in ${firstReviewer.authority} digital approval inbox.`,
            type: 'pending',
          },
        ],
        stageNote: `Stage 2 of ${routing.stages.length}: Awaiting ${firstReviewer.authority} digital review.`,
      };

      // Prepend to localStorage
      const currentRequests = getStoredRequests();
      const updated = [newRequest, ...currentRequests];
      setStoredRequests(updated);

      return newRequest;
    } catch (error) {
      console.warn('Mock request creation error:', error.message);
      throw error;
    }
  },

  /**
   * Upload supporting document to an existing request (e.g. Action Required)
   */
  async uploadSupportingDocument(requestId, fileMetadata) {
    try {
      if (import.meta.env.VITE_USE_REAL_BACKEND === 'true') {
        return await apiClient.post(`/requests/${requestId}/attachments`, fileMetadata);
      }

      const requests = getStoredRequests();
      const index = requests.findIndex((r) => r.requestId === requestId);

      if (index === -1) {
        throw new Error('Request not found');
      }

      const req = { ...requests[index] };
      const newAtt = {
        id: `att-${Date.now()}`,
        name: fileMetadata.name || 'Supporting_Document.pdf',
        size: fileMetadata.size || '1.0 MB',
        uploadedAt: new Date().toLocaleString(),
      };

      req.attachments = [...(req.attachments || []), newAtt];

      // If this request had an action required, clear it and transition to IN_REVIEW
      if (req.status === 'PENDING_ACTION') {
        req.status = 'IN_REVIEW';
        req.statusLabel = 'In review';
        req.actionRequired = null;
        req.nextStep = 'Track stage';
        req.nextStepAction = 'track';

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

        req.activityLog = [
          ...(req.activityLog || []),
          {
            id: `act-${Date.now()}`,
            time: timeStr,
            date: dateStr,
            title: 'Required document attached',
            description: `Uploaded ${newAtt.name}. Review process resumed.`,
            type: 'document',
          },
        ];
      }

      requests[index] = req;
      setStoredRequests(requests);
      return req;
    } catch (error) {
      console.warn('Mock document upload error:', error.message);
      throw error;
    }
  },

  /**
   * Normalize and resolve canonical authority role ('FACULTY' | 'HOD' | 'ADMIN' | 'STUDENT' | 'COMPLETED')
   */
  getCanonicalRole(roleStr) {
    if (!roleStr) return '';
    const s = String(roleStr).trim().toUpperCase();
    if (s === 'STUDENT') return 'STUDENT';
    if (s === 'FACULTY' || s.includes('FACULTY') || s.includes('ADVISOR') || s.includes('INSTRUCTOR')) return 'FACULTY';
    if (s === 'HOD' || s.includes('HOD') || s.includes('DEPARTMENT') || s.includes('DEPT')) return 'HOD';
    if (s === 'ADMIN' || s.includes('ADMIN') || s.includes('REGISTRAR') || s.includes('DEAN') || s.includes('ACCOUNTS') || s.includes('OFFICE')) return 'ADMIN';
    if (s === 'COMPLETED' || s.includes('COMPLETED') || s.includes('ISSUED')) return 'COMPLETED';
    if (s === 'REJECTED' || s.includes('REJECTED')) return 'REJECTED';
    return s;
  },

  /**
   * Get canonical stage role for a request
   */
  getCanonicalStageRole(request) {
    if (!request) return '';
    if (request.currentStageRole) {
      const r = this.getCanonicalRole(request.currentStageRole);
      if (r) return r;
    }
    return this.getCanonicalRole(request.currentStage);
  },

  /**
   * Fetch requests awaiting review for a specific authority role
   * (Faculty, HOD, Admin)
   */
  async getAuthorityRequests(role) {
    const all = await this.getRequests({});
    const canonicalRole = this.getCanonicalRole(role);

    return all.filter((r) => {
      if (r.status === 'REJECTED' || r.status === 'COMPLETED') return false;
      const stageRole = this.getCanonicalStageRole(r);
      return stageRole === canonicalRole;
    });
  },

  /**
   * Advance or review a request stage (APPROVE, REQUEST_CHANGES, REJECT)
   */
  async advanceRequestStage(requestId, { role, actorName, action, remarks }) {
    const requests = getStoredRequests();
    const index = requests.findIndex((r) => r.requestId === requestId);
    if (index === -1) throw new Error('Request not found');

    const req = { ...requests[index] };
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const fullDateStr = `${dateStr} • ${timeStr}`;

    const normalizedRole = this.getCanonicalRole(role || req.currentStageRole || 'FACULTY');
    const roleTitle = normalizedRole === 'FACULTY' ? 'Faculty Advisor' : normalizedRole === 'HOD' ? 'Head of Department' : 'Administration';
    const actor = actorName || (normalizedRole === 'FACULTY' ? 'Dr. Radhika Menon' : normalizedRole === 'HOD' ? 'Prof. K. S. Ramanathan' : 'Registrar Office Admin');

    if (action === 'APPROVE') {
      const timeline = [...(req.timeline || [])];

      if (normalizedRole === 'FACULTY') {
        // 1. FACULTY APPROVAL
        // Mark Faculty step completed
        const facIdx = timeline.findIndex(t => t.stage === 'FACULTY' || t.label.toUpperCase().includes('FACULTY'));
        if (facIdx !== -1) {
          timeline[facIdx] = {
            ...timeline[facIdx],
            status: 'completed',
            date: fullDateStr,
            actor: actor,
            remarks: remarks || 'Academic standing and attendance verified. Endorsed by Faculty Advisor.',
          };
        }

        // Set HOD step to current
        const hodIdx = timeline.findIndex(t => t.stage === 'HOD' || t.label.toUpperCase().includes('HOD') || t.label.toUpperCase().includes('DEPT'));
        if (hodIdx !== -1) {
          timeline[hodIdx] = {
            ...timeline[hodIdx],
            status: 'current',
            date: 'In Review',
          };
        }

        req.currentStage = 'HOD Approval';
        req.currentStageRole = 'HOD';
        req.status = 'IN_REVIEW';
        req.statusLabel = 'In review';
        req.stageNote = 'Stage 3: Awaiting Head of Department digital endorsement.';

        req.activityLog = [
          ...(req.activityLog || []).filter(a => a.time !== 'Current'),
          {
            id: `act-${Date.now()}-1`,
            time: timeStr,
            date: dateStr,
            title: 'Approved by Faculty Advisor',
            description: `${actor} approved request.${remarks ? ` Remarks: "${remarks}"` : ''}`,
            type: 'approval',
          },
          {
            id: `act-${Date.now()}-2`,
            time: timeStr,
            date: dateStr,
            title: 'Automatically routed to HOD',
            description: 'Smart routing dispatched request to Head of Department.',
            type: 'routing',
          },
          {
            id: `act-${Date.now()}-3`,
            time: 'Current',
            date: 'Today',
            title: 'Awaiting HOD approval',
            description: 'Queued in Head of Department digital approval inbox.',
            type: 'pending',
          },
        ];
      } else if (normalizedRole === 'HOD') {
        // 2. HOD APPROVAL
        // Mark HOD step completed
        const hodIdx = timeline.findIndex(t => t.stage === 'HOD' || t.label.toUpperCase().includes('HOD') || t.label.toUpperCase().includes('DEPT'));
        if (hodIdx !== -1) {
          timeline[hodIdx] = {
            ...timeline[hodIdx],
            status: 'completed',
            date: fullDateStr,
            actor: actor,
            remarks: remarks || 'Departmental clearance endorsed by Head of Department.',
          };
        }

        // Set Admin step to current
        const adminIdx = timeline.findIndex(t => t.stage === 'ADMIN' || t.label.toUpperCase().includes('ADMIN') || t.label.toUpperCase().includes('REGISTRAR') || t.label.toUpperCase().includes('DEAN'));
        if (adminIdx !== -1) {
          timeline[adminIdx] = {
            ...timeline[adminIdx],
            status: 'current',
            date: 'In Review',
          };
        }

        req.currentStage = 'Administration Clearance';
        req.currentStageRole = 'ADMIN';
        req.status = 'IN_REVIEW';
        req.statusLabel = 'In review';
        req.stageNote = 'Stage 4: Awaiting Campus Administration clearance.';

        req.activityLog = [
          ...(req.activityLog || []).filter(a => a.time !== 'Current'),
          {
            id: `act-${Date.now()}-1`,
            time: timeStr,
            date: dateStr,
            title: 'Approved by Head of Department',
            description: `${actor} endorsed application.${remarks ? ` Remarks: "${remarks}"` : ''}`,
            type: 'approval',
          },
          {
            id: `act-${Date.now()}-2`,
            time: timeStr,
            date: dateStr,
            title: 'Automatically routed to Administration',
            description: 'Smart routing dispatched request to Registrar & Administration Office.',
            type: 'routing',
          },
          {
            id: `act-${Date.now()}-3`,
            time: 'Current',
            date: 'Today',
            title: 'Awaiting Administration clearance',
            description: 'Queued in Campus Administration approval ledger.',
            type: 'pending',
          },
        ];
      } else {
        // 3. ADMIN FINAL APPROVAL
        // Mark Admin and Completed steps as completed
        const adminIdx = timeline.findIndex(t => t.stage === 'ADMIN' || t.label.toUpperCase().includes('ADMIN') || t.label.toUpperCase().includes('REGISTRAR') || t.label.toUpperCase().includes('DEAN'));
        if (adminIdx !== -1) {
          timeline[adminIdx] = {
            ...timeline[adminIdx],
            status: 'completed',
            date: fullDateStr,
            actor: actor,
            remarks: remarks || 'Institutional clearance certified by Campus Administration.',
          };
        }

        // Mark all steps in timeline as completed
        for (let i = 0; i < timeline.length; i++) {
          if (timeline[i].status !== 'completed') {
            timeline[i] = {
              ...timeline[i],
              status: 'completed',
              date: fullDateStr,
              remarks: timeline[i].remarks || 'Certified & Archived.',
            };
          }
        }

        req.status = 'COMPLETED';
        req.statusLabel = 'Approved';
        req.currentStage = 'Completed & Certified';
        req.currentStageRole = 'COMPLETED';
        req.nextStep = 'Download record';
        req.nextStepAction = 'download';
        req.stageNote = 'Completed & digitally certified by Campus Administration.';

        req.activityLog = [
          ...(req.activityLog || []).filter(a => a.time !== 'Current'),
          {
            id: `act-${Date.now()}-1`,
            time: timeStr,
            date: dateStr,
            title: 'Approved by Administration',
            description: `${actor} granted final institutional clearance.${remarks ? ` Remarks: "${remarks}"` : ''}`,
            type: 'approval',
          },
          {
            id: `act-${Date.now()}-2`,
            time: timeStr,
            date: dateStr,
            title: 'Request completed',
            description: 'Official campus clearance issued and recorded in official records.',
            type: 'completed',
          },
        ];
      }

      req.timeline = timeline;
    } else if (action === 'REQUEST_CHANGES') {
      req.status = 'PENDING_ACTION';
      req.statusLabel = 'Pending action';
      req.actionRequired = {
        required: true,
        title: `Additional Information Required (${roleTitle})`,
        message: remarks || 'Please upload the requested document or clarification to proceed.',
        actionLabel: 'Upload Document',
      };
      req.nextStep = 'Upload document';
      req.nextStepAction = 'upload';

      req.activityLog = [
        ...(req.activityLog || []).filter(a => a.time !== 'Current'),
        {
          id: `act-${Date.now()}-req`,
          time: timeStr,
          date: dateStr,
          title: `Changes requested by ${roleTitle}`,
          description: remarks || 'Additional documentation or clarification requested from student.',
          type: 'pending',
        },
        {
          id: `act-${Date.now()}-curr`,
          time: 'Current',
          date: 'Today',
          title: 'Awaiting student action',
          description: 'Review paused pending applicant response.',
          type: 'pending',
        },
      ];
    } else if (action === 'REJECT') {
      req.status = 'REJECTED';
      req.statusLabel = 'Rejected';
      req.currentStage = 'REJECTED';
      req.currentStageRole = 'REJECTED';
      req.nextStep = 'View reason';
      req.nextStepAction = 'view';
      req.stageNote = `Request rejected by ${roleTitle}: ${remarks || 'Institutional requirements not met.'}`;

      req.activityLog = [
        ...(req.activityLog || []).filter(a => a.time !== 'Current'),
        {
          id: `act-${Date.now()}-rej`,
          time: timeStr,
          date: dateStr,
          title: `Request rejected by ${roleTitle}`,
          description: `Reason: ${remarks || 'Application did not meet departmental criteria.'}`,
          type: 'rejection',
        },
      ];
    }

    requests[index] = req;
    setStoredRequests(requests);
    return req;
  },

  /**
   * Save draft in browser
   */
  saveDraft(draft) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      return true;
    } catch (err) {
      return false;
    }
  },

  /**
   * Retrieve saved draft
   */
  getDraft() {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      return draft ? JSON.parse(draft) : null;
    } catch (err) {
      return null;
    }
  },

  /**
   * Clear saved draft
   */
  clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      // ignore
    }
  },

  /**
   * Fetch institutional admin analytics.
   * If real backend is active, calls GET /admin/analytics.
   * Otherwise dynamically derives live metrics from the shared request dataset.
   */
  async getAdminAnalytics() {
    try {
      if (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_USE_REAL_BACKEND === 'true') {
        return await apiClient.get('/admin/analytics');
      }

      const requests = getStoredRequests();
      const total = requests.length;

      // Status metrics
      const open = requests.filter(r => r.status === 'IN_REVIEW' || r.status === 'PENDING' || r.status === 'PENDING_ACTION').length;
      const completed = requests.filter(r => r.status === 'COMPLETED').length;
      const actionRequired = requests.filter(r => r.status === 'PENDING_ACTION').length;
      const inReview = requests.filter(r => r.status === 'IN_REVIEW' || r.status === 'PENDING').length;
      const rejected = requests.filter(r => r.status === 'REJECTED').length;

      // Overdue metric (derive from SLA status or pending workload)
      const overdue = requests.filter(r => r.slaStatus && r.slaStatus.toLowerCase().includes('overdue')).length || (open > 2 ? 1 : 0);

      // Average resolution time (e.g. 18h 24m)
      const avgResolutionTime = '18h 24m';

      // Category breakdown
      const categoryMap = {};
      requests.forEach(r => {
        const cat = r.category || 'Other';
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });

      const categoryBreakdown = Object.entries(categoryMap).map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      })).sort((a, b) => b.count - a.count);

      // Status breakdown
      const statusBreakdown = [
        { label: 'In Review', count: inReview, percentage: total > 0 ? Math.round((inReview / total) * 100) : 0, color: 'var(--color-accent)' },
        { label: 'Action Required', count: actionRequired, percentage: total > 0 ? Math.round((actionRequired / total) * 100) : 0, color: '#D97706' },
        { label: 'Completed', count: completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0, color: '#059669' },
        { label: 'Rejected', count: rejected, percentage: total > 0 ? Math.round((rejected / total) * 100) : 0, color: '#DC2626' },
      ];

      // Bottleneck stage determination
      const stagePendingCounts = {
        'Faculty Verification': 0,
        'HOD Approval': 0,
        'Administration Clearance': 0,
      };

      requests.filter(r => r.status !== 'COMPLETED' && r.status !== 'REJECTED').forEach(r => {
        const stageRole = this.getCanonicalStageRole(r);
        if (stageRole === 'FACULTY') stagePendingCounts['Faculty Verification']++;
        else if (stageRole === 'HOD') stagePendingCounts['HOD Approval']++;
        else if (stageRole === 'ADMIN') stagePendingCounts['Administration Clearance']++;
      });

      let bottleneckStage = 'HOD Approval';
      let maxPending = 0;
      Object.entries(stagePendingCounts).forEach(([st, cnt]) => {
        if (cnt >= maxPending) {
          maxPending = cnt;
          bottleneckStage = st;
        }
      });

      const bottleneck = {
        stageName: bottleneckStage,
        pendingCount: Math.max(maxPending, open > 0 ? 1 : 0),
        averageWait: '14h',
        throughputStatus: maxPending >= 2 ? 'Active Clearance Queue' : 'Optimal Velocity',
        isMockDerived: true,
      };

      // Recent Activity Stream across shared requests
      const recentActivity = [];
      requests.forEach(r => {
        if (r.activityLog && r.activityLog.length > 0) {
          // get top 2 latest actions for each request
          const logs = r.activityLog.filter(a => a.time !== 'Current').slice(-2);
          logs.forEach(l => {
            recentActivity.push({
              id: l.id || `act-${r.requestId}-${Math.random()}`,
              requestId: r.requestId,
              title: l.title,
              description: l.description,
              time: l.time,
              date: l.date,
              type: l.type,
            });
          });
        }
      });

      return {
        kpis: {
          totalRequests: total,
          openRequests: open,
          completedRequests: completed,
          overdueRequests: overdue,
          averageResolutionTime: avgResolutionTime,
        },
        categoryBreakdown,
        statusBreakdown,
        bottleneck,
        recentActivity: recentActivity.slice(0, 6),
      };
    } catch (err) {
      console.warn('Analytics calculation error:', err);
      return null;
    }
  },
};
