import { Dumbbell, CalendarClock, CheckCircle2, Wrench, Sparkles, MapPin } from 'lucide-react';
import { useState } from 'react';
import './Equipments.css';

const initialRows = [
  ['Treadmill T-04', 'Cardio', 'Available', 'Open', 'Cleaned 09:10'],
  ['Cable Station C-02', 'Strength', 'Reserved', 'PT 11:00', 'Coach Omar'],
  ['Spin Bike S-18', 'Studio', 'Maintenance', 'Blocked', 'Pedal check'],
  ['Recovery Boots R-03', 'Recovery', 'Available', 'Open', 'Sanitized'],
];

export function Equipments({ receptionist }) {
  const [rows, setRows] = useState(initialRows);
  const [activeAction, setActiveAction] = useState('Ready');

  const handleAction = (label) => {
    setActiveAction(label);
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRow = [`Desk Request ${rows.length + 1}`, 'Reception', label.includes('Fault') ? 'Maintenance' : 'Reserved', stamp, label];
    setRows([newRow, ...rows]);
  };

  return (
    <section className="reception-page">
      <div className="reception-hero">
        <div>
          <span className="reception-kicker">Reception Operations</span>
          <h1>Equipments</h1>
          <p>Availability and booking status for equipment members ask about at reception.</p>
        </div>
        <div className="reception-hero-badge">
          <Dumbbell size={28} />
          <span>{receptionist?.name || 'Receptionist'}</span>
        </div>
      </div>

      <div className="reception-stats">
        <article className="reception-stat">
          <span>Available Units</span>
          <strong>86</strong>
          <small>Across all zones</small>
        </article>
        <article className="reception-stat">
          <span>Reserved</span>
          <strong>14</strong>
          <small>Next 2 hours</small>
        </article>
        <article className="reception-stat">
          <span>Blocked</span>
          <strong>5</strong>
          <small>Maintenance hold</small>
        </article>
      </div>

      <div className="reception-grid">
        <section className="reception-panel">
          <div className="reception-panel-head">
            <h2>Quick Actions</h2>
            <Sparkles size={18} />
          </div>
          <div className="action-list">
            <button className="action-row" onClick={() => handleAction('Reserve Equipment')}>
              <CalendarClock size={20} />
              <span>Reserve Equipment</span>
            </button>
            <button className="action-row" onClick={() => handleAction('Mark Sanitized')}>
              <CheckCircle2 size={20} />
              <span>Mark Sanitized</span>
            </button>
            <button className="action-row" onClick={() => handleAction('Report Fault')}>
              <Wrench size={20} />
              <span>Report Fault</span>
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
              <span>Only reserve equipment for checked-in members.</span>
            </li>
            <li>
              <CheckCircle2 size={16} />
              <span>Blocked equipment should not be promised to guests.</span>
            </li>
          </ul>
        </section>
      </div>

      <section className="reception-table-card">
        <div className="reception-table-head">
          <h2>Equipment Desk View</h2>
          <button>Export</button>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table>
            <thead>
              <tr>
                <th>Unit</th>
                <th>Zone</th>
                <th>State</th>
                <th>Booking</th>
                <th>Note</th>
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
