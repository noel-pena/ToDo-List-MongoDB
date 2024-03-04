// mongodb.mjs
import mongoose from "mongoose";

const dbUrl =
  "mongodb+srv://noelpena:2365@cluster0.xbaexmf.mongodb.net/?retryWrites=true&w=majority";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const Item = mongoose.model("Items_today", itemSchema);
const Item2 = mongoose.model("Items_week", itemSchema);
const Item3 = mongoose.model("Items_month", itemSchema);

async function connectToMongoDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export { Item, Item2, Item3, connectToMongoDB };
