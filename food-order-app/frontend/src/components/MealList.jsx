import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import Meal from "./Meal.jsx";

const requestConfig = {};

export default function MealList() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(
    "https://food-order-app-backend-ruby.vercel.app/api/meals",
    // "http://localhost:3000/api/meals",
    requestConfig,
    []
  );

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
