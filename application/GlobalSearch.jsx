import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function GlobalSearch() {
  const { searchOpen, setSearchOpen, tasks, events, goals, people, roles, workflows } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setSearchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const q = query.toLowerCase();
  const results = [];

  if (q.length > 0) {
    tasks.filter(t => t.title.toLowerCase().includes(q)).forEach(t =>
      results.push({ type: 'Task', text: t.title, nav: '/kanban' })
    );
    events.filter(e => e.title.toLowerCase().includes(q)).forEach(e =>
      results.push({ type: 'Event', text: e.title, nav: '/calendar' })
    );
    goals.filter(g => g.title.toLowerCase().includes(q)).forEach(g =>
      results.push({ type: 'Goal', text: g.title, nav: '/goals' })
    );
    people.filter(p => p.name.toLowerCase().includes(q)).forEach(p =>
      results.push({ type: 'Person', text: p.name, nav: '/contacts' })
    );
    roles.filter(r => r.name.toLowerCase().includes(q)).forEach(r =>
      results.push({ type: 'Role', text: r.name, nav: '/roles' })
    );
    workflows.filter(w => w.name.toLowerCase().includes(q)).forEach(w =>
      results.push({ type: 'Workflow', text: w.name, nav: '/workflows' })
    );
  }

  const go = (nav) => {
    navigate(nav);
    setSearchOpen(false);
  };

  return (
    <div className="search-overlay" onClick={() => setSearchOpen(false)}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="search-modal-input"
          placeholder="Search everything…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="search-results">
          {query && results.length === 0 && (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>No results</div>
          )}
          {results.slice(0, 20).map((r, i) => (
            <div key={i} className="search-result-item" onClick={() => go(r.nav)}>
              <span className="search-result-type">{r.type}</span>
              <span className="search-result-text">{r.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
