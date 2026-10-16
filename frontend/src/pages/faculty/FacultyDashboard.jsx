import React from 'react';
import { AuthorityDashboard } from '../../components/authority/AuthorityDashboard';

export function FacultyDashboard() {
  return (
    <AuthorityDashboard
      role="FACULTY"
      title="Faculty Advisor Verification Desk"
      subtitle="Verify student eligibility, academic standings, and forward endorsed applications to HOD."
      authorityName="Dr. Radhika Menon (Class Advisor)"
      department="Computer Science & Engineering"
    />
  );
}

export default FacultyDashboard;
