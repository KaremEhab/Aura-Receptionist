import { Wrench, ClipboardList, AlertTriangle, Phone, Sparkles, MapPin, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const initialRows = [
  { issue: 'Main gate scanner', area: 'Reception', priority: 'High', eta: '35 min', status: 'Facilities' },
  { issue: 'Locker room AC', area: 'Women lockers', priority: 'Medium', eta: 'Today 16:00', status: 'Vendor' },
  { issue: 'POS printer paper', area: 'Front desk', priority: 'Low', eta: 'Stocked', status: 'Reception' },
  { issue: 'Studio 2 lights', area: 'Group class', priority: 'Medium', eta: 'Tomorrow', status: 'Electrician' },
];

export function Maintenance({ receptionist }) {
  const [rows, setRows] = useState(initialRows);
  const [activeAction, setActiveAction] = useState('Ready');
  const [page, setPage] = useState(1);

  const handleAction = (label) => {
    setActiveAction(label);
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRow = { 
      issue: label, 
      area: 'Reception', 
      priority: label.includes('Safety') ? 'High' : 'Medium', 
      eta: 'Logged now', 
      status: receptionist?.name || 'Reception' 
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
          <h1>Maintenance</h1>
          <p>Track facility issues that affect check-ins, member safety, or class readiness.</p>
        </div>
        <div className="reception-hero-badge">
          <Wrench size={28} />
          <span>{receptionist?.name || 'Receptionist'}</span>
        </div>
      </motion.div>

      <div className="reception-stats">
        {[
          { label: 'Open Tickets', value: '7', sub: '2 reception-critical' },
          { label: 'Vendor Visits', value: '3', sub: 'Expected today' },
          { label: 'Resolved', value: '12', sub: 'This week' }
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
              <span>Reception-critical issues must be escalated immediately.</span>
            </li>
            <li>
              <CheckCircle2 size={16} />
              <span>Keep members away from blocked areas until cleared.</span>
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
          <h3>FACILITY SERVICE BOARD</h3>
          <div className="table-actions">
            <button className="btn-secondary-sm">Export CSV</button>
            <button className="btn-secondary-sm">Refresh</button>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="whitespace-nowrap">ISSUE</th>
                <th className="whitespace-nowrap">AREA</th>
                <th className="whitespace-nowrap">PRIORITY</th>
                <th className="whitespace-nowrap">ETA</th>
                <th className="whitespace-nowrap" style={{ textAlign: 'right' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap"><span className="text-bold">{row.issue}</span></td>
                  <td className="whitespace-nowrap"><span className="plan-pill">{row.area}</span></td>
                  <td className="whitespace-nowrap"><span className="text-subtitle">{row.priority}</span></td>
                  <td className="whitespace-nowrap"><span className="text-subtitle">{row.eta}</span></td>
                  <td className="whitespace-nowrap" style={{ textAlign: 'right' }}>
                    <span className={`status-text ${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>{rows.length} open maintenance tickets</span>
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

