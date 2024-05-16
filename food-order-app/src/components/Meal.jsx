import { currencyFormatter } from "../util/formatting";
import Button from "./ui-components/Button";
import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";

export default function Meal({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal" key={meal.id}>
      <article>
        <img src={meal.image} alt={meal.name} />
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
