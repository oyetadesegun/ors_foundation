import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

async function checkAdmin() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected! Checking for admin users...");

    const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
      role: String,
      email: String
    }));

    const admins = await User.find({ role: "admin" });
    if (admins.length > 0) {
      console.log(`Found ${admins.length} admin(s):`);
      admins.forEach(admin => console.log(`- ${admin.email}`));
    } else {
      console.log("No admin users found. ❌");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error checking for admin:", error);
    process.exit(1);
  }
}

checkAdmin();
