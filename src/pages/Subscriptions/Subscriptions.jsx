import { CreditCard, ReceiptText, Bell, FileText, Sparkles, MapPin, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const initialRows = [
  { member: 'Laila Mahmoud', plan: 'Premium Monthly', due: 'Today 18:00', amount: 'EGP 1,490', status: 'Collect' },
  { member: 'Omar Farouk', plan: 'Standard Quarterly', due: 'Tomorrow', amount: 'EGP 3,600', status: 'Reminder sent' },
  { member: 'Nina Patel', plan: 'PT Add-on', due: 'May 10', amount: 'EGP 850', status: 'Pending card' },
  { member: 'Jordan Smyth', plan: 'Platinum Annual', due: 'May 12', amount: 'EGP 18,500', status: 'Prepaid' },
];

export function Subscriptions({ receptionist }) {
  const [rows, setRows] = useState(initialRows);
  const [activeAction, setActiveAction] = useState('Ready');
  const [page, setPage] = useState(1);

  const handleAction = (label) => {
    setActiveAction(label);
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRow = { 
      member: `Walk-in Member ${rows.length + 1}`, 
      plan: 'Premium Monthly', 
      due: `Today ${stamp}`, 
      amount: 'EGP 1,490', 
      status: label.includes('Reminder') ? 'Reminder sent' : 'Collect' 
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
          <h1>Subscriptions</h1>
          <p>Payments, renewals, expiring plans, and front-desk collection tasks.</p>
        </div>
        <div className="reception-hero-badge">
          <CreditCard size={28} />
          <span>{receptionist?.name || 'Receptionist'}</span>
        </div>
      </motion.div>

      <div className="reception-stats">
        {[
          { label: 'Due Today', value: '18', sub: 'EGP 42.8K collectible' },
          { label: 'Renewal Calls', value: '9', sub: 'Before 6 PM' },
          { label: 'Failed Cards', value: '4', sub: 'Needs member action' }
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
              <span>Verify member identity before collecting payment.</span>
            </li>
            <li>
              <CheckCircle2 size={16} />
              <span>Print receipt after any cash or Fawry transaction.</span>
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
          <h3>RECEPTION PAYMENT QUEUE</h3>
          <div className="table-actions">
            <button className="btn-secondary-sm">Export CSV</button>
            <button className="btn-secondary-sm">Refresh List</button>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="whitespace-nowrap">MEMBER</th>
                <th className="whitespace-nowrap">PLAN</th>
                <th className="whitespace-nowrap">DUE</th>
                <th className="whitespace-nowrap">AMOUNT</th>
                <th className="whitespace-nowrap" style={{ textAlign: 'right' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap"><span className="text-bold">{row.member}</span></td>
                  <td className="whitespace-nowrap"><span className="plan-pill">{row.plan}</span></td>
                  <td className="whitespace-nowrap"><span className="text-subtitle">{row.due}</span></td>
                  <td className="whitespace-nowrap"><span className="text-bold">{row.amount}</span></td>
                  <td className="whitespace-nowrap" style={{ textAlign: 'right' }}>
                    <span className={`status-text ${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing {rows.length} active payment tasks</span>
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

