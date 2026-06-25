import Link from 'next/link';

export default function RewardsPage() {
  return (
    <section className="page active" style={{ padding: '2rem' }}>
      <header>
        <div>
          <h1>Rewards & VIP</h1>
          <p className="subtitle">Earn points by playing, unlock exclusive events.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <i className="bx bx-diamond" style={{ fontSize: '4rem', color: 'var(--neon-purple)', marginBottom: '1rem' }}></i>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>1,890</h2>
          <p style={{ color: 'var(--text-muted)' }}>Available Points</p>
          <div style={{ marginTop: '2rem', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, var(--neon-purple), var(--electric-pink))' }}></div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>110 points to Platinum Tier</p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Redeem Rewards</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <div>
                <h4 style={{ marginBottom: '5px' }}>Free Event Ticket</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Valid for any Standard tier event.</p>
              </div>
              <button className="btn btn-outline">500 pts</button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <div>
                <h4 style={{ marginBottom: '5px' }}>VIP Lounge Access</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Skip the line and get premium seating.</p>
              </div>
              <button className="btn btn-outline">1,200 pts</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
