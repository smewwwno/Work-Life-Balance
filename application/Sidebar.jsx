import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Columns3, Calendar, Inbox, Target,
  Users, UserCog, Workflow, Settings, Leaf, TreeDeciduous
} from 'lucide-react';

const navItems = [
  { to: '/kanban', icon: Columns3, label: 'Kanban' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/inbox', icon: Inbox, label: 'Inbox', badgeKey: 'unreadCount' },
  { to: '/goals', icon: Target, label: 'Goals' },
];

const manageItems = [
  { to: '/roles', icon: UserCog, label: 'Roles' },
  { to: '/workflows', icon: Workflow, label: 'Workflows' },
  { to: '/contacts', icon: Users, label: 'Contacts' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { mode, toggleMode, unreadCount } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          {mode === 'life' ? <Leaf size={16} /> : <TreeDeciduous size={16} />}
        </div>
        <span>LifeWork OS</span>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <div className="sidebar-section-title">Views</div>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" size={20} />
              <span>{item.label}</span>
              {item.badgeKey && unreadCount > 0 && (
                <span className="nav-badge">{unreadCount}</span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Manage</div>
          {manageItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="mode-toggle-wrap">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === 'life' ? 'active' : ''}`}
            onClick={() => mode !== 'life' && toggleMode()}
          >
            🌿 <span>Life</span>
          </button>
          <button
            className={`mode-btn ${mode === 'work' ? 'active' : ''}`}
            onClick={() => mode !== 'work' && toggleMode()}
          >
            🪵 <span>Work</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
