import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Plus } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import './RecentRequestsTable.css';

function simplifyStage(stage) {
  if (!stage) return 'In Review';
  if (stage.includes('Faculty Verification')) return 'Faculty Approval';
  if (stage.includes('Administration Clearance') || stage.includes('Administrative Clearance')) return 'Admin Approval';
  if (stage.includes('HOD Endorsement')) return 'HOD Approval';
  return stage;
}

export function RecentRequestsTable({ requests = [] }) {
  const [activeTab, setActiveTab] = useState('ALL');

  const actionCount = requests.filter((r) => r.status === 'PENDING_ACTION').length;
  const progressCount = requests.filter((r) => r.status === 'IN_REVIEW' || r.status === 'PENDING').length;
  const completedCount = requests.filter((r) => r.status === 'COMPLETED' || r.status === 'APPROVED').length;

  const filterTabs = [
    { key: 'ALL', label: 'All', count: requests.length },
    { key: 'ACTION', label: 'Needs action', count: actionCount },
    { key: 'PROGRESS', label: 'In progress', count: progressCount },
    { key: 'COMPLETED', label: 'Completed', count: completedCount },
  ];

  const filteredRequests = requests.filter((req) => {
    if (activeTab === 'ACTION') return req.status === 'PENDING_ACTION';
    if (activeTab === 'PROGRESS') return req.status === 'IN_REVIEW' || req.status === 'PENDING';
    if (activeTab === 'COMPLETED') return req.status === 'COMPLETED' || req.status === 'APPROVED';
    return true;
  });

  return (
    <div className="c360-requests-card">
      <div className="c360-requests-card__header">
        <div>
          <h2 className="c360-requests-card__title">Recent Requests</h2>
          <p className="c360-requests-card__subtitle">
            Use your Request ID to track any request.
          </p>
        </div>
        <Link to="/student/requests" className="c360-requests-card__view-all">
          <span>View all requests</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="c360-requests-card__tabs">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`c360-tab-pill ${activeTab === tab.key ? 'c360-tab-pill--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.label}</span>
            <span className="c360-tab-pill__count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Table or Empty State */}
      {filteredRequests.length === 0 ? (
        <div className="c360-empty-table-state">
          <p className="c360-empty-table-title">No requests yet.</p>
          <p className="c360-empty-table-subtitle">Create your first request to get started.</p>
          <Link to="/student/requests/new" className="c360-empty-table-btn">
            <Plus size={14} />
            <span>New Request</span>
          </Link>
        </div>
      ) : (
        <div className="c360-table-container">
          <table className="c360-table">
            <thead>
              <tr>
                <th className="c360-table__th c360-table__th--request">REQUEST & STATUS</th>
                <th className="c360-table__th c360-table__th--stage">STAGE</th>
                <th className="c360-table__th c360-table__th--action">NEXT STEP</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.requestId} className="c360-table__row">
                  <td className="c360-table__td">
                    <div className="c360-req-cell">
                      <div className="c360-req-cell__top">
                        <Link
                          to={`/student/requests/${req.requestId}`}
                          className="c360-req-cell__title"
                        >
                          {req.title}
                        </Link>
                        <StatusBadge status={req.status} label={req.statusLabel} />
                      </div>
                      <div className="c360-req-cell__meta">
                        <span className="mono-code">{req.requestId}</span>
                        <span className="c360-req-cell__sep">•</span>
                        <span>{req.category}</span>
                        <span className="c360-req-cell__sep">•</span>
                        <span>{req.date}</span>
                      </div>
                    </div>
                  </td>

                  <td className="c360-table__td c360-table__td--stage-val">
                    <span className="c360-stage-name">{simplifyStage(req.currentStage)}</span>
                  </td>

                  <td className="c360-table__td c360-table__td--action-val">
                    <Link
                      to={`/student/requests/${req.requestId}`}
                      className="c360-next-step-link"
                    >
                      <span>{req.nextStep || 'View details'}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
