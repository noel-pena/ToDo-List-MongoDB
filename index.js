import express from "express";
import bodyParser from "body-parser";
import { Item, connectToMongoDB } from "./mongodb.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

connectToMongoDB();

app.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    console.log(items);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (error) {
    console.log("Error fetching posts:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
