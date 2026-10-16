import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Plus,
  FileText,
  FileSpreadsheet,
  Folder,
  Bell,
  HelpCircle,
  ChevronsUpDown,
  CheckSquare,
  ShieldCheck,
  Landmark,
  ListOrdered,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import campusOneLogo from '../../assets/campusone-logo.svg';
import './Sidebar.css';

export function Sidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentRole = user?.role || 'STUDENT';
  const userName = user?.name || 'Shiva Kumar';
  const userSubtitle =
    currentRole === 'STUDENT'
      ? `${user?.department || 'CSE'} ${user?.year || '3rd Year'}`
      : currentRole === 'FACULTY'
      ? 'Class Advisor'
      : currentRole === 'HOD'
      ? 'Head of Department'
      : 'Registrar Office';
  const initials = user?.initials || (userName.split(' ').map(n => n[0]).join('').slice(0, 2));

  return (
    <>
      {isOpen && <div className="c360-sidebar-overlay" onClick={onClose} />}
      <aside
        className={`c360-sidebar ${isOpen ? 'c360-sidebar--open' : ''} ${isCollapsed ? 'c360-sidebar--collapsed' : ''}`}
      >
        {/* Brand Header */}
        <div className="c360-sidebar__brand-row">
          <div
            className="c360-sidebar__brand"
            onClick={() => {
              if (currentRole === 'FACULTY') navigate('/faculty/dashboard');
              else if (currentRole === 'HOD') navigate('/hod/dashboard');
              else if (currentRole === 'ADMIN') navigate('/admin/dashboard');
              else navigate('/student/dashboard');
            }}
            title="CampusOne Home"
          >
            {isCollapsed ? (
              <img
                src="/favicon.svg"
                alt="CampusOne"
                className="c360-sidebar__brand-icon"
              />
            ) : (
              <img
                src={campusOneLogo}
                alt="CampusOne"
                className="c360-sidebar__brand-logo"
              />
            )}
          </div>

          {/* Desktop Collapse / Expand Toggle Button */}
          {onToggleCollapse && (
            <button
              type="button"
              className="c360-sidebar__toggle-btn"
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}

          {/* Mobile Close Button */}
          <button
            type="button"
            className="c360-sidebar__close-btn"
            onClick={onClose}
            aria-label="Close sidebar menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Nav Area */}
        <div className="c360-sidebar__scroll">
          {/* WORKSPACE SECTION */}
          <div className="c360-sidebar__section">
            {!isCollapsed && (
              <div className="c360-sidebar__section-heading">WORKSPACE</div>
            )}
            <nav className="c360-sidebar__menu">
              {currentRole === 'STUDENT' && (
                <>
                  <NavLink
                    to="/student/dashboard"
                    end
                    onClick={onClose}
                    title="Dashboard"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <LayoutDashboard size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">Dashboard</span>}
                  </NavLink>

                  <NavLink
                    to="/student/new-request"
                    onClick={onClose}
                    title="New Request"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <Plus size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">New Request</span>}
                  </NavLink>

                  <NavLink
                    to="/student/requests"
                    onClick={onClose}
                    title="My Requests"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <FileText size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">My Requests</span>}
                  </NavLink>

                  <NavLink
                    to="/student/records"
                    onClick={onClose}
                    title="My Records"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <FileSpreadsheet size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">My Records</span>}
                  </NavLink>
                </>
              )}

              {currentRole === 'FACULTY' && (
                <>
                  <NavLink
                    to="/faculty/dashboard"
                    end
                    onClick={onClose}
                    title="Faculty Queue"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <CheckSquare size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">Faculty Queue</span>}
                  </NavLink>

                  <NavLink
                    to="/student/requests"
                    onClick={onClose}
                    title="Campus Requests"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <ListOrdered size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">Campus Requests</span>}
                  </NavLink>
                </>
              )}

              {currentRole === 'HOD' && (
                <>
                  <NavLink
                    to="/hod/dashboard"
                    end
                    onClick={onClose}
                    title="Department Queue"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <ShieldCheck size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">Department Queue</span>}
                  </NavLink>

                  <NavLink
                    to="/student/requests"
                    onClick={onClose}
                    title="Campus Requests"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <ListOrdered size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">Campus Requests</span>}
                  </NavLink>
                </>
              )}

              {currentRole === 'ADMIN' && (
                <>
                  <NavLink
                    to="/admin/dashboard"
                    end
                    onClick={onClose}
                    title="Admin Queue"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <Landmark size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">Admin Queue</span>}
                  </NavLink>

                  <NavLink
                    to="/student/requests"
                    onClick={onClose}
                    title="Campus Requests"
                    className={({ isActive }) =>
                      `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                    }
                  >
                    <ListOrdered size={18} className="c360-sidebar__icon" />
                    {!isCollapsed && <span className="c360-sidebar__label">Campus Requests</span>}
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          {/* RESOURCES SECTION */}
          <div className="c360-sidebar__section">
            {!isCollapsed && (
              <div className="c360-sidebar__section-heading">RESOURCES</div>
            )}
            <nav className="c360-sidebar__menu">
              <NavLink
                to="/student/documents"
                onClick={onClose}
                title="Documents"
                className={({ isActive }) =>
                  `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                }
              >
                <Folder size={18} className="c360-sidebar__icon" />
                {!isCollapsed && <span className="c360-sidebar__label">Documents</span>}
              </NavLink>

              <NavLink
                to="/student/notifications"
                onClick={onClose}
                title="Notifications"
                className={({ isActive }) =>
                  `c360-sidebar__item ${isActive ? 'c360-sidebar__item--active' : ''}`
                }
              >
                <Bell size={18} className="c360-sidebar__icon" />
                {!isCollapsed && <span className="c360-sidebar__label">Notifications</span>}
              </NavLink>
            </nav>
          </div>
        </div>

        {/* BOTTOM AREA */}
        <div className="c360-sidebar__bottom">
          <NavLink
            to="/student/help"
            onClick={onClose}
            title="Help & Support"
            className={({ isActive }) =>
              `c360-sidebar__item c360-sidebar__item--help ${isActive ? 'c360-sidebar__item--active' : ''}`
            }
          >
            <HelpCircle size={18} className="c360-sidebar__icon" />
            {!isCollapsed && <span className="c360-sidebar__label">Help & Support</span>}
          </NavLink>

          {/* User Profile Card (Click to Sign Out) */}
          <div
            className={`c360-sidebar__profile-card ${isCollapsed ? 'c360-sidebar__profile-card--collapsed' : ''}`}
            onClick={handleLogout}
            title={`${userName} • ${userSubtitle} (Click to Sign Out)`}
          >
            <div className="c360-sidebar__profile-avatar">
              <span>{initials}</span>
              <span className="c360-sidebar__online-dot" />
            </div>
            {!isCollapsed && (
              <>
                <div className="c360-sidebar__profile-info">
                  <span className="c360-sidebar__profile-name">{userName}</span>
                  <span className="c360-sidebar__profile-meta">{userSubtitle}</span>
                </div>
                <LogOut size={15} className="c360-sidebar__profile-chevron" title="Sign Out" />
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
