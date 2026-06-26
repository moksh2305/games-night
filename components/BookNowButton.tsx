'use client';

import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';

interface BookNowButtonProps {
  eventId: string;
  isSoldOut: boolean;
  className?: string;
}

export default function BookNowButton({ eventId, isSoldOut, className }: BookNowButtonProps) {
  const posthog = usePostHog();

  const handleClick = () => {
    if (posthog && !isSoldOut) {
      posthog.capture('book_now_clicked', { eventId });
    }
  };

  return (
    <Link href={`/events/${eventId}/book`}>
      <button 
        onClick={handleClick}
        className={className || `btn ${isSoldOut ? 'btn-secondary' : 'btn-outline glow'}`}
      >
        {isSoldOut ? 'Sold Out' : 'Book Now'}
      </button>
    </Link>
  );
}
