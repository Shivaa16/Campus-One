import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ListOrdered,
  PlusCircle,
  Search,
  Filter,
  ArrowRight,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Sparkles,
} from 'lucide-react';
import { requestService } from '../../services/requestService';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import './RequestListPage.css';

export function RequestListPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await requestService.getRequests({ tab: activeTab, search: searchQuery });
      setRequests(data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab, searchQuery]);

  // Compute live counts across all requests in storage
  const [counts, setCounts] = useState({ all: 0, action: 0, progress: 0, completed: 0 });

  useEffect(() => {
    async function computeCounts() {
      const allReqs = await requestService.getRequests({});
      const action = allReqs.filter((r) => r.status === 'PENDING_ACTION').length;
      const progress = allReqs.filter((r) => r.status === 'IN_REVIEW' || r.status === 'PENDING').length;
      const completed = allReqs.filter((r) => r.status === 'COMPLETED' || r.status === 'APPROVED').length;
      setCounts({ all: allReqs.length, action, progress, completed });
    }
    computeCounts();
  }, [requests]);

  const filterTabs = [
    { key: 'ALL', label: 'All Requests', count: counts.all },
    { key: 'ACTION', label: 'Needs Action', count: counts.action },
    { key: 'PROGRESS', label: 'In Progress', count: counts.progress },
    { key: 'COMPLETED', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="c360-requests-page">
      {/* Page Header */}
      <div className="c360-requests-page__header">
        <div>
          <h1 className="c360-page-title">My Campus Requests</h1>
          <p className="c360-page-subtitle">
            Universal tracking ledger for all permissions, certificates, and academic clearance requests.
          </p>
        </div>

        <Link to="/student/requests/new" className="c360-new-req-btn">
          <PlusCircle size={16} />
          <span>Submit New Request</span>
        </Link>
      </div>

      {/* Control Bar: Filter Tabs & Search */}
      <div className="c360-requests-controls">
        <div className="c360-requests-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`c360-req-tab-btn ${activeTab === tab.key ? 'c360-req-tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span>{tab.label}</span>
              <span className="c360-req-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="c360-requests-search">
          <Search size={15} className="c360-search-icon" />
          <input
            type="text"
            className="c360-search-input"
            placeholder="Search by Request ID, title, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Requests Ledger Table Card */}
      <div className="c360-requests-ledger-card">
        {loading ? (
          <div className="c360-ledger-loading">
            <Clock size={20} className="animate-spin text-muted" />
            <span>Loading campus ledger...</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="c360-ledger-empty">
            <FileText size={32} className="c360-empty-icon" />
            <h3 className="c360-empty-title">No requests found</h3>
            <p className="c360-empty-desc">
              {searchQuery
                ? `No requests match "${searchQuery}". Try clearing search filters.`
                : 'You have no submissions in this category.'}
            </p>
            {searchQuery ? (
              <button
                type="button"
                className="c360-clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            ) : (
              <Link to="/student/requests/new" className="c360-empty-cta">
                <PlusCircle size={15} />
                <span>Submit Your First Request</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="c360-ledger-table-wrap">
            <table className="c360-ledger-table">
              <thead>
                <tr>
                  <th className="c360-ledger-th">REQUEST ID</th>
                  <th className="c360-ledger-th">TITLE / CATEGORY</th>
                  <th className="c360-ledger-th">SUBMITTED</th>
                  <th className="c360-ledger-th">CURRENT STAGE</th>
                  <th className="c360-ledger-th">STATUS</th>
                  <th className="c360-ledger-th">NEXT STEP</th>
                  <th className="c360-ledger-th text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.requestId} className="c360-ledger-row">
                    <td className="c360-ledger-td">
                      <Link
                        to={`/student/requests/${req.requestId}`}
                        className="c360-id-badge mono-code"
                      >
                        {req.requestId}
                      </Link>
                    </td>

                    <td className="c360-ledger-td">
                      <div className="c360-req-title-wrap">
                        <Link
                          to={`/student/requests/${req.requestId}`}
                          className="c360-req-primary-title"
                        >
                          {req.title}
                        </Link>
                        <div className="c360-req-cat-row">
                          <span className="c360-req-cat">{req.category}</span>
                          {req.priority && req.priority !== 'NORMAL' && (
                            <PriorityBadge priority={req.priority} />
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="c360-ledger-td">
                      <span className="c360-date-text">{req.date || formatDate(req.createdAt)}</span>
                    </td>

                    <td className="c360-ledger-td">
                      <div className="c360-stage-pill">
                        <span className="c360-stage-pill__dot" />
                        <span>{req.currentStage || 'Faculty Verification'}</span>
                      </div>
                    </td>

                    <td className="c360-ledger-td">
                      <StatusBadge status={req.status} label={req.statusLabel} />
                    </td>

                    <td className="c360-ledger-td">
                      <span className="c360-next-step-text">
                        {req.nextStep || 'Track stage'}
                      </span>
                    </td>

                    <td className="c360-ledger-td text-right">
                      <Link
                        to={`/student/requests/${req.requestId}`}
                        className="c360-view-track-link"
                      >
                        <span>View Details</span>
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
    </div>
  );
}
