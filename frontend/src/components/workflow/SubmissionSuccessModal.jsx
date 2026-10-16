import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ListOrdered,
  LayoutDashboard,
  Clock,
  ShieldCheck,
  Calendar,
  Building,
} from 'lucide-react';
import './SubmissionSuccessModal.css';

export function SubmissionSuccessModal({ request, onClose }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!request) return null;

  const handleCopyId = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(request.requestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackRequest = () => {
    navigate(`/student/requests/${request.requestId}`);
    if (onClose) onClose();
  };

  const handleViewAll = () => {
    navigate('/student/requests');
    if (onClose) onClose();
  };

  const handleDashboard = () => {
    navigate('/student/dashboard');
    if (onClose) onClose();
  };

  return (
    <div className="c360-success-modal-backdrop">
      <div className="c360-success-modal">
        {/* Animated Checkmark Header */}
        <div className="c360-success-modal__icon-wrap">
          <div className="c360-success-modal__icon-glow" />
          <CheckCircle2 size={44} className="c360-success-modal__icon" />
        </div>

        <div className="c360-success-modal__header">
          <h2 className="c360-success-modal__title">Request Submitted</h2>
          <p className="c360-success-modal__message">
            Your request has been securely submitted and routed to the appropriate campus authority.
          </p>
        </div>

        {/* Universal Request ID Banner */}
        <div className="c360-success-modal__id-box">
          <div className="c360-success-modal__id-info">
            <span className="c360-success-modal__id-label">UNIVERSAL REQUEST ID</span>
            <span className="c360-success-modal__id-val mono-code">{request.requestId}</span>
          </div>

          <button
            type="button"
            className="c360-success-modal__copy-btn"
            onClick={handleCopyId}
            title="Copy Request ID"
          >
            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Request Details Matrix */}
        <div className="c360-success-modal__details-grid">
          <div className="c360-success-detail-item">
            <div className="c360-success-detail-item__icon-wrap">
              <Building size={14} />
            </div>
            <div className="c360-success-detail-item__content">
              <span className="c360-success-detail-item__label">Category</span>
              <span className="c360-success-detail-item__val">{request.category}</span>
            </div>
          </div>

          <div className="c360-success-detail-item">
            <div className="c360-success-detail-item__icon-wrap">
              <Calendar size={14} />
            </div>
            <div className="c360-success-detail-item__content">
              <span className="c360-success-detail-item__label">Submitted Time</span>
              <span className="c360-success-detail-item__val">{request.date || 'Today'}</span>
            </div>
          </div>

          <div className="c360-success-detail-item">
            <div className="c360-success-detail-item__icon-wrap">
              <ShieldCheck size={14} />
            </div>
            <div className="c360-success-detail-item__content">
              <span className="c360-success-detail-item__label">Current Stage</span>
              <span className="c360-success-detail-item__val">{request.currentStage || 'Faculty Verification'}</span>
            </div>
          </div>

          <div className="c360-success-detail-item">
            <div className="c360-success-detail-item__icon-wrap">
              <Clock size={14} />
            </div>
            <div className="c360-success-detail-item__content">
              <span className="c360-success-detail-item__label">Expected SLA</span>
              <span className="c360-success-detail-item__val">Within 48 hours</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="c360-success-modal__actions">
          <button
            type="button"
            className="c360-success-modal__btn-primary"
            onClick={handleTrackRequest}
          >
            <span>Track Request</span>
            <ArrowRight size={16} />
          </button>

          <div className="c360-success-modal__btn-secondary-row">
            <button
              type="button"
              className="c360-success-modal__btn-secondary"
              onClick={handleViewAll}
            >
              <ListOrdered size={15} />
              <span>View My Requests</span>
            </button>

            <button
              type="button"
              className="c360-success-modal__btn-secondary"
              onClick={handleDashboard}
            >
              <LayoutDashboard size={15} />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
