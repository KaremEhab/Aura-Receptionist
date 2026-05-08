import { useState } from 'react';
import { Home, Dumbbell, CreditCard, HelpCircle, LogOut, ChevronRight, ChevronDown, Zap, Users, ScanLine } from 'lucide-react';
import './Sidebar.css';


export function Sidebar({ isOpen, onClose, currentPage, onNavigate, branding, receptionist, onEndShift }) {
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
    { id: 'subscriptions', icon: CreditCard, label: 'SUBSCRIPTIONS' },
    { id: 'maintenance', icon: Zap, label: 'MAINTENANCE' },
    { id: 'equipments', icon: Dumbbell, label: 'EQUIPMENTS' },
    { id: 'trainers', icon: Users, label: 'PERSONAL TRAINERS' },
    { id: 'support', icon: HelpCircle, label: 'SUPPORT' },
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

  const [showEndShiftOptions, setShowEndShiftOptions] = useState(false);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header-profile" onClick={() => handleNavigate('dashboard')}>
        <div className="brand-container">
          <div className="logo-box">
            {branding.logo ? (
              <img src={branding.logo} alt="Logo" />
            ) : (
              <div className="logo-icon-svg" />
            )}
          </div>
          <div className="brand-info">
            <h2 className="brand-name">Caesars</h2>
            <p className="brand-meta">
              <span className="plan-text">{branding.plan}</span>
              <span className="divider">•</span>
              <span className="since-text">Since {branding.memberSince}</span>
            </p>
          </div>
        </div>
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
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </button>
                  {hasChildren && (
                    <button className="nav-tree-toggle" onClick={() => toggleGroup(item.id)}>
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
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div 
          className={`user-profile-card ${currentPage === 'settings' ? 'active' : ''}`}
          onClick={() => handleNavigate('settings')}
        >
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop" alt="User" />
          <div className="user-details">
            <h4>{receptionist?.name || 'Receptionist'}</h4>
            <span className="manage-link">{receptionist?.role || 'Manage profile'}</span>
          </div>
          <ChevronRight size={16} className="arrow" />
        </div>

        <div className="end-shift-container">
          {!showEndShiftOptions ? (
            <button className="end-shift-btn" onClick={() => setShowEndShiftOptions(true)}>
              <LogOut size={18} />
              <span>END SHIFT</span>
            </button>
          ) : (
            <div className="end-shift-options">
              <button className="auth-option-btn scan" onClick={() => { onEndShift('scan'); setShowEndShiftOptions(false); }}>
                <ScanLine size={16} />
                <span>Scan Card</span>
              </button>
              <button className="auth-option-btn password" onClick={() => { onEndShift('password'); setShowEndShiftOptions(false); }}>
                <Zap size={16} />
                <span>Password</span>
              </button>
              <button className="cancel-auth-btn" onClick={() => setShowEndShiftOptions(false)}>Cancel</button>
            </div>
          )}
        </div>

        <div className="aura-branding">
          <img src={branding.logo} alt="AURA.FIT." className="aura-logo-mini" />
          <span className="aura-text">AURA.FIT.</span>
        </div>
      </div>
    </aside>
  );
}
