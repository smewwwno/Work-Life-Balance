import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus } from 'lucide-react';

export default function ContactsView() {
  const { people, addPerson, deletePerson, mode } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', email: '', domain: mode, tags: '' });
  const filtered = people.filter(p => p.domain === mode || p.domain === 'shared');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addPerson({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
    setForm({ name: '', role: '', email: '', domain: mode, tags: '' });
    setModalOpen(false);
  };

  return (
    <>
      <div className="view-header">
        <h2 className="view-title">Contacts</h2>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add Contact
        </button>
      </div>

      <div className="people-grid">
        {filtered.map(p => (
          <div key={p.id} className="card person-card">
            <div className="person-avatar">{p.name.split(' ').map(w => w[0]).join('')}</div>
            <div className="person-name">{p.name}</div>
            <div className="person-role">{p.role}</div>
            <div className="person-tags">
              <span className={`badge badge-${p.domain}`}>{p.domain}</span>
              {p.tags.map(tag => (
                <span key={tag} className="person-tag">{tag}</span>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-danger btn-sm" onClick={() => deletePerson(p.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>New Contact</h2>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>Name</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} autoFocus />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input value={form.role} onChange={e => set('role', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Domain</label>
                <select value={form.domain} onChange={e => set('domain', e.target.value)}>
                  <option value="life">Life</option>
                  <option value="work">Work</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="e.g. friend, gym" />
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
