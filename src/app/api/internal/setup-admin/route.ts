import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { hashPassword } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    
    const adminEmail = process.env.ADMIN_EMAIL || "info.orsfoundation@gmail.com";
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return NextResponse.json({
        message: "Admin account already exists.",
        adminEmail: existingAdmin.email,
        status: "ready"
      });
    }

    // Check if the configured admin email exists as a normal user
    const userForAdmin = await User.findOne({ email: adminEmail });
    if (userForAdmin) {
      userForAdmin.role = "admin";
      await userForAdmin.save();
      return NextResponse.json({
        message: `User ${adminEmail} promoted to Admin.`,
        status: "promoted"
      });
    }

    // Create new admin if no admin and no user with that email exists
    const hashedPassword = await hashPassword("AdminPassword123!");
    await User.create({
      name: "ORS Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    return NextResponse.json({
      message: "Initial Admin account created.",
      adminEmail: adminEmail,
      password: "AdminPassword123!",
      status: "created"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
