import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Dumbbell,
  FileText,
  Headphones,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserCog,
  Wrench,
} from 'lucide-react';
import { useState } from 'react';
import './ReceptionPages.css';

const subscriptionRows = [
  { member: 'Laila Mahmoud', plan: 'Premium Monthly', due: 'Today 18:00', amount: 'EGP 1,490', status: 'Collect' },
  { member: 'Omar Farouk', plan: 'Standard Quarterly', due: 'Tomorrow', amount: 'EGP 3,600', status: 'Reminder sent' },
  { member: 'Nina Patel', plan: 'PT Add-on', due: 'May 10', amount: 'EGP 850', status: 'Pending card' },
  { member: 'Jordan Smyth', plan: 'Platinum Annual', due: 'May 12', amount: 'EGP 18,500', status: 'Prepaid' },
];

const maintenanceRows = [
  { item: 'Main gate scanner', area: 'Reception', priority: 'High', eta: '35 min', owner: 'Facilities' },
  { item: 'Locker room AC', area: 'Women lockers', priority: 'Medium', eta: 'Today 16:00', owner: 'Vendor' },
  { item: 'POS printer paper', area: 'Front desk', priority: 'Low', eta: 'Stocked', owner: 'Reception' },
  { item: 'Studio 2 lights', area: 'Group class', priority: 'Medium', eta: 'Tomorrow', owner: 'Electrician' },
];

const equipmentRows = [
  { unit: 'Treadmill T-04', zone: 'Cardio', state: 'Available', booking: 'Open', note: 'Cleaned 09:10' },
  { unit: 'Cable Station C-02', zone: 'Strength', state: 'Reserved', booking: 'PT 11:00', note: 'Coach Omar' },
  { unit: 'Spin Bike S-18', zone: 'Studio', state: 'Maintenance', booking: 'Blocked', note: 'Pedal check' },
  { unit: 'Recovery Boots R-03', zone: 'Recovery', state: 'Available', booking: 'Open', note: 'Sanitized' },
];

const supportRows = [
  { guest: 'Mariam Samy', request: 'Freeze membership for travel', channel: 'Front desk', sla: '12 min', status: 'Open' },
  { guest: 'Ahmed Nader', request: 'Card replacement', channel: 'Phone', sla: '8 min', status: 'Waiting ID' },
  { guest: 'Sara Adel', request: 'Class booking conflict', channel: 'WhatsApp', sla: '22 min', status: 'Escalated' },
  { guest: 'Hana Youssef', request: 'Invoice resend', channel: 'Email', sla: 'Done', status: 'Closed' },
];

