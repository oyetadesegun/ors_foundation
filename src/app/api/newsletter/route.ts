import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Newsletter from "@/models/newsletter";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await connectDB();

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "You are already subscribed!" },
        { status: 200 }
      );
    }

    await Newsletter.create({ email });

    // 2. Send Congratulatory Email
    try {
      if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: process.env.ADMIN_SERVICE,
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"ORS Foundation" <${process.env.ADMIN_EMAIL}>`,
          to: email,
          subject: "Welcome to ORS Foundation - Newsletter Subscription Confirmed!",
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h2 style="color: #004a99; text-align: center;">🎉 Congratulations!</h2>
              <p>Hello,</p>
              <p>Thank you for subscribing to the <strong>ORS Foundation</strong> newsletter! We are thrilled to have you join our community.</p>
              <p>You'll now be the first to receive updates on our latest causes, success stories, and upcoming events. Your support helps us make a real difference.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || '#'}" style="background-color: #004a99; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
              </div>
              <p>If you have any questions or would like to get involved further, feel free to reply to this email.</p>
              <p>Warm regards,<br/><strong>The ORS Foundation Team</strong></p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 0.8em; color: #888; text-align: center;">
                You are receiving this email because you signed up for the ORS Foundation newsletter.
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      }
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // We don't fail the subscription if the email fails
    }

    return NextResponse.json(
      { message: "Successfully subscribed to our newsletter!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await verifyToken(req);
    await connectDB();
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    return NextResponse.json(subscribers);
  } catch (error: any) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: error.message === "Unauthorized" ? "Unauthorized" : "Failed to fetch subscribers." },
      { status: error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
