import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodCards = () => {
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoods();
    fetchUsers();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/foods");
      setFoods(response.data);
      setAllFoods(response.data); // Save for filtering
    } catch (err) {
      setError("Error fetching food data");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/foods/${id}`);
      const updatedFoods = foods.filter((food) => food.id !== id);
      setFoods(updatedFoods);
      setAllFoods(updatedFoods);
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  const handleFilterByUser = (email) => {
    setSelectedEmail(email);
    if (email === "") {
      setFoods(allFoods);
    } else {
      const filtered = allFoods.filter((food) => food.email === email);
      setFoods(filtered);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Food List</h1>

        <div className="flex items-center gap-2">
          <label className="font-medium">Created by:</label>
          <select
            value={selectedEmail}
            onChange={(e) => handleFilterByUser(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user._id} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => navigate("/add-food")}
          >
            Add New
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading food items...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : foods.length === 0 ? (
        <p className="text-gray-500">No food items found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {foods.map((food) => (
            <div key={food.id} className="border p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-bold">{food.name}</h2>
              <p className="text-gray-600"><strong>Cuisine:</strong> {food.cuisine}</p>
              <p className="text-gray-600"><strong>Meal Type:</strong> {food.meal_type}</p>
              <p className="text-gray-800"><strong>Ingredients:</strong> {food.ingredients.join(", ")}</p>
              <p className="text-sm text-gray-500 mt-1"><strong>Added by:</strong> {food.email}</p>

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
