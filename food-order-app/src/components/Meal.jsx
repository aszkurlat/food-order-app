import { currencyFormatter } from "../util/formatting";
export default function Meal({ meal }) {
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
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
