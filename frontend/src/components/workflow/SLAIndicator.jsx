import React from 'react';
import { Clock, CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';
import './SLAIndicator.css';

export function SLAIndicator({
  expectedSlaHours = 48,
  dueText = 'Within 48 hours',
  status = 'On Track',
  stageName = 'HOD Approval',
}) {
  const isDelayed = status.toLowerCase().includes('delayed') || status.toLowerCase().includes('risk');
  const isResolved = status.toLowerCase().includes('resolved') || status.toLowerCase().includes('completed');

  return (
    <div className="c360-sla-card">
      <div className="c360-sla-card__header">
        <div className="c360-sla-card__title-box">
          <Clock size={15} className="c360-sla-card__icon" />
          <span className="c360-sla-card__title">SLA & Resolution Timeline</span>
        </div>

        <span
          className={`c360-sla-status-pill ${
            isDelayed
              ? 'c360-sla-status-pill--delayed'
              : isResolved
              ? 'c360-sla-status-pill--resolved'
              : 'c360-sla-status-pill--ontrack'
          }`}
        >
          {isDelayed ? (
            <AlertTriangle size={12} />
          ) : isResolved ? (
            <CheckCircle size={12} />
          ) : (
            <span className="c360-sla-status-pill__dot" />
          )}
          <span>{status}</span>
        </span>
      </div>

      <div className="c360-sla-card__grid">
        <div className="c360-sla-metric">
          <span className="c360-sla-metric__label">Standard SLA</span>
          <span className="c360-sla-metric__value">{expectedSlaHours}h window</span>
        </div>

        <div className="c360-sla-metric">
          <span className="c360-sla-metric__label">Target Resolution</span>
          <span className="c360-sla-metric__value">{dueText}</span>
        </div>

        <div className="c360-sla-metric">
          <span className="c360-sla-metric__label">Current Active Stage</span>
          <span className="c360-sla-metric__value">{stageName}</span>
        </div>
      </div>

      <div className="c360-sla-card__footer">
        <p className="c360-sla-card__note">
          CampusOne monitors review turnaround against institutional resolution benchmarks.
        </p>
      </div>
    </div>
  );
}
