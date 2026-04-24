import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus } from 'lucide-react';

export default function GoalsView() {
  const { goals, addGoal, updateGoal, deleteGoal, mode } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: '', due: '', domain: mode });
  const filtered = goals.filter(g => g.domain === mode || g.domain === 'shared');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addGoal({ ...form, progress: 0 });
    setForm({ title: '', description: '', category: '', due: '', domain: mode });
    setModalOpen(false);
  };

  return (
    <>
      <div className="view-header">
        <h2 className="view-title">Goals</h2>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add Goal
        </button>
      </div>

      <div className="goals-grid">
        {filtered.map(goal => (
          <div key={goal.id} className="card goal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{goal.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{goal.description}</p>
              </div>
              <span className={`badge badge-${goal.domain}`}>{goal.domain}</span>
            </div>
            <div className="goal-progress-bar">
              <div className="goal-progress-fill" style={{ width: `${goal.progress}%` }} />
            </div>
            <div className="goal-meta">
              <span>{goal.progress}% complete</span>
              <span>Due: {goal.due}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => updateGoal(goal.id, { progress: Math.min(100, goal.progress + 10) })}
              >+10%</button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteGoal(goal.id)}
              >Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>New Goal</h2>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={e => set('title', e.target.value)} autoFocus />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. health, delivery" />
              </div>
              <div className="form-group">
                <label>Domain</label>
                <select value={form.domain} onChange={e => set('domain', e.target.value)}>
                  <option value="life">Life</option>
                  <option value="work">Work</option>
                </select>
              </div>
              <div className="form-group">
                <label>Due date</label>
                <input type="date" value={form.due} onChange={e => set('due', e.target.value)} />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
