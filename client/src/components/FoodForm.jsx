import { useState } from "react";

export default function FoodForm() {
    const [food, setFood] = useState({
        id: "",
        name: "",
        ingredients: "",
        cuisine: "",
        meal_type: ""
    });

    const handleChange = (e) => {
        setFood({ ...food, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!food.id || !food.name || !food.ingredients || !food.cuisine || !food.meal_type) {
            alert("All fields are required!");
            return;
        }

        const foodData = {
            id: parseInt(food.id, 10), // Convert ID to a number
            name: food.name,
            ingredients: food.ingredients.split(",").map(item => item.trim()), // Trim spaces
            cuisine: food.cuisine,
            meal_type: food.meal_type
        };

        try {
            const response = await fetch("http://localhost:5000/api/foods", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(foodData),
            });

            if (response.ok) {
                setFood({ id: "", name: "", ingredients: "", cuisine: "", meal_type: "" }); // Reset form
                alert("Food item added successfully!");
            } else {
                alert("Failed to add food item");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Add a New Food Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    name="id"
                    placeholder="Food ID (Enter manually)"
                    value={food.id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Food Name"
                    value={food.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="ingredients"
                    placeholder="Ingredients (comma-separated)"
                    value={food.ingredients}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="cuisine"
                    placeholder="Cuisine Type"
                    value={food.cuisine}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="meal_type"
                    placeholder="Meal Type"
                    value={food.meal_type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Add Food
                </button>
            </form>
        </div>
    );
}
