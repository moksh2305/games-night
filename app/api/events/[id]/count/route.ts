import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const count = await prisma.booking.count({
      where: { eventId: params.id },
    });
    
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch count' }, { status: 500 });
  }
}
