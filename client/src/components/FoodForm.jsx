import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FoodForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    ingredients: "",
    cuisine: "",
    meal_type: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/foods/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFood({
            name: data.name,
            ingredients: data.ingredients.join(", "),
            cuisine: data.cuisine,
            meal_type: data.meal_type,
          });
        })
        .catch((error) => console.error("Error fetching food item:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!food.name || !food.ingredients || !food.cuisine || !food.meal_type) {
      alert("All fields are required!");
      return;
    }

    const userId = parseInt(localStorage.getItem("userId"), 10);
    if (!id && (!userId || isNaN(userId))) {
      alert("No valid user selected. Please select a user before adding a food item.");
      return;
    }

    const foodData = {
      name: food.name,
      ingredients: food.ingredients.split(",").map((item) => item.trim()),
      cuisine: food.cuisine,
      meal_type: food.meal_type,
      ...(id ? {} : { created_by: userId }),
    };

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:3000/api/foods/${id}`
      : "http://localhost:3000/api/foods";

    try {
      console.log("Sending food data:", foodData);
      console.log("Request method:", method, "URL:", url);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      if (response.ok) {
        alert(`Food item ${id ? "updated" : "added"} successfully!`);
        if (!id) localStorage.removeItem("userId");
        navigate("/");
      } else {
        alert("Failed to save food item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {id ? "Edit" : "Add"} Food Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {id ? "Update Food" : "Add Food"}
        </button>
      </form>
    </div>
  );
}
