import Link from 'next/link';

export default function ProfilePage() {
  return (
    <section className="page active" style={{ padding: '2rem' }}>
      <header>
        <div>
          <h1>Player Profile</h1>
          <p className="subtitle">Manage your account and preferences.</p>
        </div>
      </header>

      <div className="profile-layout">
        <div className="glass-panel profile-sidebar">
          <div className="avatar-container">
            <div className="avatar-ring"></div>
            <img src="https://i.pravatar.cc/150?img=11" alt="Alex" className="avatar-img" />
          </div>
          <h2>Alex Johnson</h2>
          <span className="badge member-badge">Gold Member</span>
          
          <div className="contact-info">
            <p><i className="bx bx-envelope"></i> alex@example.com</p>
            <p><i className="bx bx-phone"></i> +1 234 567 890</p>
            <p><i className="bx bx-map"></i> Los Angeles, CA</p>
          </div>
          
          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Edit Profile</button>
        </div>
        
        <div className="glass-panel profile-content">
          <h3 style={{ marginBottom: '1.5rem' }}>Preferences</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Favorite Game Types</label>
              <div className="category-chips" style={{ marginBottom: 0 }}>
                <button className="chip active">Board Games</button>
                <button className="chip active">Social Deduction</button>
                <button className="chip">Trivia</button>
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Notifications</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--neon-purple)' }} />
                <span>Send me updates on upcoming events</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
