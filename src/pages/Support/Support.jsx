import { Headphones, Mail, UserCog, Sparkles, MapPin, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const initialRows = [
  { member: 'Mariam Samy', request: 'Freeze membership for travel', channel: 'Front desk', sla: '12 min', status: 'Open' },
  { member: 'Ahmed Nader', request: 'Card replacement', channel: 'Phone', sla: '8 min', status: 'Waiting ID' },
  { member: 'Sara Adel', request: 'Class booking conflict', channel: 'WhatsApp', sla: '22 min', status: 'Escalated' },
  { member: 'Hana Youssef', request: 'Invoice resend', channel: 'Email', sla: 'Done', status: 'Closed' },
];

export function Support({ receptionist }) {
  const [rows, setRows] = useState(initialRows);
  const [activeAction, setActiveAction] = useState('Ready');
  const [page, setPage] = useState(1);

  const handleAction = (label) => {
    setActiveAction(label);
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRow = { 
      member: `Guest ${rows.length + 1}`, 
      request: label, 
      channel: 'Front desk', 
      sla: 'Just now', 
      status: label.includes('Escalate') ? 'Escalated' : 'Open' 
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
          <h1>Support</h1>
          <p>Member requests, walk-ins, calls, and escalations handled by reception.</p>
        </div>
        <div className="reception-hero-badge">
          <Headphones size={28} />
          <span>{receptionist?.name || 'Receptionist'}</span>
        </div>
      </motion.div>

      <div className="reception-stats">
        {[
          { label: 'Open Requests', value: '11', sub: '4 waiting member reply' },
          { label: 'Avg SLA', value: '16m', sub: 'Front desk queue' },
          { label: 'Escalated', value: '2', sub: 'Manager needed' }
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
              <span>Keep private member data off printed notes.</span>
            </li>
            <li>
              <CheckCircle2 size={16} />
              <span>Escalate billing disputes before adjusting balances.</span>
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
          <h3>RECEPTION SUPPORT QUEUE</h3>
          <div className="table-actions">
            <button className="btn-secondary-sm">Export CSV</button>
            <button className="btn-secondary-sm">Queue Logic</button>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="whitespace-nowrap">MEMBER / GUEST</th>
                <th className="whitespace-nowrap">REQUEST</th>
                <th className="whitespace-nowrap">CHANNEL</th>
                <th className="whitespace-nowrap">SLA</th>
                <th className="whitespace-nowrap" style={{ textAlign: 'right' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap"><span className="text-bold">{row.member}</span></td>
                  <td className="whitespace-nowrap"><span className="plan-pill">{row.request}</span></td>
                  <td className="whitespace-nowrap"><span className="text-subtitle">{row.channel}</span></td>
                  <td className="whitespace-nowrap"><span className="text-subtitle">{row.sla}</span></td>
                  <td className="whitespace-nowrap" style={{ textAlign: 'right' }}>
                    <span className={`status-text ${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>{rows.length} pending support requests</span>
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

