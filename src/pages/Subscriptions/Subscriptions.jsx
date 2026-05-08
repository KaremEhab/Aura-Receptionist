import { CreditCard, ReceiptText, Bell, FileText, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import './Subscriptions.css';

const initialRows = [
  ['Laila Mahmoud', 'Premium Monthly', 'Today 18:00', 'EGP 1,490', 'Collect'],
  ['Omar Farouk', 'Standard Quarterly', 'Tomorrow', 'EGP 3,600', 'Reminder sent'],
  ['Nina Patel', 'PT Add-on', 'May 10', 'EGP 850', 'Pending card'],
  ['Jordan Smyth', 'Platinum Annual', 'May 12', 'EGP 18,500', 'Prepaid'],
];

export function Subscriptions({ receptionist }) {
  const [rows, setRows] = useState(initialRows);
  const [activeAction, setActiveAction] = useState('Ready');

  const handleAction = (label) => {
    setActiveAction(label);
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRow = [`Walk-in Member ${rows.length + 1}`, 'Premium Monthly', `Today ${stamp}`, 'EGP 1,490', label.includes('Reminder') ? 'Reminder sent' : 'Collect'];
    setRows([newRow, ...rows]);
  };

  return (
    <section className="reception-page">
      <div className="reception-hero">
        <div>
          <span className="reception-kicker">Reception Operations</span>
          <h1>Subscriptions</h1>
          <p>Payments, renewals, expiring plans, and front-desk collection tasks.</p>
        </div>
        <div className="reception-hero-badge">
          <CreditCard size={28} />
          <span>{receptionist?.name || 'Receptionist'}</span>
        </div>
      </div>

      <div className="reception-stats">
        <article className="reception-stat">
          <span>Due Today</span>
          <strong>18</strong>
          <small>EGP 42.8K collectible</small>
        </article>
        <article className="reception-stat">
          <span>Renewal Calls</span>
          <strong>9</strong>
          <small>Before 6 PM</small>
        </article>
        <article className="reception-stat">
          <span>Failed Cards</span>
          <strong>4</strong>
          <small>Needs member action</small>
        </article>
      </div>

      <div className="reception-grid">
        <section className="reception-panel">
          <div className="reception-panel-head">
            <h2>Quick Actions</h2>
            <Sparkles size={18} />
          </div>
          <div className="action-list">
            <button className="action-row" onClick={() => handleAction('Record Cash Payment')}>
              <ReceiptText size={20} />
              <span>Record Cash Payment</span>
            </button>
            <button className="action-row" onClick={() => handleAction('Send Renewal Reminder')}>
              <Bell size={20} />
              <span>Send Renewal Reminder</span>
            </button>
            <button className="action-row" onClick={() => handleAction('Print Invoice')}>
              <FileText size={20} />
              <span>Print Invoice</span>
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
              <span>Verify member identity before collecting payment.</span>
            </li>
            <li>
              <CheckCircle2 size={16} />
              <span>Print receipt after any cash or Fawry transaction.</span>
            </li>
          </ul>
        </section>
      </div>

      <section className="reception-table-card">
        <div className="reception-table-head">
          <h2>Reception Payment Queue</h2>
          <button>Export</button>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Plan</th>
                <th>Due</th>
                <th>Amount</th>
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
