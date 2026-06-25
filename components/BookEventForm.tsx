'use client';

import { useActionState } from 'react';
import { bookTicket } from '@/app/actions';

export default function BookEventForm({ eventId, price, isSoldOut }: { eventId: string, price: number, isSoldOut: boolean }) {
  const [state, formAction, isPending] = useActionState(bookTicket, null);

  if (isSoldOut) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255, 60, 60, 0.1)', borderRadius: '1rem', border: '1px solid #ff3c3c' }}>
        <h3 style={{ color: '#ff3c3c', marginBottom: '0.5rem' }}>SOLD OUT</h3>
        <p>Sorry, all tickets for this event have been claimed.</p>
      </div>
    );
  }

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {state?.error && (
        <div style={{ padding: '1rem', background: 'rgba(255, 60, 60, 0.1)', borderRadius: '0.5rem', border: '1px solid #ff3c3c', color: '#ff3c3c' }}>
          {state.error}
        </div>
      )}

      <input type="hidden" name="eventId" value={eventId} />
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Full Name</label>
        <input type="text" name="name" required placeholder="John Doe" disabled={isPending} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: '#0f1021', border: '1px solid #2a2b4a', color: 'white', opacity: isPending ? 0.5 : 1 }} />
      </div>
      
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Age</label>
        <input type="number" name="age" required min="18" placeholder="18" disabled={isPending} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: '#0f1021', border: '1px solid #2a2b4a', color: 'white', opacity: isPending ? 0.5 : 1 }} />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Address</label>
        <textarea name="address" required placeholder="123 Neon Street..." disabled={isPending} style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: '#0f1021', border: '1px solid #2a2b4a', color: 'white', minHeight: '80px', opacity: isPending ? 0.5 : 1 }}></textarea>
      </div>
      
      <button type="submit" disabled={isPending} className="btn btn-primary glow" style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isPending ? 0.7 : 1 }}>
        {isPending ? (
          <>
            <span className="spinner"></span> Confirming Booking...
          </>
        ) : (
          `Confirm Booking • ${price === 0 ? 'FREE' : '$' + price}`
        )}
      </button>

      <style jsx>{`
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
