import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Sidebar from './components/Shell/Sidebar';
import Header from './components/Shell/Header';
import GlobalSearch from './components/Search/GlobalSearch';
import KanbanView from './views/Kanban/KanbanView';
import CalendarView from './views/Calendar/CalendarView';
import InboxView from './views/Inbox/InboxView';
import GoalsView from './views/Goals/GoalsView';
import RolesView from './views/Roles/RolesView';
import WorkflowsView from './views/Workflows/WorkflowsView';
import ContactsView from './views/Contacts/ContactsView';
import SettingsView from './views/Settings/SettingsView';

function App() {
  const { mode } = useApp();

  return (
    <div className="app-layout" data-mode={mode}>
      <Sidebar />
      <div className="main-area">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/kanban" replace />} />
            <Route path="/kanban" element={<KanbanView />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/inbox" element={<InboxView />} />
            <Route path="/goals" element={<GoalsView />} />
            <Route path="/roles" element={<RolesView />} />
            <Route path="/workflows" element={<WorkflowsView />} />
            <Route path="/contacts" element={<ContactsView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
      <GlobalSearch />
    </div>
  );
}

export default App;
