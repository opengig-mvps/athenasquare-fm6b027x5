import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const jobApplications = await prisma.jobApplication.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            name: true,
          },
        },
        statusHistory: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Job applications fetched successfully',
      data: jobApplications,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching job applications:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: error,
    }, { status: 500 });
  }
}