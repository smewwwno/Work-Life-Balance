import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function CalendarView() {
  const { events, tasks } = useApp();
  const [current, setCurrent] = useState(new Date());
  const [filter, setFilter] = useState('combined');

  const year = current.getFullYear();
  const month = current.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const cells = [];
    // Previous month padding
    for (let i = startDay - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      cells.push({ date: d, otherMonth: true });
    }
    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      cells.push({ date: new Date(year, month, i), otherMonth: false });
    }
    // Next month padding
    const remaining = 7 - (cells.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        cells.push({ date: new Date(year, month + 1, i), otherMonth: true });
      }
    }
    return cells;
  }, [year, month]);

  const toDateStr = (d) => d.toISOString().split('T')[0];
  const today = toDateStr(new Date());

  const getEventsForDay = (dateStr) => {
    const filtered = events.filter(e => {
      if (filter !== 'combined' && e.domain !== filter) return false;
      return e.date === dateStr;
    });
    const tasksDue = tasks.filter(t => {
      if (filter !== 'combined' && t.domain !== filter) return false;
      return t.due === dateStr;
    });
    return [
      ...filtered.map(e => ({ ...e, type: 'event' })),
      ...tasksDue.map(t => ({ ...t, type: 'task' })),
    ];
  };

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  const monthName = current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <>
      <div className="calendar-nav">
        <button className="btn btn-secondary btn-sm" onClick={prev}><ChevronLeft size={16} /></button>
        <h3>{monthName}</h3>
        <button className="btn btn-secondary btn-sm" onClick={next}><ChevronRight size={16} /></button>

        <div className="calendar-filters">
          {['combined', 'life', 'work'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="calendar-grid">
        {WEEKDAYS.map(d => <div key={d} className="calendar-weekday">{d}</div>)}
        {days.map((cell, i) => {
          const dateStr = toDateStr(cell.date);
          const isToday = dateStr === today;
          const items = getEventsForDay(dateStr);
          return (
            <div
              key={i}
              className={`calendar-day ${cell.otherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
            >
              <div className="calendar-day-number">{cell.date.getDate()}</div>
              {items.slice(0, 3).map(item => (
                <div key={item.id} className={`calendar-event ${item.domain}`}>
                  {item.time && `${item.time} `}{item.title}
                </div>
              ))}
              {items.length > 3 && (
                <div style={{ fontSize: 10, color: 'var(--text-muted)', paddingLeft: 5 }}>
                  +{items.length - 3} more
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
