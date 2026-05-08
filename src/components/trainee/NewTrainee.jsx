import { useEffect, useMemo, useState } from 'react';
import { Camera, CheckCircle2, CreditCard, Landmark, QrCode, Tag, UserPlus } from 'lucide-react';
import auraLogo from '../../assets/Aura.svg';
import './NewTrainee.css';

const tiers = [
  { name: 'Free', caption: 'BASIC ACCESS', amount: 0 },
  { name: 'Premium', caption: 'ALL CLASSES', amount: 149 },
  { name: 'VIP', caption: 'FULL SUITE' },
];

const payments = [
  { name: 'Cash', icon: Landmark },
  { name: 'Fawry', icon: QrCode },
  { name: 'Credit Card', icon: CreditCard },
];

export function NewTrainee({ onBack }) {
  const [scrolled, setScrolled] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Premium');
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const [imageAdded, setImageAdded] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: 'Johnathan Doe',
    phone: '+20 123 456 7890',
    email: 'member@fitness-elite.com',
  });

  const total = useMemo(() => {
    const tier = tiers.find((item) => item.name === selectedTier);
    return tier?.amount ?? 249;
  }, [selectedTier]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="new-trainee-page">
      <div className={`trainee-brand ${scrolled ? 'scrolled' : ''}`}>
        <div className="trainee-brand-main">
          <img src={auraLogo} alt="AURA.FIT." />
          <span>AURA.FIT.</span>
        </div>
        <strong>Caesars Gym</strong>
      </div>

      <div className="trainee-breadcrumb">
        <button type="button" onClick={onBack}>Dashboard</button>
        <b>/</b>
        <strong>New Trainee</strong>
      </div>

      <div className="trainee-layout">
        <div className="trainee-main">
          <section className="trainee-panel profile-panel">
            <div className="profile-panel-head">
              <div>
                <h2>Member Profile</h2>
                <p>Capture biometric data and contact information.</p>
              </div>
              <button className={`image-drop ${imageAdded ? 'complete' : ''}`} onClick={() => setImageAdded(true)}>
                <Camera size={19} />
                <span>{imageAdded ? 'Image captured' : 'Drop your image here'}</span>
              </button>
            </div>

            <div className="field-grid two">
              <label>
                <span>FULL NAME</span>
                <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              </label>
              <label>
                <span>PHONE NUMBER</span>
                <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
              </label>
            </div>

            <div className="field-grid">
              <label>
                <span>EMAIL ADDRESS</span>
                <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              </label>
            </div>

            <div className="tier-block">
              <span className="block-label">MEMBERSHIP TYPE</span>
              <div className="tier-grid">
                {tiers.map((tier) => (
                  <button
                    key={tier.name}
                    className={`tier-option ${selectedTier === tier.name ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedTier(tier.name);
                      setStep(Math.max(step, 2));
                    }}
                  >
                    <strong>{tier.name}</strong>
                    <span>{tier.caption}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="trainee-panel payment-panel">
            <h2>PAYMENT METHOD</h2>
            <div className="payment-grid">
              {payments.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  className={`payment-option ${selectedPayment === name ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedPayment(name);
                    setStep(Math.max(step, 3));
                  }}
                >
                  <span className="payment-radio" />
                  <Icon size={24} />
                  <strong>{name}</strong>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="trainee-side">
          <section className="summary-card">
            <h3>MEMBER SUMMARY</h3>
            <div className="summary-body">
              <div className="summary-top">
                <div>
                  <span>TIER</span>
                  <strong>{selectedTier.toUpperCase()}</strong>
                </div>
                <div>
                  <span>TOTAL DUE</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>
              <ul>
                <li><CheckCircle2 size={14} />24/7 Access</li>
                <li><CheckCircle2 size={14} />Group Training</li>
                <li><CheckCircle2 size={14} />Recovery Zone Access</li>
              </ul>
            </div>
          </section>

          <section className="flow-card">
            <h3>ONBOARDING FLOW</h3>
            <div className={`flow-step ${step >= 1 ? 'active' : ''}`}>
              <UserPlus size={22} />
              <div>
                <strong>Personal Details</strong>
                <span>STEP 1 OF 3</span>
              </div>
            </div>
            <div className={`flow-step ${step >= 2 ? 'active' : ''}`}>
              <Tag size={22} />
              <div>
                <strong>Membership Tier</strong>
                <span>{step >= 2 ? selectedTier.toUpperCase() : 'PENDING'}</span>
              </div>
            </div>
            <div className={`flow-step ${step >= 3 ? 'active' : ''}`}>
              <CreditCard size={22} />
              <div>
                <strong>Payment Method</strong>
                <span>{step >= 3 ? selectedPayment.toUpperCase() : 'PENDING'}</span>
              </div>
            </div>
          </section>

          <button className="next-step-btn" onClick={() => (step < 3 ? setStep(step + 1) : onBack?.())}>
            <span className="next-total">
              <small>Total Paid</small>
              <strong>${total.toFixed(2)}</strong>
            </span>
            <span className="next-label">{step < 3 ? 'Next Step' : 'Create Member'}</span>
          </button>
        </aside>
      </div>
    </div>
  );
}
