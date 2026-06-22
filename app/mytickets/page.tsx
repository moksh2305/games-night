import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MyTicketsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      event: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <section id="mytickets" className="page active">
      <header>
        <div>
          <h1>My Tickets</h1>
          <p className="subtitle">View and manage your booked tickets.</p>
        </div>
      </header>

      <div className="tabs">
        <button className="tab active">Upcoming</button>
        <button className="tab">Past</button>
        <button className="tab">Cancelled</button>
      </div>

      <div className="tickets-list">
        {bookings.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', padding: '2rem' }}>You have no tickets yet. <Link href="/events" style={{ color: 'var(--neon-purple)' }}>Explore events</Link></div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="ticket-card">
              <img src={booking.event.image} alt={booking.event.title} />
              <div className="ticket-info">
                <h3>{booking.event.title}</h3>
                <p><i className="bx bx-calendar"></i> {booking.event.date}</p>
                <p><i className="bx bx-map"></i> {booking.event.venue}</p>
                <div className="ticket-footer">
                  <span className="badge info">{booking.event.type}</span>
                  <span className="badge success">{booking.status}</span>
                  <span style={{ marginLeft: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Booked for {booking.name}</span>
                </div>
              </div>
              <div className="qr-code">
                <i className="bx bx-qr-scan glow-icon" style={{ fontSize: '3rem' }}></i>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
