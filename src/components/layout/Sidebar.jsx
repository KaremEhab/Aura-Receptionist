import React, { useState } from 'react';
import { Home, Dumbbell, User, Users, DollarSign, Server, BookOpen, HelpCircle, LogOut, X, ChevronRight, ChevronDown, Zap, Monitor } from 'lucide-react';
import { isTauri } from '../../lib/tauri';
import './Sidebar.css';


export function Sidebar({ isOpen, onClose, currentPage, onNavigate, branding }) {
  const [showPalette, setShowPalette] = useState(true);
  const [openGroups, setOpenGroups] = useState({
    dashboard: true,
    financials: true,
  });

  const navItems = [
    {
      id: 'dashboard',
      icon: Home,
      label: 'DASHBOARD',
      children: [
        { label: 'Operator brief', section: 'top' },
        { label: 'Live attendance log', section: 'live-attendance-log' },
        { label: 'Pending checkins', section: 'pending-checkins' },
      ],
    },
    { id: 'gyms', icon: Dumbbell, label: 'GYMS' },
    {
      id: 'trainees',
      icon: Users,
      label: 'TRAINEES',
      children: [
        { label: 'Overview', section: 'trainees-overview' },
        { label: 'Engagement', section: 'trainees-engagement' },
        { label: 'Lifecycle', section: 'trainees-lifecycle' },
        { label: 'Directory', section: 'trainees-directory' },
      ],
    },
    {
      id: 'workflow',
      icon: Zap,
      label: 'WORKFLOWS',
      children: [
        { label: 'Automation cockpit', section: 'workflow-overview' },
        { label: 'Workflow table', section: 'workflow-table' },
      ],
    },
    {
      id: 'support',
      icon: HelpCircle,
      label: 'SUPPORT',
      children: [
        { label: 'Overview', section: 'support-overview' },
        { label: 'SLA', section: 'support-sla' },
        { label: 'Queues', section: 'support-queues' },
        { label: 'Tickets', section: 'support-tickets' },
        { label: 'Broadcasts', section: 'support-broadcasts' },
      ],
    },
  ];

  const scrollToSection = (section) => {
    const target = section === 'top' ? document.querySelector('.main-content') : document.getElementById(section);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNavigate = (pageId, section) => {
    onNavigate(pageId);
    // When navigating to a new page, collapse other groups and only keep the current one open
    setOpenGroups({ [pageId]: true });
    
    if (section) {
      window.setTimeout(() => scrollToSection(section), currentPage === pageId ? 0 : 120);
    }
    onClose?.();
  };

  const toggleGroup = (id) => {
    setOpenGroups((prev) => {
      const isCurrentlyOpen = prev[id];
      // If closing, return empty object. If opening, set only this ID to true.
      return isCurrentlyOpen ? {} : { [id]: true };
    });
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo" onClick={() => handleNavigate('dashboard')} style={{ cursor: 'pointer' }}>
        <div className="logo-brand">
          {branding.logo ? (
            <img src={branding.logo} alt="Logo" />
          ) : (
            <div className="logo-icon-svg" />
          )}
          <span className="logo-text" style={{ color: 'var(--primary)' }}>{branding.name}</span>
        </div>

        <button className="close-sidebar-btn" onClick={(e) => { e.stopPropagation(); onClose?.(); }}>
          <X size={16} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpenGroup = !!openGroups[item.id];
            return (
            <li key={item.id} className={`${currentPage === item.id ? 'active' : ''} ${hasChildren ? 'has-children' : ''}`}>
              <div className="nav-btn-row">
                <button 
                  className="nav-btn"
                  onClick={() => handleNavigate(item.id)}
                >
                  <item.icon size={15} />
                  <span>{item.label}</span>
                </button>
                {hasChildren && (
                  <button className="nav-tree-toggle" onClick={() => toggleGroup(item.id)} aria-label={`Toggle ${item.label} sections`}>
                    {isOpenGroup ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                )}
              </div>
              {hasChildren && isOpenGroup && (
                <div className="nav-children">
                  {item.children.map((child) => (
                    <button
                      key={`${item.id}-${child.section}`}
                      className="nav-child-btn"
                      onClick={() => handleNavigate(item.id, child.section)}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          );})}
        </ul>
      </nav>

      <div className="sidebar-bottom">
        {showPalette && (
          <div className="command-palette">
            <button className="close-palette" onClick={() => setShowPalette(false)} aria-label="Dismiss">
              <X size={16} />
            </button>
            <p className="palette-title">COMMAND PALETTE</p>
            <p className="palette-desc">Press <kbd>⌘ K</kbd> for new gym check-in or gym creation.</p>
          </div>
        )}

        <div 
          className={`user-profile ${currentPage === 'settings' ? 'active-profile' : ''}`}
          onClick={() => handleNavigate('settings')}
        >
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop" alt="User" />
          <div className="user-info">
            <h4>KAREEM EHAB</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('settings'); }}>Manage profile</a>
          </div>
          <ChevronRight size={16} className="arrow" />
        </div>

        <button className="sign-out">
          <LogOut size={16} />
          <span>SIGN OUT</span>
        </button>
        <div className="logo-brand">
          {branding.logo ? (
            <img src={branding.logo} width={16} height={16} alt="Logo" />
          ) : (
            <div className="logo-icon-svg" />
          )}
          <span className="logo-text" style={{ color: 'var(--primary)', fontSize: '12px'}}>{branding.name}</span>
        </div>
      </div>
    </aside>
  );
}
