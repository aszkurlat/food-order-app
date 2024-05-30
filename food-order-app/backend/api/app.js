import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import { Meal, Order } from "./model.js";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Ustaw limit czasu na połączenie
      socketTimeoutMS: 45000, // Ustaw limit czasu na działanie socketu
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Disconnected from MongoDB");
  process.exit(0);
});

// Endpoint GET /api/meals
app.get("/api/meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    console.error("Error reading meals data:", error);
    res.status(500).json({ message: "Could not read meals data." });
  }
});
// Endpoint GET /api/orders (optional)
// app.get("/api/orders", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (error) {
//     console.error("Error reading orders data:", error);
//     res.status(500).json({ message: "Could not read orders data." });
//   }
// });

// Endpoint POST /api/orders
app.post(
  "/api/orders",
  [
    body("order.items").isArray().withMessage("Items must be an array"),
    body("order.customer")
      .isObject()
      .withMessage("Customer data must be an object"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const orderData = req.body.order;

    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ message: "Missing data." });
    }

    try {
      const newOrder = await Order.create(orderData);
      res.status(201).json({ message: "Order created!", order: newOrder });
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ message: "Could not save the order." });
    }
  }
);

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
