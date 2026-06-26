'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Sidebar({ session }: { session: any }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'bx-grid-alt' },
    { name: 'Events', path: '/events', icon: 'bx-calendar-event' },
    { name: 'My Tickets', path: '/mytickets', icon: 'bx-receipt' },
    { name: 'Community Perks', path: '/rewards', icon: 'bx-medal' },
    { name: 'Profile', path: '/profile', icon: 'bx-user' },
  ];

  if (session?.user?.email === 'moksh230305@gmail.com') {
    navItems.push({ name: 'Admin Hub', path: '/admin', icon: 'bx-shield-quarter' });
  }

  return (
    <nav className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">🎲</div>
        <h1 className="logo-text">GAMES<br/>NIGHT</h1>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.path} className={pathname === item.path ? 'active' : ''}>
            <Link href={item.path}>
              <i className={`bx ${item.icon}`}></i>
              <span className="links_name">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="bottom-nav">
        <ul>
          {session ? (
            <li>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="bottom-nav-link"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', background: 'transparent', border: 'none', padding: '12px 16px', cursor: 'pointer', width: '100%' }}
              >
                <img src={session.user.image || ''} alt="User" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                <span className="links_name">Logout</span>
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', textDecoration: 'none', padding: '12px 16px' }}>
                <i className="bx bx-log-in"></i>
                <span className="links_name">Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
