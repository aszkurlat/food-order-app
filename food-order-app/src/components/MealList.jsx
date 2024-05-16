import { useState, useEffect } from "react";
import Meal from "./Meal";

export default function MealList() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/meals");
      const meals = await response.json();
      setLoadedMeals(meals);
    }
    fetchData();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
