const express = require('express');
const mongoose = require('mongoose');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const Food = require('../models/food'); // Your User model

// 🔁 Updated Food schema with reference to User
// const foodSchema = new mongoose.Schema({
//     id: { type: Number, required: true, unique: true },
//     name: { type: String, required: true },
//     ingredients: { type: [String], required: true },
//     cuisine: { type: String, required: true },
//     meal_type: { type: String, required: true },
//     created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });

// const Food = mongoose.model("food_combinations", foodSchema);

// Middleware for validation
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

// ----------------- USER ROUTES -----------------
router.post('/users',
    [
        body('name').isString().notEmpty(),
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'name email');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----------------- FOOD ROUTES -----------------

// ✅ Create food (linked to a user by ID)
router.post("/foods",
    [
        body('id').isInt({ min: 1 }),
        body('name').isString().notEmpty(),
        body('ingredients').isArray().notEmpty(),
        body('cuisine').isString().notEmpty(),
        body('meal_type').isString().notEmpty(),
        body('created_by').isMongoId().withMessage('Valid user ID required')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { id, name, ingredients, cuisine, meal_type, created_by } = req.body;

            const user = await User.findById(created_by);
            if (!user) return res.status(400).json({ message: "User not found" });

            const existingFood = await Food.findOne({ id });
            if (existingFood) return res.status(400).json({ message: "Food ID already exists" });

            const newFood = new Food({ id, name, ingredients, cuisine, meal_type, created_by });
            await newFood.save();

            res.status(201).json(newFood);
        } catch (error) {
            res.status(500).json({ message: "Error creating food" });
        }
    }
);

// ✅ Get foods (optional filter by created_by)
router.get("/foods", async (req, res) => {
    try {
        const { created_by } = req.query;

        const query = created_by ? { created_by } : {};
        const foods = await Food.find(query).populate('created_by', 'name email');

        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: "Error fetching food combinations" });
    }
});

// ✅ Update food
router.put("/foods/:id",
    [
        param('id').isInt({ min: 1 }),
        body('name').optional().isString().notEmpty(),
        body('ingredients').optional().isArray().notEmpty(),
        body('cuisine').optional().isString().notEmpty(),
        body('meal_type').optional().isString().notEmpty()
    ],
    validateRequest,
    async (req, res) => {
        try {
            const updatedFood = await Food.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
            if (!updatedFood) return res.status(404).json({ message: "Food not found" });
            res.status(200).json(updatedFood);
        } catch (error) {
            res.status(500).json({ message: "Error updating food" });
        }
    }
);

// ✅ Delete food
router.delete("/foods/:id",
    [param('id').isInt({ min: 1 })],
    validateRequest,
    async (req, res) => {
        try {
            const deletedFood = await Food.findOneAndDelete({ id: req.params.id });
            if (!deletedFood) return res.status(404).json({ message: "Food not found" });
            res.status(200).json({ message: "Food deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting food" });
        }
    }
);

// ✅ Get food by Mongo ID
router.get("/foods/:id",
    [param('id').isMongoId()],
    validateRequest,
    async (req, res) => {
        try {
            const food = await Food.findById(req.params.id).populate('created_by', 'name email');
            if (!food) return res.status(404).json({ message: "Food not found" });
            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ message: "Error fetching food" });
        }
    }
);

module.exports = router;
