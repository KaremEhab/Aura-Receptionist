import { useState } from 'react';
import { LogIn, QrCode, ScanLine, ShieldCheck } from 'lucide-react';
import auraLogo from '../../assets/Aura.svg';
import './ShiftLogin.css';

export function ShiftLogin({ onLogin, lastShift }) {
  const [selected, setSelected] = useState('kareem');
  const [scanMode, setScanMode] = useState(false);

  const receptionists = {
    kareem: { name: 'Kareem Ehab', role: 'Senior Receptionist', pin: 'Desk 01' },
    laila: { name: 'Laila Hassan', role: 'Evening Receptionist', pin: 'Desk 02' },
    omar: { name: 'Omar Nabil', role: 'Weekend Receptionist', pin: 'Desk 03' },
  };

  const active = receptionists[selected];

  return (
    <main className="shift-login-page">
      <section className="shift-login-card">
        <div className="shift-login-brand">
          <img src={auraLogo} alt="AURA.FIT." />
          <div>
            <strong>AURA.FIT.</strong>
            <span>Caesars Gym</span>
          </div>
        </div>

        <div className="shift-login-copy">
          <span>Secure Shift Handoff</span>
          <h1>Start a clean receptionist shift.</h1>
          <p>Previous shift activity is cleared locally before the next receptionist enters the dashboard.</p>
        </div>

        {lastShift && (
          <div className="last-shift-note">
            <ShieldCheck size={18} />
            <span>{lastShift.name} ended shift at {lastShift.endedAt}. Local shift data reset.</span>
          </div>
        )}

        <div className="login-mode-row">
          <button className={!scanMode ? 'active' : ''} onClick={() => setScanMode(false)}>
            <LogIn size={17} />
            <span>Account Details</span>
          </button>
          <button className={scanMode ? 'active' : ''} onClick={() => setScanMode(true)}>
            <QrCode size={17} />
            <span>QR / Barcode</span>
          </button>
        </div>

        {!scanMode ? (
          <label className="login-field">
            <span>Receptionist Account</span>
            <select value={selected} onChange={(event) => setSelected(event.target.value)}>
              {Object.entries(receptionists).map(([id, receptionist]) => (
                <option key={id} value={id}>{receptionist.name}</option>
              ))}
            </select>
          </label>
        ) : (
          <button className="scanner-login-box" onClick={() => onLogin(active)}>
            <ScanLine size={32} />
            <strong>Scan receptionist QR or barcode</strong>
            <span>Tap to simulate secure scan for {active.name}</span>
          </button>
        )}

        <div className="login-profile-preview">
          <div>
            <strong>{active.name}</strong>
            <span>{active.role} • {active.pin}</span>
          </div>
        </div>

        <button className="start-shift-btn" onClick={() => onLogin(active)}>
          <LogIn size={20} />
          <span>Start New Shift</span>
        </button>
      </section>
    </main>
  );
}
