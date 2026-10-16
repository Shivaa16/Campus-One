import React from 'react';
import { GitCommit, ArrowRight, Shield, User, Building, Landmark, CheckCircle, Clock, FileCheck, Sparkles } from 'lucide-react';
import { determineRouting } from '../../services/routingRules';
import './RoutingPreview.css';

const ROLE_ICON_MAP = {
  STUDENT: User,
  FACULTY: User,
  HOD: Building,
  ADMIN: Landmark,
};

export function RoutingPreview({ category, aiPayload = null }) {
  const routing = determineRouting(category, aiPayload);

  return (
    <div className="c360-routing-preview">
      {/* Smart Route Header */}
      <div className="c360-routing-preview__header">
        <div className="c360-routing-preview__title-box">
          <Sparkles size={15} className="c360-routing-preview__icon" />
          <span className="c360-routing-preview__title">SMART ROUTE</span>
        </div>
        <span className="c360-routing-preview__badge">
          {routing.isAiAugmented ? 'AI Intelligence Model' : 'Rule-Based Routing'}
        </span>
      </div>

      {/* Smart Route Specifications Grid */}
      <div className="c360-smart-route-grid">
        <div className="c360-smart-route-item">
          <span className="c360-smart-route-label">Detected Category</span>
          <span className="c360-smart-route-val">{routing.category}</span>
        </div>

        <div className="c360-smart-route-item">
          <span className="c360-smart-route-label">Recommended Path</span>
          <span className="c360-smart-route-val text-accent font-semibold">{routing.recommendedPath}</span>
        </div>

        <div className="c360-smart-route-item">
          <span className="c360-smart-route-label">Required Documents</span>
          <span className="c360-smart-route-val">{routing.requiredDocuments}</span>
        </div>

        <div className="c360-smart-route-item">
          <span className="c360-smart-route-label">Estimated Resolution</span>
          <span className="c360-smart-route-val">{routing.estimatedResolution}</span>
        </div>

        {/* Render Confidence ONLY if available from intelligence engine */}
        {routing.confidence !== null && routing.confidence !== undefined && (
          <div className="c360-smart-route-item">
            <span className="c360-smart-route-label">Model Confidence</span>
            <span className="c360-smart-route-val text-success font-semibold">
              {Math.round(routing.confidence * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Visual Sequence Track */}
      <div className="c360-routing-preview__route-track">
        {routing.stages.map((stage, idx) => {
          const isLast = idx === routing.stages.length - 1;
          const RoleIcon = ROLE_ICON_MAP[stage.role] || Shield;

          return (
            <React.Fragment key={stage.id}>
              <div className="c360-route-node">
                <div className={`c360-route-node__circle ${stage.isInitial ? 'c360-route-node__circle--origin' : ''}`}>
                  <RoleIcon size={13} />
                </div>
                <div className="c360-route-node__info">
                  <span className="c360-route-node__label">{stage.label}</span>
                  <span className="c360-route-node__authority">{stage.authority}</span>
                </div>
              </div>

              {!isLast && (
                <div className="c360-route-connector">
                  <ArrowRight size={13} className="c360-route-connector__arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer Disclaimer */}
      <div className="c360-routing-preview__footer">
        <Shield size={13} className="c360-routing-preview__shield" />
        <p className="c360-routing-preview__disclaimer">
          <strong>CampusOne Smart Dispatch:</strong> Dynamically validates prerequisites and automatically routes to the appropriate authority without manual redirection.
        </p>
      </div>
    </div>
  );
}
