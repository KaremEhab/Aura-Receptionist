import { Headphones, Mail, UserCog, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import './Support.css';

const initialRows = [
  ['Mariam Samy', 'Freeze membership for travel', 'Front desk', '12 min', 'Open'],
  ['Ahmed Nader', 'Card replacement', 'Phone', '8 min', 'Waiting ID'],
  ['Sara Adel', 'Class booking conflict', 'WhatsApp', '22 min', 'Escalated'],
  ['Hana Youssef', 'Invoice resend', 'Email', 'Done', 'Closed'],
];

export function Support({ receptionist }) {
  const [rows, setRows] = useState(initialRows);
  const [activeAction, setActiveAction] = useState('Ready');

  const handleAction = (label) => {
    setActiveAction(label);
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRow = [`Guest ${rows.length + 1}`, label, 'Front desk', 'Just now', label.includes('Escalate') ? 'Escalated' : 'Open'];
    setRows([newRow, ...rows]);
  };

  return (
    <section className="reception-page">
      <div className="reception-hero">
        <div>
          <span className="reception-kicker">Reception Operations</span>
          <h1>Support</h1>
          <p>Member requests, walk-ins, calls, and escalations handled by reception.</p>
        </div>
        <div className="reception-hero-badge">
          <Headphones size={28} />
          <span>{receptionist?.name || 'Receptionist'}</span>
        </div>
      </div>

      <div className="reception-stats">
        <article className="reception-stat">
          <span>Open Requests</span>
          <strong>11</strong>
          <small>4 waiting member reply</small>
        </article>
        <article className="reception-stat">
          <span>Avg SLA</span>
          <strong>16m</strong>
          <small>Front desk queue</small>
        </article>
        <article className="reception-stat">
          <span>Escalated</span>
          <strong>2</strong>
          <small>Manager needed</small>
        </article>
      </div>

      <div className="reception-grid">
        <section className="reception-panel">
          <div className="reception-panel-head">
            <h2>Quick Actions</h2>
            <Sparkles size={18} />
          </div>
          <div className="action-list">
            <button className="action-row" onClick={() => handleAction('Open Request')}>
              <Headphones size={20} />
              <span>Open Request</span>
            </button>
            <button className="action-row" onClick={() => handleAction('Send Follow-up')}>
              <Mail size={20} />
              <span>Send Follow-up</span>
            </button>
            <button className="action-row" onClick={() => handleAction('Escalate to Manager')}>
              <UserCog size={20} />
              <span>Escalate to Manager</span>
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
              <span>Keep private member data off printed notes.</span>
            </li>
            <li>
              <CheckCircle2 size={16} />
              <span>Escalate billing disputes before adjusting balances.</span>
            </li>
          </ul>
        </section>
      </div>

      <section className="reception-table-card">
        <div className="reception-table-head">
          <h2>Reception Support Queue</h2>
          <button>Export</button>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table>
            <thead>
              <tr>
                <th>Member / Guest</th>
                <th>Request</th>
                <th>Channel</th>
                <th>SLA</th>
                <th>Status</th>
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
