import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--status-pending-bg)',
          color: 'var(--status-pending-text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <AlertTriangle size={28} />
      </div>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '8px' }}>
        404 — Route Not Found
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', marginBottom: '24px' }}>
        The requested CampusOne path does not exist or has not been provisioned yet.
      </p>
      <Link to="/student/dashboard">
        <Button variant="primary" icon={Home}>
          Return to Portal
        </Button>
      </Link>
    </div>
  );
}
