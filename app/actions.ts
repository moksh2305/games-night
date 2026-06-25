'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function bookTicket(prevState: any, formData: FormData) {
  const eventId = formData.get('eventId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const age = parseInt(formData.get('age') as string);
  const address = formData.get('address') as string;
  
  try {
    // Check capacity first
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { bookings: true } } }
    });
    
    if (!event) return { error: 'Event not found.' };
    if (event._count.bookings >= event.capacity) {
      return { error: 'Sorry! This event is sold out.' };
    }

    await prisma.booking.create({
      data: {
        eventId,
        name,
        email,
        age,
        address,
        paymentMethod: 'Free',
        status: 'Confirmed',
      },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'You have already booked a ticket for this event with this email.' };
    }
    return { error: 'An unexpected error occurred.' };
  }

  revalidatePath('/mytickets');
  revalidatePath(`/events/${eventId}/book`);
  redirect('/mytickets');
}
