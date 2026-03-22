import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info.orsfoundation@gmail.com";
const DEFAULT_PASSWORD = "AdminPassword123!"; // User should change this later

async function setupAdmin() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected!");

    // Import or define User schema directly to be safe in standalone script
    const UserSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: { type: String },
      role: { type: String, default: "user" }
    });
    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      if (existingAdmin.role === "admin") {
        console.log(`Admin account already exists for ${ADMIN_EMAIL} ✅`);
      } else {
        console.log(`User ${ADMIN_EMAIL} exists but is NOT an admin. Promoting to admin...`);
        existingAdmin.role = "admin";
        await existingAdmin.save();
        console.log("Promotion successful! ✅");
      }
    } else {
      console.log(`No user found for ${ADMIN_EMAIL}. Creating new admin...`);
      const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
      await User.create({
        name: "ORS Admin",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin"
      });
      console.log(`Admin account created! 🥂`);
      console.log(`Email: ${ADMIN_EMAIL}`);
      console.log(`Password: ${DEFAULT_PASSWORD} (Please change this immediately)`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error setting up admin:", error);
    process.exit(1);
  }
}

setupAdmin();
