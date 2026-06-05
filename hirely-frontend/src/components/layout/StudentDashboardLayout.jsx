import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  User, Search, FileText,
  Bell, LogOut, Menu, X, Briefcase,
} from 'lucide-react';
import '../../styles/dashboard.css';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'My Profile', icon: User },
  { to: '/find-jobs', label: 'Find Jobs', icon: Search },
  { to: '/applications', label: 'Applications', icon: FileText },
];

export function StudentDashboardLayout({ children, headerActions }) {
  const navigate = useNavigate();
  const { user, role, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={closeSidebar} />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Briefcase style={{ width: 18, height: 18, color: '#fff' }} />
          </div>
          <span className="sidebar-brand-name">TalentBridge</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={closeSidebar}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/notifications" className="sidebar-link" onClick={closeSidebar}>
            <Bell /> Notifications
          </NavLink>
          <button className="sidebar-link danger"
            onClick={() => { closeSidebar(); logout(); navigate('/login'); }}
          >
            <LogOut /> Logout
          </button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-navbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            {sidebarOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
          </button>
          <div className="navbar-actions">
            <button className="navbar-icon-btn" aria-label="Notifications">
              <Bell style={{ width: 18, height: 18 }} />
              <span className="navbar-badge" />
            </button>
            {headerActions}
            <div className="navbar-avatar">
              <div className="navbar-avatar-img">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="navbar-avatar-info">
                <span className="navbar-avatar-name">{user?.fullName || 'User'}</span>
                <span className="navbar-avatar-role">{role ? role.toLowerCase() : 'user'}</span>
              </div>
            </div>
          </div>
        </header>
        <main className="page-content">{children}</main>
        <footer className="dashboard-footer">
          <span>&copy; 2024 TalentBridge. All rights reserved.</span>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
