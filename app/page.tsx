export default function DashboardPage() {
  return (
    <section id="dashboard" className="page active">
      <header>
        <div>
          <h1>Hey Alex! Ready to play?</h1>
          <p className="subtitle">Epic games. Great people. Unforgettable memories.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary glow">Book Tickets</button>
          <button className="btn btn-secondary">Explore Events</button>
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
            <h3>5</h3>
          </div>
        </div>
        <div className="stat-card">
          <i className="bx bx-party"></i>
          <div className="stat-info">
            <p>Tickets Booked</p>
            <h3>2</h3>
          </div>
        </div>
        <div className="stat-card">
          <i className="bx bx-wallet"></i>
          <div className="stat-info">
            <p>Total Spent</p>
            <h3>$210</h3>
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
            <a href="/events" className="view-all">View All</a>
          </div>

          <div className="event-mini-card">
            <img src="/assets/poker_event.png" alt="Poker Night" />
            <div className="event-details">
              <h4>Poker & Poker Night</h4>
              <p><i className="bx bx-calendar"></i> 07 Jun 2025 • 8:00 PM</p>
              <p><i className="bx bx-map"></i> Ace Club, Birmingham</p>
            </div>
            <div className="event-price">$75</div>
            <button className="btn btn-outline">Book Now</button>
          </div>

          <div className="event-mini-card">
            <img src="/assets/retro_game_event.png" alt="Retro Games" />
            <div className="event-details">
              <h4>Retro Games Night</h4>
              <p><i className="bx bx-calendar"></i> 21 Jun 2025 • 6:30 PM</p>
              <p><i className="bx bx-map"></i> Pixel Den, Manchester</p>
            </div>
            <div className="event-price">$50</div>
            <button className="btn btn-outline">Book Now</button>
          </div>

          <div className="event-mini-card">
            <img src="/assets/trivia_event.png" alt="Trivia Night" />
            <div className="event-details">
              <h4>Trivia Night Showdown</h4>
              <p><i className="bx bx-calendar"></i> 05 Jul 2025 • 7:30 PM</p>
              <p><i className="bx bx-map"></i> Brainy Bar, Leeds</p>
            </div>
            <div className="event-price">$40</div>
            <button className="btn btn-outline">Book Now</button>
          </div>
        </div>

        <div className="side-widgets">
          <div className="next-ticket-card">
            <h3>My Next Ticket</h3>
            <img src="/assets/board_game_event.png" alt="Board Games" />
            <h4>Board Games Championship</h4>
            <p>24 May 2025 • 7:00 PM</p>
            <div className="ticket-status">
              <span>VIP Access</span>
              <span className="badge success">Confirmed</span>
            </div>
          </div>

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
