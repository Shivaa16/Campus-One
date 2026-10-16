import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Building,
  Calendar,
  FileText,
  User,
  Shield,
  Clock,
  Send,
  Sparkles,
} from 'lucide-react';
import { requestService } from '../../services/requestService';
import { useAuth } from '../../hooks/useAuth';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import { ApprovalTimeline } from '../../components/workflow/ApprovalTimeline';
import { RequestActivity } from '../../components/workflow/RequestActivity';
import { SLAIndicator } from '../../components/workflow/SLAIndicator';
import { formatDate } from '../../utils/formatters';
import './RequestReviewPage.css';

export function RequestReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Infer authority role from auth context or URL
  const getReviewRole = () => {
    if (user?.role && user.role !== 'STUDENT') return user.role;
    if (location.pathname.startsWith('/faculty')) return 'FACULTY';
    if (location.pathname.startsWith('/hod')) return 'HOD';
    if (location.pathname.startsWith('/admin')) return 'ADMIN';
    return user?.role || 'FACULTY';
  };

  const userRole = requestService.getCanonicalRole ? requestService.getCanonicalRole(getReviewRole()) : getReviewRole().toUpperCase();
  const roleName =
    userRole === 'FACULTY'
      ? 'Faculty Advisor'
      : userRole === 'HOD'
      ? 'Head of Department'
      : userRole === 'ADMIN'
      ? 'Campus Administration'
      : 'Review Authority';

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal dialog states
  const [activeModal, setActiveModal] = useState(null); // 'APPROVE' | 'REQUEST_CHANGES' | 'REJECT' | null
  const [remarks, setRemarks] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await requestService.getRequestById(id);
      setRequest(data);
    } catch (err) {
      console.error('Error fetching review request:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id, user?.role]);

  const handleOpenModal = (actionType) => {
    setActiveModal(actionType);
    setRemarks('');
    setErrorMsg('');
  };

  const handleDecisionSubmit = async (e) => {
    e.preventDefault();
    if ((activeModal === 'REQUEST_CHANGES' || activeModal === 'REJECT') && !remarks.trim()) {
      setErrorMsg('Please provide remarks or justification.');
      return;
    }

    setIsProcessing(true);
    try {
      await requestService.advanceRequestStage(request.requestId, {
        role: userRole,
        actorName: user?.name,
        action: activeModal,
        remarks: remarks.trim(),
      });

      setActiveModal(null);
      await loadData();
    } catch (err) {
      console.error('Error advancing request:', err);
      setErrorMsg('An error occurred while recording endorsement.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="c360-review-loading">
        <Clock size={24} className="animate-spin text-accent" />
        <span>Loading request dossier for authority evaluation...</span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="c360-review-loading">
        <h2>Request Not Found</h2>
        <Link to={`/${userRole.toLowerCase()}/dashboard`} className="c360-review-back-link">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  // Canonical stage resolution
  const stageRole = requestService.getCanonicalStageRole ? requestService.getCanonicalStageRole(request) : (request?.currentStageRole || 'FACULTY').toUpperCase();

  const isTerminalState = request.status === 'COMPLETED' || request.status === 'REJECTED' || stageRole === 'COMPLETED' || stageRole === 'REJECTED';
  const canApprove = !isTerminalState && userRole !== 'STUDENT' && (userRole === stageRole || (userRole === 'FACULTY' && stageRole === 'FACULTY') || (userRole === 'HOD' && stageRole === 'HOD') || (userRole === 'ADMIN' && stageRole === 'ADMIN'));

  return (
    <div className="c360-review-page">
      {/* Top Bar Navigation */}
      <div className="c360-review-top-nav">
        <Link to={`/${userRole.toLowerCase()}/dashboard`} className="c360-review-back-link">
          <ArrowLeft size={16} />
          <span>Back to {roleName} Queue</span>
        </Link>

        <div className="c360-review-authority-indicator">
          <Shield size={14} className="text-accent" />
          <span>Evaluating as <strong>{roleName}</strong></span>
        </div>
      </div>

      {/* Review Hero Header */}
      <div className="c360-review-hero-card">
        <div className="c360-review-hero__main">
          <div className="c360-review-hero__id-row">
            <span className="mono-code c360-review-hero__id">{request.requestId}</span>
            <span className="c360-review-hero__sep">•</span>
            <span className="c360-review-hero__cat">{request.category}</span>
            {request.priority && request.priority !== 'NORMAL' && (
              <PriorityBadge priority={request.priority} />
            )}
          </div>

          <h1 className="c360-review-hero__title">{request.title}</h1>

          <div className="c360-review-hero__meta-strip">
            <div className="c360-rev-meta-item">
              <span className="c360-rev-meta-label">Applicant Student</span>
              <span className="c360-rev-meta-val">
                {request.studentName || 'Student'} ({request.studentId || 'STU001'})
              </span>
            </div>

            <div className="c360-rev-meta-item">
              <span className="c360-rev-meta-label">Department</span>
              <span className="c360-rev-meta-val">{request.department || 'Computer Science & Engineering'}</span>
            </div>

            <div className="c360-rev-meta-item">
              <span className="c360-rev-meta-label">Submitted On</span>
              <span className="c360-rev-meta-val">{request.date || formatDate(request.createdAt)}</span>
            </div>

            <div className="c360-rev-meta-item">
              <span className="c360-rev-meta-label">Current Stage</span>
              <span className="c360-rev-meta-val text-accent font-bold">
                {request.currentStage || 'Faculty Verification'}
              </span>
            </div>
          </div>
        </div>

        <div className="c360-review-hero__status-wrap">
          <span className="c360-rev-status-label">Review Status</span>
          <StatusBadge status={request.status} label={request.statusLabel} />
        </div>
      </div>

      {/* Authority Action Control Bar */}
      {!isTerminalState && (
        <div className="c360-decision-bar-card">
          <div className="c360-decision-bar__info">
            <h3 className="c360-decision-bar__title">Authority Evaluation & Decision</h3>
            <p className="c360-decision-bar__desc">
              {canApprove
                ? 'Your endorsement will digitally sign this application and automatically route it to the next designated authority.'
                : `This application is currently awaiting ${request.currentStage || stageRole} endorsement. As ${roleName}, no action is required at this stage.`}
            </p>
          </div>

          {canApprove && (
            <div className="c360-decision-bar__buttons">
              <button
                type="button"
                id="btn-authority-approve"
                className="c360-btn-approve"
                onClick={() => handleOpenModal('APPROVE')}
              >
                <CheckCircle size={15} />
                <span>Approve</span>
              </button>

              <button
                type="button"
                id="btn-authority-changes"
                className="c360-btn-changes"
                onClick={() => handleOpenModal('REQUEST_CHANGES')}
              >
                <AlertTriangle size={15} />
                <span>Request Changes</span>
              </button>

              <button
                type="button"
                id="btn-authority-reject"
                className="c360-btn-reject"
                onClick={() => handleOpenModal('REJECT')}
              >
                <XCircle size={15} />
                <span>Reject</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2-Column Dossier Content */}
      <div className="c360-review-grid">
        {/* Left Main Column */}
        <div className="c360-review-main-col">
          {/* Statement & Attachments */}
          <div className="c360-review-section-card">
            <h3 className="c360-section-title">Student Statement & Justification</h3>
            <p className="c360-statement-text">{request.description}</p>

            {/* Attachments */}
            {request.attachments && request.attachments.length > 0 && (
              <div className="c360-attachments-section">
                <span className="c360-part-label">Attached Documents for Verification</span>
                <div className="c360-att-list">
                  {request.attachments.map((att) => (
                    <div key={att.id} className="c360-att-pill">
                      <FileText size={16} className="c360-att-icon" />
                      <div className="c360-att-info">
                        <span className="c360-att-name">{att.name}</span>
                        <span className="c360-att-meta">{att.size} • Uploaded {att.uploadedAt}</span>
                      </div>
                      <span className="c360-verified-chip">
                        <CheckCircle size={12} />
                        <span>Ready for Review</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Multi-Stage Timeline */}
          <ApprovalTimeline
            timeline={request.timeline}
            currentStage={request.currentStage}
          />

          {/* Immutable Audit Log */}
          <RequestActivity activityLog={request.activityLog} />
        </div>

        {/* Right Sidebar Column */}
        <div className="c360-review-side-col">
          <SLAIndicator
            expectedSlaHours={request.expectedSlaHours || 48}
            dueText={request.slaDueText || 'Within 48 hours'}
            status={request.slaStatus || 'On Track'}
            stageName={request.currentStage || 'Faculty Verification'}
          />

          <div className="c360-integrity-card">
            <div className="c360-integrity-card__header">
              <Shield size={16} className="text-accent" />
              <h4 className="c360-integrity-card__title">Governance Compliance</h4>
            </div>
            <p className="c360-integrity-card__desc">
              All endorsements are recorded with your official faculty credentials ({user?.name || roleName}) as part of the institutional review history.
            </p>
          </div>
        </div>
      </div>

      {/* Decision Confirmation Modal */}
      {activeModal && (
        <div className="c360-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="c360-review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="c360-modal-header">
              <h3 className="c360-modal-title">
                {activeModal === 'APPROVE'
                  ? 'Confirm Digital Endorsement'
                  : activeModal === 'REQUEST_CHANGES'
                  ? 'Request Changes from Applicant'
                  : 'Reject Application'}
              </h3>
              <p className="c360-modal-sub">
                Request ID: <strong>{request.requestId}</strong> • Applicant: {request.studentName}
              </p>
            </div>

            <form onSubmit={handleDecisionSubmit}>
              <div className="c360-modal-form-group">
                <label className="c360-modal-label">
                  {activeModal === 'APPROVE'
                    ? 'Endorsement Remarks (Optional)'
                    : activeModal === 'REQUEST_CHANGES'
                    ? 'Instructions for Student (Required)'
                    : 'Rejection Justification (Required)'}
                </label>
                <textarea
                  className="c360-modal-textarea"
                  rows={3}
                  placeholder={
                    activeModal === 'APPROVE'
                      ? 'e.g., Academic standing verified (>82% attendance). Recommended for HOD clearance.'
                      : activeModal === 'REQUEST_CHANGES'
                      ? 'e.g., Please upload the official event invitation letter and team roster.'
                      : 'e.g., Attendance does not meet institutional eligibility criteria (<75%).'
                  }
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              {errorMsg && <div className="c360-modal-error">{errorMsg}</div>}

              <div className="c360-modal-actions">
                <button
                  type="button"
                  className="c360-modal-btn-cancel"
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`c360-modal-btn-confirm ${
                    activeModal === 'APPROVE'
                      ? 'c360-modal-btn-confirm--approve'
                      : activeModal === 'REQUEST_CHANGES'
                      ? 'c360-modal-btn-confirm--changes'
                      : 'c360-modal-btn-confirm--reject'
                  }`}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    'Recording Decision...'
                  ) : activeModal === 'APPROVE' ? (
                    'Confirm Approval'
                  ) : activeModal === 'REQUEST_CHANGES' ? (
                    'Submit Change Request'
                  ) : (
                    'Confirm Rejection'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
