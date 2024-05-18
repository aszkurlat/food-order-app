import fs from "fs/promises";
import path from "path";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

// set headers CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// path to files JSON
const dataPath = path.join(process.cwd(), "data");

// Endpoint for meals
app.get("/api/meals", async (req, res) => {
  try {
    const meals = await fs.readFile(
      path.join(dataPath, "available-meals.json"),
      "utf8"
    );
    res.json(JSON.parse(meals));
  } catch (error) {
    console.error("Error reading meals data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint for orders
app.post("/api/orders", async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Missing data." });
  }

  const requiredFields = ["email", "name", "street", "postal-code", "city"];
  const missingFields = requiredFields.filter(
    (field) => !orderData.customer[field]
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing data: ${missingFields.join(", ")} is missing.`,
    });
  }

  try {
    const orders = await fs.readFile(
      path.join(dataPath, "orders.json"),
      "utf8"
    );
    const allOrders = JSON.parse(orders);
    const newOrder = { ...orderData, id: (Math.random() * 1000).toString() };
    allOrders.push(newOrder);
    await fs.writeFile(
      path.join(dataPath, "orders.json"),
      JSON.stringify(allOrders)
    );
    res.status(201).json({ message: "Order created!" });
  } catch (error) {
    console.error("Error writing order data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Obsługa innych ścieżek
app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: "Not found" });
});

export default app;
