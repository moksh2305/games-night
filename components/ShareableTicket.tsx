'use client';

import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';

export default function ShareableTicket({ booking }: { booking: any }) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    if (!ticketRef.current) return;
    setIsGenerating(true);

    try {
      // Generate image
      const dataUrl = await toPng(ticketRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      // Try native share API if available
      if (navigator.share) {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], 'aysg-ticket.png', { type: 'image/png' });

        try {
          await navigator.share({
            title: 'My AYSG Games Night Ticket',
            text: 'I just booked my ticket for the upcoming AYSG Games Night! Join me!',
            files: [file]
          });
          setIsGenerating(false);
          return;
        } catch (shareError: any) {
          if (shareError.name !== 'AbortError') {
            console.error('Share failed:', shareError);
          }
        }
      }

      // Fallback to download
      const link = document.createElement('a');
      link.download = 'aysg-ticket.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate ticket image', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
      
      {/* The actual ticket that gets captured */}
      <div 
        ref={ticketRef} 
        style={{ 
          width: '100%', 
          maxWidth: '380px', 
          background: 'var(--bg-card)', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          border: '1px solid var(--glass-border)',
          fontFamily: "'Clash Display', sans-serif"
        }}
      >
        {/* Header Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #a855f7, #ec4899)', 
          padding: '2rem 1rem 3rem 1rem', 
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Subtle background pattern could go here */}
          <h2 style={{ color: 'white', margin: 0, letterSpacing: '2px', fontSize: '1.2rem', fontWeight: 600 }}>BOARDING PASS</h2>
        </div>

        {/* Main Ticket Body */}
        <div style={{ 
          background: 'white', 
          margin: '-1.5rem 0.5rem 0 0.5rem', 
          borderRadius: '16px',
          padding: '1.5rem',
          position: 'relative'
        }}>
          
          {/* Top Row: HOME to AYSG */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h1 style={{ color: '#ec4899', fontSize: '2.5rem', margin: 0, lineHeight: 1 }}>HOME</h1>
              <p style={{ color: '#6b7280', fontSize: '0.7rem', fontWeight: 600, margin: '4px 0 0 0', textTransform: 'uppercase' }}>Origin</p>
              <p style={{ color: '#9ca3af', fontSize: '0.65rem', margin: 0 }}>{booking.event.date}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h1 style={{ color: '#a855f7', fontSize: '2.5rem', margin: 0, lineHeight: 1 }}>AYSG</h1>
              <p style={{ color: '#6b7280', fontSize: '0.7rem', fontWeight: 600, margin: '4px 0 0 0', textTransform: 'uppercase' }}>Destination</p>
              <p style={{ color: '#9ca3af', fontSize: '0.65rem', margin: 0 }}>9:00 PM</p>
            </div>
          </div>

          {/* Airplane Divider */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ec4899' }}>
            <div style={{ height: '2px', flex: 1, borderTop: '2px dashed #fbcfe8' }}></div>
            <i className='bx bxs-plane-alt' style={{ fontSize: '1.5rem', transform: 'rotate(90deg)' }}></i>
            <div style={{ height: '2px', flex: 1, borderTop: '2px dashed #fbcfe8' }}></div>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0 0 4px 0' }}>Passenger</p>
              <p style={{ color: '#111827', fontSize: '1.1rem', fontWeight: 600, margin: 0, textTransform: 'uppercase' }}>{booking.name}</p>
            </div>
            <div>
              <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0 0 4px 0' }}>Event</p>
              <p style={{ color: '#111827', fontSize: '1.1rem', fontWeight: 600, margin: 0, textTransform: 'uppercase' }}>{booking.event.title}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div>
              <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0 0 4px 0' }}>Seat</p>
              <p style={{ color: '#111827', fontSize: '1rem', fontWeight: 600, margin: 0 }}>FREE</p>
            </div>
            <div>
              <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0 0 4px 0' }}>Gate</p>
              <p style={{ color: '#111827', fontSize: '1rem', fontWeight: 600, margin: 0 }}>VIP</p>
            </div>
            <div>
              <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0 0 4px 0' }}>Terminal</p>
              <p style={{ color: '#111827', fontSize: '1rem', fontWeight: 600, margin: 0 }}>T1</p>
            </div>
          </div>
        </div>

        {/* Perforated Line */}
        <div style={{ position: 'relative', height: '20px', background: 'white', margin: '0 0.5rem' }}>
          <div style={{ position: 'absolute', left: '-15px', top: 0, width: '30px', height: '30px', background: 'var(--bg-card)', borderRadius: '50%', borderRight: '1px solid var(--glass-border)' }}></div>
          <div style={{ position: 'absolute', right: '-15px', top: 0, width: '30px', height: '30px', background: 'var(--bg-card)', borderRadius: '50%', borderLeft: '1px solid var(--glass-border)' }}></div>
          <div style={{ borderTop: '2px dashed #e5e7eb', width: '100%', position: 'absolute', top: '15px' }}></div>
        </div>

        {/* Barcode Section */}
        <div style={{ background: 'white', margin: '0 0.5rem 0.5rem 0.5rem', padding: '1.5rem', borderRadius: '0 0 16px 16px', textAlign: 'center' }}>
          <div style={{ 
            height: '60px', 
            background: `repeating-linear-gradient(90deg, #111827 0, #111827 2px, transparent 2px, transparent 4px, #111827 4px, #111827 8px, transparent 8px, transparent 10px, #111827 10px, #111827 12px)`, 
            width: '100%', 
            opacity: 0.8
          }}></div>
        </div>

      </div>

      {/* Action Button */}
      <button 
        onClick={handleShare}
        disabled={isGenerating}
        className="btn btn-primary glow"
        style={{ 
          marginTop: '1.5rem', 
          width: '100%', 
          maxWidth: '380px', 
          justifyContent: 'center',
          fontSize: '1.1rem',
          padding: '1rem'
        }}
      >
        <i className='bx bx-share-alt' ></i> {isGenerating ? 'GENERATING...' : 'DOWNLOAD TICKET'}
      </button>

    </div>
  );
}
