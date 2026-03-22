import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env");

let isConnected = false;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected ✅");
  } catch (err: any) {
    console.error("MongoDB Connection Error ❌:", err.message);
    throw new Error(`Failed to connect to database: ${err.message}`);
  }
};
