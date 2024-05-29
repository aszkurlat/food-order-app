import fs from "node:fs/promises";
import path from "path";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  try {
    const meals = await fs.readFile(
      path.join(__dirname, "../data/available-meals.json"),
      "utf8"
    );
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: "Could not read meals data." });
  }
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    !orderData.customer.email ||
    !orderData.customer.email.includes("@") ||
    !orderData.customer.name ||
    orderData.customer.name.trim() === "" ||
    !orderData.customer.street ||
    orderData.customer.street.trim() === "" ||
    !orderData.customer["postal-code"] ||
    orderData.customer["postal-code"].trim() === "" ||
    !orderData.customer.city ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  try {
    const orders = await fs.readFile(
      path.join(__dirname, "../data/orders.json"),
      "utf8"
    );
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile(
      path.join(__dirname, "../data/orders.json"),
      JSON.stringify(allOrders)
    );
    res.status(201).json({ message: "Order created!" });
  } catch (error) {
    res.status(500).json({ message: "Could not save the order." });
  }
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: "Not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});