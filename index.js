import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Permalist",
  password: "",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items;

//Today
app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  items = result.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const input = await db.query("INSERT INTO items (title) values ($1)", [item]);
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const data = await db.query("SELECT * FROM items ORDER BY id ASC");
  const updateTitle = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  const pushUpdate = await db.query(
    "UPDATE items SET title = ($1) WHERE id = ($2)",
    [updateTitle, id]
  );
  console.log(updateTitle);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const data = await db.query("SELECT * FROM items ORDER BY id ASC");
  const id = req.body.deleteItemId;
  const pushDelete = await db.query("DELETE FROM items WHERE id=($1)", [id]);
  console.log(id);
  res.redirect("/");
});

//Month
app.get("/month", async (req, res) => {
  const result = await db.query("SELECT * FROM items_month ORDER BY id ASC");
  items = result.rows;
  res.render("month.ejs", {
    listTitle: "Month",
    listItems: items,
  });
});

app.post("/add-month", async (req, res) => {
  const item = req.body.newItem;
  const input = await db.query("INSERT INTO items_month (title) values ($1)", [
    item,
  ]);
  items.push({ title: item });
  res.redirect("/month");
});

app.post("/edit-month", async (req, res) => {
  const data = await db.query("SELECT * FROM items_month ORDER BY id ASC");
  const updateTitle = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  const pushUpdate = await db.query(
    "UPDATE items_month SET title = ($1) WHERE id = ($2)",
    [updateTitle, id]
  );
  console.log(updateTitle);
  res.redirect("/month");
});

app.post("/delete-month", async (req, res) => {
  const data = await db.query("SELECT * FROM items_month ORDER BY id ASC");
  const id = req.body.deleteItemId;
  const pushDelete = await db.query("DELETE FROM items_month WHERE id=($1)", [
    id,
  ]);
  console.log(id);
  res.redirect("/month");
});

//Week
app.get("/Week", async (req, res) => {
  const result = await db.query("SELECT * FROM items_week ORDER BY id ASC");
  items = result.rows;
  res.render("week.ejs", {
    listTitle: "Week",
    listItems: items,
  });
});

app.post("/add-week", async (req, res) => {
  const item = req.body.newItem;
  const input = await db.query("INSERT INTO items_week (title) values ($1)", [
    item,
  ]);
  items.push({ title: item });
  res.redirect("/week");
});

app.post("/edit-week", async (req, res) => {
  const data = await db.query("SELECT * FROM items_week ORDER BY id ASC");
  const updateTitle = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  const pushUpdate = await db.query(
    "UPDATE items_week SET title = ($1) WHERE id = ($2)",
    [updateTitle, id]
  );
  console.log(updateTitle);
  res.redirect("/week");
});

app.post("/delete-week", async (req, res) => {
  const data = await db.query("SELECT * FROM items_week ORDER BY id ASC");
  const id = req.body.deleteItemId;
  const pushDelete = await db.query("DELETE FROM items_week WHERE id=($1)", [
    id,
  ]);
  console.log(id);
  res.redirect("/week");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
