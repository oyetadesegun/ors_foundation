import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // 1. Save to Database
    await connectDB();
    await Contact.create({ name, email, phone, message });

    // 2. Attempt to send email
    let emailSent = false;
    try {
      if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: process.env.ADMIN_SERVICE,
          host: process.env.ADMIN_HOST,
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"${name}" <${email}>`,
          to: process.env.ADMIN_EMAIL,
          subject: "New Contact Form Submission",
          text: `
            You have a new message from ${name} (${email}):
            -------------------------------------
            ${message}
          `,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6;">
              <h2>📬 New Contact Message</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } else {
        console.warn("Email service not configured. Skipping email send.");
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // We don't throw here because the message is already saved to the database.
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? "Message sent successfully!"
        : "Message received and saved successfully (email notification skipped).",
    });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await verifyToken(req);
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error: any) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: error.message === "Unauthorized" || error.message === "Invalid token" ? "Unauthorized" : "Failed to fetch messages." },
      { status: error.message === "Unauthorized" || error.message === "Invalid token" ? 401 : 500 }
    );
  }
}
