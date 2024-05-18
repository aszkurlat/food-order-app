import { useContext } from "react";

import { currencyFormatter } from "../util/formatting.js";
import Button from "./ui-components/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal">
      <article>
        <img
          src={`http://food-order-app-frontend-eight.vercel.app/api/${meal.image}`}
          alt={meal.name}
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-description">{meal.description}</p>
        </div>
        <p className="meal-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
