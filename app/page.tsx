import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import AnimatedPillars from '@/components/AnimatedPillars';
import TestimonialBoard from '@/components/TestimonialBoard';
import PostHogPageTracker from '@/components/PostHogPageTracker';
import BookNowButton from '@/components/BookNowButton';
import { auth } from '@/auth';

export const revalidate = 5;

export default async function DashboardPage() {
  const events = await prisma.event.findMany({
    take: 3,
    include: { _count: { select: { bookings: true } } }
  });

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  const session = await auth();
  const firstName = session?.user?.name ? session.user.name.split(' ')[0] : 'Gamer';

  return (
    <section id="dashboard" className="page active">
      <PostHogPageTracker eventName="homepage_visited" />
      <div style={{ background: 'linear-gradient(90deg, rgba(167,139,250,0.1), rgba(244,114,182,0.05))', padding: '12px 24px', borderRadius: '16px', border: '1px solid rgba(167,139,250,0.2)', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <i className='bx bxs-check-shield' style={{ color: 'var(--neon-purple)', fontSize: '1.4rem' }}></i>
        <span style={{ fontSize: '0.95rem', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Hosted & Moderated by <strong style={{ color: 'white', fontWeight: 600 }}>Arham Yuva Seva Group (AYSG)</strong></span>
      </div>

      <header>
        <div>
          <h1>Hey {firstName}! Ready to play?</h1>
          <p className="subtitle">Epic games. Great people. Unforgettable memories.</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/events"><button className="btn btn-primary glow">Book Tickets</button></Link>
          <Link href="/events"><button className="btn btn-secondary">Explore Events</button></Link>
        </div>
      </header>

      <div className="hero-banner" style={{ marginBottom: '1.5rem' }}>
        <img src="/assets/hero_banner.png" alt="Game On Neon Sign" />
        <div className="hero-overlay"></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10, marginBottom: '3rem', marginTop: '-3rem' }}>
        <div className="glass-panel" style={{ padding: '1rem 2.5rem', display: 'flex', gap: '2rem', borderRadius: '100px', background: 'rgba(5,5,8,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}><strong style={{ color: 'white' }}>150+</strong> Youth Joined</span>
          <span style={{ color: 'var(--neon-purple)' }}>•</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}><strong style={{ color: 'white' }}>12+</strong> Interactive Games</span>
          <span style={{ color: 'var(--neon-purple)' }}>•</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}><strong style={{ color: 'white' }}>1</strong> Unforgettable Night</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <i className="bx bx-group"></i>
          <div className="stat-info">
            <p>Active Members</p>
            <h3>150+</h3>
          </div>
        </div>
        <div className="stat-card">
          <i className="bx bx-calendar-check"></i>
          <div className="stat-info">
            <p>Events Hosted</p>
            <h3>20+</h3>
          </div>
        </div>
        <div className="stat-card">
          <i className="bx bx-star"></i>
          <div className="stat-info">
            <p>Community Rating</p>
            <h3>4.9/5</h3>
          </div>
        </div>
        <div className="stat-card">
          <i className="bx bx-refresh"></i>
          <div className="stat-info">
            <p>Returning Players</p>
            <h3>95%</h3>
          </div>
        </div>
      </div>

      <AnimatedPillars />

      <div className="dashboard-bottom">
        <div className="upcoming-events-widget">
          <div className="widget-header">
            <h2>Upcoming Events</h2>
            <Link href="/events" className="view-all">View All</Link>
          </div>

          {events.map((event) => {
            const isSoldOut = event._count.bookings >= event.capacity;
            return (
            <div key={event.id} className="event-mini-card">
              <img src={event.image} alt={event.title} />
              <div className="event-details">
                <h4>{event.title}</h4>
                <p><i className="bx bx-calendar"></i> {event.date}</p>
                <p><i className="bx bx-map"></i> {event.venue}</p>
              </div>
              <div className="event-price">{event.price === 0 ? 'FREE' : '$' + event.price}</div>
              <BookNowButton eventId={event.id} isSoldOut={isSoldOut} />
            </div>
            );
          })}
        </div>


      </div>

      <TestimonialBoard initialTestimonials={testimonials} />
    </section>
  );
}
