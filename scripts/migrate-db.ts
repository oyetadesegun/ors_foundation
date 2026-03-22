import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const SOURCE_URI = process.env.MONGODB_URI!;
const DEST_URI = "mongodb+srv://ors_foundation:root@cluster0.zohh0f2.mongodb.net/ormFoundation?retryWrites=true&w=majority";

if (!SOURCE_URI || !DEST_URI) {
  console.error("Missing source or destination URI");
  process.exit(1);
}

async function migrate() {
  try {
    console.log("Connecting to Source DB...");
    const sourceConnection = await mongoose.createConnection(SOURCE_URI).asPromise();
    console.log("Connected to Source DB ✅");

    console.log("Connecting to Destination DB...");
    const destConnection = await mongoose.createConnection(DEST_URI).asPromise();
    console.log("Connected to Destination DB ✅");

    if (!sourceConnection.db) throw new Error("Source database connection failed");
    const collections = await sourceConnection.db.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      if (collectionName.startsWith("system.")) continue;

      console.log(`Migrating collection: ${collectionName}...`);
      
      const sourceCol = sourceConnection.collection(collectionName);
      const destCol = destConnection.collection(collectionName);

      const data = await sourceCol.find({}).toArray();
      console.log(`Found ${data.length} documents in ${collectionName}.`);

      if (data.length > 0) {
        // Clear destination collection first
        await destCol.deleteMany({});
        // Insert many
        await destCol.insertMany(data);
        console.log(`Successfully migrated ${data.length} documents to ${collectionName}. ✅`);
      } else {
        console.log(`Skipping ${collectionName} as it is empty.`);
      }
    }

    console.log("Migration completed successfully! 🚀");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed! ❌");
    console.error(error);
    process.exit(1);
  }
}

migrate();
