import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const events = await prisma.event.findMany({ take: 3 });

  return (
    <section id="dashboard" className="page active">
      <header>
        <div>
          <h1>Hey Alex! Ready to play?</h1>
          <p className="subtitle">Epic games. Great people. Unforgettable memories.</p>
        </div>
        <div className="header-actions">
          <Link href="/events"><button className="btn btn-primary glow">Book Tickets</button></Link>
          <Link href="/events"><button className="btn btn-secondary">Explore Events</button></Link>
        </div>
      </header>

      <div className="hero-banner">
        <img src="/assets/hero_banner.png" alt="Game On Neon Sign" />
        <div className="hero-overlay"></div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <i className="bx bx-calendar-star"></i>
          <div className="stat-info">
            <p>Upcoming Events</p>
            <h3>{events.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <i className="bx bx-party"></i>
          <div className="stat-info">
            <p>Tickets Booked</p>
            <h3>0</h3>
          </div>
        </div>
        <div className="stat-card">
          <i className="bx bx-wallet"></i>
          <div className="stat-info">
            <p>Total Spent</p>
            <h3>$0</h3>
          </div>
        </div>
        <div className="stat-card">
          <i className="bx bx-diamond"></i>
          <div className="stat-info">
            <p>Reward Points</p>
            <h3>1,890</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="upcoming-events-widget">
          <div className="widget-header">
            <h2>Upcoming Events</h2>
            <Link href="/events" className="view-all">View All</Link>
          </div>

          {events.map((event) => (
            <div key={event.id} className="event-mini-card">
              <img src={event.image} alt={event.title} />
              <div className="event-details">
                <h4>{event.title}</h4>
                <p><i className="bx bx-calendar"></i> {event.date}</p>
                <p><i className="bx bx-map"></i> {event.venue}</p>
              </div>
              <div className="event-price">${event.price}</div>
              <Link href={`/events/${event.id}/book`}>
                <button className="btn btn-outline">Book Now</button>
              </Link>
            </div>
          ))}
        </div>

        <div className="side-widgets">
          {events.length > 0 && (
            <div className="next-ticket-card">
              <h3>My Next Ticket</h3>
              <img src={events[0].image} alt={events[0].title} />
              <h4>{events[0].title}</h4>
              <p>{events[0].date}</p>
              <div className="ticket-status">
                <span>{events[0].type}</span>
                <span className="badge success">Confirmed</span>
              </div>
            </div>
          )}

          <div className="referral-card">
            <i className="bx bx-group"></i>
            <h3>Bring the squad, double the fun!</h3>
            <p>Invite friends and unlock exclusive rewards.</p>
            <button className="btn btn-primary">Invite Friends</button>
          </div>
        </div>
      </div>
    </section>
  );
}
