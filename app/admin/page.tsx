import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await auth();
  
  // Security check: Only the designated admin can access this page
  if (!session?.user || session.user.email !== 'moksh230305@gmail.com') {
    redirect('/');
  }

  // Fetch all bookings with event and user details
  const bookings = await prisma.booking.findMany({
    include: {
      event: true,
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Calculate some basic stats
  const totalBookings = bookings.length;
  const uniqueUsers = new Set(bookings.map(b => b.email)).size;

  return (
    <section className="page active" style={{ padding: '2rem' }}>
      <header>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className='bx bx-shield-quarter' style={{ color: 'var(--neon-purple)' }}></i> 
            Admin Dashboard
          </h1>
          <p className="subtitle">Secure overview of all AYSG ticketing data.</p>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <i className='bx bx-receipt'></i>
          <div className="stat-info">
            <p>Total Bookings</p>
            <h3>{totalBookings}</h3>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <i className='bx bx-group'></i>
          <div className="stat-info">
            <p>Unique Attendees</p>
            <h3>{uniqueUsers}</h3>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>All Tickets Booked</h3>
        
        {bookings.length > 0 ? (
          <div className="table-container" style={{ padding: 0 }}>
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>Attendee</th>
                  <th>Contact</th>
                  <th>Event</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Date Booked</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <div className="table-event">
                        <img src={booking.user?.image || 'https://i.pravatar.cc/150'} alt="Avatar" />
                        <div>
                          <span>{booking.name}</span>
                          {booking.user?.role && <small style={{ display: 'block', color: 'var(--neon-purple)' }}>{booking.user.role}</small>}
                        </div>
                      </div>
                    </td>
                    <td>
                      {booking.email}
                      {booking.user?.phone && <small style={{ display: 'block' }}>{booking.user.phone}</small>}
                    </td>
                    <td>
                      <strong>{booking.event.title}</strong>
                    </td>
                    <td>{booking.age}</td>
                    <td>
                      <span className={`badge ${booking.status === 'Confirmed' ? 'success' : 'pending'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(booking.createdAt))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>No bookings found.</p>
        )}
      </div>
    </section>
  );
}
