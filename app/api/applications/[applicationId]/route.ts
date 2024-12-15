import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { applicationId: string } }
) {
  try {
    const applicationId = parseInt(params.applicationId, 10);
    if (isNaN(applicationId)) {
      return NextResponse.json({ success: false, message: 'Invalid application ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;
    if (!status) {
      return NextResponse.json({ success: false, message: 'Missing status field' }, { status: 400 });
    }

    const application = await prisma.jobApplication.findFirst({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }

    await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status, updatedAt: new Date() },
    });

    await prisma.statusHistory.create({
      data: {
        jobApplicationId: applicationId,
        status,
        changeDate: new Date(),
      },
    });

    const updatedApplication = await prisma.jobApplication.findFirst({
      where: { id: applicationId },
      include: { statusHistory: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Application status updated successfully',
      data: updatedApplication,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating application status:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}