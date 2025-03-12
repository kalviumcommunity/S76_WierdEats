const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('./schema'); // Ensure you have the User schema imported


const foodSchema = new mongoose.Schema({
    food_combinations: Array,
});

const Food = mongoose.model("food_combinations", foodSchema);


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

// Get all users (GET)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a user by ID (PUT)
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a user by ID (DELETE)
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ **Food Routes**

// Get all food combinations (GET)
router.get("/foods", async (req, res) => {
    try {
        const foodData = await Food.find(); // Returns an array
        if (foodData.length > 0) {
            const allFoodCombinations = foodData.flatMap(item => item.food_combinations);
            res.json(allFoodCombinations);
        } else {
            res.status(404).json({ message: "No food combinations found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching food combinations" });
    }
});


module.exports = router;
