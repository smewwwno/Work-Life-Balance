import { useApp } from '../../context/AppContext';
import ReactMarkdown from 'react-markdown';

export default function RolesView() {
  const { roles, mode } = useApp();
  const filtered = roles.filter(r => r.domain === mode || r.domain === 'shared');

  return (
    <>
      <div className="view-header">
        <h2 className="view-title">Roles</h2>
      </div>

      <div className="roles-grid">
        {filtered.map(role => (
          <div key={role.id} className="card role-card">
            <div className="role-card-header">
              <div className="role-icon">{role.icon}</div>
              <div>
                <h3>{role.name}</h3>
                <span className={`badge badge-${role.domain}`}>{role.domain}</span>
              </div>
            </div>
            <div className="role-markdown">
              <ReactMarkdown>{role.markdown}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
