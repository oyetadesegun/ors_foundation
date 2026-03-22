import mongoose from "mongoose";

const newUri = "mongodb+srv://ors_foundation:root@cluster0.zohh0f2.mongodb.net/ormFoundation?retryWrites=true&w=majority";

async function testConnection() {
  try {
    console.log("Connecting to new MongoDB...");
    await mongoose.connect(newUri);
    console.log("Connection successful! ✅");
    process.exit(0);
  } catch (error) {
    console.error("Connection failed! ❌");
    console.error(error);
    process.exit(1);
  }
}

testConnection();
