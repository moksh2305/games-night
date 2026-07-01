'use client';

import { useState } from 'react';
import { createEvent } from '@/app/actions';

export default function CreateEventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    const formData = new FormData(e.currentTarget);
    const result = await createEvent(formData);
    
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage('Event created successfully!');
      (e.target as HTMLFormElement).reset();
    }
    
    setIsSubmitting(false);
  }

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--neon-purple)' }}>Create New Event</h2>
      
      {message && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', background: message.includes('success') ? 'rgba(0,255,128,0.1)' : 'rgba(255,60,60,0.1)', color: message.includes('success') ? '#00ff80' : '#ff3c3c', borderRadius: '12px', border: '1px solid currentColor' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" required placeholder="e.g. Mafia Night" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'white' }} />
          </div>
          
          <div className="form-group">
            <label>Date & Time</label>
            <input type="text" name="date" required placeholder="e.g. Friday, 26th June • 9:00 PM" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'white' }} />
          </div>

          <div className="form-group">
            <label>Venue</label>
            <input type="text" name="venue" required placeholder="e.g. AYSG Community Hall" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'white' }} />
          </div>
          
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" name="image" required placeholder="e.g. /assets/mafia.png" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'white' }} />
          </div>
          
          <div className="form-group">
            <label>Price (0 for Free)</label>
            <input type="number" name="price" required min="0" step="0.01" defaultValue="0" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'white' }} />
          </div>
          
          <div className="form-group">
            <label>Capacity</label>
            <input type="number" name="capacity" required min="1" defaultValue="30" style={{ width: '100%', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'white' }} />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" required rows={4} placeholder="Describe the event..." style={{ width: '100%', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'white' }}></textarea>
        </div>

        <div>
          <button type="submit" className="btn btn-primary glow" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
