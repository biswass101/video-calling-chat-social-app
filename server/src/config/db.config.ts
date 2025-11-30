import mongoose from "mongoose";
import { EnvConfig } from "./env.config";

export class DBConfig {
  private config: EnvConfig;
  constructor() {
    this.config = new EnvConfig();
  }

  async connectDB() {
    try {
      const conn = await mongoose.connect(this.config.getDBConfig().uri!);
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
      if (err instanceof mongoose.Error.MongooseServerSelectionError) {
        console.error("❌ Cannot connect to MongoDB", err.message);
      } else if (err instanceof mongoose.Error) {
        console.error("General Mongoose error");
      } else {
        console.error("Unknown error", err);
      }
    process.exit(1);

    }
  }
}
