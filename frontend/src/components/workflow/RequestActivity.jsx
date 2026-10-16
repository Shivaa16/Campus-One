import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, ArrowUpRight, Clock, FileUp, Sparkles } from 'lucide-react';
import './RequestActivity.css';

const ICON_MAP = {
  submission: FileUp,
  system: Sparkles,
  routing: ArrowUpRight,
  approval: CheckCircle2,
  completed: ShieldCheck,
  pending: Clock,
  document: FileUp,
};

export function RequestActivity({ activityLog = [] }) {
  if (!activityLog || activityLog.length === 0) return null;

  return (
    <div className="c360-activity-card">
      <div className="c360-activity-card__header">
        <div className="c360-activity-card__title-box">
          <Activity size={16} className="c360-activity-card__icon" />
          <h3 className="c360-activity-card__title">Activity & Audit Trail</h3>
        </div>
        <span className="c360-activity-card__tag">Recorded Event History</span>
      </div>

      <p className="c360-activity-card__intro">
        Continuous event history tracking lifecycle transitions from student submission to administrative resolution.
      </p>

      <div className="c360-activity-list">
        {activityLog.map((act, idx) => {
          const IconComp = ICON_MAP[act.type] || Activity;
          const isPending = act.type === 'pending' || act.time === 'Current';

          return (
            <div
              key={act.id || idx}
              className={`c360-activity-item ${isPending ? 'c360-activity-item--pending' : ''}`}
            >
              <div className="c360-activity-item__time-col">
                <span className="c360-activity-item__time">{act.time}</span>
                {act.date && <span className="c360-activity-item__date">{act.date}</span>}
              </div>

              <div className="c360-activity-item__indicator">
                <div className={`c360-activity-item__dot c360-activity-item__dot--${act.type || 'system'}`}>
                  <IconComp size={12} />
                </div>
                {idx < activityLog.length - 1 && <div className="c360-activity-item__line" />}
              </div>

              <div className="c360-activity-item__content">
                <span className="c360-activity-item__title">{act.title}</span>
                {act.description && (
                  <p className="c360-activity-item__desc">{act.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
