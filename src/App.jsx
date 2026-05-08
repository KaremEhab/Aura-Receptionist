import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { NewTrainee } from './components/trainee/NewTrainee';
import { ReceptionPage } from './components/reception/ReceptionPages';
import { TrainersPage } from './components/trainers/TrainersPage';
import { ShiftLogin } from './components/auth/ShiftLogin';
import './App.css';
import auraLogo from './assets/Aura.svg';

const createCleanShift = () => ({
  stats: [
    { label: 'SHIFT CHECK-INS', value: '0', subValue: '+0%', type: 'success' },
    { label: 'NEW SALES', value: '0', subValue: 'Goal: 15', type: 'info' },
    { label: 'SHIFT REVENUE', value: '0', subValue: 'EGP', type: 'warning' },
  ],
  attendanceLog: [],
  pendingCheckins: [],
});

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [receptionist, setReceptionist] = useState({
    name: 'Kareem Ehab',
    role: 'Senior Receptionist',
    pin: 'Desk 01',
  });
  const [shiftData, setShiftData] = useState(() => createCleanShift());
  const [lastShift, setLastShift] = useState(null);

  const branding = {
    name: 'AURA.FIT.',
    gymName: 'Caesars Gym',
    logo: auraLogo,
    plan: 'Elite Plan',
    memberSince: '2022'
  };

  const handleEndShift = (method) => {
    setLastShift({
      name: receptionist.name,
      endedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setShiftData(createCleanShift());
    setSearchQuery('');
    setCurrentPage('login');
    setReceptionist(null);
  };

  const handleLogin = (nextReceptionist) => {
    setReceptionist(nextReceptionist);
    setShiftData(createCleanShift());
    setSearchQuery('');
    setCurrentPage('dashboard');
  };

  const handleDashboardAction = (action) => {
    if (action === 'check-in' || action === 'scan') {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setShiftData((prev) => {
        const checkins = Number(prev.stats[0].value) + 1;
        const sales = Number(prev.stats[1].value);
        const revenue = Number(String(prev.stats[2].value).replace(/,/g, ''));
        return {
          stats: [
            { ...prev.stats[0], value: String(checkins), subValue: `+${Math.min(checkins, 99)}%` },
            { ...prev.stats[1], value: String(sales) },
            { ...prev.stats[2], value: revenue.toLocaleString() },
          ],
          attendanceLog: [
            { time: now, exitTime: '', member: 'Marcus Holloway', plan: 'ELITE', address: 'New Cairo, Cairo', status: 'AUTHORIZED' },
            ...prev.attendanceLog,
          ],
          pendingCheckins: prev.pendingCheckins,
        };
      });
    }

    if (action === 'trainee-checkout') {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setShiftData((prev) => ({
        ...prev,
        attendanceLog: [
          { time: 'Checked out', exitTime: now, member: 'Marcus Holloway', plan: 'ELITE', address: 'New Cairo, Cairo', status: 'AUTHORIZED' },
          ...prev.attendanceLog,
        ],
      }));
    }

    if (action === 'new-sale') {
      setShiftData((prev) => {
        const sales = Number(prev.stats[1].value) + 1;
        const revenue = Number(String(prev.stats[2].value).replace(/,/g, '')) + 1490;
        return {
          ...prev,
          stats: [
            prev.stats[0],
            { ...prev.stats[1], value: String(sales) },
            { ...prev.stats[2], value: revenue.toLocaleString() },
          ],
        };
      });
      setCurrentPage('subscriptions');
    }
  };

  if (currentPage === 'login' || !receptionist) {
    return (
      <ThemeProvider>
        <ShiftLogin onLogin={handleLogin} lastShift={lastShift} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      {currentPage === 'new-trainee' ? (
        <NewTrainee onBack={() => setCurrentPage('dashboard')} />
      ) : (
        <DashboardLayout
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          branding={branding}
          receptionist={receptionist}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onEndShift={handleEndShift}
        >
          {currentPage === 'dashboard' && (
            <Dashboard
              shiftData={shiftData}
              onNavigate={setCurrentPage}
              onAction={handleDashboardAction}
            />
          )}
          {['subscriptions', 'maintenance', 'equipments', 'support', 'settings'].includes(currentPage) && (
            <ReceptionPage
              type={currentPage}
              receptionist={receptionist}
              onUpdateReceptionist={setReceptionist}
            />
          )}
          {currentPage === 'trainers' && (
            <TrainersPage receptionist={receptionist} />
          )}
        </DashboardLayout>
      )}
    </ThemeProvider>
  );
}

export default App;
