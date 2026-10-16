import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, Bell, Menu, LogOut } from 'lucide-react';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import './TopBar.css';

export function TopBar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const academicTerm = user?.academicYear || 'Academic Year 2025–26 • Spring';
  const initials = user?.initials || (user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'SK');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="c360-topbar">
      <div className="c360-topbar__left">
        <button
          type="button"
          className="c360-topbar__menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="c360-topbar__academic-pill">
          <Calendar size={14} className="c360-topbar__calendar-icon" />
          <span>{academicTerm}</span>
        </div>
      </div>

      <div className="c360-topbar__center">
        <div className="c360-topbar__search-box">
          <Search size={16} className="c360-topbar__search-icon" />
          <input
            type="text"
            className="c360-topbar__search-input"
            placeholder="Search by request ID, title, or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Global request search"
          />
          <kbd className="c360-topbar__search-kbd">⌘ K</kbd>
        </div>
      </div>

      <div className="c360-topbar__right">
        <ThemeToggle />

        <button
          type="button"
          className="c360-topbar__icon-btn"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="c360-topbar__notif-indicator" />
        </button>

        <button
          type="button"
          className="c360-topbar__logout-btn"
          onClick={handleLogout}
          title="Sign Out"
          aria-label="Sign Out"
        >
          <LogOut size={15} />
          <span className="c360-topbar__logout-label">Sign Out</span>
        </button>

        <div className="c360-topbar__avatar-btn" title={`${user?.name || 'Student'} (${user?.role || 'STUDENT'})`}>
          <div className="c360-topbar__avatar">
            <span>{initials}</span>
            <span className="c360-topbar__online-status" />
          </div>
        </div>
      </div>
    </header>
  );
}
