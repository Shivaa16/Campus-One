import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  CheckSquare,
  ShieldCheck,
  Sliders,
  FileText,
  UserCheck,
  Activity,
} from 'lucide-react';
import { ROLES } from '../../utils/constants';
import './Sidebar.css';

const ICON_MAP = {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  CheckSquare,
  ShieldCheck,
  Sliders,
  FileText,
};

export function Sidebar({ user, isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentRole = user?.role || ROLES.STUDENT;

  const roleLinks = {
    [ROLES.STUDENT]: [
      { label: 'Student Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
      { label: 'Submit New Request', path: '/student/requests/new', icon: PlusCircle },
      { label: 'My Requests & Status', path: '/student/requests', icon: ListOrdered },
      { label: 'Sample Detail (Preview)', path: '/student/requests/C360-2026-0001', icon: FileText },
    ],
    [ROLES.FACULTY]: [
      { label: 'Faculty Dashboard', path: '/faculty/dashboard', icon: CheckSquare },
    ],
    [ROLES.HOD]: [
      { label: 'HOD Dashboard', path: '/hod/dashboard', icon: ShieldCheck },
    ],
    [ROLES.ADMIN]: [
      { label: 'Admin Dashboard', path: '/admin/dashboard', icon: Sliders },
    ],
  }[currentRole] || [];

  const demoRoles = [
    { label: 'Student', role: ROLES.STUDENT, path: '/student/dashboard' },
    { label: 'Faculty', role: ROLES.FACULTY, path: '/faculty/dashboard' },
    { label: 'HOD', role: ROLES.HOD, path: '/hod/dashboard' },
    { label: 'Admin', role: ROLES.ADMIN, path: '/admin/dashboard' },
  ];

  return (
    <>
      {isOpen && <div className="c360-sidebar-backdrop" onClick={onClose} />}
      <aside className={`c360-sidebar ${isOpen ? 'c360-sidebar--open' : ''}`}>
        <div className="c360-sidebar__section">
          <div className="c360-sidebar__section-title">Workflow Navigation</div>
          <nav className="c360-sidebar__nav">
            {roleLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/student/dashboard'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `c360-sidebar__link ${isActive ? 'c360-sidebar__link--active' : ''}`
                  }
                >
                  <Icon size={18} className="c360-sidebar__link-icon" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Quick Portal Switcher for Demo / Dev */}
        <div className="c360-sidebar__section c360-sidebar__section--portals">
          <div className="c360-sidebar__section-title">All Portals (Demo Jump)</div>
          <div className="c360-sidebar__portal-pills">
            {demoRoles.map((dr) => (
              <button
                key={dr.role}
                className={`c360-sidebar__portal-pill ${
                  location.pathname.startsWith(`/${dr.role.toLowerCase()}`)
                    ? 'c360-sidebar__portal-pill--active'
                    : ''
                }`}
                onClick={() => {
                  navigate(dr.path);
                  if (onClose) onClose();
                }}
              >
                {dr.label}
              </button>
            ))}
          </div>
        </div>

        {/* System Info Footnote */}
        <div className="c360-sidebar__footer">
          <div className="c360-sidebar__sys-badge">
            <Activity size={14} />
            <span>Universal ID: Active</span>
          </div>
          <span className="c360-sidebar__sys-desc">
            CampusOne Institutional Request Router v1.0
          </span>
        </div>
      </aside>
    </>
  );
}
