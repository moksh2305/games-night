import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 5;

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { event: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <section className="page active" style={{ padding: '2rem' }}>
      <header>
        <div>
          <h1>Bookings Ledger</h1>
          <p className="subtitle">All confirmed tickets and transactions across events.</p>
        </div>
      </header>

      <div className="glass-panel table-container">
        <table className="luxury-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Guest Name</th>
              <th>Status</th>
              <th>Date Booked</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No bookings found.</td>
              </tr>
            )}
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>
                  <div className="table-event">
                    <img src={booking.event.image} alt={booking.event.title} />
                    <span>{booking.event.title}</span>
                  </div>
                </td>
                <td>
                  {booking.name} <br/>
                  <small>{booking.email}</small>
                </td>
                <td><span className="badge success">{booking.status}</span></td>
                <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                <td>{booking.event.price === 0 ? 'FREE' : '$' + booking.event.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
