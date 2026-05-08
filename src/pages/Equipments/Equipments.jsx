import { Dumbbell, CalendarClock, CheckCircle2, Wrench, Sparkles, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const initialRows = [
  { unit: 'Treadmill T-04', zone: 'Cardio', state: 'Available', booking: 'Open', status: 'Cleaned 09:10' },
  { unit: 'Cable Station C-02', zone: 'Strength', state: 'Reserved', booking: 'PT 11:00', status: 'Coach Omar' },
  { unit: 'Spin Bike S-18', zone: 'Studio', state: 'Maintenance', booking: 'Blocked', status: 'Pedal check' },
  { unit: 'Recovery Boots R-03', zone: 'Recovery', state: 'Available', booking: 'Open', status: 'Sanitized' },
];

export function Equipments({ receptionist }) {
  const [rows, setRows] = useState(initialRows);
  const [activeAction, setActiveAction] = useState('Ready');
  const [page, setPage] = useState(1);

  const handleAction = (label) => {
    setActiveAction(label);
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRow = { 
      unit: `Desk Request ${rows.length + 1}`, 
      zone: 'Reception', 
      state: label.includes('Fault') ? 'Maintenance' : 'Reserved', 
      booking: stamp, 
      status: label 
    };
    setRows([newRow, ...rows]);
  };

  return (
    <section className="reception-page">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="reception-hero"
      >
        <div>
          <span className="reception-kicker">Reception Operations</span>
          <h1>Equipments</h1>
          <p>Availability and booking status for equipment members ask about at reception.</p>
        </div>
        <div className="reception-hero-badge">
          <Dumbbell size={28} />
          <span>{receptionist?.name || 'Receptionist'}</span>
        </div>
      </motion.div>

      <div className="reception-stats">
        {[
          { label: 'Available Units', value: '86', sub: 'Across all zones' },
          { label: 'Reserved', value: '14', sub: 'Next 2 hours' },
          { label: 'Blocked', value: '5', sub: 'Maintenance hold' }
        ].map((stat, i) => (
          <motion.article 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="reception-stat"
          >
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.sub}</small>
          </motion.article>
        ))}
      </div>

      <div className="reception-grid">
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="reception-panel"
        >
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
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="reception-panel"
        >
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
        </motion.section>
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="table-card"
      >
        <div className="table-header">
          <h3>EQUIPMENT DESK VIEW</h3>
          <div className="table-actions">
            <button className="btn-secondary-sm">Export CSV</button>
            <button className="btn-secondary-sm">Status Key</button>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="whitespace-nowrap">UNIT</th>
                <th className="whitespace-nowrap">ZONE</th>
                <th className="whitespace-nowrap">STATE</th>
                <th className="whitespace-nowrap">BOOKING</th>
                <th className="whitespace-nowrap" style={{ textAlign: 'right' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap"><span className="text-bold">{row.unit}</span></td>
                  <td className="whitespace-nowrap"><span className="plan-pill">{row.zone}</span></td>
                  <td className="whitespace-nowrap"><span className="text-subtitle">{row.state}</span></td>
                  <td className="whitespace-nowrap"><span className="text-subtitle">{row.booking}</span></td>
                  <td className="whitespace-nowrap" style={{ textAlign: 'right' }}>
                    <span className={`status-text ${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>{rows.length} units tracked at desk</span>
          <div className="pagination">
            <button className="page-btn" onClick={() => setPage(Math.max(1, page - 1))}><ChevronLeft size={16} /></button>
            <button className={`page-btn ${page === 1 ? 'active' : ''}`} onClick={() => setPage(1)}>1</button>
            <button className={`page-btn ${page === 2 ? 'active' : ''}`} onClick={() => setPage(2)}>2</button>
            <button className="page-btn" onClick={() => setPage(page + 1)}><ChevronRight size={16} /></button>
          </div>
        </div>
      </motion.section>
    </section>
  );
}

