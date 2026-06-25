import { prisma } from '@/lib/prisma';
import { bookTicket } from '@/app/actions';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BookEventPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const event = await prisma.event.findUnique({
    where: { id: params.id }
  });

  if (!event) {
    redirect('/events');
  }

  return (
    <section className="page active" style={{ padding: '2rem' }}>
      <header>
        <div>
          <h1>Book Ticket</h1>
          <p className="subtitle">Secure your spot for {event.title}</p>
        </div>
      </header>

      <div style={{ maxWidth: '600px', margin: '2rem 0', background: 'var(--glass-bg)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--neon-purple)' }}>{event.title} - ${event.price}</h3>
        
        <form action={bookTicket} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="hidden" name="eventId" value={event.id} />
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Full Name</label>
            <input type="text" name="name" required placeholder="John Doe" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: '#0f1021', border: '1px solid #2a2b4a', color: 'white' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email (for 1 ticket limit)</label>
            <input type="email" name="email" required placeholder="john@example.com" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: '#0f1021', border: '1px solid #2a2b4a', color: 'white' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Age</label>
            <input type="number" name="age" required min="18" placeholder="18" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: '#0f1021', border: '1px solid #2a2b4a', color: 'white' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Address</label>
            <textarea name="address" required placeholder="123 Neon Street..." style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: '#0f1021', border: '1px solid #2a2b4a', color: 'white', minHeight: '80px' }}></textarea>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Payment Method (Mock)</label>
            <select name="paymentMethod" required style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', background: '#0f1021', border: '1px solid #2a2b4a', color: 'white' }}>
              <option value="Credit Card">Credit Card</option>
              <option value="Crypto">Crypto Wallet</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary glow" style={{ marginTop: '1rem', width: '100%' }}>Confirm Booking • ${event.price}</button>
        </form>
      </div>
    </section>
  );
}
