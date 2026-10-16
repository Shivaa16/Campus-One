import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  User,
  Search,
  Building,
  FileText,
  Sparkles,
} from 'lucide-react';
import { requestService } from '../../services/requestService';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';
import { AdminAnalytics } from '../admin/AdminAnalytics';
import { formatDate } from '../../utils/formatters';
import './AuthorityDashboard.css';

export function AuthorityDashboard({
  role = 'FACULTY',
  title = 'Faculty Advisor Workspace',
  subtitle = 'Review, endorse, or return student applications for departmental clearance.',
  authorityName = 'Dr. Radhika Menon (Class Advisor)',
  department = 'Computer Science & Engineering',
}) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const all = await requestService.getRequests({});
      setRequests(all);
    } catch (err) {
      console.error('Error fetching authority requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [role]);

  const normalizedRole = requestService.getCanonicalRole ? requestService.getCanonicalRole(role) : role.toUpperCase();

  // Filter requests awaiting this authority's review
  const isAwaitingThisAuthority = (req) => {
    if (req.status === 'REJECTED' || req.status === 'COMPLETED') return false;
    const stageRole = requestService.getCanonicalStageRole ? requestService.getCanonicalStageRole(req) : (req.currentStageRole || '').toUpperCase();
    return stageRole === normalizedRole;
  };

  const pendingList = requests.filter(isAwaitingThisAuthority);
  const completedList = requests.filter((r) => r.status === 'COMPLETED');
  const actionList = requests.filter((r) => r.status === 'PENDING_ACTION');

  const displayedRequests = requests.filter((req) => {
    if (activeTab === 'PENDING') {
      if (!isAwaitingThisAuthority(req)) return false;
    } else if (activeTab === 'COMPLETED') {
      if (req.status !== 'COMPLETED') return false;
    } else if (activeTab === 'ACTION') {
      if (req.status !== 'PENDING_ACTION') return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      return (
        req.requestId.toLowerCase().includes(q) ||
        req.title.toLowerCase().includes(q) ||
        req.category.toLowerCase().includes(q) ||
        (req.studentName && req.studentName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="c360-authority-dashboard">
      {/* Header Banner */}
      <div className="c360-auth-hero-card">
        <div className="c360-auth-hero__left">
          <div className="c360-auth-role-pill">
            <ShieldCheck size={14} className="text-accent" />
            <span>{authorityName}</span>
          </div>
          <h1 className="c360-auth-hero__title">{title}</h1>
          <p className="c360-auth-hero__subtitle">{subtitle}</p>
        </div>

        <div className="c360-auth-hero__right">
          <div className="c360-auth-dept-chip">
            <Building size={14} />
            <span>{department}</span>
          </div>
        </div>
      </div>

      {/* If Admin persona, display rich Institutional Analytics & Visualizations */}
      {normalizedRole === 'ADMIN' && <AdminAnalytics />}

      {/* Authority Metric Cards (for Faculty & HOD) */}
      {normalizedRole !== 'ADMIN' && (
        <div className="c360-auth-metrics-row">
          <div className="c360-auth-metric-card c360-auth-metric-card--pending">
            <div className="c360-auth-metric-card__icon-wrap">
              <Clock size={20} />
            </div>
            <div className="c360-auth-metric-card__content">
              <span className="c360-auth-metric-card__value">{pendingList.length}</span>
              <span className="c360-auth-metric-card__label">Awaiting Your Endorsement</span>
            </div>
          </div>

          <div className="c360-auth-metric-card c360-auth-metric-card--success">
            <div className="c360-auth-metric-card__icon-wrap">
              <CheckCircle2 size={20} />
            </div>
            <div className="c360-auth-metric-card__content">
              <span className="c360-auth-metric-card__value">{completedList.length}</span>
              <span className="c360-auth-metric-card__label">Campus Completed & Issued</span>
            </div>
          </div>

          <div className="c360-auth-metric-card c360-auth-metric-card--action">
            <div className="c360-auth-metric-card__icon-wrap">
              <AlertTriangle size={20} />
            </div>
            <div className="c360-auth-metric-card__content">
              <span className="c360-auth-metric-card__value">{actionList.length}</span>
              <span className="c360-auth-metric-card__label">Pending Student Action</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Review Ledger Card */}
      <div className="c360-auth-ledger-card">
        <div className="c360-auth-ledger-card__header">
          <div>
            <h2 className="c360-auth-ledger-title">
              {activeTab === 'PENDING'
                ? `Requests Awaiting ${normalizedRole} Review`
                : activeTab === 'COMPLETED'
                ? 'Completed & Issued Records'
                : 'All Department Submissions'}
            </h2>
            <p className="c360-auth-ledger-sub">
              Review student particulars, check compliance, and record digital endorsements.
            </p>
          </div>

          <div className="c360-auth-ledger-tabs">
            <button
              type="button"
              className={`c360-auth-tab ${activeTab === 'PENDING' ? 'c360-auth-tab--active' : ''}`}
              onClick={() => setActiveTab('PENDING')}
            >
              <span>Pending Review</span>
              <span className="c360-auth-tab-badge">{pendingList.length}</span>
            </button>

            <button
              type="button"
              className={`c360-auth-tab ${activeTab === 'ALL' ? 'c360-auth-tab--active' : ''}`}
              onClick={() => setActiveTab('ALL')}
            >
              <span>All Requests</span>
              <span className="c360-auth-tab-badge">{requests.length}</span>
            </button>

            <button
              type="button"
              className={`c360-auth-tab ${activeTab === 'COMPLETED' ? 'c360-auth-tab--active' : ''}`}
              onClick={() => setActiveTab('COMPLETED')}
            >
              <span>Completed</span>
              <span className="c360-auth-tab-badge">{completedList.length}</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="c360-auth-search-strip">
          <Search size={15} className="text-muted" />
          <input
            type="text"
            className="c360-auth-search-input"
            placeholder="Search by student name, request ID, or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table Queue */}
        <div className="c360-auth-table-wrap">
          {loading ? (
            <div className="c360-auth-empty">
              <Clock size={20} className="animate-spin text-muted" />
              <span>Loading review queue...</span>
            </div>
          ) : displayedRequests.length === 0 ? (
            <div className="c360-auth-empty">
              <CheckCircle2 size={32} className="text-success" />
              <h3>All Caught Up</h3>
              <p>No requests currently awaiting review in this queue.</p>
            </div>
          ) : (
            <table className="c360-auth-table">
              <thead>
                <tr>
                  <th>REQUEST ID</th>
                  <th>STUDENT</th>
                  <th>CATEGORY & TITLE</th>
                  <th>SUBMITTED</th>
                  <th>PRIORITY</th>
                  <th>CURRENT STAGE</th>
                  <th>STATUS</th>
                  <th className="text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {displayedRequests.map((req) => (
                  <tr key={req.requestId} className="c360-auth-row">
                    <td>
                      <Link
                        to={`/${normalizedRole.toLowerCase()}/requests/${req.requestId}`}
                        className="mono-code c360-auth-id-link"
                      >
                        {req.requestId}
                      </Link>
                    </td>

                    <td>
                      <div className="c360-auth-student-cell">
                        <span className="c360-student-name">{req.studentName || 'Student'}</span>
                        <span className="c360-student-id">{req.studentId || 'STU001'}</span>
                      </div>
                    </td>

                    <td>
                      <div className="c360-auth-title-cell">
                        <Link
                          to={`/${normalizedRole.toLowerCase()}/requests/${req.requestId}`}
                          className="c360-req-main-title"
                        >
                          {req.title}
                        </Link>
                        <span className="c360-req-cat-sub">{req.category}</span>
                      </div>
                    </td>

                    <td>
                      <span className="c360-sub-date">{req.date || formatDate(req.createdAt)}</span>
                    </td>

                    <td>
                      <PriorityBadge priority={req.priority} />
                    </td>

                    <td>
                      <span className="c360-stage-tag">{req.currentStage}</span>
                    </td>

                    <td>
                      <StatusBadge status={req.status} label={req.statusLabel} />
                    </td>

                    <td className="text-right">
                      <Link
                        to={`/${normalizedRole.toLowerCase()}/requests/${req.requestId}`}
                        className="c360-review-cta-btn"
                      >
                        <span>Review</span>
                        <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