const pageConfig = {
  subscriptions: {
    title: 'Subscriptions',
    subtitle: 'Payments, renewals, expiring plans, and front-desk collection tasks.',
    icon: CreditCard,
    stats: [
      { label: 'Due Today', value: '18', helper: 'EGP 42.8K collectible' },
      { label: 'Renewal Calls', value: '9', helper: 'Before 6 PM' },
      { label: 'Failed Cards', value: '4', helper: 'Needs member action' },
    ],
    actions: [
      { icon: ReceiptText, label: 'Record Cash Payment' },
      { icon: Bell, label: 'Send Renewal Reminder' },
      { icon: FileText, label: 'Print Invoice' },
    ],
    tableTitle: 'Reception Payment Queue',
    columns: ['Member', 'Plan', 'Due', 'Amount', 'Status'],
    rows: subscriptionRows.map((row) => [row.member, row.plan, row.due, row.amount, row.status]),
    notes: ['Verify member identity before collecting payment.', 'Print receipt after any cash or Fawry transaction.'],
  },
  maintenance: {
    title: 'Maintenance',
    subtitle: 'Track facility issues that affect check-ins, member safety, or class readiness.',
    icon: Wrench,
    stats: [
      { label: 'Open Tickets', value: '7', helper: '2 reception-critical' },
      { label: 'Vendor Visits', value: '3', helper: 'Expected today' },
      { label: 'Resolved', value: '12', helper: 'This week' },
    ],
    actions: [
      { icon: ClipboardList, label: 'Create Service Ticket' },
      { icon: AlertTriangle, label: 'Mark Safety Issue' },
      { icon: Phone, label: 'Call Vendor' },
    ],
    tableTitle: 'Facility Service Board',
    columns: ['Issue', 'Area', 'Priority', 'ETA', 'Owner'],
    rows: maintenanceRows.map((row) => [row.item, row.area, row.priority, row.eta, row.owner]),
    notes: ['Reception-critical issues must be escalated immediately.', 'Keep members away from blocked areas until cleared.'],
  },
  equipments: {
    title: 'Equipments',
    subtitle: 'Availability and booking status for equipment members ask about at reception.',
    icon: Dumbbell,
    stats: [
      { label: 'Available Units', value: '86', helper: 'Across all zones' },
      { label: 'Reserved', value: '14', helper: 'Next 2 hours' },
      { label: 'Blocked', value: '5', helper: 'Maintenance hold' },
    ],
    actions: [
      { icon: CalendarClock, label: 'Reserve Equipment' },
      { icon: CheckCircle2, label: 'Mark Sanitized' },
      { icon: Wrench, label: 'Report Fault' },
    ],
    tableTitle: 'Equipment Desk View',
    columns: ['Unit', 'Zone', 'State', 'Booking', 'Note'],
    rows: equipmentRows.map((row) => [row.unit, row.zone, row.state, row.booking, row.note]),
    notes: ['Only reserve equipment for checked-in members.', 'Blocked equipment should not be promised to guests.'],
  },
  support: {
    title: 'Support',
    subtitle: 'Member requests, walk-ins, calls, and escalations handled by reception.',
    icon: Headphones,
    stats: [
      { label: 'Open Requests', value: '11', helper: '4 waiting member reply' },
      { label: 'Avg SLA', value: '16m', helper: 'Front desk queue' },
      { label: 'Escalated', value: '2', helper: 'Manager needed' },
    ],
    actions: [
      { icon: Headphones, label: 'Open Request' },
      { icon: Mail, label: 'Send Follow-up' },
      { icon: UserCog, label: 'Escalate to Manager' },
    ],
    tableTitle: 'Reception Support Queue',
    columns: ['Member / Guest', 'Request', 'Channel', 'SLA', 'Status'],
    rows: supportRows.map((row) => [row.guest, row.request, row.channel, row.sla, row.status]),
    notes: ['Keep private member data off printed notes.', 'Escalate billing disputes before adjusting balances.'],
  },
};

const settings = {
  title: 'Account Settings',
  subtitle: 'Receptionist profile, permissions, device access, and shift handoff preferences.',
  icon: UserCog,
  stats: [
    { label: 'Role', value: 'Reception', helper: 'Front desk access' },
    { label: 'Device', value: 'Desk 01', helper: 'Scanner connected' },
    { label: 'Shift Mode', value: 'Live', helper: 'Data isolated per shift' },
  ],
  actions: [
    { icon: ShieldCheck, label: 'Review Permissions' },
    { icon: KeyRound, label: 'Change PIN' },
    { icon: SlidersHorizontal, label: 'Desk Preferences' },
  ],
  tableTitle: 'Account Checklist',
  columns: ['Setting', 'Current Value', 'Reception Impact', 'Status'],
  rows: [
    ['Notifications', 'Renewals + support queue', 'Shows urgent member tasks', 'Enabled'],
    ['Payment permissions', 'Cash, Fawry, card receipt', 'Can record front-desk payments', 'Active'],
    ['Scanner access', 'Main gate + member QR', 'Can validate check-ins', 'Connected'],
    ['Privacy lock', 'Auto-lock after 3 min', 'Protects previous shift data', 'Enabled'],
  ],
  notes: ['End Shift clears local shift activity before another receptionist logs in.', 'Use a personal PIN and never share cashier access.'],
};

