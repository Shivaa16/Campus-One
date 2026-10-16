import React from 'react';
import { AuthorityDashboard } from '../../components/authority/AuthorityDashboard';

export function AdminDashboard() {
  return (
    <AuthorityDashboard
      role="ADMIN"
      title="Campus Administration & Registrar Clearance Desk"
      subtitle="Final institutional review, gatepass validation, official digital signatures, and campus-wide certificate issuance."
      authorityName="Registrar Office Admin"
      department="Academic Administration"
    />
  );
}

export default AdminDashboard;
