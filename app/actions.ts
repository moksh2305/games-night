'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function bookTicket(formData: FormData) {
  const eventId = formData.get('eventId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const age = parseInt(formData.get('age') as string);
  const address = formData.get('address') as string;
  const paymentMethod = formData.get('paymentMethod') as string;

  try {
    await prisma.booking.create({
      data: {
        eventId,
        name,
        email,
        age,
        address,
        paymentMethod,
        status: 'Confirmed',
      },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('You have already booked a ticket for this event.');
    }
    throw new Error('An unexpected error occurred.');
  }

  revalidatePath('/mytickets');
  redirect('/mytickets');
}
