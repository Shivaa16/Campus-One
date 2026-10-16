import React from 'react';
import { AuthorityDashboard } from '../../components/authority/AuthorityDashboard';

export function HodDashboard() {
  return (
    <AuthorityDashboard
      role="HOD"
      title="Head of Department (HOD) Endorsement Desk"
      subtitle="Executive departmental clearances for leaves, hackathon delegations, research NOCs, and financial approvals."
      authorityName="Prof. K. S. Ramanathan (HOD CSE)"
      department="Computer Science & Engineering"
    />
  );
}

export default HodDashboard;
