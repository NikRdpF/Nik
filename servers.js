const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/pebletpay", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const OrderSchema = new mongoose.Schema({
    tujuan: String,
    whatsapp: String,
    email: String,
    paymentMethod: String,
});

const Order = mongoose.model("Order", OrderSchema);

app.post("/submit-order", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.json({ message: "Order submitted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error submitting order" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
