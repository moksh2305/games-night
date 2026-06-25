import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import InviteFriendsCard from '@/components/InviteFriendsCard';
import ShareableTicket from '@/components/ShareableTicket';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function MyTicketsPage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get('userEmail')?.value;

  const bookings = userEmail ? await prisma.booking.findMany({
    where: {
      email: userEmail
    },
    include: {
      event: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  }) : [];

  return (
    <section id="mytickets" className="page active">
      <header>
        <div>
          <h1>My Tickets</h1>
          <p className="subtitle">View and manage your booked tickets.</p>
        </div>
      </header>

      <div className="mytickets-layout" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
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
            <ShareableTicket key={booking.id} booking={booking} />
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
