import { UserCog, ShieldCheck, KeyRound, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import './Settings.css';

export function Settings({ receptionist, onUpdateReceptionist }) {
  const [profile, setProfile] = useState({
    name: receptionist?.name || 'Kareem Ehab',
    role: receptionist?.role || 'Receptionist',
    pin: receptionist?.pin || 'Desk 01',
    phone: receptionist?.phone || '+20 100 000 0000',
    email: receptionist?.email || 'reception@caesarsgym.com',
    emergency: receptionist?.emergency || '+20 122 555 0199',
    language: receptionist?.language || 'English / Arabic',
  });
  const [saved, setSaved] = useState(false);

  const update = (field, value) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const saveProfile = () => {
    onUpdateReceptionist?.(profile);
    setSaved(true);
  };

  return (
    <section className="reception-page">
      <div className="reception-hero">
        <div>
          <span className="reception-kicker">Reception Account</span>
          <h1>Account Settings</h1>
          <p>Edit the current receptionist profile, contact details, desk assignment, and safety handoff preferences.</p>
        </div>
        <div className="reception-hero-badge">
          <UserCog size={28} />
          <span>{profile.name || 'Receptionist'}</span>
        </div>
      </div>

      <div className="settings-layout">
        <section className="profile-settings-card">
          <h2>Profile Details</h2>
          <div className="settings-form-grid">
            {[
              ['name', 'Full Name'],
              ['role', 'Role'],
              ['pin', 'Desk / PIN Label'],
              ['phone', 'Phone Number'],
              ['email', 'Email Address'],
              ['emergency', 'Emergency Contact'],
              ['language', 'Service Languages'],
            ].map(([field, label]) => (
              <label key={field}>
                <span>{label}</span>
                <input value={profile[field]} onChange={(event) => update(field, event.target.value)} />
              </label>
            ))}
          </div>
          <button className="save-profile-btn" onClick={saveProfile}>
            <ShieldCheck size={18} />
            <span>{saved ? 'Profile Saved' : 'Save Profile'}</span>
          </button>
        </section>

        <section className="profile-settings-card">
          <h2>Safety Access</h2>
          <div className="safety-list">
            <div><strong>QR / Barcode login</strong><span>Enabled for shift start and shift end.</span></div>
            <div><strong>Checkout scan</strong><span>Trainees can safely check out with their own QR or barcode.</span></div>
            <div><strong>Shift isolation</strong><span>Local queue and logs reset when ending a shift.</span></div>
          </div>
        </section>
      </div>
    </section>
  );
}
