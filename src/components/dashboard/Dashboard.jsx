import React from 'react';
import { Search, UserPlus, Scan, ChevronLeft, ChevronRight, FileDown, ExternalLink, MoreVertical, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import './Dashboard.css';

export function Dashboard() {
  const stats = [
    { label: 'SHIFT CHECK-INS', value: '142', subValue: '+12%', type: 'success' },
    { label: 'NEW SALES', value: '12', subValue: 'Goal: 15', type: 'info' },
    { label: 'SHIFT REVENUE', value: '8,400', subValue: 'EGP', type: 'warning' },
  ];

  const trainers = [
    { name: 'Coach Omar', status: 'IN SESSION', statusColor: 'warning' },
    { name: 'Coach Laila', status: 'AVAILABLE', statusColor: 'success' },
  ];

  const expiryWatch = [
    { name: 'Laila Mahmoud', time: 'EXPIRES IN 4 HOURS' },
    { name: 'Jenny Wilson', time: 'EXPIRES IN 16 HOURS' },
  ];

  const attendanceLog = [
    { time: '09:42:18 AM', exitTime: '-', member: 'Kareem Ehab', plan: 'ELITE', address: 'Agami, Alexandria', status: 'AUTHORIZED' },
    { time: '09:42:18 AM', exitTime: '11:52:31 AM', member: 'Laila Mahmoud', plan: 'PREMIUM', address: 'Zamalek, Cairo', status: 'EXPIRED' },
    { time: '06:30:05 AM', exitTime: '07:55:40 AM', member: 'Omar Farouk', plan: 'STANDARD', address: 'Heliopolis, Cairo', status: 'AUTHORIZED' },
  ];

  const pendingCheckins = [
    { member: 'Jordan Smyth', plan: 'Platinum Member', slot: '10:00 - 11:00', startsIn: 'Starts in 5m', type: 'PT: STRENGTH' },
    { member: 'Nina Patel', plan: 'Standard Member', slot: '14:30 - 15:30', startsIn: 'In 3h 35m', type: 'GROUP: SPINNING' },
  ];

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <h1 className="text-title">Dashboard</h1>
        <p className="text-subtitle">Real-time health and revenue monitoring for AURA.FIT. global infrastructure.</p>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-main-col">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card checkin-card"
          >
            <div className="checkin-top">
              <div className="search-input-group">
                <Search size={20} className="search-icon" />
                <input type="text" placeholder="Search trainees by ID or name..." />
              </div>
              <button className="checkin-btn">
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
              <button className="scan-icon-btn">
                <Scan size={36} />
              </button>
            </div>
          </motion.div>

          <div className="stats-row">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
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
          <div className="card side-card">
            <div className="card-header">
              <h3>TRAINER FLOOR VIEW</h3>
              <span className="on-duty-badge">8 ON DUTY</span>
            </div>
            <div className="trainer-list">
              {trainers.map(trainer => (
                <div key={trainer.name} className="trainer-item">
                  <div className="trainer-info">
                    <div className="avatar-placeholder" />
                    <span>{trainer.name}</span>
                  </div>
                  <span className={`status-pill ${trainer.statusColor}`}>{trainer.status}</span>
                </div>
              ))}
            </div>
            <button className="outline-btn full-width mt-4" style={{ border: '1px solid var(--primary-border)', color: 'var(--primary)' }}>Full Floor Calendar</button>
          </div>

          <div className="card side-card mt-4">
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
                  <button className="icon-btn-sm" style={{ color: 'var(--primary)' }}><Phone size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="card table-card">
        <div className="table-header">
          <h3>LIVE ATTENDANCE LOG</h3>
          <div className="table-actions">
            <button className="outline-btn-sm">Export CSV</button>
            <button className="outline-btn-sm">View Full Registry</button>
          </div>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>TIME</th>
                <th>MEMBER</th>
                <th>PLAN</th>
                <th>ADDRESS</th>
                <th className="text-right">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLog.map((log, i) => (
                <tr key={i}>
                  <td>
                    <span className="time-primary">{log.time}</span>
                    <span className="time-secondary"> - {log.exitTime}</span>
                  </td>
                  <td><span className="text-bold">{log.member}</span></td>
                  <td><span className="plan-pill">{log.plan}</span></td>
                  <td><span className="text-muted">{log.address}</span></td>
                  <td className="text-right">
                    <span className={`status-text ${log.status.toLowerCase()}`}>{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing 1 to 8 of 1,248 videos</span>
          <div className="pagination">
            <button className="page-btn"><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span>...</span>
            <button className="page-btn">52</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="card table-card">
        <div className="table-header">
          <h3>PENDING CHECK-INS</h3>
          <button className="link-btn">VIEW ALL QUEUE</button>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>MEMBER</th>
                <th>SCHEDULED SLOT</th>
                <th className="text-right">SESSION TYPE</th>
              </tr>
            </thead>
            <tbody>
              {pendingCheckins.map((item, i) => (
                <tr key={i}>
                  <td className="member-cell">
                    <div className="avatar-placeholder-sm" />
                    <div className="info">
                      <span className="text-bold">{item.member}</span>
                      <span className="text-muted text-xs">{item.plan}</span>
                    </div>
                  </td>
                  <td>
                    <div className="info">
                      <span className="text-bold">{item.slot}</span>
                      <span className="text-success text-xs">{item.startsIn}</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <span className="type-pill">{item.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing 1 to 8 of 1,248 videos</span>
          <div className="pagination">
            <button className="page-btn"><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span>...</span>
            <button className="page-btn">52</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}
