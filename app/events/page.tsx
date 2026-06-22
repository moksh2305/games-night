import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function EventsPage() {
  const events = await prisma.event.findMany();

  return (
    <section id="events" className="page active">
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

      <div className="category-chips">
        <button className="chip active">All Events</button>
        <button className="chip">Board Games</button>
        <button className="chip">Poker</button>
        <button className="chip">Retro Games</button>
        <button className="chip">Trivia</button>
      </div>

      <div className="events-grid">
        {events.map((event) => (
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
                <div className="price">From <span>${event.price}</span></div>
                <Link href={`/events/${event.id}/book`}>
                  <button className="btn btn-primary">Book Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
