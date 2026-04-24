import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Bell } from 'lucide-react';

const titles = {
  '/kanban': 'Kanban Board',
  '/calendar': 'Calendar',
  '/inbox': 'Inbox',
  '/goals': 'Goals',
  '/roles': 'Roles',
  '/workflows': 'Workflows',
  '/contacts': 'Contacts',
  '/settings': 'Settings',
};

export default function Header() {
  const { pathname } = useLocation();
  const { mode, searchOpen, setSearchOpen, unreadCount } = useApp();
  const title = titles[pathname] || 'Dashboard';

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>

      <div className="header-search">
        <div className="search-input-wrap">
          <Search className="search-icon" size={16} />
          <input
            className="search-input"
            placeholder="Search tasks, events, people… (Ctrl+K)"
            onFocus={() => setSearchOpen(true)}
            readOnly
          />
        </div>
      </div>

      <div className="header-actions">
        <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
          <Search size={18} />
        </button>
        <button className="icon-btn">
          <Bell size={18} />
          {unreadCount > 0 && <span className="dot" />}
        </button>
        <div
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--accent)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700,
          }}
        >
          {mode === 'life' ? '🌿' : '🪵'}
        </div>
      </div>
    </header>
  );
}
