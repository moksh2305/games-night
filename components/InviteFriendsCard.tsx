'use client';

import { useState } from 'react';

export default function InviteFriendsCard() {
  const [copied, setCopied] = useState(false);

  const handleInvite = async () => {
    const inviteLink = "https://games-night.vercel.app/invite?ref=alex123";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me at Games Night!',
          text: 'Use my invite link to unlock exclusive community perks when you book a ticket!',
          url: inviteLink,
        });
      } catch (err) {
        // If share fails or is cancelled, fallback to copy
        copyToClipboard(inviteLink);
      }
    } else {
      copyToClipboard(inviteLink);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="referral-card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
      <i className="bx bx-group" style={{ fontSize: '3rem', color: 'var(--neon-purple)', marginBottom: '1rem' }}></i>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Bring the squad, double the fun!</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Invite friends and unlock exclusive community perks.</p>
      <button onClick={handleInvite} className="btn btn-primary glow" style={{ width: '100%', justifyContent: 'center' }}>
        {copied ? 'Link Copied!' : 'Invite Friends'}
      </button>
    </div>
  );
}
