import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import InviteFriendsCard from '@/components/InviteFriendsCard';

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

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
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
            <div key={booking.id} className="boarding-pass">
              <div className="pass-left">
                <div className="pass-header">
                  <span className="airline">Arham Yuva Seva Group</span>
                  <span className="flight-type"><i className='bx bxs-plane-alt'></i> GAME TICKET</span>
                </div>
                <div className="pass-body">
                  <div className="pass-details">
                    <div className="detail-group">
                      <label>PASSENGER NAME</label>
                      <strong>{booking.name}</strong>
                    </div>
                    <div className="detail-group">
                      <label>EVENT</label>
                      <strong>{booking.event.title}</strong>
                    </div>
                  </div>
                  <div className="pass-row">
                    <div className="detail-group">
                      <label>DATE</label>
                      <span style={{ fontWeight: 500 }}>{booking.event.date}</span>
                    </div>
                    <div className="detail-group">
                      <label>CHECK-IN</label>
                      <span style={{ fontWeight: 500 }}>8:45 PM</span>
                    </div>
                    <div className="detail-group">
                      <label>SEAT</label>
                      <span style={{ fontWeight: 500 }}>Free Access</span>
                    </div>
                    <div className="detail-group">
                      <label>STATUS</label>
                      <span className="badge success">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pass-divider"></div>
              <div className="pass-right">
                <div className="qr-container">
                  <i className="bx bx-qr-scan glow-icon" style={{ fontSize: '4rem', textShadow: 'none', color: '#000' }}></i>
                </div>
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}><i className="bx bx-share-alt"></i> Share Ticket</button>
              </div>
            </div>
          ))
        )}
      </div>
        </div>
        
        <div style={{ width: '300px' }}>
          <InviteFriendsCard />
        </div>
      </div>
    </section>
  );
}
