import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { getAnalyticsMetrics } from './posthog';

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

  // Fetch PostHog Metrics
  const analytics = await getAnalyticsMetrics();

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
        <div className="stat-card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(0,0,0,0))' }}>
          <i className='bx bx-globe' style={{ color: 'var(--neon-purple)' }}></i>
          <div className="stat-info">
            <p>Total Pageviews (7d)</p>
            <h3>{analytics.totalPageviews}</h3>
          </div>
        </div>
        <div className="stat-card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(0,0,0,0))' }}>
          <i className='bx bx-user-pin' style={{ color: 'var(--electric-pink)' }}></i>
          <div className="stat-info">
            <p>Unique Visitors (7d)</p>
            <h3>{analytics.uniqueVisitors}</h3>
          </div>
        </div>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><i className='bx bx-bar-chart-alt-2'></i> Top Pages</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {analytics.topPages.map((page: any, i: number) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'var(--text-main)' }}>{page.path}</span>
                <span style={{ color: 'var(--neon-purple)', fontWeight: 600 }}>{page.views} views</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><i className='bx bx-link-external'></i> Traffic Sources</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {analytics.trafficSources.map((source: any, i: number) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'var(--text-main)', textTransform: 'capitalize' }}>{source.source.replace('$', '')}</span>
                <span style={{ color: 'var(--electric-pink)', fontWeight: 600 }}>{source.count} visits</span>
              </li>
            ))}
          </ul>
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
                      {(booking.phone || booking.user?.phone) && <small style={{ display: 'block', color: 'var(--text-muted)' }}>{booking.phone || booking.user?.phone}</small>}
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
