import { useApp } from '../../context/AppContext';

export default function WorkflowsView() {
  const { workflows, mode } = useApp();
  const filtered = workflows.filter(w => w.domain === mode || w.domain === 'shared');

  return (
    <>
      <div className="view-header">
        <h2 className="view-title">Workflows</h2>
      </div>

      <div className="workflows-list">
        {filtered.map(wf => (
          <div key={wf.id} className="card workflow-card">
            <div className="workflow-info">
              <div className="workflow-name">{wf.name}</div>
              <div className="workflow-trigger">Trigger: {wf.trigger}</div>
              <div className="workflow-steps">
                {wf.steps.map((step, i) => (
                  <span key={i} className="workflow-step">{step}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <span className={`workflow-status ${wf.status}`}>{wf.status}</span>
              <span className={`badge badge-${wf.domain}`}>{wf.domain}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
