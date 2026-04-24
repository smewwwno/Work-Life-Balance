import { useApp } from '../../context/AppContext';
import { CheckCheck } from 'lucide-react';

export default function InboxView() {
  const { inbox, markRead, markAllRead, mode } = useApp();
  const filtered = inbox.filter(i => i.domain === mode || i.domain === 'shared');

  return (
    <>
      <div className="view-header">
        <h2 className="view-title">Inbox</h2>
        <button className="btn btn-secondary" onClick={markAllRead}>
          <CheckCheck size={16} /> Mark all read
        </button>
      </div>

      <div className="inbox-list">
        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)', padding: 20, textAlign: 'center' }}>No notifications</p>
        )}
        {filtered.map(item => (
          <div
            key={item.id}
            className={`inbox-item ${item.read ? 'read' : 'unread'}`}
            onClick={() => markRead(item.id)}
          >
            <span className="inbox-text">{item.text}</span>
            <span className={`badge badge-${item.domain}`}>{item.domain}</span>
            <span className="inbox-time">{item.time}</span>
          </div>
        ))}
      </div>
    </>
  );
}
