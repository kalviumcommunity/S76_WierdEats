import React, { useState, useEffect } from "react";
import axios from "axios";

const FoodCards = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/foods")
      .then(response => {
        setFoods(response.data); 
      })
      .catch(error => {
        console.error("Error fetching food data:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {foods.map((food, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-bold">{food.name}</h2>
          <p className="text-gray-600"><strong>Cuisine:</strong> {food.cuisine}</p>
          <p className="text-gray-600"><strong>Meal Type:</strong> {food.meal_type}</p>
          <p className="text-gray-800"><strong>Ingredients:</strong> {food.ingredients.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default FoodCards;
