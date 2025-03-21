const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('./schema'); // Import User schema

// Define food schema
const foodSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    cuisine: { type: String, required: true },
    meal_type: { type: String, required: true }
});

// Define model
const Food = mongoose.model("food_combinations", foodSchema);

// ---------------- USER ROUTES ----------------

router.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ---------------- FOOD ROUTES ----------------

// ✅ **Fetch all food combinations (New & Old)**
router.get("/foods", async (req, res) => {
    try {
        const allFoods = await Food.find(); // Get all food items
        res.status(200).json(allFoods); // Return all items
    } catch (error) {
        res.status(500).json({ message: "Error fetching food combinations" });
    }
});

// ✅ **Add new food combination without overwriting existing ones**
router.post("/foods", async (req, res) => {
    try {
        const { id, name, ingredients, cuisine, meal_type } = req.body;

        // Check if food with the same ID exists
        const existingFood = await Food.findOne({ id });
        if (existingFood) {
            return res.status(400).json({ message: "Food ID already exists" });
        }

        const newFood = new Food({ id, name, ingredients, cuisine, meal_type });
        await newFood.save();

        res.status(201).json(newFood);
    } catch (error) {
        res.status(500).json({ message: "Error adding food combination" });
    }
});

// ✅ **Update an existing food combination**
router.put("/foods/:id", async (req, res) => {
    try {
        const updatedFood = await Food.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(500).json({ message: "Error updating food combination" });
    }
});

// ✅ **Delete a food combination**
router.delete("/foods/:id", async (req, res) => {
    try {
        const deletedFood = await Food.findOneAndDelete({ id: req.params.id });
        if (!deletedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting food combination" });
    }
});

router.get("/foods/:id", async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: "Food not found" });
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: "Error fetching food item" });
    }
});
module.exports = router;