export function ReceptionPage({ type, receptionist, onUpdateReceptionist }) {
  const config = type === 'settings' ? settings : pageConfig[type];
  const [rows, setRows] = useState(config.rows);
  const [activeAction, setActiveAction] = useState(config.actions[0]?.label || 'Ready');
  const Icon = config.icon;

  if (type === 'settings') {
    return (
      <AccountSettings
        config={config}
        receptionist={receptionist}
        onUpdateReceptionist={onUpdateReceptionist}
      />
    );
  }

  const handleAction = (label) => {
    setActiveAction(label);
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const generated = {
      subscriptions: [`Walk-in Member ${rows.length + 1}`, 'Premium Monthly', `Today ${stamp}`, 'EGP 1,490', label.includes('Reminder') ? 'Reminder sent' : 'Collect'],
      maintenance: [`${label}`, 'Reception', label.includes('Safety') ? 'High' : 'Medium', 'Logged now', receptionist?.name || 'Reception'],
      equipments: [`Desk Request ${rows.length + 1}`, 'Reception', label.includes('Fault') ? 'Maintenance' : 'Reserved', stamp, label],
      support: [`Guest ${rows.length + 1}`, label, 'Front desk', 'Just now', label.includes('Escalate') ? 'Escalated' : 'Open'],
      settings: [label, receptionist?.name || 'Receptionist', 'Updated by current account', 'Saved'],
    };
    setRows((current) => [generated[type], ...current]);
  };

  return (
    <section className="reception-page">
      <div className="reception-hero">
        <div>
          <span className="reception-kicker">Reception Operations</span>
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
        </div>
        <div className="reception-hero-badge">
          <Icon size={28} />
          <span>{receptionist?.name || 'Receptionist'}</span>
        </div>
      </div>

      <div className="reception-stats">
        {config.stats.map((stat) => (
          <article className="reception-stat" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.helper}</small>
          </article>
        ))}
      </div>

      <div className="reception-grid">
        <section className="reception-panel">
          <div className="reception-panel-head">
            <h2>Quick Actions</h2>
            <Sparkles size={18} />
          </div>
          <div className="action-list">
            {config.actions.map(({ icon: ActionIcon, label }) => (
              <button key={label} className="action-row" onClick={() => handleAction(label)}>
                <ActionIcon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="reception-panel">
          <div className="reception-panel-head">
            <h2>Desk Notes</h2>
            <MapPin size={18} />
          </div>
          <ul className="desk-notes">
            <li>
              <Sparkles size={16} />
              <span>Last action: {activeAction}</span>
            </li>
            {config.notes.map((note) => (
              <li key={note}>
                <CheckCircle2 size={16} />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="reception-table-card">
        <div className="reception-table-head">
          <h2>{config.tableTitle}</h2>
          <button onClick={() => exportTable(`${type}-desk-export.csv`, config.columns, rows)}>Export</button>
        </div>
        <div className="reception-table-scroll">
          <table>
            <thead>
              <tr>
                {config.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.join('-')}>
                  {row.map((cell, index) => (
                    <td key={`${cell}-${index}`}>
                      <span className={index === row.length - 1 ? 'reception-status-pill' : ''}>{cell}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

function AccountSettings({ config, receptionist, onUpdateReceptionist }) {
  const [profile, setProfile] = useState({
    name: receptionist?.name || '',
    role: receptionist?.role || '',
    pin: receptionist?.pin || '',
    phone: receptionist?.phone || '+20 100 000 0000',
    email: receptionist?.email || 'reception@caesarsgym.com',
    emergency: receptionist?.emergency || '+20 122 555 0199',
    language: receptionist?.language || 'English / Arabic',
  });
  const [saved, setSaved] = useState(false);

  const update = (field, value) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const saveProfile = () => {
    onUpdateReceptionist?.(profile);
    setSaved(true);
  };

  return (
    <section className="reception-page">
      <div className="reception-hero">
        <div>
          <span className="reception-kicker">Reception Account</span>
          <h1>{config.title}</h1>
          <p>Edit the current receptionist profile, contact details, desk assignment, and safety handoff preferences.</p>
        </div>
        <div className="reception-hero-badge">
          <UserCog size={28} />
          <span>{profile.name || 'Receptionist'}</span>
        </div>
      </div>

      <div className="settings-layout">
        <section className="profile-settings-card">
          <h2>Profile Details</h2>
          <div className="settings-form-grid">
            {[
              ['name', 'Full Name'],
              ['role', 'Role'],
              ['pin', 'Desk / PIN Label'],
              ['phone', 'Phone Number'],
              ['email', 'Email Address'],
              ['emergency', 'Emergency Contact'],
              ['language', 'Service Languages'],
            ].map(([field, label]) => (
              <label key={field}>
                <span>{label}</span>
                <input value={profile[field]} onChange={(event) => update(field, event.target.value)} />
              </label>
            ))}
          </div>
          <button className="save-profile-btn" onClick={saveProfile}>
            <ShieldCheck size={18} />
            <span>{saved ? 'Profile Saved' : 'Save Profile'}</span>
          </button>
        </section>

        <section className="profile-settings-card">
          <h2>Safety Access</h2>
          <div className="safety-list">
            <div><strong>QR / Barcode login</strong><span>Enabled for shift start and shift end.</span></div>
            <div><strong>Checkout scan</strong><span>Trainees can safely check out with their own QR or barcode.</span></div>
            <div><strong>Shift isolation</strong><span>Local queue and logs reset when ending a shift.</span></div>
          </div>
        </section>
      </div>
    </section>
  );
}

function exportTable(filename, columns, rows) {
  const csv = [columns.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
