import { useState } from 'react';
import { COLUMNS } from '../../data/seedData';

export default function TaskModal({ mode, onSave, onClose }) {
  const [form, setForm] = useState({
    title: '', description: '', column: 'Backlog',
    priority: 'medium', label: '', due: '', domain: mode,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} autoFocus />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Column</label>
            <select value={form.column} onChange={e => set('column', e.target.value)}>
              {COLUMNS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select value={form.priority} onChange={e => set('priority', e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Domain</label>
            <select value={form.domain} onChange={e => set('domain', e.target.value)}>
              <option value="life">Life</option>
              <option value="work">Work</option>
            </select>
          </div>
          <div className="form-group">
            <label>Label</label>
            <input value={form.label} onChange={e => set('label', e.target.value)} placeholder="e.g. health, dev" />
          </div>
          <div className="form-group">
            <label>Due date</label>
            <input type="date" value={form.due} onChange={e => set('due', e.target.value)} />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
