import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import PostHogPageTracker from '@/components/PostHogPageTracker';
import CategoryChips from '@/components/CategoryChips';
import BookNowButton from '@/components/BookNowButton';

export const revalidate = 5;

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    include: { _count: { select: { bookings: true } } }
  });

  return (
    <section id="events" className="page active">
      <PostHogPageTracker eventName="events_page_opened" />
      <header>
        <div>
          <h1>Events</h1>
          <p className="subtitle">Explore our curated games nights and book your experience.</p>
        </div>
      </header>

      <div className="events-controls">
        <div className="search-bar">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search events..." />
        </div>
        <button className="btn btn-icon"><i className="bx bx-filter-alt"></i> Filter</button>
      </div>

      <CategoryChips />

      <div className="events-grid">
        {events.map((event) => {
          const isSoldOut = event._count.bookings >= event.capacity;
          return (
          <div key={event.id} className={`event-card ${event.title.includes('Board') ? 'featured' : ''}`}>
            <div className="card-img">
              <img src={event.image} alt={event.title} />
              {event.title.includes('Board') && <span className="badge featured-badge">Featured</span>}
            </div>
            <div className="card-content">
              <h3>{event.title}</h3>
              <p className="date"><i className="bx bx-calendar"></i> {event.date}</p>
              <p className="venue"><i className="bx bx-map"></i> {event.venue}</p>
              <p className="desc">{event.description}</p>
              <div className="card-footer">
                <div className="price">From <span>{event.price === 0 ? 'FREE' : '$' + event.price}</span></div>
                <BookNowButton eventId={event.id} isSoldOut={isSoldOut} className={`btn ${isSoldOut ? 'btn-secondary' : 'btn-primary'}`} />
              </div>
            </div>
          </div>
          );
        })}
      </div>
      <div style={{ marginTop: '5rem', marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Featured Game Types</h2>
        <div className="events-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', borderRadius: '24px' }}>
            <i className='bx bx-mask' style={{ fontSize: '3rem', color: 'var(--electric-pink)', marginBottom: '1rem' }}></i>
            <h3 style={{ marginBottom: '0.5rem' }}>Mafia Night</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Trust no one. The ultimate social deduction experience.</p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', borderRadius: '24px' }}>
            <i className='bx bx-brain' style={{ fontSize: '3rem', color: 'var(--indigo-blue)', marginBottom: '1rem' }}></i>
            <h3 style={{ marginBottom: '0.5rem' }}>Trivia Night</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Test your knowledge and win exclusive AYSG prizes.</p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', borderRadius: '24px' }}>
            <i className='bx bxs-card' style={{ fontSize: '3rem', color: 'var(--neon-purple)', marginBottom: '1rem' }}></i>
            <h3 style={{ marginBottom: '0.5rem' }}>Poker Tournament</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>High stakes, friendly faces. Are you all in?</p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', borderRadius: '24px' }}>
            <i className='bx bx-joystick' style={{ fontSize: '3rem', color: '#ffc107', marginBottom: '1rem' }}></i>
            <h3 style={{ marginBottom: '0.5rem' }}>Retro Gaming</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Arcade classics and 90s console nostalgia.</p>
          </div>
          
        </div>
      </div>

      <div style={{ marginTop: '5rem', marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Community Love</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', borderLeft: '4px solid var(--neon-purple)' }}>
            <i className='bx bxs-quote-alt-left' style={{ fontSize: '2rem', color: 'var(--neon-purple)', marginBottom: '1rem', opacity: 0.5 }}></i>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.6' }}>"The Mafia Night hosted by AYSG was hands down the best weekend I've had this year. The moderation was incredible and I met so many amazing people!"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--neon-purple), var(--electric-pink))' }}></div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Sarah M.</h4>
                <div style={{ color: '#ffc107', fontSize: '0.8rem' }}><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i></div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', borderLeft: '4px solid var(--electric-pink)' }}>
            <i className='bx bxs-quote-alt-left' style={{ fontSize: '2rem', color: 'var(--electric-pink)', marginBottom: '1rem', opacity: 0.5 }}></i>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.6' }}>"I was nervous to come alone, but the community is so welcoming. Within 10 minutes I was deeply invested in a board game with 5 new friends."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--indigo-blue), var(--neon-purple))' }}></div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>David K.</h4>
                <div style={{ color: '#ffc107', fontSize: '0.8rem' }}><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star-half'></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
