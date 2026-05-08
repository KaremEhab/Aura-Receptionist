import { useState } from 'react';
import { Search, UserPlus, Scan, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import './Dashboard.css';

export function Dashboard({ shiftData, onNavigate, onAction }) {
  const [attendancePage, setAttendancePage] = useState(1);
  const [queuePage, setQueuePage] = useState(1);
  const [memberQuery, setMemberQuery] = useState('');
  const stats = shiftData?.stats || [
    { label: 'SHIFT CHECK-INS', value: '142', subValue: '+12%', type: 'success' },
    { label: 'NEW SALES', value: '12', subValue: 'Goal: 15', type: 'info' },
    { label: 'SHIFT REVENUE', value: '8,400', subValue: 'EGP', type: 'warning' },
  ];

  const trainers = [
    { name: 'Coach Omar', status: 'IN SESSION', statusColor: 'warning', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop' },
    { name: 'Coach Laila', status: 'AVAILABLE', statusColor: 'success', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop' },
  ];

  const expiryWatch = [
    { name: 'Laila Mahmoud', time: 'EXPIRES IN 4 HOURS' },
    { name: 'Jenny Wilson', time: 'EXPIRES IN 18 HOURS' },
  ];

  const attendanceLog = shiftData?.attendanceLog || [
    { time: '09:42:18 AM', exitTime: '', member: 'Kareem Ehab', plan: 'ELITE', address: 'Agami, Alexandria', status: 'AUTHORIZED' },
    { time: '09:42:18 AM', exitTime: '11:52:31 AM', member: 'Laila Mahmoud', plan: 'PREMIUM', address: 'Zamalek, Cairo', status: 'EXPIRED' },
    { time: '06:30:05 AM', exitTime: '07:55:40 AM', member: 'Omar Farouk', plan: 'STANDARD', address: 'Heliopolis, Cairo', status: 'AUTHORIZED' },
  ];

  const pendingCheckins = shiftData?.pendingCheckins || [
    { member: 'Jordan Smyth', plan: 'Platinum Member', slot: '10:00 - 11:00', startsIn: 'Starts in 5m', type: 'PT: STRENGTH' },
    { member: 'Nina Patel', plan: 'Standard Member', slot: '14:30 - 15:30', startsIn: 'In 3h 35m', type: 'GROUP: SPINNING' },
  ];

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Dashboard
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Real-time health and revenue monitoring for AURA.FIT. global infrastructure.
        </motion.p>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-main-col">
          <motion.div
            id="operator-brief"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card checkin-card"
          >
            <div className="checkin-top">
              <div className="search-input-group">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search trainees by ID or name..."
                  value={memberQuery}
                  onChange={(event) => setMemberQuery(event.target.value)}
                />
              </div>
              <button className="checkin-btn" onClick={() => onAction?.('check-in')}>
                <UserPlus size={20} />
                <span>CHECK-IN</span>
              </button>
            </div>
            
            <div className="scan-divider">
              <span>or scan membership card</span>
            </div>

            <div className="member-status-preview">
              <div className="member-info-card">
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop" alt="Marcus Holloway" />
                <div className="info">
                  <h3>Marcus Holloway</h3>
                  <p><span className="plan-tag">Elite Plan</span> • Member since 2022</p>
                </div>
                <div className="status-badge">
                  <span className="label">STATUS</span>
                  <span className="value authorized">AUTHORIZED</span>
                </div>
              </div>
              <button className="scan-icon-btn" onClick={() => onAction?.('scan')} title="Scan membership card">
                <Scan size={32} />
              </button>
            </div>
            <button className="safe-checkout-btn" onClick={() => onAction?.('trainee-checkout')}>
              <Scan size={18} />
              <span>Scan Trainee QR / Barcode To Check Out</span>
            </button>
          </motion.div>

          <div className="stats-row">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="stat-card"
              >
                <span className="stat-label">{stat.label}</span>
                <div className="stat-value-group">
                  <span className="stat-value">{stat.value}</span>
                  <span className={`stat-subvalue ${stat.type}`}>{stat.subValue}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="dashboard-side-col">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card side-card"
          >
            <div className="card-header">
              <h3>TRAINER FLOOR VIEW</h3>
              <span className="on-duty-badge">8 ON DUTY</span>
            </div>
            <div className="trainer-list">
              {trainers.map(trainer => (
                <div key={trainer.name} className="trainer-item">
                  <div className="trainer-info">
                    <img src={trainer.avatar} alt={trainer.name} className="avatar-placeholder" />
                    <span className="text-bold" style={{ fontSize: '13px' }}>{trainer.name}</span>
                  </div>
                  <span className={`status-pill ${trainer.statusColor}`}>{trainer.status}</span>
                </div>
              ))}
            </div>
            <button
              className="outline-btn-sm full-width"
              onClick={() => onNavigate?.('equipments')}
              style={{ marginTop: '16px', width: '100%', borderColor: 'var(--primary-border)', color: 'var(--primary)' }}
            >
              Full Floor Calendar
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card side-card"
            style={{ marginTop: '24px' }}
          >
            <div className="card-header">
              <h3>EXPIRY WATCH (24H)</h3>
            </div>
            <div className="expiry-list">
              {expiryWatch.map(member => (
                <div key={member.name} className="expiry-item">
                  <div className="expiry-info">
                    <h4>{member.name}</h4>
                    <p>{member.time}</p>
                  </div>
                  <button
                    className="page-btn"
                    onClick={() => onNavigate?.('support')}
                    style={{ border: 'none', background: 'none', color: 'var(--primary)' }}
                    title={`Call ${member.name}`}
                  >
                    <Phone size={16} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card table-card"
        id="live-attendance-log"
      >
        <div className="table-header">
          <h3>LIVE ATTENDANCE LOG</h3>
          <div className="table-actions">
            <button className="btn-secondary-sm" onClick={() => exportRows('attendance-log.csv', attendanceLog)}>Export CSV</button>
            <button className="btn-secondary-sm" onClick={() => onNavigate?.('subscriptions')}>View Full Registry</button>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="whitespace-nowrap">TIME</th>
                <th className="whitespace-nowrap">MEMBER</th>
                <th className="whitespace-nowrap">PLAN</th>
                <th className="whitespace-nowrap">ADDRESS</th>
                <th className="whitespace-nowrap" style={{ textAlign: 'right' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLog.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-shift-cell">No check-ins recorded for this shift yet.</td>
                </tr>
              )}
              {attendanceLog.map((log, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap">
                    <span className="time-primary">{log.time}</span>
                    {log.exitTime && <span className="time-secondary"> - {log.exitTime}</span>}
                  </td>
                  <td className="whitespace-nowrap"><span className="text-bold">{log.member}</span></td>
                  <td className="whitespace-nowrap"><span className="plan-pill">{log.plan}</span></td>
                  <td className="whitespace-nowrap"><span className="text-subtitle" style={{ fontSize: '13px' }}>{log.address}</span></td>
                  <td className="whitespace-nowrap" style={{ textAlign: 'right' }}>
                    <span className={`status-text ${log.status.toLowerCase()}`}>{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>{attendanceLog.length ? 'Showing 1 to 8 of 1,248 visits' : 'Clean shift: 0 visits recorded'}</span>
          <div className="pagination">
            <button className="page-btn" onClick={() => setAttendancePage(Math.max(1, attendancePage - 1))}><ChevronLeft size={16} /></button>
            <button className={`page-btn ${attendancePage === 1 ? 'active' : ''}`} onClick={() => setAttendancePage(1)}>1</button>
            <button className={`page-btn ${attendancePage === 2 ? 'active' : ''}`} onClick={() => setAttendancePage(2)}>2</button>
            <button className={`page-btn ${attendancePage === 3 ? 'active' : ''}`} onClick={() => setAttendancePage(3)}>3</button>
            <span>...</span>
            <button className={`page-btn ${attendancePage === 52 ? 'active' : ''}`} onClick={() => setAttendancePage(52)}>52</button>
            <button className="page-btn" onClick={() => setAttendancePage(Math.min(52, attendancePage + 1))}><ChevronRight size={16} /></button>
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card table-card"
        id="pending-checkins"
      >
        <div className="table-header">
          <h3>PENDING CHECK-INS</h3>
          <div className="table-actions">
            <button
              className="btn-secondary-sm"
              onClick={() => onNavigate?.('support')}
              style={{ border: 'none', color: 'var(--primary)', textTransform: 'uppercase' }}
            >
              View All Queue
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="whitespace-nowrap">MEMBER</th>
                <th className="whitespace-nowrap">SCHEDULED SLOT</th>
                <th className="whitespace-nowrap" style={{ textAlign: 'right' }}>SESSION TYPE</th>
              </tr>
            </thead>
            <tbody>
              {pendingCheckins.length === 0 && (
                <tr>
                  <td colSpan="3" className="empty-shift-cell">No pending check-ins for this shift.</td>
                </tr>
              )}
              {pendingCheckins.map((item, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="avatar-placeholder" style={{ width: '32px', height: '32px' }} />
                    <div>
                      <div className="text-bold">{item.member}</div>
                      <div className="text-subtitle" style={{ fontSize: '11px' }}>{item.plan}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="text-bold">{item.slot}</div>
                    <div className="text-primary" style={{ fontSize: '11px', fontWeight: '600' }}>{item.startsIn}</div>
                  </td>
                  <td className="whitespace-nowrap" style={{ textAlign: 'right' }}>
                    <span className="plan-pill" style={{ background: 'var(--formfield)', color: 'var(--subtitle)', borderColor: 'var(--stroke)' }}>{item.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>{pendingCheckins.length ? 'Showing 1 to 8 of 1,248 queue items' : 'Clean shift: 0 queued members'}</span>
          <div className="pagination">
            <button className="page-btn" onClick={() => setQueuePage(Math.max(1, queuePage - 1))}><ChevronLeft size={16} /></button>
            <button className={`page-btn ${queuePage === 1 ? 'active' : ''}`} onClick={() => setQueuePage(1)}>1</button>
            <button className={`page-btn ${queuePage === 2 ? 'active' : ''}`} onClick={() => setQueuePage(2)}>2</button>
            <button className={`page-btn ${queuePage === 3 ? 'active' : ''}`} onClick={() => setQueuePage(3)}>3</button>
            <span>...</span>
            <button className={`page-btn ${queuePage === 52 ? 'active' : ''}`} onClick={() => setQueuePage(52)}>52</button>
            <button className="page-btn" onClick={() => setQueuePage(Math.min(52, queuePage + 1))}><ChevronRight size={16} /></button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function exportRows(filename, rows) {
  const body = rows.length
    ? rows.map((row) => Object.values(row).join(',')).join('\n')
    : 'No shift data';
  const blob = new Blob([body], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
