import { useApp } from '../../context/AppContext';

export default function SettingsView() {
  const { mode, toggleMode } = useApp();

  const handleReset = () => {
    if (confirm('Clear all local data and reload with seed data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      <div className="view-header">
        <h2 className="view-title">Settings</h2>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="settings-row">
            <div>
              <div className="settings-label">Active Mode</div>
              <div className="settings-desc">Switch between Life and Work modes</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={toggleMode}>
              Switch to {mode === 'work' ? 'Life' : 'Work'}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Integrations</h3>
          <div className="settings-row">
            <div>
              <div className="settings-label">Jira</div>
              <div className="settings-desc">Connect your Jira workspace for task sync</div>
            </div>
            <button className="btn btn-secondary btn-sm" disabled>Connect</button>
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-label">Confluence</div>
              <div className="settings-desc">Link Confluence for documentation</div>
            </div>
            <button className="btn btn-secondary btn-sm" disabled>Connect</button>
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-label">Google Calendar</div>
              <div className="settings-desc">Sync events from Google Calendar</div>
            </div>
            <button className="btn btn-secondary btn-sm" disabled>Connect</button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Data</h3>
          <div className="settings-row">
            <div>
              <div className="settings-label">Reset to defaults</div>
              <div className="settings-desc">Clear all local data and reload seed data</div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}
