export const COLUMNS = ['Backlog', 'Planned', 'In Progress', 'Review', 'Done'];

export const seedBoards = [
  { id: 'b1', name: 'Sprint 12', domain: 'work' },
  { id: 'b2', name: 'Personal', domain: 'life' },
  { id: 'b3', name: 'Hiring', domain: 'work' },
];

export const seedTasks = [
  { id: 't1', boardId: 'b2', title: 'Plan weekly workout routine', domain: 'life', column: 'Backlog', label: 'health', priority: 'medium', due: '2026-04-01', description: 'Create a 5-day workout plan including cardio and strength.' },
  { id: 't2', boardId: 'b2', title: 'Read "Deep Work"', domain: 'life', column: 'In Progress', label: 'growth', priority: 'low', due: '2026-04-10', description: 'Finish chapters 3–5 this week.' },
  { id: 't3', boardId: 'b2', title: 'Family dinner planning', domain: 'life', column: 'Planned', label: 'relationships', priority: 'high', due: '2026-03-30', description: 'Plan menu and invite relatives.' },
  { id: 't4', boardId: 'b1', title: 'Fix auth middleware bug', domain: 'work', column: 'In Progress', label: 'dev', priority: 'high', due: '2026-03-28', description: 'Session token storage compliance fix.' },
  { id: 't5', boardId: 'b1', title: 'Write Q2 sprint retrospective', domain: 'work', column: 'Review', label: 'agile', priority: 'medium', due: '2026-03-29', description: 'Summarize velocity and blockers.' },
  { id: 't6', boardId: 'b1', title: 'Update Confluence docs', domain: 'work', column: 'Backlog', label: 'docs', priority: 'low', due: '2026-04-05', description: 'Sync architecture decisions to Confluence.' },
  { id: 't7', boardId: 'b2', title: 'Renew gym subscription', domain: 'life', column: 'Done', label: 'health', priority: 'low', due: '2026-03-20', description: '' },
  { id: 't8', boardId: 'b1', title: 'Deploy staging environment', domain: 'work', column: 'Planned', label: 'dev', priority: 'high', due: '2026-04-02', description: 'Set up Docker Compose on new VPS.' },
  { id: 't9', boardId: 'b3', title: 'Screen frontend candidates', domain: 'work', column: 'In Progress', label: 'hiring', priority: 'high', due: '2026-04-05', description: 'Review 10 resumes from LinkedIn.' },
  { id: 't10', boardId: 'b3', title: 'Prepare interview questions', domain: 'work', column: 'Done', label: 'hiring', priority: 'medium', due: '2026-03-25', description: '' },
];

export const seedEvents = [
  { id: 'e1', title: 'Team standup', domain: 'work', date: '2026-03-27', time: '09:00', recurring: 'daily' },
  { id: 'e2', title: 'Yoga class', domain: 'life', date: '2026-03-27', time: '07:00', recurring: 'weekly' },
  { id: 'e3', title: 'Sprint planning', domain: 'work', date: '2026-03-28', time: '10:00', recurring: null },
  { id: 'e4', title: 'Date night', domain: 'life', date: '2026-03-29', time: '19:00', recurring: 'weekly' },
  { id: 'e5', title: 'Dentist appointment', domain: 'life', date: '2026-04-01', time: '14:00', recurring: null },
  { id: 'e6', title: 'Product demo', domain: 'work', date: '2026-04-03', time: '15:00', recurring: null },
];

export const seedGoals = [
  { id: 'g1', title: 'Run a half-marathon', domain: 'life', category: 'health', progress: 35, due: '2026-09-01', description: 'Train consistently, build up to 21km.' },
  { id: 'g2', title: 'Launch MVP', domain: 'work', category: 'delivery', progress: 60, due: '2026-06-30', description: 'Ship the first public version of the platform.' },
  { id: 'g3', title: 'Read 12 books this year', domain: 'life', category: 'growth', progress: 20, due: '2026-12-31', description: '1 book per month minimum.' },
  { id: 'g4', title: 'Grow team to 8 people', domain: 'work', category: 'team', progress: 50, due: '2026-12-31', description: 'Hire 3 more engineers and 1 designer.' },
];

