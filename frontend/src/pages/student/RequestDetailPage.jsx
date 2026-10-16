import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Building2,
  User,
  FileText,
  AlertTriangle,
  UploadCloud,
  CheckCircle,
  Download,
  Copy,
  Check,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { requestService } from '../../services/requestService';
import { useAuth } from '../../hooks/useAuth';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import { ApprovalTimeline } from '../../components/workflow/ApprovalTimeline';
import { RequestActivity } from '../../components/workflow/RequestActivity';
import { SLAIndicator } from '../../components/workflow/SLAIndicator';
import { DocumentUpload } from '../../components/workflow/DocumentUpload';
import { formatDate } from '../../utils/formatters';
import './RequestDetailPage.css';

export function RequestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Upload modal state for Action Required
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [actionFiles, setActionFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const loadRequest = async () => {
    setLoading(true);
    try {
      const data = await requestService.getRequestById(id);
      setRequest(data);
    } catch (err) {
      console.error('Error loading request detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequest();
  }, [id]);

  const handleCopyId = () => {
    if (!request) return;
    navigator.clipboard.writeText(request.requestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActionUploadSubmit = async (e) => {
    e.preventDefault();
    if (actionFiles.length === 0) return;

    setIsUploading(true);
    try {
      await requestService.uploadSupportingDocument(request.requestId, actionFiles[0]);
      setShowUploadModal(false);
      setActionFiles([]);
      await loadRequest();
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="c360-detail-loading">
        <div className="animate-spin text-accent">
          <Sparkles size={24} />
        </div>
        <span>Retrieving request dossier from campus ledger...</span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="c360-detail-not-found">
        <h2>Request Not Found</h2>
        <p>No campus record found matching tracking ID: {id}</p>
        <Link to="/student/requests" className="c360-back-btn">
          <ArrowLeft size={16} />
          <span>Return to My Requests</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="c360-detail-page">
      {/* Top Breadcrumb & Actions */}
      <div className="c360-detail-top-nav">
        <Link to="/student/requests" className="c360-detail-back-link">
          <ArrowLeft size={15} />
          <span>Back to My Requests</span>
        </Link>

        <div className="c360-detail-top-right">
          {user?.role && user.role !== 'STUDENT' && (
            <Link
              to={`/${user.role.toLowerCase()}/requests/${request.requestId}`}
              className="c360-auth-jump-pill"
              title="Open Authority Evaluation Workspace"
            >
              <Shield size={13} className="text-accent" />
              <span>Evaluate as {user.role === 'FACULTY' ? 'Faculty' : user.role === 'HOD' ? 'HOD' : 'Admin'} →</span>
            </Link>
          )}

          <button
            type="button"
            className="c360-copy-id-btn"
            onClick={handleCopyId}
            title="Copy Universal Request ID"
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            <span className="mono-code">{request.requestId}</span>
            <span>{copied ? 'Copied' : 'Copy ID'}</span>
          </button>
        </div>
      </div>

      {/* Main Request Dossier Header */}
      <div className="c360-detail-hero-card">
        <div className="c360-detail-hero__main">
          <div className="c360-detail-hero__id-row">
            <span className="c360-detail-hero__id mono-code">{request.requestId}</span>
            <span className="c360-detail-hero__dot">•</span>
            <span className="c360-detail-hero__cat">{request.category}</span>
            {request.priority && request.priority !== 'NORMAL' && (
              <PriorityBadge priority={request.priority} />
            )}
          </div>

          <h1 className="c360-detail-hero__title">{request.title}</h1>

          <div className="c360-detail-hero__meta-strip">
            <div className="c360-hero-meta-item">
              <span className="c360-hero-meta-label">Submitted On</span>
              <span className="c360-hero-meta-value">{request.date || formatDate(request.createdAt)}</span>
            </div>

            <div className="c360-hero-meta-item">
              <span className="c360-hero-meta-label">Current Stage</span>
              <span className="c360-hero-meta-value text-accent font-bold">
                {request.currentStage || 'Faculty Verification'}
              </span>
            </div>

            <div className="c360-hero-meta-item">
              <span className="c360-hero-meta-label">Required By</span>
              <span className="c360-hero-meta-value">{request.requiredBy || '02 Mar 2026'}</span>
            </div>
          </div>
        </div>

        <div className="c360-detail-hero__status-box">
          <span className="c360-hero-status-label">Overall Status</span>
          <StatusBadge status={request.status} label={request.statusLabel} />
        </div>
      </div>

      {/* Action Required Alert Banner (if pending student action) */}
      {request.actionRequired && (
        <div className="c360-detail-action-banner">
          <div className="c360-detail-action-banner__icon-box">
            <AlertTriangle size={22} />
          </div>

          <div className="c360-detail-action-banner__content">
            <div className="c360-action-tag">ACTION REQUIRED FROM STUDENT</div>
            <h3 className="c360-action-title">{request.actionRequired.title}</h3>
            <p className="c360-action-msg">{request.actionRequired.message}</p>
          </div>

          <button
            type="button"
            className="c360-action-upload-btn"
            onClick={() => setShowUploadModal(true)}
          >
            <UploadCloud size={16} />
            <span>{request.actionRequired.actionLabel || 'Upload Document'}</span>
          </button>
        </div>
      )}

      {/* 2-Column Content Grid */}
      <div className="c360-detail-grid">
        {/* Left Primary Column: Overview, Timeline, Audit Trail */}
        <div className="c360-detail-main-col">
          {/* Request Particulars Card */}
          <div className="c360-detail-section-card">
            <h3 className="c360-section-title">Application Particulars</h3>

            <div className="c360-particulars-grid">
              <div className="c360-particular-item">
                <span className="c360-part-label">Student Applicant</span>
                <span className="c360-part-val">{request.studentName || 'Shiva Kumar'} ({request.studentId || 'STU001'})</span>
              </div>

              <div className="c360-particular-item">
                <span className="c360-part-label">Department</span>
                <span className="c360-part-val">{request.department || 'Computer Science & Engineering'}</span>
              </div>

              <div className="c360-particular-item">
                <span className="c360-part-label">Campus Institution</span>
                <span className="c360-part-val">Garden City University</span>
              </div>

              <div className="c360-particular-item">
                <span className="c360-part-label">Target Authority Clearance</span>
                <span className="c360-part-val">{request.currentStage || 'Faculty & Department'}</span>
              </div>
            </div>

            <div className="c360-statement-box">
              <span className="c360-part-label">Statement of Purpose & Details</span>
              <p className="c360-statement-text">{request.description}</p>
            </div>

            {/* Attached Documents */}
            {request.attachments && request.attachments.length > 0 && (
              <div className="c360-attachments-section">
                <span className="c360-part-label">Supporting Documents & Proof</span>
                <div className="c360-att-list">
                  {request.attachments.map((att) => (
                    <div key={att.id} className="c360-att-pill">
                      <FileText size={15} className="c360-att-icon" />
                      <div className="c360-att-info">
                        <span className="c360-att-name">{att.name}</span>
                        <span className="c360-att-meta">{att.size} • {att.uploadedAt}</span>
                      </div>
                      <span className="c360-verified-chip">
                        <CheckCircle size={12} />
                        <span>Attached</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Multi-Stage Approval Timeline */}
          <ApprovalTimeline
            timeline={request.timeline}
            currentStage={request.currentStage}
          />

          {/* Chronological Activity & Audit Trail */}
          <RequestActivity activityLog={request.activityLog} />
        </div>

        {/* Right Sidebar Column: SLA, Quick Actions, Governance Info */}
        <div className="c360-detail-side-col">
          {/* SLA Indicator */}
          <SLAIndicator
            expectedSlaHours={request.expectedSlaHours || 48}
            dueText={request.slaDueText || 'Within 48 hours'}
            status={request.slaStatus || 'On Track'}
            stageName={request.currentStage || 'Faculty Verification'}
          />

          {/* Governance & Integrity Card */}
          <div className="c360-integrity-card">
            <div className="c360-integrity-card__header">
              <Shield size={16} className="text-accent" />
              <h4 className="c360-integrity-card__title">Governance & Tracking</h4>
            </div>

            <p className="c360-integrity-card__desc">
              This request is tracked on the institutional record. Every review decision is timestamped and recorded in the approval history.
            </p>

            <div className="c360-integrity-pills">
              <span className="c360-int-pill">✓ Transparent tracking</span>
              <span className="c360-int-pill">✓ Single source of truth</span>
              <span className="c360-int-pill">✓ Real-time status sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Document Modal for Action Required */}
      {showUploadModal && (
        <div className="c360-modal-backdrop" onClick={() => setShowUploadModal(false)}>
          <div className="c360-upload-action-modal" onClick={(e) => e.stopPropagation()}>
            <div className="c360-modal-header">
              <h3 className="c360-modal-title">Upload Required Document</h3>
              <p className="c360-modal-sub">
                Upload the requested verification file for <strong>{request.requestId}</strong>.
              </p>
            </div>

            <form onSubmit={handleActionUploadSubmit}>
              <DocumentUpload
                files={actionFiles}
                onFilesChange={setActionFiles}
                label="Required Verification Document"
                hint="Upload official event invitation letter, team shortlist, or doctor note (PDF, JPG, PNG)"
                maxFiles={1}
                required
              />

              <div className="c360-modal-actions">
                <button
                  type="button"
                  className="c360-modal-btn-cancel"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="c360-modal-btn-submit"
                  disabled={actionFiles.length === 0 || isUploading}
                >
                  <UploadCloud size={16} />
                  <span>{isUploading ? 'Uploading & Resuming Review...' : 'Submit Document'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
