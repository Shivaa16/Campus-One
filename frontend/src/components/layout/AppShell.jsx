import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import './AppShell.css';

export function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('c360_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('c360_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className={`c360-app-shell ${isCollapsed ? 'c360-app-shell--collapsed' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
      <div className="c360-app-shell__main">
        <TopBar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="c360-app-shell__content">
          <div className="c360-app-shell__content-container">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
