import React from 'react';
import { Check, Clock, Circle, User, Building, Landmark, AlertCircle } from 'lucide-react';
import './ApprovalTimeline.css';

export function ApprovalTimeline({ timeline = [], currentStage = '' }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="c360-timeline-card">
      <div className="c360-timeline-card__header">
        <h3 className="c360-timeline-card__title">Approval Timeline & Authority Clearance</h3>
        <span className="c360-timeline-card__sub">
          Multi-tier approval activity tracked with timestamps
        </span>
      </div>

      <div className="c360-timeline-list">
        {timeline.map((step, idx) => {
          const isCompleted = step.status === 'completed' || step.status === 'COMPLETED';
          const isCurrent = step.status === 'current' || step.status === 'CURRENT' || step.status === 'IN_REVIEW';
          const isFuture = !isCompleted && !isCurrent;
          const isLast = idx === timeline.length - 1;

          return (
            <div
              key={idx}
              className={`c360-timeline-item ${
                isCompleted
                  ? 'c360-timeline-item--completed'
                  : isCurrent
                  ? 'c360-timeline-item--current'
                  : 'c360-timeline-item--future'
              }`}
            >
              {/* Left Indicator & Track */}
              <div className="c360-timeline-item__indicator-col">
                <div
                  className={`c360-timeline-item__node ${
                    isCompleted
                      ? 'c360-timeline-item__node--completed'
                      : isCurrent
                      ? 'c360-timeline-item__node--current'
                      : 'c360-timeline-item__node--future'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={14} strokeWidth={3} />
                  ) : isCurrent ? (
                    <div className="c360-timeline-item__pulse-dot" />
                  ) : (
                    <span className="c360-timeline-item__step-num">{idx + 1}</span>
                  )}
                </div>

                {!isLast && (
                  <div
                    className={`c360-timeline-item__line ${
                      isCompleted ? 'c360-timeline-item__line--active' : ''
                    }`}
                  />
                )}
              </div>

              {/* Right Content */}
              <div className="c360-timeline-item__content">
                <div className="c360-timeline-item__top-row">
                  <div className="c360-timeline-item__stage-title-wrap">
                    <span className="c360-timeline-item__stage-title">{step.label}</span>
                    <span
                      className={`c360-timeline-item__status-tag ${
                        isCompleted
                          ? 'c360-timeline-item__status-tag--completed'
                          : isCurrent
                          ? 'c360-timeline-item__status-tag--current'
                          : 'c360-timeline-item__status-tag--future'
                      }`}
                    >
                      {isCompleted ? 'Approved' : isCurrent ? 'In Review' : 'Pending'}
                    </span>
                  </div>

                  <span className="c360-timeline-item__timestamp">
                    {step.date || (isCompleted ? 'Completed' : isCurrent ? 'Active Now' : 'Upcoming')}
                  </span>
                </div>

                {/* Responsible Authority */}
                <div className="c360-timeline-item__authority-row">
                  <span className="c360-timeline-item__auth-label">Authority:</span>
                  <span className="c360-timeline-item__auth-name">
                    {step.actor || step.authority || 'Assigned Authority'}
                  </span>
                </div>

                {/* Remarks or Description */}
                {step.remarks && (
                  <div className="c360-timeline-item__remarks-box">
                    <p className="c360-timeline-item__remarks">{step.remarks}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
