import { Wrench, ClipboardList, AlertTriangle, Phone, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import './Maintenance.css';

const initialRows = [
  ['Main gate scanner', 'Reception', 'High', '35 min', 'Facilities'],
  ['Locker room AC', 'Women lockers', 'Medium', 'Today 16:00', 'Vendor'],
  ['POS printer paper', 'Front desk', 'Low', 'Stocked', 'Reception'],
  ['Studio 2 lights', 'Group class', 'Medium', 'Tomorrow', 'Electrician'],
];

export function Maintenance({ receptionist }) {
  const [rows, setRows] = useState(initialRows);
  const [activeAction, setActiveAction] = useState('Ready');

  const handleAction = (label) => {
    setActiveAction(label);
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRow = [label, 'Reception', label.includes('Safety') ? 'High' : 'Medium', 'Logged now', receptionist?.name || 'Reception'];
    setRows([newRow, ...rows]);
  };

  return (
    <section className="reception-page">
      <div className="reception-hero">
        <div>
          <span className="reception-kicker">Reception Operations</span>
          <h1>Maintenance</h1>
          <p>Track facility issues that affect check-ins, member safety, or class readiness.</p>
        </div>
        <div className="reception-hero-badge">
          <Wrench size={28} />
          <span>{receptionist?.name || 'Receptionist'}</span>
        </div>
      </div>

      <div className="reception-stats">
        <article className="reception-stat">
          <span>Open Tickets</span>
          <strong>7</strong>
          <small>2 reception-critical</small>
        </article>
        <article className="reception-stat">
          <span>Vendor Visits</span>
          <strong>3</strong>
          <small>Expected today</small>
        </article>
        <article className="reception-stat">
          <span>Resolved</span>
          <strong>12</strong>
          <small>This week</small>
        </article>
      </div>

      <div className="reception-grid">
        <section className="reception-panel">
          <div className="reception-panel-head">
            <h2>Quick Actions</h2>
            <Sparkles size={18} />
          </div>
          <div className="action-list">
            <button className="action-row" onClick={() => handleAction('Create Service Ticket')}>
              <ClipboardList size={20} />
              <span>Create Service Ticket</span>
            </button>
            <button className="action-row" onClick={() => handleAction('Mark Safety Issue')}>
              <AlertTriangle size={20} />
              <span>Mark Safety Issue</span>
            </button>
            <button className="action-row" onClick={() => handleAction('Call Vendor')}>
              <Phone size={20} />
              <span>Call Vendor</span>
            </button>
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
            <li>
              <CheckCircle2 size={16} />
              <span>Reception-critical issues must be escalated immediately.</span>
            </li>
            <li>
              <CheckCircle2 size={16} />
              <span>Keep members away from blocked areas until cleared.</span>
            </li>
          </ul>
        </section>
      </div>

      <section className="reception-table-card">
        <div className="reception-table-head">
          <h2>Facility Service Board</h2>
          <button>Export</button>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Area</th>
                <th>Priority</th>
                <th>ETA</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, index) => (
                    <td key={index}>
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
