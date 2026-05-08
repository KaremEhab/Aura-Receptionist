import React from 'react';
import { X, CheckCircle, AlertTriangle, Info, CreditCard, Users, Server, Bell } from 'lucide-react';
import './NotificationPanel.css';

const notifications = [
  { id: 1, type: 'alert', icon: <AlertTriangle size={16} />, title: 'Payment gateway latency spike', desc: 'Payment Engine experiencing 156ms latency — investigating.', time: '12 min ago', read: false },
  { id: 2, type: 'success', icon: <CheckCircle size={16} />, title: 'Payout completed', desc: 'Apex Performance Hub — $42,800.00 via Bank Transfer.', time: '1 hr ago', read: false },
  { id: 3, type: 'info', icon: <Users size={16} />, title: 'New Direct Subscriber batch', desc: '86 new Aura Direct signups processed today.', time: '2 hr ago', read: false },
  { id: 4, type: 'info', icon: <Server size={16} />, title: 'Scheduled maintenance', desc: 'Analytics DB migration planned for tonight 02:00 UTC.', time: '3 hr ago', read: true },
  { id: 5, type: 'success', icon: <CreditCard size={16} />, title: 'Revenue milestone', desc: 'Aura Direct Subscriptions crossed $1M monthly revenue.', time: '6 hr ago', read: true },
  { id: 6, type: 'alert', icon: <AlertTriangle size={16} />, title: 'CDN cache invalidation delay', desc: 'Media CDN experienced brief cache delay — resolved.', time: '8 hr ago', read: true },
  { id: 7, type: 'info', icon: <Users size={16} />, title: 'Trainer verification pending', desc: 'Sarah Jenkins (PT-3304) awaiting certification review.', time: '1 day ago', read: true },
];

export function NotificationPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="notif-overlay" onClick={onClose} />
      <div className="notif-panel">
        <div className="notif-header">
          <div className="notif-header-left">
            <h3>Notifications</h3>
            {unreadCount > 0 && <span className="unread-badge">{unreadCount} new</span>}
          </div>
          <button className="notif-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="notif-actions-bar">
          <button className="notif-tab active">All</button>
          <button className="notif-tab">Unread</button>
          <button className="notif-mark-read">Mark all read</button>
        </div>

        <div className="notif-list">
          {notifications.map(notif => (
            <div key={notif.id} className={`notif-item ${notif.read ? 'read' : 'unread'}`}>
              <div className={`notif-icon-wrap ${notif.type}`}>
                {notif.icon}
              </div>
              <div className="notif-content">
                <h4 className="notif-title">{notif.title}</h4>
                <p className="notif-desc">{notif.desc}</p>
                <span className="notif-time">{notif.time}</span>
              </div>
              {!notif.read && <div className="unread-dot" />}
            </div>
          ))}
        </div>

        <div className="notif-footer">
          <button className="notif-view-all">View All Notifications</button>
        </div>
      </div>
    </>
  );
}
