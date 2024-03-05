import express from "express";
import bodyParser from "body-parser";
import { Item, Item2, Item3, connectToMongoDB } from "./mongodb.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

connectToMongoDB();

//Today

app.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (error) {
    console.log("Error fetching posts:");
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  const itemName = req.body.newItem;
  const item = new Item({
    title: itemName,
  });

  try {
    await item.save();
    res.redirect("/");
  } catch (error) {
    console.error("Please add a note");
    res.redirect("/");
  }
});

app.post("/edit", async (req, res) => {
  const { updatedItemTitle, updatedItemId } = req.body;

  try {
    const itemToUpdate = await Item.findById(updatedItemId);
    if (!itemToUpdate) {
      return res.status(404).send("Item not found");
    }
    itemToUpdate.title = updatedItemTitle;
    await itemToUpdate.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", async (req, res) => {
  const itemIdToDelete = req.body.deleteItemId;
  try {
    const deletedItem = await Item.deleteOne({ _id: itemIdToDelete });
    if (!deletedItem) {
      return res.status(404).send("Item not found");
    }
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Week

app.get("/week", async (req, res) => {
  try {
    const items = await Item2.find();
    res.render("week.ejs", {
      listTitle: "Week",
      listItems: items,
    });
  } catch (error) {
    console.log("Error fetching posts:");
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add-week", async (req, res) => {
  const itemName = req.body.newItem;
  const item = new Item2({
    title: itemName,
  });

  try {
    await item.save();
    res.redirect("/week");
  } catch (error) {
    console.error("Please add a note");
    res.redirect("/week");
  }
});

app.post("/edit-week", async (req, res) => {
  const { updatedItemTitle, updatedItemId } = req.body;

  try {
    const itemToUpdate = await Item2.findById(updatedItemId);
    if (!itemToUpdate) {
      return res.status(404).send("Item not found");
    }
    itemToUpdate.title = updatedItemTitle;
    await itemToUpdate.save();
    res.redirect("/week");
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete-week", async (req, res) => {
  const itemIdToDelete = req.body.deleteItemId;
  try {
    const deletedItem = await Item2.deleteOne({ _id: itemIdToDelete });
    if (!deletedItem) {
      return res.status(404).send("Item not found");
    }
    res.redirect("/week");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Month

app.get("/month", async (req, res) => {
  try {
    const items = await Item3.find();
    res.render("month.ejs", {
      listTitle: "Month",
      listItems: items,
    });
  } catch (error) {
    console.log("Error fetching posts:");
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add-month", async (req, res) => {
  const itemName = req.body.newItem;
  const item = new Item3({
    title: itemName,
  });

  try {
    await item.save();
    res.redirect("/month");
  } catch (error) {
    console.error("Please add a note");
    res.redirect("/month");
  }
});

app.post("/edit-month", async (req, res) => {
  const { updatedItemTitle, updatedItemId } = req.body;

  try {
    const itemToUpdate = await Item3.findById(updatedItemId);
    if (!itemToUpdate) {
      return res.status(404).send("Item not found");
    }
    itemToUpdate.title = updatedItemTitle;
    await itemToUpdate.save();
    res.redirect("/month");
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete-month", async (req, res) => {
  const itemIdToDelete = req.body.deleteItemId;
  try {
    const deletedItem = await Item3.deleteOne({ _id: itemIdToDelete });
    if (!deletedItem) {
      return res.status(404).send("Item not found");
    }
    res.redirect("/month");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
