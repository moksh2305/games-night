import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { bookTicket } from '@/app/actions';
import { redirect } from 'next/navigation';

import BookEventForm from '@/components/BookEventForm';
import RealtimeCounter from '@/components/RealtimeCounter';
import PostHogPageTracker from '@/components/PostHogPageTracker';

export const revalidate = 5;

export default async function BookEventPage(props: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const params = await props.params;
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: { _count: { select: { bookings: true } } }
  });

  if (!event) {
    redirect('/events');
  }

  const isSoldOut = event._count.bookings >= event.capacity;

  return (
    <section className="page active" style={{ padding: '2rem' }}>
      <PostHogPageTracker 
        eventName="booking_page_opened" 
        properties={{ eventId: event.id, eventName: event.title }} 
      />
      <header>
        <div>
          <h1>Book Ticket</h1>
          <p className="subtitle">Secure your spot for {event.title}</p>
        </div>
      </header>

      <div style={{ maxWidth: '600px', margin: '2rem 0', background: 'var(--glass-bg)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--neon-purple)' }}>{event.title} - {event.price === 0 ? 'FREE' : '$' + event.price}</h3>
        
        <RealtimeCounter eventId={event.id} initialCount={event._count.bookings} capacity={event.capacity} />
        <br />
        
        <BookEventForm eventId={event.id} price={event.price} isSoldOut={isSoldOut} />
      </div>
    </section>
  );
}
