import Link from 'next/link';

export default function RewardsPage() {
  return (
    <section className="page active" style={{ padding: '2rem' }}>
      <header>
        <div>
          <h1>Community Perks</h1>
          <p className="subtitle">Your growth journey with Arham Yuva Seva Group.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', borderTop: '2px solid var(--neon-purple)' }}>
          <i className="bx bx-medal" style={{ fontSize: '4rem', color: 'var(--neon-purple)', marginBottom: '1rem' }}></i>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Active Member</h2>
          <p style={{ color: 'var(--text-muted)' }}>Current Status</p>
          <div style={{ marginTop: '2rem', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, var(--neon-purple), var(--electric-pink))' }}></div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>Attend 2 more events to unlock Community Leader</p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Your Milestones</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(167,139,250,0.1)', borderRadius: '16px', border: '1px solid var(--neon-purple)' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <i className='bx bxs-check-circle' style={{ fontSize: '2.5rem', color: 'var(--neon-purple)' }}></i>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>First Event Attended</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Welcome to the family! You've taken the first step.</p>
                </div>
              </div>
              <span className="badge" style={{ background: 'var(--neon-purple)' }}>Unlocked</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)', opacity: 0.7 }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <i className='bx bx-group' style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }}></i>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Social Butterfly</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Bring 3 friends to a single event.</p>
                </div>
              </div>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>In Progress (1/3)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)', opacity: 0.5 }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <i className='bx bx-crown' style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }}></i>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Community Host</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Volunteer to moderate a game table.</p>
                </div>
              </div>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>Locked</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
