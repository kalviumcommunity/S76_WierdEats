const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    cuisine: { type: String, required: true },
    meal_type: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Food = mongoose.model("food_combinations", foodSchema);

module.exports = Food;