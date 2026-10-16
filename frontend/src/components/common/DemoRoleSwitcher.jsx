import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserCheck, Shield, GraduationCap, Building2, Landmark } from 'lucide-react';
import './DemoRoleSwitcher.css';

const ROLES_CONFIG = [
  { id: 'STUDENT', label: 'Student', path: '/student/dashboard', icon: GraduationCap },
  { id: 'FACULTY', label: 'Faculty', path: '/faculty/dashboard', icon: UserCheck },
  { id: 'HOD', label: 'HOD', path: '/hod/dashboard', icon: Building2 },
  { id: 'ADMIN', label: 'Admin', path: '/admin/dashboard', icon: Landmark },
];

export function DemoRoleSwitcher({ compact = false }) {
  const { user, loginAs } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentRole = user?.role || 'STUDENT';

  const handleRoleChange = async (roleObj) => {
    await loginAs(roleObj.id.toLowerCase());
    navigate(roleObj.path);
  };

  return (
    <div className={`c360-role-switcher ${compact ? 'c360-role-switcher--compact' : ''}`}>
      <div className="c360-role-switcher__label-box">
        <span className="c360-role-switcher__dot" />
        <span className="c360-role-switcher__title">Demo Role</span>
      </div>

      <div className="c360-role-switcher__pills">
        {ROLES_CONFIG.map((r) => {
          const isActive = currentRole === r.id;
          const Icon = r.icon;

          return (
            <button
              key={r.id}
              type="button"
              className={`c360-role-pill ${isActive ? 'c360-role-pill--active' : ''}`}
              onClick={() => handleRoleChange(r)}
              title={`Switch Demo Persona: ${r.label}`}
            >
              <Icon size={12} className="c360-role-pill__icon" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
