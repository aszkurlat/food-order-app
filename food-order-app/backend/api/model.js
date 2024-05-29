import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  description: String,
  image: String,
  quantity: Number,
});

const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
  },
  id: String,
});

const Meal = mongoose.model("Meal", mealSchema);
const Order = mongoose.model("Order", orderSchema);

export { Meal, Order };
