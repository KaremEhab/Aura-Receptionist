import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import './App.css';
import auraLogo from './assets/Aura.svg';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const branding = {
    name: 'AURA',
    logo: auraLogo,
  };

  return (
    <ThemeProvider>
      <DashboardLayout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        branding={branding}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      >
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage !== 'dashboard' && (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2 className="text-title" style={{ fontSize: '32px' }}>{currentPage.toUpperCase()}</h2>
            <p className="text-subtitle">This module is currently under maintenance.</p>
          </div>
        )}
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;
