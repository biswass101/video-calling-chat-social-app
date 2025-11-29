import mongoose from "mongoose";
import { config } from "./env.config";

const MONGO_URI = config.db.uri;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI as string);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
};