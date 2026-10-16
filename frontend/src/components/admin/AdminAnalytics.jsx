import React, { useState, useEffect } from 'react';
import {
  Layers,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Timer,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { requestService } from '../../services/requestService';
import './AdminAnalytics.css';

export function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await requestService.getAdminAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error('Error loading admin analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="c360-analytics-loading">
        <Clock size={20} className="animate-spin text-accent" />
        <span>Aggregating institutional metrics & governance throughput...</span>
      </div>
    );
  }

  const { kpis, categoryBreakdown, statusBreakdown, bottleneck, recentActivity } = analytics;

  return (
    <div className="c360-admin-analytics">
      {/* 5 KPI Cards Grid */}
      <div className="c360-analytics-kpi-grid">
        <div className="c360-analytics-kpi-card">
          <div className="c360-kpi-icon-wrap c360-kpi-icon-wrap--primary">
            <Layers size={20} />
          </div>
          <div className="c360-kpi-content">
            <span className="c360-kpi-label">Total Requests</span>
            <span className="c360-kpi-value">{kpis.totalRequests}</span>
            <span className="c360-kpi-sub">All Campus Dossiers</span>
          </div>
        </div>

        <div className="c360-analytics-kpi-card">
          <div className="c360-kpi-icon-wrap c360-kpi-icon-wrap--warning">
            <Clock size={20} />
          </div>
          <div className="c360-kpi-content">
            <span className="c360-kpi-label">Open Requests</span>
            <span className="c360-kpi-value text-accent">{kpis.openRequests}</span>
            <span className="c360-kpi-sub">In Active Clearance</span>
          </div>
        </div>

        <div className="c360-analytics-kpi-card">
          <div className="c360-kpi-icon-wrap c360-kpi-icon-wrap--success">
            <CheckCircle2 size={20} />
          </div>
          <div className="c360-kpi-content">
            <span className="c360-kpi-label">Completed</span>
            <span className="c360-kpi-value text-success">{kpis.completedRequests}</span>
            <span className="c360-kpi-sub">Certified & Issued</span>
          </div>
        </div>

        <div className="c360-analytics-kpi-card">
          <div className="c360-kpi-icon-wrap c360-kpi-icon-wrap--danger">
            <AlertTriangle size={20} />
          </div>
          <div className="c360-kpi-content">
            <span className="c360-kpi-label">Overdue Requests</span>
            <span className="c360-kpi-value text-danger">{kpis.overdueRequests}</span>
            <span className="c360-kpi-sub">Requires Escalation</span>
          </div>
        </div>

        <div className="c360-analytics-kpi-card">
          <div className="c360-kpi-icon-wrap c360-kpi-icon-wrap--info">
            <Timer size={20} />
          </div>
          <div className="c360-kpi-content">
            <span className="c360-kpi-label">Avg Resolution</span>
            <span className="c360-kpi-value">{kpis.averageResolutionTime}</span>
            <span className="c360-kpi-sub">Submission to Clearance</span>
          </div>
        </div>
      </div>

      {/* Visualizations & Bottleneck Grid */}
      <div className="c360-analytics-charts-grid">
        {/* Visualization A: Requests by Category */}
        <div className="c360-analytics-card">
          <div className="c360-analytics-card__header">
            <div className="c360-analytics-card__title-box">
              <BarChart3 size={16} className="text-accent" />
              <h3 className="c360-analytics-card__title">Requests by Category</h3>
            </div>
            <span className="c360-analytics-card__tag">Live Volume</span>
          </div>

          <p className="c360-analytics-card__desc">
            Distribution of student applications across campus clearance categories.
          </p>

          <div className="c360-category-bars-list">
            {categoryBreakdown.map((cat, idx) => (
              <div key={cat.name} className="c360-cat-bar-item">
                <div className="c360-cat-bar-item__meta">
                  <span className="c360-cat-name">{cat.name}</span>
                  <div className="c360-cat-count-wrap">
                    <span className="c360-cat-count">{cat.count} requests</span>
                    <span className="c360-cat-pct">({cat.percentage}%)</span>
                  </div>
                </div>

                <div className="c360-bar-track">
                  <div
                    className="c360-bar-fill"
                    style={{
                      width: `${Math.max(cat.percentage, 8)}%`,
                      backgroundColor:
                        idx === 0
                          ? '#2563EB'
                          : idx === 1
                          ? '#3B82F6'
                          : idx === 2
                          ? '#60A5FA'
                          : idx === 3
                          ? '#93C5FD'
                          : '#BFDBFE',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visualization B: Requests by Status */}
        <div className="c360-analytics-card">
          <div className="c360-analytics-card__header">
            <div className="c360-analytics-card__title-box">
              <Activity size={16} className="text-accent" />
              <h3 className="c360-analytics-card__title">Requests by Status</h3>
            </div>
            <span className="c360-analytics-card__tag">Governance State</span>
          </div>

          <p className="c360-analytics-card__desc">
            Multi-tier lifecycle state distribution across all submitted student requests.
          </p>

          {/* Segmented Distribution Bar */}
          <div className="c360-status-segmented-bar">
            {statusBreakdown.map((st) => (
              <div
                key={st.label}
                className="c360-status-segment"
                style={{
                  width: `${Math.max(st.percentage, 4)}%`,
                  backgroundColor: st.color,
                }}
                title={`${st.label}: ${st.count} (${st.percentage}%)`}
              />
            ))}
          </div>

          {/* Status Breakdown Grid */}
          <div className="c360-status-cards-grid">
            {statusBreakdown.map((st) => (
              <div key={st.label} className="c360-status-mini-card">
                <div className="c360-status-mini-card__top">
                  <span
                    className="c360-status-dot"
                    style={{ backgroundColor: st.color }}
                  />
                  <span className="c360-status-name">{st.label}</span>
                </div>
                <div className="c360-status-mini-card__bottom">
                  <span className="c360-status-count">{st.count}</span>
                  <span className="c360-status-pct">{st.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottleneck Visibility & Recent System Activity */}
      <div className="c360-analytics-bottom-grid">
        {/* Workflow Bottleneck Card */}
        <div className="c360-bottleneck-card">
          <div className="c360-bottleneck-header">
            <div className="c360-bottleneck-icon-wrap">
              <ShieldAlert size={20} className="text-warning" />
            </div>
            <div>
              <span className="c360-bottleneck-eyebrow">WORKFLOW BOTTLENECK ANALYSIS</span>
              <h3 className="c360-bottleneck-title">Highest Pending Workload Stage</h3>
            </div>
          </div>

          <div className="c360-bottleneck-highlight">
            <div className="c360-bottleneck-stage-pill">
              <span className="c360-bottleneck-stage-name">{bottleneck.stageName}</span>
              <span className="c360-bottleneck-badge">{bottleneck.throughputStatus}</span>
            </div>

            <div className="c360-bottleneck-metrics-row">
              <div className="c360-bottleneck-metric">
                <span className="c360-btl-metric-label">Pending Workload</span>
                <span className="c360-btl-metric-val">{bottleneck.pendingCount} requests awaiting review</span>
              </div>

              <div className="c360-bottleneck-metric">
                <span className="c360-btl-metric-label">Average Wait Time</span>
                <span className="c360-btl-metric-val text-warning">{bottleneck.averageWait}</span>
              </div>
            </div>
          </div>

          <p className="c360-bottleneck-note">
            Institutional workload telemetry calculated from active ledger timestamps to detect stage bottlenecks.
          </p>
        </div>

        {/* Compact Recent Activity Feed */}
        <div className="c360-recent-activity-card">
          <div className="c360-activity-feed-header">
            <div className="c360-activity-feed-title-box">
              <TrendingUp size={16} className="text-accent" />
              <h3 className="c360-activity-feed-title">Recent System Clearance Events</h3>
            </div>
            <span className="c360-activity-feed-tag">Live Trail</span>
          </div>

          <div className="c360-activity-items-list">
            {recentActivity.map((act) => (
              <div key={act.id} className="c360-activity-feed-item">
                <div className="c360-feed-item-bullet" />
                <div className="c360-feed-item-content">
                  <div className="c360-feed-item-top">
                    <span className="mono-code c360-feed-req-id">{act.requestId}</span>
                    <span className="c360-feed-title">{act.title}</span>
                  </div>
                  <span className="c360-feed-time">{act.date} • {act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
