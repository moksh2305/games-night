'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function bookTicket(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.email) {
    return { error: 'You must be logged in to book a ticket.' };
  }
  
  const eventId = formData.get('eventId') as string;
  const name = formData.get('name') as string;
  const email = session.user.email;
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
        userId: session.user.id,
        name,
        email,
        age,
        address,
        paymentMethod: 'Free',
        status: 'Confirmed',
      },
    });

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        title: `Booked ticket for ${event.title}`,
        type: 'Booking',
      }
    });

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'AYSG Games Night <onboarding@resend.dev>',
        to: email,
        subject: `Your Ticket to ${event.title}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>You're going to ${event.title}!</h2>
            <p>Hi ${name},</p>
            <p>Your ticket is confirmed. We can't wait to see you.</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Venue:</strong> ${event.venue}</p>
            <br/>
            <a href="https://aysg-games-night.vercel.app/mytickets" style="background: #a855f7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View your Boarding Pass</a>
          </div>
        `
      });
    }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'You have already booked a ticket for this event with this email.' };
    }
    return { error: 'An unexpected error occurred.' };
  }


  revalidatePath('/mytickets');
  revalidatePath(`/events/${eventId}/book`);
  return { success: true };
}

export async function addTestimonial(formData: FormData) {
  const content = formData.get('content') as string;
  if (!content || content.trim().length === 0) return { error: 'Testimonial cannot be empty' };

  const session = await auth();
  if (!session?.user) return { error: 'Must be logged in' };

  try {
    await prisma.testimonial.create({
      data: {
        name: session.user.name || 'Anonymous',
        role: 'Participant',
        content,
      }
    });
  } catch (error) {
    return { error: 'Failed to post testimonial' };
  }

  revalidatePath('/');
  return { success: true };
}

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Not authenticated' };

  try {
    const phone = formData.get('phone') as string;
    const occupation = formData.get('occupation') as string;
    const college = formData.get('college') as string;
    const bio = formData.get('bio') as string;
    const favoriteGames = formData.getAll('favoriteGames').join(',');
    const preferredEventType = formData.get('preferredEventType') as string;
    
    // Convert multiple checkboxes for notifications into a comma-separated string
    const notificationPrefs = formData.getAll('notificationPrefs').join(',');

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        phone,
        occupation,
        college,
        bio,
        favoriteGames,
        preferredEventType,
        notificationPrefs,
      },
    });

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        title: 'Updated profile preferences',
        type: 'Profile',
      }
    });

    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { error: 'Failed to update profile' };
  }
}
