import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from "@/lib/email-service";

export async function POST(request: Request) {
  try {
    const jobApplications = await prisma.jobApplication.findMany({
      include: {
        user: true,
      },
    });

    for (const application of jobApplications) {
      const { user, status } = application;

      await prisma.notification.create({
        data: {
          userId: user.id,
          type: 'application_update',
          message: `Your application status is now: ${status}`,
        },
      });

      await sendEmail({
        to: user.email,
        template: {
          subject: "Application Update",
          html: `<h1>Your application status is now: ${status}</h1>`,
          text: `Your application status is now: ${status}`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Notifications and emails sent successfully',
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error sending notifications:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: error,
    }, { status: 500 });
  }
}