import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { NotificationPanel } from './NotificationPanel';
import { Plus } from 'lucide-react';
import { isTauri } from '../../lib/tauri';
import './DashboardLayout.css';


export function DashboardLayout({ children, currentPage, onNavigate, branding, searchQuery, onSearch }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (sidebarOpen || notifOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen, notifOpen]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="dashboard-layout">
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        currentPage={currentPage}
        branding={branding}
        onNavigate={(page) => {
          onNavigate(page);
          setSidebarOpen(false);
        }}
      />
      <div className="main-wrapper">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          branding={branding}
          onRefresh={handleRefresh}
          onNotifClick={() => setNotifOpen(true)}
          onNavigate={onNavigate}
          searchQuery={searchQuery}
          onSearch={onSearch}
        />
        <main className="main-content" key={refreshKey}>
          {children}
        </main>
        <BottomNav 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onRefresh={handleRefresh}
          onNotifClick={() => setNotifOpen(true)}
        />
        <button className="fab-button" title="Add New Gym">

          <Plus size={24} />
        </button>
      </div>
      <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
}
