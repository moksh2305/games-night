'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RealtimeCounter({ eventId, initialCount, capacity }: { eventId: string, initialCount: number, capacity: number }) {
  const { data } = useSWR(`/api/events/${eventId}/count`, fetcher, {
    refreshInterval: 2000, // Poll every 2 seconds for a live feel
    fallbackData: { count: initialCount }
  });

  const count = data?.count ?? initialCount;
  const isSoldOut = count >= capacity;

  return (
    <div className="realtime-counter" style={{ padding: '0.8rem', background: '#1c1c38', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', border: isSoldOut ? '1px solid #ff3c3c' : '1px solid var(--glass-border)' }}>
      <div className={`status-dot ${isSoldOut ? 'sold-out' : 'live'}`}></div>
      <p style={{ margin: 0, fontWeight: 600, color: isSoldOut ? '#ff3c3c' : '#00e5ff' }}>
        {isSoldOut ? 'Sold Out' : 'Live Bookings'}
      </p>
      <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{count} / {capacity} Booked</span>

      <style jsx>{`
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .status-dot.live {
          background-color: #00e5ff;
          box-shadow: 0 0 8px #00e5ff;
          animation: pulse 1.5s infinite;
        }
        .status-dot.sold-out {
          background-color: #ff3c3c;
          box-shadow: 0 0 8px #ff3c3c;
        }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
