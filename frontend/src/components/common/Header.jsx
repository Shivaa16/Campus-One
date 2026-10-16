import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Shield, Menu, User, Bell } from 'lucide-react';
import { ROLE_LABELS } from '../../utils/constants';
import './Header.css';

export function Header({ user, onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('c360_active_user');
    localStorage.removeItem('c360_auth_token');
    navigate('/login');
  };

  const roleLabel = ROLE_LABELS[user?.role] || 'Campus Portal';

  return (
    <header className="c360-header">
      <div className="c360-header__left">
        <button
          className="c360-header__toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="c360-header__brand" onClick={() => navigate('/login')}>
          <div className="c360-header__logo-badge">C360</div>
          <div>
            <h1 className="c360-header__brand-title">CampusOne</h1>
            <span className="c360-header__brand-subtitle">{roleLabel}</span>
          </div>
        </div>
      </div>

      <div className="c360-header__right">
        <div className="c360-header__campus-badge">
          <span className="c360-header__pulse-dot" />
          <span>Campus Portal • Online</span>
        </div>

        <button className="c360-header__icon-btn" title="Notifications" aria-label="Notifications">
          <Bell size={18} />
          <span className="c360-header__notif-badge">3</span>
        </button>

        <div className="c360-header__user-profile">
          <div className="c360-header__avatar">
            <User size={16} />
          </div>
          <div className="c360-header__user-info">
            <span className="c360-header__user-name">{user?.name || 'Authorized User'}</span>
            <span className="c360-header__user-role">{user?.role || 'STUDENT'}</span>
          </div>
        </div>

        <button
          className="c360-header__logout-btn"
          onClick={handleLogout}
          title="Sign out / Switch account"
        >
          <LogOut size={16} />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
