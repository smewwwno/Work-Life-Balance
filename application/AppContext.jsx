import { createContext, useContext, useState, useEffect } from 'react';
import { seedTasks, seedEvents, seedGoals, seedPeople, seedRoles, seedWorkflows, seedInbox, seedBoards } from '../data/seedData';

const AppContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [mode, setMode] = useState(() => load('mode', 'work'));
  const [tasks, setTasks] = useState(() => load('tasks', seedTasks));
  const [events, setEvents] = useState(() => load('events', seedEvents));
  const [goals, setGoals] = useState(() => load('goals', seedGoals));
  const [people, setPeople] = useState(() => load('people', seedPeople));
  const [roles, setRoles] = useState(() => load('roles', seedRoles));
  const [workflows, setWorkflows] = useState(() => load('workflows', seedWorkflows));
  const [inbox, setInbox] = useState(() => load('inbox', seedInbox));
  const [boards, setBoards] = useState(() => load('boards', seedBoards));
  const [activeBoardId, setActiveBoardId] = useState(() => load('activeBoardId', 'b1'));
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => { localStorage.setItem('mode', JSON.stringify(mode)); }, [mode]);
  useEffect(() => { localStorage.setItem('tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('goals', JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem('people', JSON.stringify(people)); }, [people]);
  useEffect(() => { localStorage.setItem('roles', JSON.stringify(roles)); }, [roles]);
  useEffect(() => { localStorage.setItem('workflows', JSON.stringify(workflows)); }, [workflows]);
  useEffect(() => { localStorage.setItem('inbox', JSON.stringify(inbox)); }, [inbox]);
  useEffect(() => { localStorage.setItem('boards', JSON.stringify(boards)); }, [boards]);
  useEffect(() => { localStorage.setItem('activeBoardId', JSON.stringify(activeBoardId)); }, [activeBoardId]);

  // Filtered by current mode (shared items visible in both)
  const filteredTasks = tasks.filter(t => t.domain === mode || t.domain === 'shared');
  const filteredEvents = events.filter(e => e.domain === mode || e.domain === 'shared');

  const unreadCount = inbox.filter(i => !i.read).length;

  const addTask = (task) => setTasks(prev => [...prev, { ...task, id: 't' + Date.now() }]);
  const updateTask = (id, patch) => setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));
  const moveTask = (id, column) => updateTask(id, { column });

  const addEvent = (ev) => setEvents(prev => [...prev, { ...ev, id: 'e' + Date.now() }]);
  const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id));

  const addGoal = (goal) => setGoals(prev => [...prev, { ...goal, id: 'g' + Date.now() }]);
  const updateGoal = (id, patch) => setGoals(prev => prev.map(g => g.id === id ? { ...g, ...patch } : g));
  const deleteGoal = (id) => setGoals(prev => prev.filter(g => g.id !== id));

  const addPerson = (person) => setPeople(prev => [...prev, { ...person, id: 'p' + Date.now() }]);
  const deletePerson = (id) => setPeople(prev => prev.filter(p => p.id !== id));

  const addBoard = (name) => {
    const id = 'b' + Date.now();
    setBoards(prev => [...prev, { id, name, domain: mode }]);
    setActiveBoardId(id);
    return id;
  };
  const renameBoard = (id, name) => setBoards(prev => prev.map(b => b.id === id ? { ...b, name } : b));
  const deleteBoard = (id) => {
    setBoards(prev => prev.filter(b => b.id !== id));
    setTasks(prev => prev.filter(t => t.boardId !== id));
    setActiveBoardId(prev => prev === id ? (boards.find(b => b.id !== id)?.id || null) : prev);
  };

  const filteredBoards = boards.filter(b => b.domain === mode || b.domain === 'shared');

  const markRead = (id) => setInbox(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));
  const markAllRead = () => setInbox(prev => prev.map(i => ({ ...i, read: true })));

  const toggleMode = () => setMode(m => m === 'work' ? 'life' : 'work');

  return (
    <AppContext.Provider value={{
      mode, toggleMode,
      tasks, filteredTasks, addTask, updateTask, deleteTask, moveTask,
      boards, filteredBoards, activeBoardId, setActiveBoardId, addBoard, renameBoard, deleteBoard,
      events, filteredEvents, addEvent, deleteEvent,
      goals, addGoal, updateGoal, deleteGoal,
      people, addPerson, deletePerson,
      roles, setRoles,
      workflows, setWorkflows,
      inbox, markRead, markAllRead, unreadCount,
      searchQuery, setSearchQuery,
      searchOpen, setSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
