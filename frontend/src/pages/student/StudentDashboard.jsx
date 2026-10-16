import React, { useState, useEffect } from 'react';
import { DashboardHero } from '../../components/dashboard/DashboardHero';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { AttentionCard } from '../../components/dashboard/AttentionCard';
import { RecentRequestsTable } from '../../components/dashboard/RecentRequestsTable';
import { ApprovalProgressWidget } from '../../components/dashboard/ApprovalProgressWidget';
import { QuickRequestLaunchpad } from '../../components/dashboard/QuickRequestLaunchpad';
import {
  MOCK_METRICS,
  MOCK_ATTENTION_ITEM,
  MOCK_REQUESTS,
  MOCK_LAUNCHPAD_ITEMS,
} from '../../data/mockData';
import { requestService } from '../../services/requestService';
import './StudentDashboard.css';

const INITIAL_METRICS = {
  activeRequests: {
    label: 'Active requests',
    value: 0,
    subtext: 'No active requests',
    type: 'pending',
  },
  pendingApproval: {
    label: 'Pending approval',
    value: 0,
    subtext: 'Faculty & HOD stages',
    type: 'pending',
  },
  completed: {
    label: 'Completed',
    value: 0,
    subtext: 'No completed requests',
    type: 'success',
  },
  avgResolution: {
    label: 'Average Time',
    value: '0h',
    subtext: 'Standard: 48h',
    type: 'neutral',
  },
};

export function StudentDashboard() {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [attentionItem, setAttentionItem] = useState(null);
  const [requests, setRequests] = useState([]);
  const [launchpadItems, setLaunchpadItems] = useState(MOCK_LAUNCHPAD_ITEMS);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const liveRequests = await requestService.getRequests({});
        const reqList = liveRequests || [];
        setRequests(reqList);

        if (reqList.length > 0) {
          // Find attention item dynamically if available
          const actionReq = reqList.find((r) => r.status === 'PENDING_ACTION');
          if (actionReq && actionReq.actionRequired) {
            setAttentionItem({
              requestId: actionReq.requestId,
              tag: 'Action required',
              dueText: 'Due soon',
              category: actionReq.category,
              title: `${actionReq.category} • ${actionReq.actionRequired.title}`,
              description: actionReq.actionRequired.message,
              actionType: 'upload',
              actionLabel: actionReq.actionRequired.actionLabel || 'Upload Document',
              detailLink: `/student/requests/${actionReq.requestId}`,
            });
          } else {
            setAttentionItem(null);
          }

          // Dynamic calculation of metrics from actual request store
          const activeCount = reqList.filter((r) => r.status === 'IN_REVIEW' || r.status === 'PENDING' || r.status === 'PENDING_ACTION').length;
          const pendingApprovalCount = reqList.filter((r) => r.status === 'IN_REVIEW' || r.status === 'PENDING').length;
          const completedCount = reqList.filter((r) => r.status === 'COMPLETED' || r.status === 'APPROVED').length;

          setMetrics({
            activeRequests: {
              label: 'Active requests',
              value: activeCount,
              subtext: actionReq ? '1 needs your action' : (activeCount === 0 ? 'No active requests' : 'All on track'),
              type: actionReq ? 'action' : 'pending',
            },
            pendingApproval: {
              label: 'Pending approval',
              value: pendingApprovalCount,
              subtext: 'Faculty & HOD stages',
              type: 'pending',
            },
            completed: {
              label: 'Completed',
              value: completedCount,
              subtext: completedCount > 0 ? 'Approved & ready' : 'No completed requests',
              type: 'success',
            },
            avgResolution: {
              label: 'Average Time',
              value: completedCount > 0 ? '18h' : '0h',
              subtext: 'Standard: 48h',
              type: 'neutral',
            },
          });
        } else {
          setAttentionItem(null);
          setMetrics(INITIAL_METRICS);
        }
      } catch (err) {
        console.warn('Could not load live dashboard requests:', err);
      }
    }

    loadDashboardData();
  }, []);

  // Active tracked request for Approval Progress widget (e.g. latest active or first request)
  const activeTrackedRequest = requests.find((r) => r.status === 'IN_REVIEW' || r.status === 'PENDING_ACTION') || requests[0] || null;

  return (
    <div className="c360-student-dashboard">
      {/* 1. Welcome Hero */}
      <DashboardHero
        campusName="Garden City University"
      />

      {/* 2. Top Metric Cards (Row of 4) */}
      <div className="c360-dashboard-metrics">
        <MetricCard
          title={metrics.activeRequests.label}
          value={metrics.activeRequests.value}
          subtext={metrics.activeRequests.subtext}
          variant="active"
        />
        <MetricCard
          title={metrics.pendingApproval.label}
          value={metrics.pendingApproval.value}
          subtext={metrics.pendingApproval.subtext}
          variant="pending"
        />
        <MetricCard
          title={metrics.completed.label}
          value={metrics.completed.value}
          subtext={metrics.completed.subtext}
          variant="completed"
        />
        <MetricCard
          title={metrics.avgResolution.label}
          value={metrics.avgResolution.value}
          subtext={metrics.avgResolution.subtext}
          variant="resolution"
        />
      </div>

      {/* 3. Needs Your Attention Banner */}
      {attentionItem && <AttentionCard item={attentionItem} />}

      {/* 4. Main Operational Split Grid */}
      <div className="c360-dashboard-grid">
        {/* Left Column: Recent Requests Table */}
        <div className="c360-dashboard-grid__left">
          <RecentRequestsTable requests={requests} />
        </div>

        {/* Right Column: Approval Progress & Quick Launchpad */}
        <div className="c360-dashboard-grid__right">
          <ApprovalProgressWidget
            requestId={activeTrackedRequest?.requestId}
            title={activeTrackedRequest?.title}
            status={activeTrackedRequest?.status}
            statusLabel={activeTrackedRequest?.statusLabel}
            stages={activeTrackedRequest?.timeline}
            stageNote={activeTrackedRequest?.stageNote}
            detailLink={activeTrackedRequest ? `/student/requests/${activeTrackedRequest.requestId}` : ''}
          />

          <QuickRequestLaunchpad items={launchpadItems} />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
