const express = require('express');
const mongoose = require('mongoose');
const { body, param, validationResult } = require('express-validator'); 
const router = express.Router();
const User = require('./schema'); // Import User schema


const foodSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    cuisine: { type: String, required: true },
    meal_type: { type: String, required: true }
});


const Food = mongoose.model("food_combinations", foodSchema);


const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/users',
    [
        body('name').isString().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
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
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/users/:id',
    [
        param('id').isMongoId().withMessage('Invalid user ID'),
        body('name').optional().isString().notEmpty(),
        body('email').optional().isEmail(),
        body('password').optional().isLength({ min: 6 })
    ],
    validateRequest,
    async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) return res.status(404).json({ message: "User not found" });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

router.delete('/users/:id',
    [
        param('id').isMongoId().withMessage('Invalid user ID')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) return res.status(404).json({ message: "User not found" });
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);



router.get("/foods", async (req, res) => {
    try {
        const allFoods = await Food.find();
        res.status(200).json(allFoods);
    } catch (error) {
        res.status(500).json({ message: "Error fetching food combinations" });
    }
});

router.post("/foods",
    [
        body('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
        body('name').isString().notEmpty().withMessage('Name is required'),
        body('ingredients').isArray().notEmpty().withMessage('Ingredients must be an array and not empty'),
        body('cuisine').isString().notEmpty().withMessage('Cuisine is required'),
        body('meal_type').isString().notEmpty().withMessage('Meal type is required')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { id, name, ingredients, cuisine, meal_type } = req.body;
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
    }
);

router.put("/foods/:id",
    [
        param('id').isInt({ min: 1 }).withMessage('Invalid food ID'),
        body('name').optional().isString().notEmpty(),
        body('ingredients').optional().isArray().notEmpty(),
        body('cuisine').optional().isString().notEmpty(),
        body('meal_type').optional().isString().notEmpty()
    ],
    validateRequest,
    async (req, res) => {
        try {
            const updatedFood = await Food.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
            if (!updatedFood) {
                return res.status(404).json({ message: "Food item not found" });
            }
            res.status(200).json(updatedFood);
        } catch (error) {
            res.status(500).json({ message: "Error updating food combination" });
        }
    }
);

router.delete("/foods/:id",
    [
        param('id').isInt({ min: 1 }).withMessage('Invalid food ID')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const deletedFood = await Food.findOneAndDelete({ id: req.params.id });
            if (!deletedFood) {
                return res.status(404).json({ message: "Food item not found" });
            }
            res.status(200).json({ message: "Food item deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting food combination" });
        }
    }
);

router.get("/foods/:id",
    [
        param('id').isMongoId().withMessage('Invalid food ID')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const food = await Food.findById(req.params.id);
            if (!food) return res.status(404).json({ message: "Food not found" });
            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ message: "Error fetching food item" });
        }
    }
);

module.exports = router;