export const seedPeople = [
  { id: 'p1', name: 'Alex Petrov', domain: 'work', role: 'Lead Engineer', email: 'alex@company.com', tags: ['dev', 'backend'] },
  { id: 'p2', name: 'Maria Ivanova', domain: 'work', role: 'Product Manager', email: 'maria@company.com', tags: ['product', 'agile'] },
  { id: 'p3', name: 'Dmitri Sokolov', domain: 'life', role: 'Friend', email: 'dmitri@gmail.com', tags: ['friend', 'gym'] },
  { id: 'p4', name: 'Anna Kozlova', domain: 'life', role: 'Partner', email: 'anna@gmail.com', tags: ['family'] },
];

export const seedRoles = [
  {
    id: 'r1', name: 'Software Engineer', domain: 'work', icon: '💻',
    markdown: `# Software Engineer\n\n**Mission:** Deliver high-quality, reliable code that powers the platform.\n\n**Scope:** Backend services, API design, code reviews, CI/CD pipelines.\n\n**Workflows:** Sprint → Review → Deploy\n\n**Permissions:** Full repo access, staging deploys.`
  },
  {
    id: 'r2', name: 'Team Lead', domain: 'work', icon: '🧭',
    markdown: `# Team Lead\n\n**Mission:** Enable the team to move fast and stay aligned.\n\n**Scope:** 1:1s, sprint ceremonies, hiring, roadmap input.\n\n**Workflows:** Planning → Retrospective → Hiring\n\n**Permissions:** All work resources, budget visibility.`
  },
  {
    id: 'r3', name: 'Health Seeker', domain: 'life', icon: '🌿',
    markdown: `# Health Seeker\n\n**Mission:** Maintain physical and mental wellbeing through consistent habits.\n\n**Scope:** Exercise, nutrition, sleep, mindfulness.\n\n**Workflows:** Morning routine → Weekly review\n\n**Permissions:** Health integrations, wearable data.`
  },
  {
    id: 'r4', name: 'Partner & Friend', domain: 'life', icon: '❤️',
    markdown: `# Partner & Friend\n\n**Mission:** Nurture meaningful relationships with care and presence.\n\n**Scope:** Partner, family, close friends.\n\n**Workflows:** Weekly check-ins → Event planning\n\n**Permissions:** Shared calendar, contacts.`
  },
];

export const seedWorkflows = [
  { id: 'w1', name: 'Morning Routine', domain: 'life', trigger: 'Daily 06:30', steps: ['Wake up & hydrate', 'Yoga / stretch (20 min)', 'Journal entry', 'Review daily tasks'], status: 'active' },
  { id: 'w2', name: 'Sprint Planning', domain: 'work', trigger: 'Every 2 weeks Monday', steps: ['Review backlog', 'Estimate tickets', 'Assign to team', 'Set sprint goal', 'Kick off standup'], status: 'active' },
  { id: 'w3', name: 'Weekly Review', domain: 'shared', trigger: 'Every Sunday 18:00', steps: ['Review completed tasks', 'Check goal progress', 'Plan next week', 'Update roles'], status: 'active' },
  { id: 'w4', name: 'Hiring Pipeline', domain: 'work', trigger: 'On new applicant', steps: ['Screen CV', 'Technical interview', 'Team interview', 'Offer letter'], status: 'inactive' },
];

export const seedInbox = [
  { id: 'i1', text: 'Alex left a comment on "Fix auth middleware bug"', domain: 'work', read: false, time: '10:32' },
  { id: 'i2', text: 'Reminder: Family dinner planning due in 2 days', domain: 'life', read: false, time: '09:00' },
  { id: 'i3', text: 'Sprint retrospective moved to Friday', domain: 'work', read: true, time: 'Yesterday' },
  { id: 'i4', text: 'Gym subscription renewed successfully', domain: 'life', read: true, time: 'Mar 24' },
];
