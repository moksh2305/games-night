import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import EditProfileButton from '@/components/EditProfileButton';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      bookings: true,
      activities: {
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  });

  if (!user) {
    redirect('/login');
  }

  const joinDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(user.createdAt));
  const eventsAttended = user.bookings.length;

  return (
    <section className="page active" style={{ padding: '2rem' }}>
      <header>
        <div>
          <h1>Member Profile</h1>
          <p className="subtitle">Manage your AYSG account, activity and preferences.</p>
        </div>
      </header>

      <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', marginTop: '2rem', alignItems: 'start' }}>
        
        {/* LEFT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* AYSG Digital Identity Card */}
          <div className="glass-panel" style={{ 
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(109, 40, 217, 0.05))',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 60%)', animation: 'spin 10s linear infinite', zIndex: 0, pointerEvents: 'none' }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--neon-purple)', marginBottom: '1.5rem' }}>AYSG IDENTITY CARD</h4>
              
              <div style={{ padding: '4px', background: 'linear-gradient(135deg, #8B5CF6, #C084FC)', borderRadius: '50%', marginBottom: '1rem' }}>
                <img src={user.image || 'https://i.pravatar.cc/150'} alt={user.name || 'User'} style={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid var(--bg-dark)' }} />
              </div>
              
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{user.name}</h2>
              <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC', border: '1px solid #A855F7' }}>{user.role}</span>
              
              <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)', margin: '1.5rem 0' }}></div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', textAlign: 'left', gap: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Member ID</span>
                  <strong style={{ color: 'white' }}>AYSG-{new Date(user.createdAt).getFullYear()}-{user.id.slice(10,14).toUpperCase()}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>Status</span>
                  <strong style={{ color: '#4ade80' }}>Verified</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel profile-sidebar">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Personal Details</h3>
            
            <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
              <p><i className="bx bx-envelope" style={{ color: 'var(--neon-purple)' }}></i> {user.email}</p>
              {user.phone && <p><i className="bx bx-phone" style={{ color: 'var(--neon-purple)' }}></i> {user.phone}</p>}
              {user.chapter && <p><i className="bx bx-map" style={{ color: 'var(--neon-purple)' }}></i> {user.chapter}</p>}
              {user.occupation && <p><i className="bx bx-briefcase" style={{ color: 'var(--neon-purple)' }}></i> {user.occupation}</p>}
              {user.college && <p><i className="bx bxs-graduation" style={{ color: 'var(--neon-purple)' }}></i> {user.college}</p>}
            </div>
            
            {user.bio && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '0.5rem', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                "{user.bio}"
              </div>
            )}
            
            <EditProfileButton user={user} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>AYSG Journey</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '2rem', color: 'var(--neon-purple)', fontWeight: 'bold' }}>{eventsAttended}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Events Attended</div>
              </div>
              <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '2rem', color: 'var(--neon-purple)', fontWeight: 'bold' }}>{joinDate.split(' ')[1]}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Joined Since {joinDate.split(' ')[0]}</div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Preferences</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Favorite Games</label>
                <div className="category-chips" style={{ marginBottom: 0 }}>
                  {user.favoriteGames ? user.favoriteGames.split(',').map(game => (
                    <span key={game} className="chip active" style={{ cursor: 'default' }}>{game}</span>
                  )) : <span style={{ color: 'var(--text-muted)' }}>Not set</span>}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Preferred Event Type</label>
                <div style={{ color: 'white' }}>{user.preferredEventType || <span style={{ color: 'var(--text-muted)' }}>Not set</span>}</div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Notification Preferences</label>
                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {user.notificationPrefs ? user.notificationPrefs.split(',').map(pref => (
                    <li key={pref} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className='bx bx-check-circle' style={{ color: 'var(--neon-purple)' }}></i> {pref}
                    </li>
                  )) : <span style={{ color: 'var(--text-muted)' }}>Not set</span>}
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
            
            {user.activities.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {user.activities.map((activity, idx) => (
                  <div key={activity.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                    {idx !== user.activities.length - 1 && (
                      <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-24px', width: '2px', background: 'var(--glass-border)' }}></div>
                    )}
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--neon-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, boxShadow: '0 0 10px rgba(168,85,247,0.5)' }}>
                      <i className={`bx ${activity.type === 'Booking' ? 'bx-calendar-star' : 'bx-user'}`} style={{ color: 'white', fontSize: '0.8rem' }}></i>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 0.2rem 0' }}>{activity.title}</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(activity.createdAt))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>No recent activity.</p>
            )}
          </div>
          
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .profile-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
