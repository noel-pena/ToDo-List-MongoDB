// mongodb.js
import mongoose from "mongoose";

// const dbUrl = process.env.MONGODB_URI;
const dbUrl =
  "mongodb+srv://noelpena:2365@cluster0.xbaexmf.mongodb.net/?retryWrites=true&w=majority";

async function connectToMongoDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectToMongoDB;
