'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'bx-grid-alt' },
    { name: 'Events', path: '/events', icon: 'bx-calendar-event' },
    { name: 'My Tickets', path: '/mytickets', icon: 'bx-receipt' },
    { name: 'Bookings', path: '/bookings', icon: 'bx-check-square' },
    { name: 'Rewards', path: '/rewards', icon: 'bx-gift' },
    { name: 'Profile', path: '/profile', icon: 'bx-user' },
  ];

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
          <li>
            <Link href="/logout">
              <i className="bx bx-log-out"></i>
              <span className="links_name">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
