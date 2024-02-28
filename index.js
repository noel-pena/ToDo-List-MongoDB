import express from "express";
import bodyParser from "body-parser";
import clientPromise from "./mongodb.js";
import connectToMongoDB from "./mongodb.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

connectToMongoDB();

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
