import { useState } from 'react';
import { CheckCircle2, Clock3, Dumbbell, Mail, Phone, Send, ShieldCheck, Star, UserPlus } from 'lucide-react';
import './TrainersPage.css';

const initialTrainers = [
  {
    id: 'omar',
    name: 'Coach Omar',
    specialty: 'Strength and hypertrophy',
    level: 'Senior PT',
    status: 'Available',
    rating: '4.9',
    sessions: 118,
    phone: '+20 100 222 9100',
    email: 'omar@caesarsgym.com',
    nextSlot: 'Today 13:30',
    certifications: ['NASM CPT', 'Corrective Exercise', 'CPR'],
  },
  {
    id: 'laila',
    name: 'Coach Laila',
    specialty: 'Mobility, weight loss, beginners',
    level: 'Lead Trainer',
    status: 'In Session',
    rating: '4.8',
    sessions: 96,
    phone: '+20 111 654 8400',
    email: 'laila@caesarsgym.com',
    nextSlot: 'Today 15:00',
    certifications: ['ACE CPT', 'Nutrition Basics', 'CPR'],
  },
  {
    id: 'nadine',
    name: 'Coach Nadine',
    specialty: 'Pilates and rehab conditioning',
    level: 'Specialist',
    status: 'Available',
    rating: '5.0',
    sessions: 74,
    phone: '+20 122 777 3011',
    email: 'nadine@caesarsgym.com',
    nextSlot: 'Tomorrow 10:00',
    certifications: ['Pilates Mat', 'Prehab', 'CPR'],
  },
];

const trainees = ['Marcus Holloway', 'Laila Mahmoud', 'Jordan Smyth', 'Nina Patel'];

export function TrainersPage({ receptionist }) {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [selectedTrainer, setSelectedTrainer] = useState(initialTrainers[0].id);
  const [selectedTrainee, setSelectedTrainee] = useState(trainees[0]);
  const [requests, setRequests] = useState([]);

  const trainer = trainers.find((item) => item.id === selectedTrainer) || trainers[0];

  const sendAssignment = () => {
    const request = {
      id: `${selectedTrainer}-${Date.now()}`,
      trainee: selectedTrainee,
      trainer: trainer.name,
      status: 'Waiting approval',
      sentBy: receptionist?.name || 'Reception',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setRequests((current) => [request, ...current]);
    setTrainers((current) => current.map((item) => item.id === trainer.id ? { ...item, status: 'Approval Pending' } : item));
  };

  const approveRequest = (id) => {
    setRequests((current) => current.map((item) => item.id === id ? { ...item, status: 'Approved' } : item));
  };

  return (
    <section className="trainers-page">
      <header className="trainers-hero">
        <div>
          <span>Trainer Desk</span>
          <h1>Personal Trainers</h1>
          <p>Assign trainees, review trainer availability, and wait for trainer approval before confirming the session.</p>
        </div>
        <div className="trainer-summary">
          <ShieldCheck size={24} />
          <strong>{trainers.filter((item) => item.status === 'Available').length} available now</strong>
        </div>
      </header>

      <div className="trainer-layout">
        <div className="trainer-list-panel">
          {trainers.map((item) => (
            <button
              key={item.id}
              className={`trainer-card ${selectedTrainer === item.id ? 'active' : ''}`}
              onClick={() => setSelectedTrainer(item.id)}
            >
              <div>
                <strong>{item.name}</strong>
                <span>{item.specialty}</span>
              </div>
              <small>{item.status}</small>
            </button>
          ))}
        </div>

        <article className="trainer-detail">
          <div className="trainer-detail-head">
            <div>
              <h2>{trainer.name}</h2>
              <p>{trainer.level} • {trainer.specialty}</p>
            </div>
            <span className="trainer-status">{trainer.status}</span>
          </div>

          <div className="trainer-metrics">
            <div><Star size={18} /><strong>{trainer.rating}</strong><span>Rating</span></div>
            <div><Dumbbell size={18} /><strong>{trainer.sessions}</strong><span>Sessions</span></div>
            <div><Clock3 size={18} /><strong>{trainer.nextSlot}</strong><span>Next slot</span></div>
          </div>

          <div className="trainer-contact">
            <span><Phone size={16} />{trainer.phone}</span>
            <span><Mail size={16} />{trainer.email}</span>
          </div>

          <div className="cert-list">
            {trainer.certifications.map((cert) => <span key={cert}>{cert}</span>)}
          </div>

          <div className="assign-panel">
            <h3>Assign Trainee</h3>
            <div className="assign-controls">
              <select value={selectedTrainee} onChange={(event) => setSelectedTrainee(event.target.value)}>
                {trainees.map((trainee) => <option key={trainee}>{trainee}</option>)}
              </select>
              <button onClick={sendAssignment}>
                <Send size={18} />
                <span>Send Approval Request</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <section className="approval-panel">
        <h2>Assignment Approval Queue</h2>
        {requests.length === 0 && <p>No assignment requests waiting yet.</p>}
        {requests.map((request) => (
          <div className="approval-row" key={request.id}>
            <UserPlus size={20} />
            <div>
              <strong>{request.trainee} → {request.trainer}</strong>
              <span>{request.status} • sent by {request.sentBy} at {request.time}</span>
            </div>
            {request.status !== 'Approved' ? (
              <button onClick={() => approveRequest(request.id)}>Trainer Approve</button>
            ) : (
              <CheckCircle2 className="approved-icon" size={22} />
            )}
          </div>
        ))}
      </section>
    </section>
  );
}
