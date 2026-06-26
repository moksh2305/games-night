'use client';

import { useActionState, useState } from 'react';
import { updateProfile } from '@/app/actions';

export default function EditProfileModal({ user, onClose }: { user: any, onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  // Close modal if success
  if (state?.success) {
    onClose();
  }

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Edit Profile</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label>Phone Number</label>
              <input type="text" name="phone" defaultValue={user.phone || ''} placeholder="+1 234 567 8900" style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }} />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label>Occupation</label>
              <input type="text" name="occupation" defaultValue={user.occupation || ''} placeholder="Software Engineer" style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }} />
            </div>
          </div>

          <div>
            <label>College / University</label>
            <input type="text" name="college" defaultValue={user.college || ''} placeholder="NYU" style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }} />
          </div>

          <div>
            <label>Bio</label>
            <textarea name="bio" defaultValue={user.bio || ''} placeholder="Tell us about yourself..." style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem', minHeight: '80px' }}></textarea>
          </div>

          <div>
            <label>Favorite Games (Check all that apply)</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['Mafia', 'Poker', 'Trivia', 'Board Games', 'Social Deduction'].map(game => (
                <label key={game} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" name="favoriteGames" value={game} defaultChecked={user.favoriteGames?.includes(game)} style={{ accentColor: 'var(--neon-purple)' }} /> {game}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label>Preferred Event Type</label>
            <select name="preferredEventType" defaultValue={user.preferredEventType || ''} style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem', marginTop: '0.5rem' }}>
              <option value="">Select...</option>
              <option value="Social">Social</option>
              <option value="Team-Based">Team-Based</option>
              <option value="Competitive">Competitive</option>
            </select>
          </div>

          <div>
            <label>Notification Preferences</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              {['Upcoming Events', 'New Activities', 'Event Reminders'].map(notif => (
                <label key={notif} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" name="notificationPrefs" value={notif} defaultChecked={user.notificationPrefs?.includes(notif)} style={{ accentColor: 'var(--neon-purple)' }} /> {notif}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={isPending} className="btn btn-primary glow" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            {isPending ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
