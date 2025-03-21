import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodCards = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/foods");
      setFoods(response.data);
    } catch (err) {
      setError("Error fetching food data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/foods/${id}`);
      setFoods(foods.filter((food) => food.id !== id)); // Update state after deletion
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Food List</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => navigate("/add-food")}
        >
          Add New
        </button>
      </div>

      {loading ? (
        <p>Loading food items...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {foods.map((food) => (
            <div key={food.id} className="border p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-bold">{food.name}</h2>
              <p className="text-gray-600"><strong>Cuisine:</strong> {food.cuisine}</p>
              <p className="text-gray-600"><strong>Meal Type:</strong> {food.meal_type}</p>
              <p className="text-gray-800"><strong>Ingredients:</strong> {food.ingredients.join(", ")}</p>

              <div className="mt-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                  onClick={() => navigate(`/edit-food/${food.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(food.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodCards;
